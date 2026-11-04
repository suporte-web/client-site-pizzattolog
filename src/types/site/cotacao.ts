export type TipoServicoCotacao =
  | ''
  | 'TRANSPORTE_RODOVIARIO'
  | 'ARMAZENAGEM'
  | 'OPERACAO_LOGISTICA'
  | 'DISTRIBUICAO'
  | 'OUTRO';

export type CotacaoSubmitStatus = 'idle' | 'enviando' | 'sucesso' | 'erro';

export interface FormularioCotacao {
  nome: string;
  empresa: string;
  cnpj: string;
  email: string;
  telefone: string;
  tipoServico: TipoServicoCotacao;
  observacoes: string;
  aceitePrivacidade: boolean;
}

export type CotacaoFormErrors = Partial<Record<keyof FormularioCotacao, string>>;
