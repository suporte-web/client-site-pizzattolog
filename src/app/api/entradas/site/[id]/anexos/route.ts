import { NextResponse } from 'next/server';

const crmApiBaseUrl = (
  process.env.CRM_API_URL ??
  'http://localhost:3001/api'
).replace(/\/$/, '');

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    const { id } = await context.params;

    const formData = await request.formData();

    const response = await fetch(
      `${crmApiBaseUrl}/integracoes/site/solicitacoes/${id}/anexos`,
      {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      },
    );

    const data = await response
      .json()
      .catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        data ?? {
          message:
            'Não foi possível enviar os anexos.',
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(
      data,
      {
        status: response.status,
      },
    );
  } catch (error) {
    console.error(
      '[ANEXOS SOLICITACAO SITE]',
      error,
    );

    return NextResponse.json(
      {
        message:
          'Não foi possível enviar os anexos.',
      },
      {
        status: 502,
      },
    );
  }
}