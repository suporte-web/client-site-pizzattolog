export type TipoConsultaRastreamento = 'nro_nf' | 'pedido' | 'chave_nfe' | 'nro_coleta';
export interface EventoRastreamento {
  dataHora: string | null;
  ocorrencia: string;
  descricao: string | null;
  local: string | null;
}
export interface ResultadoRastreamento {
  codigo: string;
  status: string;
  origem: string | null;
  destino: string | null;
  previsaoEntrega: string | null;
  documento: string | null;
  eventos: EventoRastreamento[];
}
