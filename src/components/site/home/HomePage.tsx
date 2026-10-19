import { Box } from '@mui/material';

import { Hero } from '@/components/site/hero';
import { HomeSolucoes } from './HomeSolucoes';
import { HomeBlogPreview } from './HomeBlogPreview';

import {
  getPaginaPublicadaSite,
  getSiteHomeData,
} from '@/services/site.service';

import type {
  HeroPaginaInicial,
  SiteHomeData,
  Solucao,
} from '@/types/site';

type SolucaoHomeCrm = Partial<Solucao> & {
  imagemUrl?: string | null;
};

type HomeConteudoCrm = {
  hero?: Partial<HeroPaginaInicial>;
  solucoes?: SolucaoHomeCrm[];
};

function aplicarConteudoHome(
  site: SiteHomeData,
  conteudo?: HomeConteudoCrm | null,
): SiteHomeData {
  if (!conteudo) {
    return site;
  }

  return {
    ...site,

    hero: {
      ...site.hero,
      ...conteudo.hero,
    },

    solucoes: site.solucoes.map(
      (solucao, index) => ({
        ...solucao,
        ...conteudo.solucoes?.[index],

        // Mantém os dados estruturais originais.
        id: solucao.id,
        slug: solucao.slug,
        icone: solucao.icone,
        ordem: solucao.ordem,
        ativo: solucao.ativo,
      }),
    ),
  };
}

export default async function HomePage() {
  const [siteFallback, paginaPublicada] =
    await Promise.all([
      getSiteHomeData(),
      getPaginaPublicadaSite<HomeConteudoCrm>('home'),
    ]);

  const site = aplicarConteudoHome(
    siteFallback,
    paginaPublicada?.conteudo ?? null,
  );

  return (
    <Box component="main">
      <Hero hero={site.hero} />

      <HomeSolucoes
        solucoes={site.solucoes}
      />

      <HomeBlogPreview />
    </Box>
  );
}
