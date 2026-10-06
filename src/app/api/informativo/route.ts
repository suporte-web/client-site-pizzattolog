import { NextResponse } from "next/server";

const successMessage =
  "Cadastro realizado com sucesso! Agora você receberá as novidades da Pizzattolog.";
const errorMessage =
  "Não foi possível concluir seu cadastro. Tente novamente em instantes.";

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json(
      { message: "Dados do cadastro inválidos." },
      { status: 400 },
    );
  }
  const dados = payload as Record<string, unknown>;
  const nome =
    typeof dados.nome === "string"
      ? dados.nome.trim().replace(/\s+/g, " ")
      : "";
  const email =
    typeof dados.email === "string" ? dados.email.trim().toLowerCase() : "";
  if (
    !nome ||
    nome.length > 200 ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    (dados.aceitePrivacidade !== undefined &&
      typeof dados.aceitePrivacidade !== "boolean")
  ) {
    return NextResponse.json(
      { message: "Informe seu nome e um e-mail válido." },
      { status: 400 },
    );
  }

  const crmUrl = process.env.CRM_API_URL?.replace(/\/+$/, "");
  const token = process.env.SITE_LEAD_INTEGRATION_TOKEN;
  if (!crmUrl || !token) {
    console.error(
      "Integração do informativo: CRM_API_URL ou SITE_LEAD_INTEGRATION_TOKEN ausente.",
    );
    return NextResponse.json({ message: errorMessage }, { status: 503 });
  }

  try {
    const response = await fetch(`${crmUrl}/informativo/site`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-integration-token": token,
      },
      body: JSON.stringify({
        nome,
        email,
        ...(dados.aceitePrivacidade !== undefined
          ? { aceitePrivacidade: dados.aceitePrivacidade }
          : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error(
        "Integração do informativo: CRM respondeu com status",
        response.status,
      );
      return NextResponse.json(
        {
          message:
            response.status === 400
              ? "Informe seu nome e um e-mail válido."
              : errorMessage,
        },
        { status: response.status === 400 ? 400 : 502 },
      );
    }
    // Somente uma confirmação pública; dados e erros internos do CRM não são repassados.
    return NextResponse.json({ message: successMessage });
  } catch {
    console.error(
      "Integração do informativo: não foi possível conectar ao CRM.",
    );
    return NextResponse.json({ message: errorMessage }, { status: 502 });
  }
}
