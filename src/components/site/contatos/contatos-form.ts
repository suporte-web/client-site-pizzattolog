import type { EntradaSitePayload } from '@/services/site/entrada-site.service';

export type TipoEntradaSiteContato =
  | 'FORNECEDOR'
  | 'FROTA'
  | 'MARKETING'
  | 'FINANCEIRO'
  | 'JURIDICO'
  | 'FISCAL';

export interface ContatoSiteFormData {
  nome: string;
  email: string;
  cargo: string;
  telefone: string;
  mensagem: string;
  aceiteComunicacao: boolean;
}

export interface AgregadoSiteFormData {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  categoriaCnh: string;
  possuiMopp: string;
  possuiEar: string;
  marcaVeiculo: string;
  anoVeiculo: string;
  mensagem: string;
  aceiteComunicacao: boolean;
  aceitePrivacidade: boolean;
}

const tiposPorArea: Record<string, TipoEntradaSiteContato> = {
  'Seja um fornecedor': 'FORNECEDOR',
  'Frota e Manutenção': 'FROTA',
  'Marketing e Comunicação': 'MARKETING',
  Financeiro: 'FINANCEIRO',
  Jurídico: 'JURIDICO',
  Fiscal: 'FISCAL',
};

function clean(value?: string | null) {
  return value?.trim() ?? '';
}

function optional(value?: string | null) {
  const cleaned = clean(value);

  return cleaned || undefined;
}

function onlyDigits(value?: string | null) {
  return clean(value).replace(/\D/g, '');
}

export function getTipoEntradaPorArea(
  area: string,
): TipoEntradaSiteContato | undefined {
  return tiposPorArea[area];
}

export function buildContatoSitePayload(
  area: string,
  formulario: ContatoSiteFormData,
): EntradaSitePayload {
  const tipo = getTipoEntradaPorArea(area);

  if (!tipo) {
    throw new Error(
      `Área de contato inválida: ${area}`,
    );
  }

  const nome = clean(formulario.nome);
  const email = clean(formulario.email);

  const telefone =
    onlyDigits(formulario.telefone) || undefined;

  const cargo = optional(formulario.cargo);
  const mensagem = optional(formulario.mensagem);

  return {
    tipo,

    nome,
    email,
    telefone,

    cargo,
    mensagem,

    aceiteComunicacoes:
      formulario.aceiteComunicacao,
  };
}

export function buildAgregadoSitePayload(
  formulario: AgregadoSiteFormData,
): EntradaSitePayload {
  const nome = clean(formulario.nome);
  const email = clean(formulario.email);

  const telefone =
    onlyDigits(formulario.telefone) || undefined;

  const cidade = optional(formulario.cidade);

  const categoriaCnh =
    optional(formulario.categoriaCnh);

  const marcaVeiculo =
    optional(formulario.marcaVeiculo);

  const mensagem =
    optional(formulario.mensagem);

  const anoVeiculo =
    formulario.anoVeiculo
      ? Number(formulario.anoVeiculo)
      : undefined;

  return {
    tipo: 'AGREGADO',

    nome,
    email,
    telefone,

    cidade,
    categoriaCnh,

    possuiMopp:
      formulario.possuiMopp === 'Sim',

    possuiEar:
      formulario.possuiEar === 'Sim',

    marcaVeiculo,
    anoVeiculo,

    mensagem,

    aceitePrivacidade:
      formulario.aceitePrivacidade,

    aceiteComunicacoes:
      formulario.aceiteComunicacao,
  };
}