export interface ItemMenu {
  id: string;
  titulo: string;
  slug: string;
  url?: string | null;
  ordem: number;
  ativo: boolean;
  filhos?: ItemMenu[];
}

export interface MenuNavegacao {
  id: string;
  titulo: string;
  slug: string;
  url?: string | null;
  ordem: number;
  ativo: boolean;
  itens: ItemMenu[];
}

export interface HeroPaginaInicial {
  id: string;
  etiqueta: string;
  titulo: string;
  descricao: string;
  imagemUrl?: string | null;
  imagemUrlSecundaria?: string | null;
  textoBotaoPrimario: string;
  urlBotaoPrimario?: string | null;
  textoBotaoSecundario: string;
  urlBotaoSecundario?: string | null;
  ativo?: boolean;
}

export interface Solucao {
  id: string;
  titulo: string;
  slug: string;
  descricao: string;
  imagemUrl?: string | null;
  icone?: string | null;
  ordem: number;
  ativo: boolean;
}

export interface LinkRodape {
  id: string;
  titulo: string;
  url?: string | null;
  ordem: number;
  ativo: boolean;
}

export interface SecaoRodape {
  id: string;
  titulo: string;
  ordem: number;
  ativo: boolean;
  links: LinkRodape[];
}

export interface Rodape {
  id: string;
  nomeEmpresa: string;
  descricao: string;
  direitosAutorais: string;
  ativo: boolean;
  secoes: SecaoRodape[];
}

export type StatusPagina = 'RASCUNHO' | 'PUBLICADA' | 'ARQUIVADA';

export interface Pagina {
  id: string;
  titulo: string;
  slug: string;
  resumo?: string | null;
  conteudo: string;
  status: StatusPagina;
  ativo: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface Subpagina {
  id: string;
  titulo: string;
  slug: string;
  paginaPai: string;
  caminho: string;
  ancora?: string | null;
  descricao?: string | null;
  ordem: number;
  ativo: boolean;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface SiteHomeData {
  nomeEmpresa: string;
  menus: MenuNavegacao[];
  hero: HeroPaginaInicial;
  solucoes: Solucao[];
  rodape: Rodape;
  subpaginas: Subpagina[];
  conteudosEditaveis?: Array<{
    id: string;
    chave: string;
    pagina: string;
    rotulo: string;
    titulo?: string | null;
    texto?: string | null;
    imagemUrl?: string | null;
    ativo: boolean;
  }>;
}

export interface UnidadeMapa {
  nome: string;
  tipo: string;
  endereco: string;
  cidade: string;
  latitude: number;
  longitude: number;
}

