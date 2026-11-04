import type { FormularioCotacao, TipoServicoCotacao } from '@/types/site/cotacao';

export const FORMULARIO_COTACAO_INICIAL: FormularioCotacao = {
  nome: '',
  empresa: '',
  cnpj: '',
  email: '',
  telefone: '',
  tipoServico: '',
  observacoes: '',
  aceitePrivacidade: false,
};

export const SOLUCOES_COTACAO: Array<{ value: Exclude<TipoServicoCotacao, ''>; label: string }> = [
  { value: 'TRANSPORTE_RODOVIARIO', label: 'Transporte rodoviário' },
  { value: 'ARMAZENAGEM', label: 'Armazenagem' },
  { value: 'OPERACAO_LOGISTICA', label: 'Operação logística' },
  { value: 'DISTRIBUICAO', label: 'Distribuição' },
  { value: 'OUTRO', label: 'Outro' },
];
