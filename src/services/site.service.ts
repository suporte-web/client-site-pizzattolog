import type { Pagina, SiteHomeData, Subpagina } from '@/types/site';
import {
  buildMenuPrincipal,
  buildRotasMenuPrincipal,
} from '@/utils/site/navigation';

import type {
  PaginaPublicadaSite,
} from '@/types/site-institucional';

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL ??
  'http://localhost:3001/api';

const crmApiBaseUrl =
  process.env.CRM_API_URL ??
  'http://localhost:3000/api';

function resolverUrlAssetCrm(url: string): string {
  if (!url) {
    return url;
  }

  // Já é uma URL completa
  if (
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url;
  }

  // Só tratamos arquivos públicos enviados pelo CRM
  if (
    !url.startsWith('/api/public/site/assets/')
  ) {
    return url;
  }

  try {
    const crmOrigin =
      new URL(crmApiBaseUrl).origin;

    return `${crmOrigin}${url}`;
  } catch {
    return url;
  }
}

/**
 * Percorre o conteúdo retornado pelo CRM e transforma
 * URLs relativas de assets em URLs absolutas.
 *
 * Isso permite reutilizar a mesma lógica em:
 * Quem Somos, ESG, Soluções, Seminovos etc.
 */
function resolverAssetsCrm<T>(
  value: T,
): T {
  if (typeof value === 'string') {
    return resolverUrlAssetCrm(
      value,
    ) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      resolverAssetsCrm(item),
    ) as T;
  }

  if (
    value &&
    typeof value === 'object'
  ) {
    return Object.fromEntries(
      Object.entries(value).map(
        ([key, item]) => [
          key,
          resolverAssetsCrm(item),
        ],
      ),
    ) as T;
  }

  return value;
}

const menuPrincipal = buildMenuPrincipal();

const rotasMenuPrincipal: Subpagina[] = buildRotasMenuPrincipal(menuPrincipal);

function chaveRota(rota: Subpagina) {
  return rota.caminho.replace(/\/(?=#|$)/, '');
}

function mesclarRotas(rotas: Subpagina[]) {
  const mapa = new Map<string, Subpagina>();

  [...rotasMenuPrincipal, ...rotas].forEach((rota) => {
    mapa.set(chaveRota(rota), rota);
  });

  return [...mapa.values()].sort((a, b) => a.ordem - b.ordem || a.titulo.localeCompare(b.titulo, 'pt-BR'));
}

export const fallbackSiteData: SiteHomeData = {
  nomeEmpresa: 'Pizzattolog',
  menus: [
    {
      id: 'quem-somos',
      titulo: 'Quem somos',
      slug: 'quem-somos',
      url: '/quem-somos',
      ordem: 1,
      ativo: true,
      itens: [
        {
          id: 'a-pizzattolog',
          titulo: 'A Pizzattolog',
          slug: 'a-pizzattolog',
          url: '/quem-somos#a-pizzattolog',
          ordem: 1,
          ativo: true,
        },
        {
          id: 'eficiencia',
          titulo: 'Eficiência',
          slug: 'eficiencia',
          url: '/quem-somos#eficiencia',
          ordem: 2,
          ativo: true,
        },
        {
          id: 'unidades',
          titulo: 'Unidades',
          slug: 'unidades',
          url: '/quem-somos#unidades',
          ordem: 3,
          ativo: true,
        },
      ],
    },
    {
      id: 'solucoes',
      titulo: 'Soluções',
      slug: 'solucoes',
      url: '/solucoes',
      ordem: 2,
      ativo: true,
      itens: [
        {
          id: 'armazenagem',
          titulo: 'Armazenagem',
          slug: 'armazenagem',
          url: '/solucoes#armazenagem',
          ordem: 1,
          ativo: true,
        },
        {
          id: 'transporte-de-cargas',
          titulo: 'Transporte de cargas',
          slug: 'transporte-de-cargas',
          url: '/solucoes#transporte-de-cargas',
          ordem: 2,
          ativo: true,
        },
        {
          id: 'operador-logistico',
          titulo: 'Operador logístico',
          slug: 'operador-logistico',
          url: '/solucoes#operador-logistico',
          ordem: 3,
          ativo: true,
        },
      ],
    },
    { id: 'carreiras', titulo: 'Carreiras', slug: 'carreiras', url: '/carreiras', ordem: 3, ativo: true, itens: [] },
    { id: 'agregados', titulo: 'Agregados', slug: 'agregados', url: '/agregados', ordem: 4, ativo: true, itens: [] },
    {
      id: 'esg',
      titulo: 'ESG',
      slug: 'esg',
      url: '/esg',
      ordem: 5,
      ativo: true,
      itens: [
        { id: 'ambiental', titulo: 'Ambiental', slug: 'ambiental', url: '/esg#ambiental', ordem: 1, ativo: true },
        { id: 'social', titulo: 'Social', slug: 'social', url: '/esg#social', ordem: 2, ativo: true },
        { id: 'governanca', titulo: 'Governança', slug: 'governanca', url: '/esg#governanca', ordem: 3, ativo: true },
      ],
    },
    { id: 'seminovos', titulo: 'Seminovos', slug: 'seminovos', url: '/seminovos', ordem: 6, ativo: true, itens: [] },
    { id: 'blog', titulo: 'Blog', slug: 'blog', url: '/blog', ordem: 7, ativo: true, itens: [] },
    { id: 'contato', titulo: 'Contato', slug: 'contatos', url: '/contatos', ordem: 8, ativo: true, itens: [] },
  ],
  hero: {
    id: 'hero',
    etiqueta: 'Vamos juntos movimentar o mundo',
    titulo: 'A trilha de Sucesso da Pizzattolog',
    descricao:
      'Soluções logísticas completas e integradas para empresas B2B que precisam de segurança, previsibilidade e eficiência em toda a cadeia de fornecimento.',
    imagemUrl: '/images/home/caminhao-tela-inicial.png',
    textoBotaoPrimario: 'Solicitar cotação',
    urlBotaoPrimario: '/solicitar-cotacao',
    textoBotaoSecundario: 'Ver soluções',
    urlBotaoSecundario: '/solucoes',
  },
  solucoes: [
    {
      id: 'armazenagem',
      titulo: 'Armazenagem',
      slug: 'armazenagem',
      descricao:
        'Gestão inteligente de estoque, infraestrutura moderna e processos otimizados para reduzir custos e conectar a armazenagem ao transporte.',
      icone: 'inventory',
      ordem: 1,
      ativo: true,
    },
    {
      id: 'operador',
      titulo: 'Operador logístico',
      slug: 'operador-logistico',
      descricao:
        'Organização e aprimoramento de cada etapa logística com precisão, agilidade, segurança total da carga e respeito aos prazos.',
      icone: 'settings',
      ordem: 2,
      ativo: true,
    },
    {
      id: 'transporte',
      titulo: 'Transporte de cargas',
      slug: 'transporte-de-cargas',
      descricao:
        'Transporte B2B por estrada com foco no sucesso do negócio, segurança da carga, previsibilidade nas entregas e eficiência em todas as operações.',
      icone: 'local_shipping',
      ordem: 3,
      ativo: true,
    },
  ],
  rodape: {
    id: 'rodape',
    nomeEmpresa: 'Pizzattolog',
    descricao: 'Logística inteligente, segura e conectada para empresas que desejam crescer.',
    direitosAutorais: '2026 Pizzattolog. Todos os direitos reservados.',
    ativo: true,
    secoes: [
      {
        id: 'empresa',
        titulo: 'Empresa',
        ordem: 1,
        ativo: true,
        links: [
          { id: 'quem-somos', titulo: 'Quem somos', url: '/quem-somos/', ordem: 1, ativo: true },
          { id: 'solucoes', titulo: 'Soluções', url: '/solucoes/', ordem: 2, ativo: true },
          { id: 'esg', titulo: 'ESG', url: '/esg/', ordem: 3, ativo: true },
          { id: 'blog', titulo: 'Blog', url: '/blog/', ordem: 4, ativo: true },
        ],
      },
      {
        id: 'contato',
        titulo: 'Contato',
        ordem: 2,
        ativo: true,
        links: [
          { id: 'cotacao', titulo: 'Solicitar cotação', url: '/solicitar-cotacao/', ordem: 1, ativo: true },
          { id: 'carreiras', titulo: 'Carreiras', url: '/carreiras/', ordem: 2, ativo: true },
        ],
      },
    ],
  },
  subpaginas: [
    {
      id: 'quem-somos',
      titulo: 'Quem somos',
      slug: 'quem-somos',
      paginaPai: 'quem-somos',
      caminho: '/quem-somos/',
      ancora: null,
      descricao: 'Página institucional da Pizzattolog.',
      ordem: 1,
      ativo: true,
    },
    {
      id: 'a-pizzattolog',
      titulo: 'A Pizzattolog',
      slug: 'a-pizzattolog',
      paginaPai: 'quem-somos',
      caminho: '/quem-somos/#a-pizzattolog',
      ancora: 'a-pizzattolog',
      descricao: 'Seção institucional sobre a empresa.',
      ordem: 2,
      ativo: true,
    },
    {
      id: 'eficiencia',
      titulo: 'Eficiência',
      slug: 'eficiencia',
      paginaPai: 'quem-somos',
      caminho: '/quem-somos/#eficiencia',
      ancora: 'eficiencia',
      descricao: 'Seção sobre eficiência operacional.',
      ordem: 3,
      ativo: true,
    },
    {
      id: 'unidades',
      titulo: 'Unidades',
      slug: 'unidades',
      paginaPai: 'quem-somos',
      caminho: '/quem-somos/#unidades',
      ancora: 'unidades',
      descricao: 'Seção com as unidades da Pizzattolog.',
      ordem: 4,
      ativo: true,
    },
    {
      id: 'solucoes',
      titulo: 'Soluções',
      slug: 'solucoes',
      paginaPai: 'solucoes',
      caminho: '/solucoes/',
      ancora: null,
      descricao: 'Página de soluções logísticas.',
      ordem: 10,
      ativo: true,
    },
    {
      id: 'armazenagem',
      titulo: 'Armazenagem',
      slug: 'armazenagem',
      paginaPai: 'solucoes',
      caminho: '/solucoes/#armazenagem',
      ancora: 'armazenagem',
      descricao: 'Solução de armazenagem.',
      ordem: 11,
      ativo: true,
    },
    {
      id: 'transporte-de-cargas',
      titulo: 'Transporte de cargas',
      slug: 'transporte-de-cargas',
      paginaPai: 'solucoes',
      caminho: '/solucoes/#transporte-de-cargas',
      ancora: 'transporte-de-cargas',
      descricao: 'Solução de transporte de cargas.',
      ordem: 12,
      ativo: true,
    },
    {
      id: 'operador-logistico',
      titulo: 'Operador logístico',
      slug: 'operador-logistico',
      paginaPai: 'solucoes',
      caminho: '/solucoes/#operador-logistico',
      ancora: 'operador-logistico',
      descricao: 'Solução de operador logístico.',
      ordem: 13,
      ativo: true,
    },
    { id: 'carreiras', titulo: 'Carreiras', slug: 'carreiras', paginaPai: 'carreiras', caminho: '/carreiras/', ancora: null, descricao: 'Página de carreiras.', ordem: 20, ativo: true },
    { id: 'agregados', titulo: 'Agregados', slug: 'agregados', paginaPai: 'agregados', caminho: '/agregados/', ancora: null, descricao: 'Página para motoristas agregados.', ordem: 30, ativo: true },
    { id: 'esg', titulo: 'ESG', slug: 'esg', paginaPai: 'esg', caminho: '/esg/', ancora: null, descricao: 'Página de ESG.', ordem: 40, ativo: true },
    { id: 'ambiental', titulo: 'Ambiental', slug: 'ambiental', paginaPai: 'esg', caminho: '/esg/#ambiental', ancora: 'ambiental', descricao: 'Seção ambiental de ESG.', ordem: 41, ativo: true },
    { id: 'social', titulo: 'Social', slug: 'social', paginaPai: 'esg', caminho: '/esg/#social', ancora: 'social', descricao: 'Seção social de ESG.', ordem: 42, ativo: true },
    { id: 'governanca', titulo: 'Governança', slug: 'governanca', paginaPai: 'esg', caminho: '/esg/#governanca', ancora: 'governanca', descricao: 'Seção de governança de ESG.', ordem: 43, ativo: true },
    { id: 'seminovos', titulo: 'Seminovos', slug: 'seminovos', paginaPai: 'seminovos', caminho: '/seminovos/', ancora: null, descricao: 'Página de seminovos.', ordem: 50, ativo: true },
    { id: 'blog', titulo: 'Blog', slug: 'blog', paginaPai: 'blog', caminho: '/blog/', ancora: null, descricao: 'Página do blog.', ordem: 60, ativo: true },
    { id: 'especialidades-logisticas', titulo: 'Especialidades Logísticas', slug: 'especialidades-logisticas', paginaPai: 'especialidades-logisticas', caminho: '/especialidades-logisticas/', ancora: null, descricao: 'Especialidades logísticas atendidas pela Pizzattolog.', ordem: 65, ativo: true },
    { id: 'produtos-quimicos', titulo: 'Produtos Químicos', slug: 'produtos-quimicos', paginaPai: 'especialidades-logisticas', caminho: '/especialidades-logisticas/#produtos-quimicos', ancora: 'produtos-quimicos', descricao: 'Especialidade em produtos químicos.', ordem: 66, ativo: true },
    { id: 'cosmeticos-higiene', titulo: 'Cosméticos e Higiene', slug: 'cosmeticos-higiene', paginaPai: 'especialidades-logisticas', caminho: '/especialidades-logisticas/#cosmeticos-higiene', ancora: 'cosmeticos-higiene', descricao: 'Especialidade em cosméticos e higiene.', ordem: 67, ativo: true },
    { id: 'saude-nutricao-pet', titulo: 'Saúde e Nutrição Pet', slug: 'saude-nutricao-pet', paginaPai: 'especialidades-logisticas', caminho: '/especialidades-logisticas/#saude-nutricao-pet', ancora: 'saude-nutricao-pet', descricao: 'Especialidade em saúde e nutrição pet.', ordem: 68, ativo: true },
    { id: 'social-principal', titulo: 'Social', slug: 'social', paginaPai: 'social', caminho: '/social/', ancora: null, descricao: 'Iniciativas sociais e conteúdos da Pizzattolog.', ordem: 69, ativo: true },
    { id: 'entre-rotas', titulo: 'Entre Rotas', slug: 'entre-rotas', paginaPai: 'social', caminho: '/social/#entre-rotas', ancora: 'entre-rotas', descricao: 'Conteudo Entre Rotas.', ordem: 70, ativo: true },
    { id: 'rota-verde', titulo: 'Rota Verde', slug: 'rota-verde', paginaPai: 'social', caminho: '/social/#rota-verde', ancora: 'rota-verde', descricao: 'Conteudo Rota Verde.', ordem: 71, ativo: true },
    { id: 'rota-do-saber', titulo: 'Rota do Saber', slug: 'rota-do-saber', paginaPai: 'social', caminho: '/social/#rota-do-saber', ancora: 'rota-do-saber', descricao: 'Conteudo Rota do Saber.', ordem: 72, ativo: true },
    { id: 'rota-de-oportunidade', titulo: 'Rota de Oportunidade', slug: 'rota-de-oportunidade', paginaPai: 'social', caminho: '/social/#rota-de-oportunidade', ancora: 'rota-de-oportunidade', descricao: 'Conteudo Rota de Oportunidade.', ordem: 73, ativo: true },
    { id: 'contato', titulo: 'Contato', slug: 'contato', paginaPai: 'contato', caminho: '/contato/', ancora: null, descricao: 'Página de contato.', ordem: 70, ativo: true },
    { id: 'contatos', titulo: 'Contatos', slug: 'contatos', paginaPai: 'contatos', caminho: '/contatos/', ancora: null, descricao: 'Página de contatos.', ordem: 71, ativo: true },
  ],
};

function isSiteHomeData(data: unknown): data is SiteHomeData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const candidate = data as Partial<SiteHomeData>;
  return Boolean(candidate.nomeEmpresa && Array.isArray(candidate.menus));
}

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const url = `${apiBaseUrl}${path}`;

    console.log('[SITE API] Buscando:', url);

    const response = await fetch(url, {
      cache: 'no-store',
    });

    console.log(
      '[SITE API] Resposta:',
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      console.log('[SITE API] Usando fallback para:', path);
      return fallback;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('[SITE API] Erro ao buscar:', path, error);

    return fallback;
  }
}

async function fetchCrmJson<T>(
  path: string,
  fallback: T,
): Promise<T> {
  try {
    const url = `${crmApiBaseUrl}${path}`;

    console.log('[CRM API] Buscando:', url);

    const response = await fetch(url, {
      cache: 'no-store',
    });

    console.log(
      '[CRM API] Resposta:',
      response.status,
      response.statusText,
    );

    if (!response.ok) {
      console.log('[CRM API] Usando fallback para:', path);
      return fallback;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('[CRM API] Erro ao buscar:', path, error);

    return fallback;
  }
}

export async function getSiteHomeData(): Promise<SiteHomeData> {
  const data = await fetchJson<unknown>('/site', fallbackSiteData);

  if (!isSiteHomeData(data)) {
    return { ...fallbackSiteData, menus: menuPrincipal, subpaginas: mesclarRotas(fallbackSiteData.subpaginas) };
  }

  return {
    ...fallbackSiteData,
    ...data,
    hero: data.hero
      ? {
          ...data.hero,
          imagemUrl:
            data.hero.imagemUrl === undefined || data.hero.imagemUrl === null
              ? fallbackSiteData.hero.imagemUrl
              : data.hero.imagemUrl,
        }
      : fallbackSiteData.hero,
    menus: menuPrincipal,
    solucoes: data.solucoes?.length ? data.solucoes : fallbackSiteData.solucoes,
    rodape: data.rodape ?? fallbackSiteData.rodape,
    subpaginas: mesclarRotas(data.subpaginas?.length ? data.subpaginas : fallbackSiteData.subpaginas),
  };
}

export async function getPaginas(): Promise<Pagina[]> {
  return fetchJson<Pagina[]>('/paginas', []);
}

export async function getPaginaBySlug(slug: string): Promise<Pagina | null> {
  return fetchJson<Pagina | null>(`/paginas/${slug}`, null);
}

export async function getSubpaginas(): Promise<Subpagina[]> {
  const data = await fetchJson<Subpagina[]>('/subpaginas', fallbackSiteData.subpaginas);
  return mesclarRotas(data);
}

export async function getSubpaginasByPagina(paginaPai: string): Promise<Subpagina[]> {
  const fallback = mesclarRotas(fallbackSiteData.subpaginas).filter((item) => item.paginaPai === paginaPai);
  const data = await fetchJson<Subpagina[]>(`/subpaginas/pagina/${paginaPai}`, fallback);
  return mesclarRotas(data).filter((item) => item.paginaPai === paginaPai);
}

export async function getSubpaginaBySlug(slug: string): Promise<Subpagina | null> {
  const fallback = fallbackSiteData.subpaginas.find((item) => item.slug === slug) ?? null;
  return fetchJson<Subpagina | null>(`/subpaginas/${slug}`, fallback);
}

export async function getPaginaPublicadaSite<
  TConteudo = Record<string, unknown>,
>(
  slug: string,
): Promise<
  PaginaPublicadaSite<TConteudo> | null
> {
  const pagina =
    await fetchCrmJson<
      PaginaPublicadaSite<TConteudo> | null
    >(
      `/public/site/paginas/${slug}`,
      null,
    );

  if (!pagina) {
    return null;
  }

  return resolverAssetsCrm(
    pagina,
  );
}
