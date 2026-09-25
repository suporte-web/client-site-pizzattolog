export type TipoSolicitacaoSite =
  | 'COTACAO'
  | 'AGREGADO'
  | 'FORNECEDOR'
  | 'FROTA'
  | 'MARKETING'
  | 'FINANCEIRO'
  | 'JURIDICO'
  | 'FISCAL';


export interface EntradaSitePayload {
  tipo: TipoSolicitacaoSite;

  nome: string;
  email: string;

  telefone?: string;
  cargo?: string;

  empresa?: string;
  cnpj?: string;

  solucao?: string;

  cidade?: string;
  categoriaCnh?: string;

  possuiMopp?: boolean;
  possuiEar?: boolean;

  marcaVeiculo?: string;
  anoVeiculo?: number;

  assunto?: string;
  mensagem?: string;

  aceitePrivacidade?: boolean;
  aceiteComunicacoes?: boolean;
}

export interface EntradaSiteResponse {
  sucesso: boolean;

  mensagem?: string;

  solicitacao: {
    id: string;
  };

  lead?: unknown | null;
}

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

  return (
    response.message ??
    response.mensagem ??
    response.error ??
    'Não foi possível enviar a solicitação.'
  );
}

export async function enviarEntradaSite(
  payload: EntradaSitePayload,
): Promise<EntradaSiteResponse> {

  const response = await fetch('/api/entradas/site', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(payload),
  });

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      getApiErrorMessage(data),
    );
  }

  return data;
}

export async function enviarAnexosSolicitacaoSite(
  solicitacaoId: string,
  arquivos: File[],
) {
  if (arquivos.length === 0) {
    return null;
  }

  const formData = new FormData();

  arquivos.forEach((arquivo) => {
    formData.append(
      'arquivos',
      arquivo,
    );
  });

  const response = await fetch(
    `/api/entradas/site/${solicitacaoId}/anexos`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    throw new Error(
      getApiErrorMessage(data),
    );
  }

  return data;
}