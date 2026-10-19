import type { SolicitarCotacaoPayload } from '@/types/site/cotacao';
import { enviarEntradaSite } from './entrada-site.service';

// Compatibilidade para chamadas antigas: usar a mesma fila do formulário atual.
export async function solicitarCotacao(payload: SolicitarCotacaoPayload) {
  const fields = payload.formPayload;
  const text = (...keys: string[]) => {
    for (const key of keys) {
      if (typeof fields[key] === 'string' && fields[key].trim()) return fields[key].trim();
    }
    return undefined;
  };
  return enviarEntradaSite({
    tipo: 'COTACAO', nome: payload.nomeSolicitante,
    email: payload.emailSolicitante ?? '', telefone: payload.telefoneSolicitante,
    empresa: text('empresa', 'company'), cnpj: text('cnpj', 'document'),
    solucao: text('solucao', 'tipoServico', 'serviceType'), mensagem: payload.mensagem,
    aceitePrivacidade: fields.aceitePrivacidade === true,
    aceiteComunicacoes: fields.aceiteComunicacoes === true,
  });
}
