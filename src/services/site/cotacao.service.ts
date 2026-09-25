import type { SolicitarCotacaoPayload } from '@/types/site/cotacao';

function getApiErrorMessage(data: unknown) {
  if (!data || typeof data !== 'object') {
    return 'Não foi possível enviar a solicitação.';
  }

  const response = data as {
    message?: string | string[];
    mensagem?: string;
    error?: string;
  };

  if (Array.isArray(response.message)) {
    return response.message.join(' ');
  }

  return response.message ?? response.mensagem ?? response.error ?? 'Não foi possível enviar a solicitação.';
}

export async function solicitarCotacao(payload: SolicitarCotacaoPayload) {
  const response = await fetch('/api/leads/site', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.nomeSolicitante,
      email: payload.emailSolicitante,
      phone: payload.telefoneSolicitante,
      company:
        typeof payload.formPayload.empresa === 'string'
          ? payload.formPayload.empresa
          : undefined,
      source: 'site',
      status: 'new',
      notes: payload.mensagem,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getApiErrorMessage(data));
  }

  return data;
}
