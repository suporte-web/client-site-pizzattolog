import type {
  ReactNode,
} from 'react';

import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import RecyclingRoundedIcon from '@mui/icons-material/RecyclingRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import type {
  Subpagina,
} from '@/types/site';

import type {
  QuemSomosConteudo,
} from '@/types/site-institucional';

interface ValoresSectionProps {
  subpagina?: Subpagina;

  valores?: QuemSomosConteudo['valores'];
}

type Pilar = {
  titulo: string;
  descricao?: string;
  icone: ReactNode;
  cor: string;
};

const iconesValores: ReactNode[] = [
  <FactCheckRoundedIcon
    key="fact"
  />,

  <HandshakeRoundedIcon
    key="handshake"
  />,

  <ShieldRoundedIcon
    key="shield"
  />,

  <VisibilityRoundedIcon
    key="visibility"
  />,

  <RecyclingRoundedIcon
    key="recycling"
  />,

  <ManageSearchRoundedIcon
    key="search"
  />,

  <BuildRoundedIcon
    key="build"
  />,

  <TrendingUpRoundedIcon
    key="trending"
  />,
];

const coresValores = [
  '#ffb71b',
  '#ff5805',
  '#f23f35',
];

const pilaresPadrao: Pilar[] = [
  {
    titulo:
      'Conformidade Legal',

    icone:
      <FactCheckRoundedIcon />,

    cor: '#ffb71b',
  },

  {
    titulo:
      'Foco no Cliente',

    icone:
      <HandshakeRoundedIcon />,

    cor: '#ff5805',
  },

  {
    titulo:
      'Cultura de Segurança',

    icone:
      <ShieldRoundedIcon />,

    cor: '#f23f35',
  },

  {
    titulo:
      'Transparência',

    icone:
      <VisibilityRoundedIcon />,

    cor: '#ffb71b',
  },

  {
    titulo:
      'Sustentabilidade',

    icone:
      <RecyclingRoundedIcon />,

    cor: '#ff5805',
  },

  {
    titulo:
      'Gestão de Riscos',

    icone:
      <ManageSearchRoundedIcon />,

    cor: '#ff5805',
  },

  {
    titulo:
      'Manutenção Preditiva',

    icone:
      <BuildRoundedIcon />,

    cor: '#ffb71b',
  },

  {
    titulo:
      'Melhoria contínua',

    icone:
      <TrendingUpRoundedIcon />,

    cor: '#f23f35',
  },
];

export function ValoresSection({
  subpagina,
  valores,
}: ValoresSectionProps) {
  /*
  |--------------------------------------------------------------------------
  | VALORES DO CRM
  |--------------------------------------------------------------------------
  */

  const valoresValidos =
    valores?.filter(
      (valor) =>
        valor.titulo?.trim() ||
        valor.descricao?.trim(),
    ) ?? [];

  /*
  |--------------------------------------------------------------------------
  | Se houver valores publicados pelo CRM, usamos eles.
  |
  | Caso contrário mantemos os cards antigos.
  |--------------------------------------------------------------------------
  */

  const pilares: Pilar[] =
    valoresValidos.length > 0
      ? valoresValidos.map(
          (valor, index) => ({
            titulo:
              valor.titulo?.trim() ||
              `Valor ${index + 1}`,

            descricao:
              valor.descricao?.trim() ||
              undefined,

            icone:
              iconesValores[
                index %
                  iconesValores.length
              ],

            cor:
              coresValores[
                index %
                  coresValores.length
              ],
          }),
        )
      : pilaresPadrao;

  const tamanhoDesktop =
    pilares.length <= 3
      ? 4
      : 3;

  return (
    <Box
      component="section"
      id={
        subpagina?.ancora ??
        'eficiencia'
      }
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        bgcolor: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Box
          id="valores"
          sx={{
            position: 'relative',
            top: {
              xs: -96,
              md: -110,
            },
          }}
        />

        <Stack
          spacing={{
            xs: 4,
            md: 5,
          }}
          sx={{
            alignItems:
              'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              maxWidth: 760,

              textAlign:
                'center',

              fontSize: {
                xs: '2.15rem',
                md: '3.15rem',
              },

              lineHeight: 1.15,

              color: '#4A4A4A',
            }}
          >
            Priorizamos a{' '}
            <Box
              component="span"
              sx={{
                color: 'inherit',
              }}
            >
              eficiência
            </Box>

            <br />

            em tudo o que fazemos
          </Typography>

          {/*
          |--------------------------------------------------------------------------
          | VÍDEO + TEXTO
          |--------------------------------------------------------------------------
          */}

          <Grid
            container
            spacing={{
              xs: 4,
              md: 6,
            }}
            sx={{
              width: '100%',

              maxWidth: 1320,

              mx: 'auto',

              alignItems:
                'center',
            }}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Box
                sx={{
                  position:
                    'relative',

                  width: '100%',

                  aspectRatio:
                    '16 / 9',

                  overflow:
                    'hidden',

                  borderRadius: 2,

                  border:
                    '1px solid',

                  borderColor:
                    'divider',

                  boxShadow:
                    '0 22px 58px rgba(23, 69, 107, 0.16)',

                  bgcolor: 'black',
                }}
              >
                <Box
                  component="iframe"
                  src="https://www.youtube-nocookie.com/embed/viVmCa-ssYY?rel=0&modestbranding=1"
                  title="Pizzattolog - Logística que conecta estratégia, operação e resultado"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  sx={{
                    position:
                      'absolute',

                    inset: 0,

                    width: '100%',

                    height: '100%',

                    border: 0,
                  }}
                />
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <Stack
                spacing={2.5}
                sx={{
                  maxWidth: 660,

                  textAlign: {
                    xs: 'center',
                    md: 'left',
                  },

                  mx: {
                    xs: 'auto',
                    md: 0,
                  },
                }}
              >
                <Typography
                  sx={{
                    color:
                      'text.primary',

                    fontSize: {
                      xs: 17,
                      md: 20,
                    },

                    lineHeight:
                      1.45,
                  }}
                >
                  Para a Pizzattolog,
                  a excelência
                  operacional é
                  inseparável da
                  segurança e da
                  responsabilidade
                  socioambiental. Nosso
                  padrão de qualidade é
                  fundamentado nos
                  rigorosos critérios do{' '}
                  <Box
                    component="strong"
                    sx={{
                      fontWeight: 900,
                    }}
                  >
                    SASSMAQ
                  </Box>
                  , que guiam cada etapa
                  de nossos processos.
                </Typography>

                <Typography
                  sx={{
                    color:
                      'text.primary',

                    fontSize: {
                      xs: 17,
                      md: 20,
                    },

                    lineHeight:
                      1.45,
                  }}
                >
                  Acreditamos que a
                  verdadeira eficiência
                  logística só acontece
                  quando há um
                  compromisso
                  inegociável com a
                  integridade da nossa
                  força de trabalho, a
                  proteção do meio
                  ambiente e a saúde de
                  toda a nossa cadeia de
                  valor.
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          {/*
          |--------------------------------------------------------------------------
          | CARDS
          |--------------------------------------------------------------------------
          */}

          <Paper
            elevation={0}
            sx={{
              width: '100%',

              maxWidth: 1320,

              p: {
                xs: 2.5,
                md: 4,
              },

              border:
                '1px solid',

              borderColor:
                'divider',

              borderRadius: 2,

              bgcolor:
                'background.default',

              boxShadow:
                '0 20px 55px rgba(23, 69, 107, 0.08)',
            }}
          >
            <Stack spacing={3}>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={1.25}
                sx={{
                  alignItems:
                    'center',

                  justifyContent: {
                    xs: 'center',
                    md: 'flex-start',
                  },

                  textAlign: {
                    xs: 'center',
                    md: 'left',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,

                    borderRadius: 2,

                    display: 'grid',

                    placeItems:
                      'center',

                    bgcolor:
                      'rgba(255, 88, 5, 0.12)',

                    color:
                      '#ff5805',

                    flexShrink: 0,
                  }}
                >
                  <TaskAltRoundedIcon />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 850,
                  }}
                >
                  Nossa operação é guiada
                  por pilares
                  inegociáveis
                </Typography>
              </Stack>

              <Grid
                container
                spacing={2}
              >
                {pilares.map(
                  (
                    pilar,
                    index,
                  ) => (
                    <Grid
                      key={`${pilar.titulo}-${index}`}
                      size={{
                        xs: 12,
                        sm: 6,
                        md:
                          tamanhoDesktop,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          height:
                            '100%',

                          minHeight:
                            pilar.descricao
                              ? 150
                              : 104,

                          p: {
                            xs: 2.25,
                            md: 2.75,
                          },

                          border:
                            '1px solid',

                          borderColor:
                            'divider',

                          borderRadius:
                            2,

                          bgcolor:
                            'white',

                          overflow:
                            'hidden',

                          position:
                            'relative',

                          transition:
                            'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',

                          '&:before': {
                            content:
                              '""',

                            position:
                              'absolute',

                            top: 0,
                            left: 0,
                            right: 0,

                            height: 4,

                            bgcolor:
                              pilar.cor,
                          },

                          '&:hover': {
                            transform: {
                              md: 'translateY(-2px)',
                            },

                            borderColor:
                              pilar.cor,

                            boxShadow:
                              '0 16px 36px rgba(23, 69, 107, 0.12)',
                          },
                        }}
                      >
                        <Stack
                          direction={{
                            xs: 'column',
                            lg: pilar.descricao
                              ? 'column'
                              : 'row',
                          }}
                          spacing={1.5}
                          sx={{
                            height:
                              '100%',

                            alignItems: {
                              xs: 'center',
                              lg: pilar.descricao
                                ? 'flex-start'
                                : 'center',
                            },

                            justifyContent:
                              'center',

                            textAlign: {
                              xs: 'center',
                              lg: pilar.descricao
                                ? 'left'
                                : 'left',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 42,

                              height: 42,

                              borderRadius:
                                2,

                              display:
                                'grid',

                              placeItems:
                                'center',

                              color:
                                pilar.cor,

                              bgcolor: `${pilar.cor}18`,

                              flexShrink: 0,
                            }}
                          >
                            {
                              pilar.icone
                            }
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                fontWeight:
                                  850,

                                lineHeight:
                                  1.2,
                              }}
                            >
                              {
                                pilar.titulo
                              }
                            </Typography>

                            {pilar.descricao ? (
                              <Typography
                                sx={{
                                  mt: 1,

                                  color:
                                    'text.secondary',

                                  fontSize:
                                    14,

                                  lineHeight:
                                    1.6,
                                }}
                              >
                                {
                                  pilar.descricao
                                }
                              </Typography>
                            ) : null}
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  ),
                )}
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
