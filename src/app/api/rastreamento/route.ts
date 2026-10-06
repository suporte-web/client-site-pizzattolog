import { NextResponse } from 'next/server';
import type { ResultadoRastreamento, TipoConsultaRastreamento } from '@/types/rastreamento';

export const runtime = 'nodejs';
const tipos: TipoConsultaRastreamento[] = ['nro_nf', 'pedido', 'chave_nfe', 'nro_coleta'];
function responder(dados: unknown, status = 200) {
  return NextResponse.json(dados, { status, headers: { 'Cache-Control': 'no-store' } });
}
function texto(valor: unknown): string | null {
  return typeof valor === 'string' ? valor.slice(0, 1000) : null;
}

export async function POST(request: Request) {
  const bruto: unknown = await request.json().catch(() => null);
  if (!bruto || typeof bruto !== 'object' || Array.isArray(bruto)) return responder({ message: 'Informe os dados da consulta.' }, 400);
  const dados = bruto as Record<string, unknown>;
  const cnpj = typeof dados.cnpj === 'string' ? dados.cnpj.trim().replace(/[./\-\s]/g, '') : '';
  const codigo = typeof dados.codigo === 'string' ? dados.codigo.trim() : '';
  const tipo = dados.tipo ?? 'nro_nf';
  if (!/^\d{14}$/.test(cnpj) || !/^[A-Za-z0-9][A-Za-z0-9 ._-]{0,79}$/.test(codigo)
    || !tipos.includes(tipo as TipoConsultaRastreamento)
    || (tipo === 'chave_nfe' && !/^\d{44}$/.test(codigo))) {
    return responder({ message: 'Informe CNPJ, tipo de consulta e código válidos.' }, 400);
  }
  const crmUrl = process.env.CRM_API_URL;
  if (!crmUrl) return responder({ message: 'O rastreamento está temporariamente indisponível.' }, 503);
  try {
    const url = new URL(crmUrl);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Configuração inválida');
    const base = url.pathname.replace(/\/+$/, '');
    url.pathname = `${base}${base.endsWith('/api') ? '' : '/api'}/public/trackings/${encodeURIComponent(codigo)}`;
    url.search = new URLSearchParams({ cnpj, tipo: String(tipo) }).toString();
    url.hash = '';
    const resposta = await fetch(url.toString(), { cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(20000), headers: { Accept: 'application/json' } });
    if (!resposta.ok) {
      const status = [400, 404, 429, 504].includes(resposta.status) ? resposta.status : 502;
      const mensagem = status === 404 ? 'Nenhuma carga encontrada para os dados informados.'
        : status === 400 ? 'Verifique o CNPJ e o código informado.'
        : status === 429 ? 'Aguarde um momento antes de consultar novamente.'
        : status === 504 ? 'A consulta demorou mais que o esperado. Tente novamente.'
        : 'Não foi possível consultar o rastreamento. Tente novamente.';
      return responder({ message: mensagem }, status);
    }
    const resultado = await resposta.json() as Record<string, unknown>;
    if (!resultado || typeof resultado !== 'object' || typeof resultado.status !== 'string' || !Array.isArray(resultado.eventos)) throw new Error('Resposta inválida');
    // Contrato público fechado: nunca repassar o corpo bruto ou campos inesperados do CRM.
    const publico: ResultadoRastreamento = {
      codigo, status: texto(resultado.status)!, origem: texto(resultado.origem), destino: texto(resultado.destino),
      previsaoEntrega: texto(resultado.previsaoEntrega), documento: texto(resultado.documento),
      eventos: resultado.eventos.slice(0, 1000).map((item: unknown) => {
        const evento = item && typeof item === 'object' ? item as Record<string, unknown> : {};
        return { dataHora: texto(evento.dataHora), ocorrencia: texto(evento.ocorrencia) ?? 'Movimentação registrada', descricao: texto(evento.descricao), local: texto(evento.local) };
      }),
    };
    return responder(publico);
  } catch (erro) {
    const timeout = erro instanceof Error && ['TimeoutError', 'AbortError'].includes(erro.name);
    return responder({ message: timeout ? 'A consulta demorou mais que o esperado. Tente novamente.' : 'Não foi possível consultar o rastreamento. Tente novamente.' }, timeout ? 504 : 502);
  }
}
