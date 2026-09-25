import { NextResponse } from 'next/server';

const crmApiBaseUrl = (process.env.CRM_API_URL ?? 'http://localhost:3001/api').replace(/\/$/, '');
const siteLeadIntegrationToken = process.env.SITE_LEAD_INTEGRATION_TOKEN;

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

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || typeof payload !== 'object') {
    return NextResponse.json(
      { message: 'Dados da solicitação inválidos.' },
      { status: 400 },
    );
  }

  if (!siteLeadIntegrationToken) {
    return NextResponse.json(
      { message: 'Token de integração de leads do site não configurado.' },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${crmApiBaseUrl}/leads/site`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-integration-token': siteLeadIntegrationToken,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { message: getApiErrorMessage(data) },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: 'Não foi possível conectar ao CRM.' },
      { status: 502 },
    );
  }
}
