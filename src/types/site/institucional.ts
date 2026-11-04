export type ValorQuemSomos = {
  titulo?: string;
  descricao?: string;
};

export type CertificacaoQuemSomos = ValorQuemSomos & {
  id?: string;
  imagemUrl?: string;
};

export type UnidadeQuemSomos = {
  id: string;
  nome: string;
  tipo: string;
  endereco: string;
  cidade: string;
  latitude: number;
  longitude: number;
};

export type TextoEditavel = {
  titulo?: string;
  texto?: string;
  descricao?: string;
};

export type TextoImagemEditavel = TextoEditavel & {
  imagemUrl?: string;
};

export type QuemSomosConteudo = {
  banner?: {
    titulo?: string;
    subtitulo?: string;
    imagemUrl?: string;
  };

  historia?: {
    titulo?: string;
    texto?: string;
    imagemUrl?: string;
  };

  missao?: {
    titulo?: string;
    texto?: string;
  };

  visao?: {
    titulo?: string;
    texto?: string;
  };

  valoresResumo?: {
    titulo?: string;
    texto?: string;
  };

  valores?: ValorQuemSomos[];

  certificacoes?: CertificacaoQuemSomos[];

  unidades?: {
    etiqueta?: string;
    titulo?: string;
    texto?: string;
    itens?: UnidadeQuemSomos[];
  };
};

export type PaginaPublicadaSite<
  TConteudo = Record<string, unknown>,
> = {
  nome: string;
  slug: string;
  conteudo: TConteudo;
  publicadoEm: string | null;
};
