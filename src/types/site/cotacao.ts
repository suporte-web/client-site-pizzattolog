export type TipoServicoCotacao =
  | ''
  | 'TRANSPORTE_RODOVIARIO'
  | 'ARMAZENAGEM'
  | 'OPERACAO_LOGISTICA'
  | 'DISTRIBUICAO'
  | 'OUTRO';

export type ProdutoPerigoso = '' | 'SIM' | 'NAO';

export type CotacaoSubmitStatus = 'idle' | 'enviando' | 'sucesso' | 'erro';

export interface FormularioCotacao {
  nome: string;
  empresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  tipoServico: TipoServicoCotacao;
  cidadeOrigem: string;
  ufOrigem: string;
  cidadeDestino: string;
  ufDestino: string;
  tipoCarga: string;
  pesoMedio: string;
  valorMercadoria: string;
  tipoVeiculo: string;
  cubagem: string;
  embarquesMes: string;
  produtoPerigoso: ProdutoPerigoso;
  informacoesProdutoPerigoso: string;
  armazenagemServicoDesejado: string;
  armazenagemCidade: string;
  armazenagemUf: string;
  armazenagemVolumeAproximado: string;
  observacoes: string;
  aceitePrivacidade: boolean;
}

export type CotacaoFormErrors = Partial<Record<keyof FormularioCotacao, string>>;

export interface SolicitarCotacaoPayload {
  nomeSolicitante: string;
  emailSolicitante?: string;
  telefoneSolicitante?: string;
  mensagem?: string;
  tipo: 'COTACAO';
  prioridade: 'NORMAL';
  formPayload: Record<string, unknown>;
}
