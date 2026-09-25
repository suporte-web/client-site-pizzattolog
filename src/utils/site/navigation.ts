import type { ItemMenu, SiteHomeData, Subpagina } from '@/types/site';

function itemMenu(
  id: string,
  titulo: string,
  slug: string,
  url: string,
  ordem: number,
  filhos?: ItemMenu[],
): ItemMenu {
  return {
    id,
    titulo,
    slug,
    url,
    ordem,
    ativo: true,
    ...(filhos?.length ? { filhos } : {}),
  };
}

export function buildMenuPrincipal(): SiteHomeData['menus'] {
  return [
    {
      id: 'quem-somos',
      titulo: 'Quem somos',
      slug: 'quem-somos',
      url: '/quem-somos',
      ordem: 1,
      ativo: true,
      itens: [
        itemMenu(
          'a-pizzattolog',
          'A Pizzattolog',
          'a-pizzattolog',
          '/quem-somos',
          1,
        ),
        itemMenu('eficiencia', 'Eficiência', 'eficiencia', '/quem-somos#eficiencia', 2),
        itemMenu('unidades', 'Unidades', 'unidades', '/quem-somos#unidades', 3),
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
        itemMenu(
          'transporte-de-cargas',
          'Transporte de Cargas',
          'transporte-de-cargas',
          '/solucoes#transporte-de-cargas',
          1,
          [
            itemMenu('lotacao-ftl', 'Lotação (FTL)', 'lotacao-ftl', '/solucoes#lotacao-ftl', 1),
            itemMenu('fracionada-ltl', 'Fracionada (LTL)', 'fracionada-ltl', '/solucoes#fracionada-ltl', 2),
          ],
        ),
        itemMenu(
          'armazenagem',
          'Armazenagem',
          'armazenagem',
          '/solucoes#armazenagem',
          2,
          [
            itemMenu('inbound-outbound', 'Inbound e Outbound', 'inbound-outbound', '/solucoes#inbound-outbound', 1),
            itemMenu('cross-docking', 'Cross-docking', 'cross-docking', '/solucoes#cross-docking', 2),
            itemMenu('just-in-time', 'Just-in-Time', 'just-in-time', '/solucoes#just-in-time', 3),
          ],
        ),
        itemMenu(
          'operador-logistico',
          'Operador Logístico',
          'operador-logistico',
          '/solucoes#operador-logistico',
          3,
          [
            itemMenu('inteligencia-gestao', 'Inteligência e Gestão', 'inteligencia-gestao', '/solucoes#inteligencia-gestao', 1),
            itemMenu('preparacao-manutencao', 'Preparação e Manutenção', 'preparacao-manutencao', '/solucoes#preparacao-manutencao', 2),
            itemMenu('suporte-producao', 'Suporte à Produção', 'suporte-producao', '/solucoes#suporte-producao', 3),
          ],
        ),
      ],
    },
    {
      id: 'carreiras',
      titulo: 'Carreiras',
      slug: 'carreiras',
      url: '/carreiras',
      ordem: 3,
      ativo: true,
      itens: [],
    },
    {
      id: 'agregados',
      titulo: 'Agregados',
      slug: 'agregados',
      url: '/agregados',
      ordem: 4,
      ativo: true,
      itens: [],
    },
    {
      id: 'esg',
      titulo: 'ESG',
      slug: 'esg',
      url: '/esg',
      ordem: 5,
      ativo: true,
      itens: [
        itemMenu('ambiental', 'Ambiental', 'ambiental', '/esg#ambiental', 1),
        itemMenu('social-esg', 'Social', 'social', '/esg#social', 2),
        itemMenu('governanca', 'Governança', 'governanca', '/esg#governanca', 3),
      ],
    },
    {
      id: 'seminovos',
      titulo: 'Seminovos',
      slug: 'seminovos',
      url: '/seminovos',
      ordem: 6,
      ativo: true,
      itens: [],
    },
    {
      id: 'contato',
      titulo: 'Contato',
      slug: 'contatos',
      url: '/contatos',
      ordem: 8,
      ativo: true,
      itens: [],
    },
  ].sort((a, b) => a.ordem - b.ordem);
}

function normalizarCaminhoMenu(url: string | null | undefined, slug: string) {
  const valor = url?.trim() || `/${slug}`;

  if (!valor.startsWith('/')) {
    return null;
  }

  const [caminhoBruto, ancora] = valor.split('#');
  const caminho = caminhoBruto.endsWith('/') ? caminhoBruto : `${caminhoBruto}/`;
  const paginaPai = caminho.replace(/^\/|\/$/g, '').split('/')[0] || slug;

  return {
    caminho: ancora ? `${caminho}#${ancora}` : caminho,
    paginaPai,
    ancora: ancora || null,
  };
}

function rotasDosItensMenu(itens: ItemMenu[], baseOrdem: number): Subpagina[] {
  return itens.flatMap((item, index) => {
    const rota = normalizarCaminhoMenu(item.url, item.slug);
    const filhos = item.filhos ?? [];
    const atuais = rota
      ? [
          {
            id: `menu-${item.id}`,
            titulo: item.titulo,
            slug: item.slug,
            paginaPai: rota.paginaPai,
            caminho: rota.caminho,
            ancora: rota.ancora,
            descricao: `Rota do menu: ${item.titulo}.`,
            ordem: baseOrdem + index,
            ativo: item.ativo,
          },
        ]
      : [];

    return [...atuais, ...rotasDosItensMenu(filhos, baseOrdem + (index + 1) * 100)];
  });
}

export function buildRotasMenuPrincipal(menus = buildMenuPrincipal()): Subpagina[] {
  return menus.flatMap((menu, index) => {
    const rota = normalizarCaminhoMenu(menu.url, menu.slug);
    const atuais = rota
      ? [
          {
            id: `menu-${menu.id}`,
            titulo: menu.titulo,
            slug: menu.slug,
            paginaPai: rota.paginaPai,
            caminho: rota.caminho,
            ancora: rota.ancora,
            descricao: `Rota principal do menu: ${menu.titulo}.`,
            ordem: (index + 1) * 1000,
            ativo: menu.ativo,
          },
        ]
      : [];

    return [...atuais, ...rotasDosItensMenu(menu.itens, (index + 1) * 1000 + 1)];
  });
}
