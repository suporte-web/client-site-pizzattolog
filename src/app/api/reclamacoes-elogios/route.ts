import { NextResponse } from 'next/server';
import { validarRelato } from '@/lib/relato-cliente';

export const runtime = 'nodejs';
function resposta(dados: unknown, status = 200) {
  return NextResponse.json(dados, { status, headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(request: Request) {
  if (Number(request.headers.get('content-length')) > 52 * 1024 * 1024) return resposta({ message: 'Os anexos excedem o tamanho permitido.' }, 413);
  const formulario = await request.formData().catch(() => null);
  if (!formulario) return resposta({ message: 'Envie os dados do registro.' }, 400);
  const dados = validarRelato(formulario);
  if (!dados) return resposta({ message: 'Confira os campos obrigatórios. O relato deve ter entre 10 e 10.000 caracteres.' }, 400);
  const arquivos = formulario.getAll('arquivos');
  if (arquivos.length > 5 || arquivos.some(arquivo => typeof arquivo === 'string' || arquivo.size <= 0 || arquivo.size > 10 * 1024 * 1024 || !['application/pdf','image/jpeg','image/png'].includes(arquivo.type))) {
    return resposta({ message: 'Envie até 5 anexos PDF, JPG ou PNG, de até 10 MB cada.' }, 400);
  }
  let comentarios: unknown;
  try { comentarios = formulario.has('comentariosAnexos') ? JSON.parse(String(formulario.get('comentariosAnexos'))) : arquivos.map(() => ''); }
  catch { return resposta({ message: 'Confira os comentários dos anexos.' }, 400); }
  if (!Array.isArray(comentarios) || comentarios.length !== arquivos.length || comentarios.some(item => typeof item !== 'string' || item.length > 1000)) {
    return resposta({ message: 'Cada anexo pode ter um comentário de até 1000 caracteres.' }, 400);
  }
  const comentariosAnexos = comentarios.map(item => (item as string).trim());
  const crmUrl = process.env.CRM_API_URL;
  const token = process.env.SITE_LEAD_INTEGRATION_TOKEN;
  if (!crmUrl || !token) return resposta({ message: 'O envio está temporariamente indisponível.' }, 503);
  try {
    const url = new URL(crmUrl);
    if (!['http:','https:'].includes(url.protocol) || url.username || url.password) throw new Error('Configuração inválida');
    const base = url.pathname.replace(/\/+$/, '');
    url.pathname = `${base}${base.endsWith('/api') ? '' : '/api'}/atendimentos/site/relatos`;
    url.search = ''; url.hash = '';
    const envio = new FormData();
    Object.entries(dados).forEach(([campo, valor]) => envio.set(campo, valor));
    envio.set('comentariosAnexos', JSON.stringify(comentariosAnexos));
    arquivos.forEach(arquivo => { if (typeof arquivo !== 'string') envio.append('arquivos', arquivo, arquivo.name); });
    const crm = await fetch(url.toString(), { method: 'POST', headers: { 'x-integration-token': token }, body: envio, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(30000) });
    if (!crm.ok) {
      const status = [400,413,429].includes(crm.status) ? crm.status : 502;
      return resposta({ message: status === 400 ? 'Confira os campos e os anexos enviados.' : status === 413 ? 'Os anexos excedem o tamanho permitido.' : 'Não foi possível confirmar o envio. Tente novamente usando os mesmos dados.' }, status);
    }
    const resultado = await crm.json();
    if (resultado?.sucesso !== true || typeof resultado.protocolo !== 'string') throw new Error('Resposta inválida');
    return resposta({ sucesso: true, protocolo: resultado.protocolo.slice(0, 80) }, 201);
  } catch {
    return resposta({ message: 'Não foi possível confirmar o envio. Tente novamente usando os mesmos dados.' }, 502);
  }
}
