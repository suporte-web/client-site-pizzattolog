'use client';

import type {
  Subpagina,
} from '@/types/site';

import type {
  QuemSomosConteudo,
} from '@/types/site-institucional';

import {
  CertificacoesSection,
} from './certificacoes';

import {
  HistoriaSection,
} from './historia/HistoriaSection';

import {
  MissaoSection,
} from './missao/MissaoSection';

import {
  NossasUnidadesSection,
} from './nossas-unidades/NossasUnidadesSection';

import {
  ValoresSection,
} from './valores/ValoresSection';

interface QuemSomosSectionsProps {
  subpaginas: Subpagina[];

  conteudo?: QuemSomosConteudo | null;
}

function getSubpagina(
  subpaginas: Subpagina[],
  slug: string,
) {
  return subpaginas.find(
    (subpagina) =>
      subpagina.slug === slug ||
      subpagina.ancora === slug,
  );
}

export function QuemSomosSections({
  subpaginas,
  conteudo,
}: QuemSomosSectionsProps) {
  return (
    <>
      <HistoriaSection
        subpagina={getSubpagina(
          subpaginas,
          'historia',
        )}
        banner={conteudo?.banner}
        historia={conteudo?.historia}
      />

      <MissaoSection
        missao={getSubpagina(
          subpaginas,
          'missao',
        )}
        visao={getSubpagina(
          subpaginas,
          'visao',
        )}
        conteudoMissao={
          conteudo?.missao
        }
        conteudoVisao={
          conteudo?.visao
        }
        valores={conteudo?.valores}
        valoresResumo={
          conteudo?.valoresResumo
        }
      />

      <ValoresSection
        subpagina={
          getSubpagina(
            subpaginas,
            'eficiencia',
          ) ??
          getSubpagina(
            subpaginas,
            'valores',
          )
        }
        valores={conteudo?.valores}
      />

      {/*
        Certificações continua fixa por enquanto.
      */}

      <CertificacoesSection
        subpagina={getSubpagina(
          subpaginas,
          'certificacoes',
        )}
        certificacoes={
          conteudo?.certificacoes
        }
      />

      <NossasUnidadesSection
        subpagina={
          getSubpagina(
            subpaginas,
            'unidades',
          ) ??
          getSubpagina(
            subpaginas,
            'nossas-unidades',
          )
        }
        titulo={
          conteudo?.unidades?.titulo ||
          undefined
        }
        descricao={
          conteudo?.unidades?.texto ||
          undefined
        }
        unidadesEditaveis={
          conteudo?.unidades?.itens
        }
      />
    </>
  );
}
