'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { SectionLabel } from '@/components/site/section-label';
import {
  getContentString,
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';

const historias = [
  {
    nome: 'David Mendes',
    cargo: 'Supervisor de Registro',
    texto: 'A Pizzattolog é uma empresa que valoriza as pessoas e oferece oportunidades reais de crescimento.',
    imagem: '/images/carreira/carreira-david.png',
  },
  {
    nome: 'Rodrigo Aliaga',
    cargo: 'Assistente de Retropátio',
    texto: 'O que mais gosto de trabalhar na Pizzattolog é a união da equipe e o bom ambiente de trabalho, onde todos se ajudam.',
    imagem: '/images/carreira/carreira-rodrigo.png',
  },
  {
    nome: 'Rafael do Amaral',
    cargo: 'Analista de CCO',
    texto: 'A Pizzattolog é uma empresa que valoriza as pessoas e oferece oportunidades de desenvolvimento. Aqui consegui evoluir profissionalmente, construir minha vida e cuidar da minha família.',
    imagem: '/images/carreira/carreira-rafael.png',
  },
  {
    nome: 'Isabella Costa',
    cargo: 'Assistente de Marketing',
    texto: 'Comecei minha trajetória na Pizzattolog como Jovem Aprendiz, onde tive a oportunidade de crescer e desenvolver minhas habilidades profissionais. Com dedicação e muito aprendizado ao longo do caminho, conquistei novas oportunidades dentro da empresa.',
    imagem: '/images/carreira/carreira-isabella.png',
  },
  {
    nome: 'Renata Zachi',
    cargo: 'Motorista',
    texto: 'É uma alegria poder participar e fazer parte de uma empresa que me recebeu desde o começo com muita alegria, com muito carinho. Todas as pessoas, desde o início, me receberam bem e me ensinaram tudo o que sabem.',
    imagem: '/images/carreira/carreira-renata.png',
  },
];

const programas = [
  {
    titulo: 'Rota de Oportunidade',
    texto:
      'Na Pizzattolog, acreditamos que quem move nossas operações também merece reconhecimento. Por isso, criamos o Rota de Oportunidade, um programa de incentivo desenvolvido para valorizar o desempenho e o comprometimento dos nossos motoristas.',
    imagem: '/images/carreira/rotadeoportunidade.png',
    alt: 'Programa Rota de Oportunidade',
    icone: <RouteRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    titulo: 'Café com RH',
    texto:
      'Um espaço aberto de diálogo, troca e conexão. O Café com RH aproxima colaboradores e liderança, promove conversas construtivas e fortalece nossa cultura organizacional. É onde ouvimos, orientamos e desenvolvemos juntos.',
    imagem: '/images/carreira/cafecomrh.png',
    alt: 'Programa Café com RH',
    icone: <CoffeeRoundedIcon />,
    cor: '#ff5805',
  },
  {
    titulo: 'Rota do Saber',
    texto:
      'Nosso programa de desenvolvimento contínuo. Através de treinamentos, encontros estratégicos e capacitações práticas, promovemos o aprimoramento técnico e comportamental dos colaboradores. Aqui, aprender faz parte da rotina e evoluir é compromisso.',
    imagem: '/images/carreira/rotadosaber.png',
    alt: 'Programa Rota do Saber',
    icone: <SchoolRoundedIcon />,
    cor: '#f23f35',
  },
];

const destaquesCarreira = [
  { texto: 'Respeito mútuo', icone: <HandshakeRoundedIcon />, cor: '#ffb71b' },
  { texto: 'Crescimento real', icone: <TrendingUpRoundedIcon />, cor: '#ff5805' },
  { texto: 'Time colaborativo', icone: <GroupsRoundedIcon />, cor: '#f23f35' },
];

interface CarreirasSectionProps {
  conteudo?: SiteContent;
}

export function CarreirasSection({
  conteudo,
}: CarreirasSectionProps) {
  const heroEtiqueta = getContentString(
    conteudo,
    'hero.etiqueta',
    'Sua Carreira Pizzattolog',
  );
  const heroTitulo = getContentString(
    conteudo,
    'hero.titulo',
    'Cresça com quem move a logística todos os dias.',
  );
  const heroDescricao = getContentString(
    conteudo,
    'hero.descricao',
    'Ambiente de respeito, desenvolvimento e oportunidades práticas.',
  );



  const ctaTitulo = getContentString(
    conteudo,
    'cta.titulo',
    'Quer trabalhar na Pizzattolog?',
  );

  const ctaDescricao = getContentString(
    conteudo,
    'cta.descricao',
    'Se você busca crescimento profissional, desenvolvimento contínuo e quer fazer parte de uma equipe que valoriza pessoas, essa é a sua oportunidade.',
  );

  const ctaBotaoTexto = getContentString(
    conteudo,
    'cta.botaoTexto',
    'Confira nossas vagas',
  );

  const destaquesEditaveis =
    mergeTextItems(destaquesCarreira, conteudo, 'destaques', [
      'texto',
    ]);
  const historiasEditaveis =
    mergeTextItems(historias, conteudo, 'historias', [
      'nome',
      'cargo',
      'texto',
    ]);
  const programasEditaveis =
    mergeTextItems(programas, conteudo, 'programas', [
      'titulo',
      'texto',
      'imagem',
    ]);
  const historiasAnimadas = [
    ...historiasEditaveis,
    ...historiasEditaveis,
  ];

  return (

    <>
      <Box
        component="section"
        sx={{
          py: {
            xs: 5,
            md: 6,
          },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={{
              xs: 4,
              md: 6,
            }}
            sx={{
              alignItems: 'center',
            }}
          >
            {/* =====================================================
          LADO ESQUERDO
         ===================================================== */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                spacing={2}
                sx={{
                  maxWidth: 480,

                  pl: {
                    xs: 0,
                    md: 4,
                    lg: 6,
                  },

                  pr: {
                    xs: 0,
                    md: 1,
                  },
                }}
              >
                <SectionLabel>
                  {heroEtiqueta}
                </SectionLabel>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: '2.1rem',
                      md: '2.75rem',
                    },
                    lineHeight: 1.06,
                    fontWeight: 900,
                    maxWidth: 430,
                  }}
                >
                  {heroTitulo}
                </Typography>

                {/* CHIPS */}
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: 'wrap',
                    gap: 1,
                    pt: 0.5,
                  }}
                >
                  {destaquesEditaveis.map((destaque) => (
                    <Box
                      key={destaque.texto}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,

                        px: 1.4,
                        py: 0.8,

                        borderRadius: 999,

                        bgcolor: 'white',

                        border:
                          '1px solid rgba(15, 23, 42, 0.06)',

                        boxShadow:
                          '0 8px 20px rgba(19, 39, 57, 0.05)',

                        fontSize: 14,
                        fontWeight: 850,

                        '& svg': {
                          color: destaque.cor,
                          fontSize: 18,
                        },
                      }}
                    >
                      {destaque.icone}
                      {destaque.texto}
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* =====================================================
          LADO DIREITO
         ===================================================== */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',

                  maxWidth: 850,

                  ml: {
                    xs: 0,
                    md: 'auto',
                  },

                  p: {
                    xs: 2.5,
                    md: 3,
                  },

                  borderRadius: 3,

                  bgcolor: 'white',

                  border:
                    '1px solid rgba(255, 88, 5, 0.18)',

                  boxShadow:
                    '0 16px 38px rgba(19, 39, 57, 0.08)',

                  overflow: 'hidden',

                  '&::before': {
                    content: '""',

                    position: 'absolute',

                    top: 0,
                    left: 0,
                    right: 0,

                    height: 5,

                    bgcolor: '#ff5805',
                  },
                }}
              >
                <Stack spacing={2.25}>

                  {/* ===============================================
                DESTAQUE AZUL
               =============================================== */}
                  <Box
                    sx={{
                      bgcolor: 'primary.dark',

                      color: 'white',

                      borderRadius: 2.5,

                      px: {
                        xs: 2,
                        md: 2.5,
                      },

                      py: {
                        xs: 1.8,
                        md: 2,
                      },
                    }}
                  >
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'row',
                      }}
                      spacing={2}
                      sx={{
                        alignItems: {
                          xs: 'flex-start',
                          sm: 'center',
                        },
                      }}
                    >


                      <Typography
                        sx={{
                          fontSize: {
                            xs: 17,
                            md: 18,
                          },

                          fontWeight: 900,

                          lineHeight: 1.3,

                          maxWidth: 620,
                        }}
                      >
                        O sucesso da Pizzattolog acontece por causa de quem
                        vive a nossa logística todos os dias.
                      </Typography>
                    </Stack>
                  </Box>

                  {/* ===============================================
                TEXTO VINDO DO CRM
               =============================================== */}
                  <Typography
                    sx={{
                      color: 'text.secondary',

                      fontSize: {
                        xs: 15.5,
                        md: 16.5,
                      },

                      lineHeight: 1.7,

                      maxWidth: 760,
                    }}
                  >
                    {heroDescricao}
                  </Typography>

                  {/* ===============================================
                BOTÃO
               =============================================== */}
                  <Button
                    href="https://pizzattolog.pandape.infojobs.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    color="secondary"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 'fit-content',
                      },

                      px: 2.5,
                      py: 1.1,
                    }}
                  >
                    Ver oportunidades
                  </Button>

                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Stack spacing={5}>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <SectionLabel>Histórias que inspiram</SectionLabel>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
                Pessoas que constroem nossa história
              </Typography>
            </Stack>

            <Box
              sx={{
                position: 'relative',
                overflowX: 'auto',
                overflowY: 'hidden',
                pb: 1,
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '&:hover .historias-track': {
                  animationPlayState: 'paused',
                },
                '@keyframes historiasMarquee': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
                },
                '@media (prefers-reduced-motion: reduce)': {
                  '.historias-track': {
                    animation: 'none',
                  },
                },
              }}
            >
              <Box
                className="historias-track"
                sx={{
                  display: 'flex',
                  gap: 2.5,
                  width: 'max-content',
                  animation: 'historiasMarquee 36s linear infinite',
                }}
              >
                {historiasAnimadas.map((historia, index) => {
                  const cor = ['#ffb71b', '#ff5805', '#f23f35'][index % 3];

                  return (
                    <Paper
                      key={`${historia.nome}-${index}`}
                      aria-hidden={index >= historiasEditaveis.length ? true : undefined}
                      elevation={0}
                      sx={{
                        position: 'relative',
                        flex: '0 0 auto',
                        width: { xs: 330, sm: 440, md: 520 },
                        p: { xs: 2.25, md: 2.5 },
                        borderRadius: 2,
                        border: '1px solid rgba(15, 23, 42, 0.05)',
                        bgcolor: 'white',
                        boxShadow: '0 14px 30px rgba(19, 39, 57, 0.07)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: { md: 'translateY(-3px)' },
                          boxShadow: `0 20px 38px ${cor}2E`,
                        },
                      }}
                    >
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 92,
                              height: 92,
                              borderRadius: '50%',
                              border: `3px solid ${cor}`,
                              bgcolor: 'white',
                              overflow: 'hidden',
                              flexShrink: 0,
                              boxShadow: '0 10px 24px rgba(19, 39, 57, 0.12)',
                            }}
                          >
                            <Box
                              component="img"
                              src={historia.imagem}
                              alt={historia.nome}
                              sx={{
                                display: 'block',
                                width: '100%',
                                height: '100%',

                                objectFit: 'cover',

                                objectPosition: 'center bottom',
                              }}
                            />
                          </Box>

                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.1 }}>
                              {historia.nome}
                            </Typography>
                            <Typography sx={{ color: cor, fontWeight: 900, mt: 0.5 }}>
                              {historia.cargo}
                            </Typography>
                          </Box>
                        </Stack>

                        <Box
                          sx={{
                            position: 'relative',
                            p: { xs: 2, md: 2.25 },
                            bgcolor: '#F4F7F7',
                            borderRadius: 1,
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: -10,
                              left: 42,
                              width: 0,
                              height: 0,
                              borderLeft: '10px solid transparent',
                              borderRight: '10px solid transparent',
                              borderBottom: '10px solid #F4F7F7',
                            },
                          }}
                        >
                          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'flex-start' }}>
                            <FormatQuoteRoundedIcon sx={{ mt: 0.25, fontSize: 22, color: cor, flexShrink: 0 }} />
                            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.65 }}>
                              {historia.texto}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </Paper>
                  );
                })}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  width: { xs: 28, md: 90 },
                  pointerEvents: 'none',
                  background: 'linear-gradient(90deg, white 0%, rgba(255,255,255,0) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: '0 0 0 auto',
                  width: { xs: 28, md: 90 },
                  pointerEvents: 'none',
                  background: 'linear-gradient(270deg, white 0%, rgba(255,255,255,0) 100%)',
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
    NOSSOS PROGRAMAS
====================================================== */}

      <Box
        sx={{
          position: 'relative',

          width: '100%',

          aspectRatio: '3 / 2',

          overflow: 'hidden',

          bgcolor: 'grey.100',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={{
              xs: 4,
              md: 5,
            }}
          >
            {/* CABEÇALHO */}

            <Stack
              spacing={1.5}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <SectionLabel>
                Nossos programas
              </SectionLabel>

              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: '2rem',
                    md: '3rem',
                  },

                  fontWeight: 900,
                }}
              >
                Desenvolvimento que transforma
              </Typography>

              <Typography
                sx={{
                  maxWidth: 720,

                  color: 'text.secondary',

                  fontSize: {
                    xs: 15.5,
                    md: 17,
                  },

                  lineHeight: 1.7,
                }}
              >
                Conheça iniciativas que valorizam pessoas, reconhecem talentos
                e apoiam o desenvolvimento contínuo de quem faz a Pizzattolog
                acontecer todos os dias.
              </Typography>
            </Stack>

            {/* CARDS */}

            <Grid
              container
              spacing={{
                xs: 3,
                md: 3,
              }}
            >
              {programasEditaveis.map((programa) => (
                <Grid
                  key={programa.titulo}
                  size={{
                    xs: 12,
                    md: 4,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      height: '100%',

                      display: 'flex',
                      flexDirection: 'column',

                      overflow: 'hidden',

                      borderRadius: 3,

                      bgcolor: 'white',

                      border: '1px solid rgba(15, 23, 42, 0.06)',

                      boxShadow:
                        '0 16px 34px rgba(19, 39, 57, 0.08)',

                      transition:
                        'transform 0.2s ease, box-shadow 0.2s ease',

                      '&:hover': {
                        transform: {
                          md: 'translateY(-5px)',
                        },

                        boxShadow: `0 22px 46px ${programa.cor}24`,
                      },
                    }}
                  >
                    {/* FOTO */}

                    <Box
                      sx={{
                        position: 'relative',

                        width: '100%',

                        height: {
                          xs: 330,
                          sm: 370,
                          md: 400,
                        },

                        overflow: 'hidden',

                        bgcolor: 'grey.100',
                      }}
                    >
                      <Box
                        component="img"
                        src={programa.imagem}
                        alt={programa.alt}
                        sx={{
                          display: 'block',

                          width: '100%',
                          height: '100%',

                          objectFit: 'cover',

                          transition: 'transform 0.35s ease',

                          '.MuiPaper-root:hover &': {
                            transform: {
                              md: 'scale(1.03)',
                            },
                          },
                        }}
                      />
                    </Box>

                    {/* CONTEÚDO */}

                    <Stack
                      spacing={2}
                      sx={{
                        p: {
                          xs: 2.5,
                          md: 3,
                        },

                        flex: 1,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                          alignItems: 'center',
                        }}
                      >
                        {/* ÍCONE */}

                        <Box
                          sx={{
                            width: 46,
                            height: 46,

                            flexShrink: 0,

                            display: 'grid',
                            placeItems: 'center',

                            borderRadius: 2,

                            color: programa.cor,

                            bgcolor: `${programa.cor}14`,

                            border: `1px solid ${programa.cor}2E`,

                            '& svg': {
                              fontSize: 25,
                            },
                          }}
                        >
                          {programa.icone}
                        </Box>

                        {/* TÍTULO */}

                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 900,
                            lineHeight: 1.15,
                          }}
                        >
                          {programa.titulo}
                        </Typography>
                      </Stack>

                      {/* TEXTO */}

                      <Typography
                        sx={{
                          color: 'text.secondary',

                          fontSize: {
                            xs: 15,
                            md: 15.5,
                          },

                          lineHeight: 1.75,
                        }}
                      >
                        {programa.texto}
                      </Typography>
                    </Stack>

                    {/* LINHA INFERIOR */}

                    <Box
                      sx={{
                        height: 5,
                        bgcolor: programa.cor,
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Box
        component="section"
        sx={{
          py: {
            xs: 5,
            md: 20,
          },

          minHeight: {
            xs: 5,
            md: 6,
          },


          width: '100vw',
          maxWidth: 'none',

          ml: 'calc(50% - 50vw)',
          mr: 'calc(50% - 50vw)',

          color: '#ffffff',

          backgroundImage: 'url("/images/carreira/carreiras1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            sx={{ alignItems: { xs: 'flex-start', md: 'center' }, justifyContent: 'space-between' }}
          >

            <Box
              sx={{
                mt: {
                  xs: 3,
                  md: 7,
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1.25}
                sx={{
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: '1.9rem',
                      sm: '2.2rem',
                      md: '3rem',
                    },
                  }}
                >
                  {ctaTitulo}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  maxWidth: 760,
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 18,
                  lineHeight: 1.7,
                }}
              >
                {ctaDescricao}
              </Typography>
            </Box>
            <Button
              href="https://pizzattolog.pandape.infojobs.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'fit-content',
                },

                flexShrink: 0,

                mt: {
                  xs: 1.5,  // no celular dá espaço
                  md: -2,   // no desktop sobe o botão
                },

                borderRadius: {
                  xs: '10px',
                  md: '12px',
                },
              }}
            >
              {ctaBotaoTexto}
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
