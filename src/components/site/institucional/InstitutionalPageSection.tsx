import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { notFound } from 'next/navigation';

import {
  AgregadosSection,
  CarreirasSection,
  ConteudoPagina,
  QuemSomosSections,
  Solucoes,
} from '@/components/site';

import {
  getPaginaBySlug,
  getPaginaPublicadaSite,
  getSiteHomeData,
  getSubpaginasByPagina,
} from '@/services/site.service';

import { normalizeSitePath } from '@/utils/routes';
import {
  getContentString,
} from '@/utils/site-content';

interface InstitutionalPageSectionProps {
  slug: string;
}

export default async function InstitutionalPageSection({
  slug,
}: InstitutionalPageSectionProps) {
  const isQuemSomos = slug === 'quem-somos';
  const isSolucoes = slug === 'solucoes';
  const isCarreiras = slug === 'carreiras';
  const isAgregados = slug === 'agregados';

  /*
  |--------------------------------------------------------------------------
  | CARREGAMENTO DOS DADOS
  |--------------------------------------------------------------------------
  |
  | As páginas antigas continuam usando a estrutura existente como fallback.
  |
  | Quando existir conteúdo publicado no CRM para o slug, ele é aplicado.
  |
  */

  const [
    site,
    pagina,
    subpaginas,
    paginaPublicada,
  ] = await Promise.all([
    getSiteHomeData(),

    getPaginaBySlug(slug),

    getSubpaginasByPagina(slug),

    getPaginaPublicadaSite<Record<string, unknown>>(slug),
  ]);

  const conteudoPublicado =
    paginaPublicada?.conteudo ?? null;

  const subpaginaPrincipal =
    subpaginas.find(
      (item) => item.slug === slug,
    ) ?? null;

  if (
    !pagina &&
    !subpaginaPrincipal &&
    !subpaginas.length
  ) {
    notFound();
  }

  const titulo =
    pagina?.titulo ??
    subpaginaPrincipal?.titulo ??
    slug;

  const resumo =
    pagina?.resumo ??
    subpaginaPrincipal?.descricao ??
    'Conteúdo institucional carregado pelas rotas do site.';

  const secoes = subpaginas.filter(
    (item) =>
      item.slug !== slug ||
      item.ancora,
  );

  const tituloHero = getContentString(
    conteudoPublicado,
    'hero.titulo',
    isCarreiras
      ? 'Carreiras'
      : titulo,
  );

  const resumoHero = getContentString(
    conteudoPublicado,
    'hero.descricao',
    isCarreiras
      ? 'Construa sua carreira em uma empresa que valoriza pessoas, desenvolvimento e a realidade da logística.'
      : resumo,
  );

  const imagemHero = getContentString(
    conteudoPublicado,
    isSolucoes ? 'cabecalho.imagemUrl' : 'hero.imagemUrl',
    isSolucoes
      ? '/images/solucoes/solucoes-banner.png'
      : '/images/carreira/carreiras-banner.png',
  );


  return (
    <Box component="main">
      {/*
      |--------------------------------------------------------------------------
      | BANNER DAS DEMAIS PÁGINAS
      |--------------------------------------------------------------------------
      |
      | Quem Somos possui o próprio banner dentro de HistoriaSection.
      |
      */}

      {!isAgregados && !isQuemSomos ? (
        <Box
          component="section"
          sx={{
            pt: {
              xs: 14,
              md: 16,
            },

            pb: {
              xs: 7,
              md: 9,
            },

            minHeight:
              isSolucoes ||
                isCarreiras
                ? {
                  xs: 260,
                  md: 420,
                }
                : undefined,

            color: 'white',

            bgcolor: 'primary.dark',

            background: isSolucoes
              ? `linear-gradient(90deg, rgba(9,43,67,0.82) 0%, rgba(9,43,67,0.58) 46%, rgba(255,88,5,0.22) 100%), url("${imagemHero}")`
              : isCarreiras
                ? `linear-gradient(
                                        90deg,
                                        rgba(9,43,67,0.52) 0%,
                                        rgba(9,43,67,0.22) 52%,
                                        rgba(255,88,5,0.08) 100%
                                      ),
                                      url("${imagemHero}")`
                : 'linear-gradient(120deg, rgba(9,43,67,1)F 0%, rgba(23,69,107,0.96) 58%, rgba(46,125,97,0.92) 100%)',

            backgroundSize: 'cover',

            backgroundPosition:
              isSolucoes
                ? 'center top'
                : 'center',
          }}
        >
          <Container maxWidth="xl">
            {!isSolucoes &&
              !isCarreiras ? (
              <Stack
                spacing={2.5}
                sx={{
                  maxWidth: 860,
                }}
              >
                <Chip
                  label={`/${slug}/`}
                  sx={{
                    width: 'fit-content',

                    color: 'white',

                    bgcolor:
                      'rgba(255,255,255,0.14)',

                    border:
                      '1px solid rgba(255,255,255,0.18)',
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: '2.6rem',
                      md: '4.4rem',
                    },

                    lineHeight: 1.04,
                  }}
                >
                  {tituloHero}
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 760,

                    color:
                      'rgba(255,255,255,0.78)',

                    fontSize: 19,

                    lineHeight: 1.7,
                  }}
                >
                  {resumoHero}
                </Typography>
              </Stack>
            ) : null}
          </Container>
        </Box>
      ) : null}

      {/*
      |--------------------------------------------------------------------------
      | CONTEÚDO ANTIGO DE PÁGINAS
      |--------------------------------------------------------------------------
      */}

      {pagina?.conteudo &&
        !isCarreiras &&
        !isAgregados &&
        !isQuemSomos ? (
        <Box
          component="section"
          sx={{
            py: {
              xs: 7,
              md: 9,
            },

            bgcolor: 'white',
          }}
        >
          <Container maxWidth="lg">
            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },

                border: '1px solid',

                borderColor:
                  'divider',
              }}
            >
              <ConteudoPagina
                conteudo={
                  pagina.conteudo
                }
              />
            </Paper>
          </Container>
        </Box>
      ) : null}

      {/*
      |--------------------------------------------------------------------------
      | SOLUÇÕES
      |--------------------------------------------------------------------------
      */}

      {isSolucoes ? (
        <Solucoes
          solucoes={site.solucoes}
          conteudo={conteudoPublicado}
          mostrarBanner={false}
          mostrarComplementos={false}
        />
      ) : null}

      {/*
      |--------------------------------------------------------------------------
      | QUEM SOMOS
      |--------------------------------------------------------------------------
      |
      | Aqui entra o conteúdo publicado pelo CRM.
      |
      */}

      {isQuemSomos ? (
        <QuemSomosSections
          subpaginas={subpaginas}
          conteudo={
            conteudoPublicado
          }
        />
      ) : null}

      {/*
      |--------------------------------------------------------------------------
      | CARREIRAS
      |--------------------------------------------------------------------------
      */}

      {isCarreiras ? (
        <CarreirasSection
          conteudo={conteudoPublicado}
        />
      ) : null}

      {/*
      |--------------------------------------------------------------------------
      | AGREGADOS
      |--------------------------------------------------------------------------
      */}

      {isAgregados ? (
        <AgregadosSection
          conteudo={conteudoPublicado}
        />
      ) : null}

      {/*
      |--------------------------------------------------------------------------
      | OUTRAS SEÇÕES
      |--------------------------------------------------------------------------
      */}

      {secoes.length &&
        !isSolucoes &&
        !isQuemSomos &&
        !isCarreiras &&
        !isAgregados ? (
        <Box
          component="section"
          sx={{
            py: {
              xs: 7,
              md: 10,
            },

            bgcolor:
              'background.default',
          }}
        >
          <Container maxWidth="xl">
            <Grid
              container
              spacing={3}
            >
              {secoes.map(
                (subpagina) => (
                  <Grid
                    key={
                      subpagina.id
                    }
                    id={
                      subpagina.ancora ??
                      subpagina.slug
                    }
                    size={{
                      xs: 12,
                      md: 6,
                      lg: 4,
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: {
                          xs: 3,
                          md: 4,
                        },

                        height:
                          '100%',

                        border:
                          '1px solid',

                        borderColor:
                          'divider',
                      }}
                    >
                      <Stack
                        spacing={2}
                      >
                        <Chip
                          label={
                            subpagina.paginaPai
                          }
                          size="small"
                          sx={{
                            width:
                              'fit-content',
                          }}
                        />

                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight:
                              850,
                          }}
                        >
                          {
                            subpagina.titulo
                          }
                        </Typography>

                        <Typography
                          sx={{
                            color:
                              'text.secondary',

                            lineHeight:
                              1.75,
                          }}
                        >
                          {subpagina.descricao ??
                            'Seção cadastrada no módulo de subpáginas do backend.'}
                        </Typography>

                        <Divider />

                        <Button
                          href={normalizeSitePath(
                            subpagina.caminho,
                          )}
                          sx={{
                            alignSelf:
                              'flex-start',

                            px: 0,
                          }}
                        >
                          Abrir rota
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ),
              )}
            </Grid>
          </Container>
        </Box>
      ) : null}

    </Box>
  );
}
