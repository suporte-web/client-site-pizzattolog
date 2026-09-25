import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import type {
  Subpagina,
} from '@/types/site';

import type {
  QuemSomosConteudo,
} from '@/types/site-institucional';

import {
  SectionLabel,
} from '@/components/site/section-label';

interface HistoriaSectionProps {
  subpagina?: Subpagina;

  banner?: QuemSomosConteudo['banner'];

  historia?: QuemSomosConteudo['historia'];
}

export function HistoriaSection({
  subpagina,
  banner,
  historia,
}: HistoriaSectionProps) {
  /*
  |--------------------------------------------------------------------------
  | FALLBACK DAS IMAGENS
  |--------------------------------------------------------------------------
  |
  | Se Marketing não cadastrar uma nova imagem,
  | o site continua utilizando as imagens atuais.
  |
  */

  const bannerImagem =
    banner?.imagemUrl?.trim() ||
    '/images/quem somos/quem-somos-banner.png';

  const historiaImagem =
    historia?.imagemUrl?.trim() ||
    '/images/quem somos/historia-equipe.png';

  const bannerTitulo =
    banner?.titulo?.trim();

  const bannerSubtitulo =
    banner?.subtitulo?.trim();

  const historiaTitulo =
    historia?.titulo?.trim() ||
    'Sobre nós';

  const historiaTexto =
    historia?.texto?.trim();

  const temTextoBanner =
    Boolean(
      bannerTitulo ||
        bannerSubtitulo,
    );

  return (
    <Box
      component="section"
      id={
        subpagina?.ancora ??
        'historia'
      }
      sx={{
        bgcolor: 'white',

        overflow: 'hidden',
      }}
    >
      {/*
      |--------------------------------------------------------------------------
      | BANNER
      |--------------------------------------------------------------------------
      */}

      <Box
        sx={{
          position: 'relative',

          width: '100%',

          height: {
            xs: 300,
            sm: 360,
            md: 420,
            lg: 460,
          },

          display: 'flex',

          alignItems: 'flex-end',

          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(9, 43, 67, 0.70) 0%,
              rgba(9, 43, 67, 0.30) 48%,
              rgba(255, 88, 5, 0.08) 100%
            ),
            url("${bannerImagem}")
          `,

          backgroundSize:
            'cover',

          backgroundPosition:
            'center',

          backgroundRepeat:
            'no-repeat',
        }}
      >
        {temTextoBanner ? (
          <Container
            maxWidth="xl"
            sx={{
              pb: {
                xs: 4,
                md: 6,
              },
            }}
          >
            <Stack
              spacing={1.5}
              sx={{
                maxWidth: 760,
              }}
            >
              {bannerTitulo ? (
                <Typography
                  component="h1"
                  sx={{
                    color: 'white',

                    fontSize: {
                      xs: '2.4rem',
                      md: '4rem',
                    },

                    fontWeight: 900,

                    lineHeight: 1.05,
                  }}
                >
                  {bannerTitulo}
                </Typography>
              ) : null}

              {bannerSubtitulo ? (
                <Typography
                  sx={{
                    maxWidth: 700,

                    color:
                      'rgba(255,255,255,0.86)',

                    fontSize: {
                      xs: 16,
                      md: 20,
                    },

                    lineHeight: 1.6,
                  }}
                >
                  {bannerSubtitulo}
                </Typography>
              ) : null}
            </Stack>
          </Container>
        ) : null}
      </Box>

      {/*
      |--------------------------------------------------------------------------
      | HISTÓRIA
      |--------------------------------------------------------------------------
      */}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 6,
            md: 8,
          },
        }}
      >
        <Grid
          container
          spacing={{
            xs: 6,
            md: 10,
          }}
          sx={{
            alignItems: 'center',
          }}
        >
          {/*
          |--------------------------------------------------------------------------
          | IMAGEM
          |--------------------------------------------------------------------------
          */}

          <Grid
            size={{
              xs: 12,
              md: 5,
            }}
          >
            <Box
              sx={{
                position: 'relative',

                ml: {
                  xs: 0,
                  md: 4,
                },
              }}
            >
              <Box
                component="img"
                src={historiaImagem}
                alt={
                  historiaTitulo
                }
                sx={{
                  position:
                    'relative',

                  zIndex: 1,

                  display:
                    'block',

                  width: '100%',

                  height: {
                    xs: 380,
                    sm: 480,
                    md: 520,
                  },

                  objectFit:
                    'cover',

                  objectPosition:
                    'center',

                  borderBottomRightRadius:
                    {
                      xs: 35,
                      md: 55,
                    },

                  boxShadow:
                    '0 24px 70px rgba(23, 69, 107, 0.16)',
                }}
              />
            </Box>
          </Grid>

          {/*
          |--------------------------------------------------------------------------
          | TEXTO
          |--------------------------------------------------------------------------
          */}

          <Grid
            size={{
              xs: 12,
              md: 7,
            }}
          >
            <Stack
              spacing={3}
              sx={{
                maxWidth: 720,

                mx: {
                  xs: 0,
                  md: 'auto',
                },
              }}
            >
              <SectionLabel>
                Quem somos
              </SectionLabel>

              <Typography
                component="h2"
                variant="h2"
                sx={{
                  color:
                    'text.primary',

                  fontSize: {
                    xs: '2.1rem',
                    md: '3rem',
                  },
                }}
              >
                {historiaTitulo}
              </Typography>

              {historiaTexto ? (
                <Typography
                  component="p"
                  sx={{
                    color:
                      'text.primary',

                    fontSize: {
                      xs: '1.05rem',
                      sm: '1.15rem',
                      md: '1.3rem',
                    },

                    lineHeight: 1.55,

                    whiteSpace:
                      'pre-line',
                  }}
                >
                  {historiaTexto}
                </Typography>
              ) : (
                <>
                  <Typography
                    component="p"
                    sx={{
                      color:
                        'text.primary',

                      fontSize: {
                        xs: '1.05rem',
                        sm: '1.15rem',
                        md: '1.3rem',
                      },

                      lineHeight: 1.45,
                    }}
                  >
                    Na Pizzattolog,
                    reunimos a solidez de{' '}
                    <Box
                      component="strong"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      mais de 50 anos de
                      história
                    </Box>{' '}
                    com uma visão clara de
                    futuro. Somos uma
                    seleção de
                    profissionais da
                    logística, movidos
                    pelo compromisso com
                    a excelência, pela
                    responsabilidade em
                    cada decisão e pela
                    busca constante por{' '}
                    <Box
                      component="strong"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      evoluir pessoas,
                      processos e
                      tecnologias.
                    </Box>
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      color:
                        'text.primary',

                      fontSize: {
                        xs: '1.05rem',
                        sm: '1.15rem',
                        md: '1.3rem',
                      },

                      lineHeight: 1.45,
                    }}
                  >
                    Entregamos{' '}
                    <Box
                      component="strong"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      soluções logísticas
                      completas e
                      integradas
                    </Box>{' '}
                    em todas as etapas da
                    cadeia de
                    suprimentos, atuando
                    de ponta a ponta para{' '}
                    <Box
                      component="strong"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      simplificar
                      operações complexas
                    </Box>
                    , gerar
                    previsibilidade e
                    garantir eficiência
                    operacional real.
                  </Typography>

                  <Typography
                    component="p"
                    sx={{
                      color:
                        'text.primary',

                      fontSize: {
                        xs: '1.05rem',
                        sm: '1.15rem',
                        md: '1.3rem',
                      },

                      lineHeight: 1.45,
                    }}
                  >
                    Com{' '}
                    <Box
                      component="strong"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      unidades
                      estrategicamente
                      localizadas
                    </Box>{' '}
                    e ampla atuação,
                    desenvolvemos{' '}
                    <Box
                      component="strong"
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      soluções sob medida
                    </Box>{' '}
                    para transportes de
                    carga e operações
                    logísticas de alta
                    complexidade.
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}