'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import Link from 'next/link';
import { SectionLabel } from '@/components/site/section-label';
import {
  getContentString,
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';

/* =========================================================
   BENEFÍCIOS
========================================================= */

const beneficios = [
  {
    titulo: 'Transparência total',
    descricao:
      'Cada seminovo Pizzattolog vem com histórico, revisões e quilometragem documentados, garantindo procedência clara.',
    icon: <FactCheckRoundedIcon />,
  },
  {
    titulo: 'Manutenção em dia',
    descricao:
      'Todos os veículos passam por checagem completa feita por especialistas e são entregues prontos para rodar.',
    icon: <BuildRoundedIcon />,
  },
  {
    titulo: 'Segurança garantida',
    descricao:
      'Frota preparada para oferecer desempenho com segurança e reduzir riscos de paradas inesperadas.',
    icon: <SecurityRoundedIcon />,
  },
  {
    titulo: 'Pronto para crescer',
    descricao:
      'Regularizados e liberados para uso imediato: compre hoje e coloque seu veículo em operação.',
    icon: <LocalShippingRoundedIcon />,
  },
];

const introducaoPilares = [
  {
    titulo: 'Procedência conferida',
    texto: 'Histórico, quilometragem e documentação avaliados antes da negociação.',
    icon: <FactCheckRoundedIcon />,
  },
  {
    titulo: 'Frota preparada',
    texto: 'Veículos revisados para voltar à operação com segurança e previsibilidade.',
    icon: <SettingsSuggestRoundedIcon />,
  },
  {
    titulo: 'Escolha orientada',
    texto: 'Apoio consultivo para encontrar o caminhão certo para a sua necessidade.',
    icon: <HandshakeRoundedIcon />,
  },
];

/* =========================================================
   DIFERENCIAIS
========================================================= */

const diferenciais = [
  {
    titulo: 'Documentação 100% regularizada',
    descricao:
      'Sem burocracia: caminhões com documentação em dia e preparados para rodar com segurança.',
    icon: <Inventory2RoundedIcon />,
  },
  {
    titulo: 'Check-up completo antes da entrega',
    descricao:
      'Os veículos passam por inspeção técnica rigorosa, proporcionando maior confiabilidade desde o primeiro dia.',
    icon: <SettingsSuggestRoundedIcon />,
  },
  {
    titulo: 'Modelos multimarcas à sua disposição',
    descricao:
      'Diversas marcas e modelos para você escolher o caminhão mais adequado à sua operação.',
    icon: <RouteRoundedIcon />,
  },
  {
    titulo: 'Suporte consultivo na escolha',
    descricao:
      'Uma equipe especializada ajuda você a encontrar o veículo mais adequado às necessidades da sua frota.',
    icon: <HandshakeRoundedIcon />,
  },
  {
    titulo: 'A confiança de quem entende de logística',
    descricao:
      'Experiência no setor para oferecer não apenas veículos, mas segurança para o seu investimento.',
    icon: <VerifiedRoundedIcon />,
  },
];

/* =========================================================
   DEPOIMENTOS
========================================================= */

const depoimentos = [
  {
    nome: 'Carlos M.',
    cargo: 'Transportador Autônomo',
    texto:
      'Quando precisei ampliar minha frota, encontrei na Pizzattolog não só caminhões em excelente estado, mas também orientação para escolher o modelo mais adequado. Hoje, minha operação roda com menos paradas e muito mais eficiência.',
  },
  {
    nome: 'Logística Rápida SP',
    cargo: 'Empresa de transportes',
    texto:
      'A procedência transparente fez toda a diferença na nossa decisão. O histórico detalhado nos deu segurança para investir e, desde então, os caminhões têm sido fundamentais para aumentar nossa produtividade.',
  },
  {
    nome: 'Fernanda S.',
    cargo: 'Empresária do Setor de Transportes',
    texto:
      'Na Pizzattolog percebi que seminovo não é apenas um veículo usado, mas sim uma solução pronta para rodar. Foi o melhor investimento para o meu negócio.',
  },
];

/* =========================================================
   FAQ
========================================================= */

const perguntas = [
  {
    pergunta: 'Os caminhões seminovos da Pizzattolog têm garantia?',
    resposta:
      'As condições de garantia podem variar de acordo com o veículo. Nossa equipe apresenta todas as informações e condições antes da negociação.',
  },
  {
    pergunta: 'Posso financiar a compra do caminhão?',
    resposta:
      'As possibilidades de financiamento podem ser avaliadas durante a negociação. Entre em contato com nossa equipe comercial para conhecer as opções disponíveis.',
  },
  {
    pergunta: 'Vocês trabalham apenas com uma marca de caminhão?',
    resposta:
      'Não. Nossa disponibilidade pode incluir veículos de diferentes marcas, modelos e configurações.',
  },
  {
    pergunta:
      'Qual é a diferença entre comprar um seminovo comum e um seminovo Pizzattolog?',
    resposta:
      'O processo Pizzattolog busca oferecer maior transparência sobre procedência, documentação e condições do veículo antes da negociação.',
  },
  {
    pergunta: 'Os veículos estão prontos para rodar imediatamente?',
    resposta:
      'A condição de cada veículo é informada individualmente. Nossa equipe apresenta a documentação e as informações necessárias antes da entrega.',
  },
];

/* =========================================================
   COMPONENTE
========================================================= */

interface SeminovosSectionProps {
  conteudo?: SiteContent;
}

export default function SeminovosSection({
  conteudo,
}: SeminovosSectionProps) {
  const beneficiosEditaveis =
    mergeTextItems(beneficios, conteudo, 'beneficios', [
      'titulo',
      'descricao',
    ]);
  const introducaoPilaresEditaveis =
    mergeTextItems(introducaoPilares, conteudo, 'introducaoPilares', [
      'titulo',
      'texto',
    ]);
  const diferenciaisEditaveis =
    mergeTextItems(diferenciais, conteudo, 'diferenciais', [
      'titulo',
      'descricao',
    ]);
  const depoimentosEditaveis =
    mergeTextItems(depoimentos, conteudo, 'depoimentos', [
      'nome',
      'cargo',
      'texto',
    ]);
  const perguntasEditaveis =
    mergeTextItems(perguntas, conteudo, 'faq', [
      'pergunta',
      'resposta',
    ]);
  const diferenciaisAnimados = [
    ...diferenciaisEditaveis,
    ...diferenciaisEditaveis,
  ];
  const depoimentosAnimados = [
    ...depoimentosEditaveis,
    ...depoimentosEditaveis,
  ];

  return (
    <Box component="main">
      {/* =====================================================
          HERO
      ===================================================== */}

      <Box
        component="section"
        sx={{
          position: 'relative',

          minHeight: {
            xs: 520,
            md: 620,
          },

          display: 'flex',

          alignItems: 'center',
          backgroundImage: `
  linear-gradient(
    90deg,
    rgba(17, 24, 39, 0.78) 0%,
    rgba(17, 24, 39, 0.60) 35%,
    rgba(17, 24, 39, 0.28) 65%,
    rgba(17, 24, 39, 0.05) 100%
  ),
  url('${getContentString(
            conteudo,
            'hero.imagemUrl',
            '/images/seminovos/caminhao.png'
          )}')
`,

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundRepeat: 'no-repeat',

        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={3}
            sx={{
              maxWidth: 720,

              position: 'relative',

              top: {
                xs: 35,
                md: 90,
              },
            }}
          >
            <Typography
              component="h1"
              sx={{
                color: '#fff',

                fontSize: {
                  xs: '2.4rem',
                  sm: '3rem',
                  md: '4.2rem',
                },

                lineHeight: 1.08,
                fontWeight: 800,
                maxWidth: 700,
              }}
            >
              Seminovos com qualidade certificada
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.88)',

                fontSize: {
                  xs: '1rem',
                  md: '1.2rem',
                },

                lineHeight: 1.8,
                maxWidth: 640,
              }}
            >
              Caminhões preparados para colocar sua operação em movimento com
              confiança, procedência e segurança.
            </Typography>

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={2}
            >
              <Button
                component="a"
                href="https://www.avantteseminovos.com.br/19/"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  width: {
                    xs: '100%',
                    sm: 'fit-content',
                  },

                  px: 4,
                  py: 1.5,

                  borderRadius: 3,

                  bgcolor: '#ff5805',

                  fontWeight: 800,

                  textTransform: 'none',

                  fontSize: '1rem',

                  boxShadow: '0 10px 30px rgba(255, 88, 5, 0.28)',

                  '&:hover': {
                    bgcolor: '#e64e00',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 14px 35px rgba(255, 88, 5, 0.36)',
                  },

                  transition: 'all 0.3s ease',
                }}
              >
                Encontrar meu seminovo
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
          INTRODUÇÃO
      ===================================================== */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },

          bgcolor: '#fff',
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={{
              xs: 5,
              md: 8,
            }}
            sx={{
              alignItems: 'center',
            }}
          >
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack
                spacing={2.5}
                sx={{
                  width: '100%',
                  maxWidth: 760,

                  pl: {
                    xs: 0,
                    md: 2,
                    lg: 3,
                  },
                }}
              >
                <SectionLabel>Qualidade certificada</SectionLabel>

                <Typography
                  component="h2"
                  sx={{
                    maxWidth: 740,

                    fontSize: {
                      xs: '2rem',
                      sm: '2.4rem',
                      md: '3rem',
                      lg: '3.2rem',
                    },

                    lineHeight: 1.05,

                    fontWeight: 800,

                    color: '#172033',

                    letterSpacing: '-0.02em',
                  }}
                >
                  Seminovo é sinônimo de cuidado, confiança e investimento inteligente.
                </Typography>

                <Typography
                  sx={{
                    maxWidth: 700,

                    color: 'text.secondary',

                    fontSize: {
                      xs: '1rem',
                      md: '1.1rem',
                    },

                    lineHeight: 1.75,
                  }}
                >
                  Cada veículo passa por uma avaliação criteriosa para entregar mais
                  segurança na compra e mais previsibilidade na operação.
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                component="img"
                src={getContentString(
                  conteudo,
                  'introducao.imagemUrl',
                  '/images/seminovos/seminovos.png'
                )}
                alt="Caminhão seminovo Pizzattolog"
                sx={{
                  display: 'block',

                  width: '100%',

                  height: {
                    xs: 280,
                    md: 430,
                  },

                  objectFit: 'cover',
                  objectPosition: 'right center',

                  borderRadius: '8px 54px 8px 54px',

                  boxShadow: '0 24px 52px rgba(19, 39, 57, 0.14)',

                  // joga a imagem para o centro da página
                  transform: {
                    xs: 'none',
                    md: 'translateX(-45px)',
                  },
                }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              position: 'relative',

              mt: {
                xs: 6,
                md: 8,
              },

              mx: 'auto',

              maxWidth: 1040,

              p: {
                xs: 3,
                md: 5,
              },

              borderRadius: 4,

              border: '1px solid rgba(15, 23, 42, 0.08)',

              bgcolor: '#ffb71b',

              boxShadow: '0 18px 44px rgba(15, 23, 42, 0.08)',

              overflow: 'hidden',

              '&::before': {
                content: '""',

                position: 'absolute',

                top: 0,

                left: '50%',

                width: 120,

                height: 6,

                borderRadius: '0 0 8px 8px',

                bgcolor: '#ff5805',

                transform: 'translateX(-50%)',
              },
            }}
          >
            <Stack spacing={3.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <Stack spacing={1.5} sx={{ maxWidth: 760, alignItems: 'center' }}>
                <Typography
                  component="h3"
                  sx={{
                    color: '#010102',

                    fontSize: {
                      xs: '1.7rem',
                      md: '2.35rem',
                    },

                    fontWeight: 800,

                    lineHeight: 1.15,
                  }}
                >
                  Compra mais clara, entrega mais segura.
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',

                    fontSize: {
                      xs: '1rem',
                      md: '1.08rem',
                    },

                    lineHeight: 1.8,
                  }}
                >
                  Na Pizzattolog, cada caminhão é avaliado antes de chegar até
                  você. Nosso objetivo é entregar um veículo com procedência
                  clara, documentação organizada e condições adequadas para
                  gerar valor para sua operação.
                </Typography>
              </Stack>

              <Grid container spacing={2.5} sx={{ width: '100%' }}>
                {introducaoPilaresEditaveis.map((pilar) => (
                  <Grid key={pilar.titulo} size={{ xs: 12, md: 4 }}>
                    <Stack
                      spacing={1.4}
                      sx={{
                        height: '100%',

                        alignItems: 'center',

                        p: {
                          xs: 2.25,
                          md: 2.5,
                        },

                        borderRadius: 3,

                        bgcolor: '#fff',

                        border: '1px solid rgba(15, 23, 42, 0.06)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,

                          height: 50,

                          display: 'grid',

                          placeItems: 'center',

                          borderRadius: 2,

                          bgcolor: 'rgba(255, 88, 5, 0.1)',

                          color: '#ff5805',

                          '& svg': {
                            fontSize: 28,
                          },
                        }}
                      >
                        {pilar.icon}
                      </Box>

                      <Typography
                        sx={{
                          color: '#172033',

                          fontWeight: 800,
                        }}
                      >
                        {pilar.titulo}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'text.secondary',

                          lineHeight: 1.6,

                          fontSize: '0.94rem',
                        }}
                      >
                        {pilar.texto}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Box>
        </Container>
      </Box>
      {/* =====================================================
          BENEFÍCIOS
      ===================================================== */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 10,
          },

          bgcolor: '#f8fafc',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {beneficiosEditaveis.map((item, index) => (
              <Grid
                key={item.titulo}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 3,
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    position: 'relative',

                    height: '100%',

                    borderRadius: 4,

                    overflow: 'hidden',

                    bgcolor: '#fff',

                    border: '1px solid',

                    borderColor: 'rgba(15, 23, 42, 0.08)',

                    transition: 'all 0.3s ease',

                    '&::before': {
                      content: '""',

                      position: 'absolute',

                      top: 0,

                      left: 0,

                      width: '100%',

                      height: 4,

                      bgcolor: '#ff5805',

                      transform: 'scaleX(0)',

                      transformOrigin: 'left',

                      transition: 'transform 0.3s ease',
                    },

                    '&:hover': {
                      transform: 'translateY(-8px)',

                      borderColor: 'rgba(255, 88, 5, 0.30)',

                      boxShadow: '0 20px 45px rgba(15, 23, 42, 0.10)',

                      '&::before': {
                        transform: 'scaleX(1)',
                      },

                      '& .beneficio-icon': {
                        bgcolor: '#ff5805',

                        color: '#fff',

                        transform: 'scale(1.08)',
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: {
                        xs: 3,
                        md: 3.5,
                      },

                      '&:last-child': {
                        pb: {
                          xs: 3,
                          md: 3.5,
                        },
                      },
                    }}
                  >
                    <Stack spacing={3}>
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: 'center',

                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          className="beneficio-icon"
                          sx={{
                            width: 58,

                            height: 58,

                            display: 'flex',

                            alignItems: 'center',

                            justifyContent: 'center',

                            borderRadius: 3,

                            bgcolor: 'rgba(255, 88, 5, 0.10)',

                            color: '#ff5805',

                            transition: 'all 0.3s ease',

                            '& svg': {
                              fontSize: 30,
                            },
                          }}
                        >
                          {item.icon}
                        </Box>

                        <Typography
                          sx={{
                            fontSize: '0.78rem',

                            fontWeight: 800,

                            color: 'text.disabled',

                            letterSpacing: 1.2,
                          }}
                        >
                          0{index + 1}
                        </Typography>
                      </Stack>

                      <Box>
                        <Typography
                          component="h3"
                          sx={{
                            fontSize: '1.2rem',

                            fontWeight: 800,

                            mb: 1.3,

                            color: '#172033',
                          }}
                        >
                          {item.titulo}
                        </Typography>

                        <Typography
                          sx={{
                            color: 'text.secondary',

                            lineHeight: 1.75,

                            fontSize: '0.96rem',
                          }}
                        >
                          {item.descricao}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* =====================================================
          DIFERENCIAIS
      ===================================================== */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 8,
            md: 11,
          },

          bgcolor: '#ff5805',

          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={2}
            sx={{
              maxWidth: 760,

              mx: {
                xs: 'auto',
                md: 0,
              },

              textAlign: {
                xs: 'center',
                md: 'left',
              },

              mb: {
                xs: 5,
                md: 7,
              },
            }}
          >
            <SectionLabel sx={{ mx: { xs: 'auto', md: 0 }, color: '#fff' }}>
              Por que escolher a Pizzattolog?
            </SectionLabel>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },

                lineHeight: 1.15,

                fontWeight: 800,

                color: '#fff',
              }}
            >
              Diferenciais exclusivos que entregam valor
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.84)',

                fontSize: '1.08rem',

                lineHeight: 1.8,
              }}
            >
              Muito além de adquirir um caminhão, você conta com experiência,
              suporte e cuidado em cada etapa da escolha.
            </Typography>
          </Stack>

          <Box
            sx={{
              position: 'relative',

              overflowX: 'auto',

              overflowY: 'hidden',

              pb: 2,

              scrollbarWidth: 'none',

              msOverflowStyle: 'none',

              '&::-webkit-scrollbar': {
                display: 'none',
              },

              '&:hover .seminovos-diferenciais-track': {
                animationPlayState: 'paused',
              },

              '@keyframes seminovosDiferenciaisMarquee': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              },

              '@media (prefers-reduced-motion: reduce)': {
                '.seminovos-diferenciais-track': {
                  animation: 'none',
                },
              },
            }}
          >
            <Box
              className="seminovos-diferenciais-track"
              sx={{
                display: 'flex',

                gap: 3,

                width: 'max-content',

                animation: 'seminovosDiferenciaisMarquee 34s linear infinite',
              }}
            >
              {diferenciaisAnimados.map((item, index) => (
                <Card
                  key={`${item.titulo}-${index}`}
                  elevation={0}
                  aria-hidden={index >= diferenciaisEditaveis.length ? true : undefined}
                  sx={{
                    flex: '0 0 auto',

                    width: {
                      xs: 292,
                      sm: 360,
                      md: 420,
                    },

                    minHeight: 300,

                    borderRadius: 4,

                    border: '1px solid',

                    borderColor: 'rgba(15, 23, 42, 0.08)',

                    bgcolor: '#fff',

                    transition: 'all 0.3s ease',

                    '&:hover': {
                      transform: 'translateY(-6px)',

                      borderColor: 'rgba(255, 183, 27, 0.5)',

                      boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',

                      '& .diferencial-icon': {
                        bgcolor: '#ffb71b',

                        color: '#172033',

                        transform: 'scale(1.08)',
                      },
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 3.5,

                      '&:last-child': {
                        pb: 3.5,
                      },
                    }}
                  >
                    <Box
                      className="diferencial-icon"
                      sx={{
                        width: 56,

                        height: 56,

                        display: 'flex',

                        alignItems: 'center',

                        justifyContent: 'center',

                        borderRadius: '50%',

                        bgcolor: 'rgba(255, 183, 27, 0.14)',

                        color: '#d98d00',

                        mb: 2.5,

                        transition: 'all 0.3s ease',

                        '& svg': {
                          fontSize: 28,
                        },
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Typography
                      component="h3"
                      sx={{
                        fontSize: '1.1rem',

                        fontWeight: 800,

                        color: '#172033',

                        mb: 1.2,
                      }}
                    >
                      {item.titulo}
                    </Typography>

                    <Typography
                      sx={{
                        color: 'text.secondary',

                        lineHeight: 1.75,

                        fontSize: '0.95rem',
                      }}
                    >
                      {item.descricao}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =====================================================
          DEPOIMENTOS
      ===================================================== */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 11,
          },

          bgcolor: '#f8fafc',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={2}
            sx={{
              textAlign: 'center',

              maxWidth: 760,

              mx: 'auto',

              mb: 6,
            }}
          >
            <SectionLabel sx={{ mx: 'auto' }}>Depoimentos</SectionLabel>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },

                fontWeight: 800,

                color: '#172033',
              }}
            >
              Quem já dirige, recomenda
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',

                lineHeight: 1.8,
              }}
            >
              Na estrada, confiança é tudo. Cada veículo entregue representa
              produtividade e mais tranquilidade para quem vive do transporte.
            </Typography>
          </Stack>

          <Box
            sx={{
              position: 'relative',

              overflowX: 'auto',

              overflowY: 'hidden',

              pb: 2,

              scrollbarWidth: 'none',

              msOverflowStyle: 'none',

              '&::-webkit-scrollbar': {
                display: 'none',
              },

              '&:hover .seminovos-depoimentos-track': {
                animationPlayState: 'paused',
              },

              '@keyframes seminovosDepoimentosMarquee': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              },

              '@media (prefers-reduced-motion: reduce)': {
                '.seminovos-depoimentos-track': {
                  animation: 'none',
                },
              },
            }}
          >
            <Box
              className="seminovos-depoimentos-track"
              sx={{
                display: 'flex',

                gap: 3,

                width: 'max-content',

                animation: 'seminovosDepoimentosMarquee 36s linear infinite',
              }}
            >
              {depoimentosAnimados.map((depoimento, index) => (
                <Card
                  key={`${depoimento.nome}-${index}`}
                  elevation={0}
                  aria-hidden={index >= depoimentosEditaveis.length ? true : undefined}
                  sx={{
                    flex: '0 0 auto',

                    width: {
                      xs: 320,
                      sm: 440,
                      md: 520,
                    },

                    minHeight: 330,

                    borderRadius: 4,

                    bgcolor: '#fff',

                    border: '1px solid',

                    borderColor: 'rgba(15, 23, 42, 0.08)',

                    transition: 'all 0.3s ease',

                    '&:hover': {
                      transform: 'translateY(-6px)',

                      borderColor: 'rgba(255, 183, 27, 0.4)',

                      boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,

                      '&:last-child': {
                        pb: 4,
                      },
                    }}
                  >
                    <FormatQuoteRoundedIcon
                      sx={{
                        fontSize: 44,

                        color: '#ffb71b',

                        mb: 2,
                      }}
                    />

                    <Typography
                      sx={{
                        color: 'text.secondary',

                        lineHeight: 1.8,

                        mb: 3,
                      }}
                    >
                      {depoimento.texto}
                    </Typography>

                    <Box
                      sx={{
                        pt: 2,

                        borderTop: '1px solid',

                        borderColor: 'divider',
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,

                          color: '#172033',
                        }}
                      >
                        {depoimento.nome}
                      </Typography>

                      <Typography
                        sx={{
                          color: 'text.secondary',

                          fontSize: '0.9rem',

                          mt: 0.5,
                        }}
                      >
                        {depoimento.cargo}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =====================================================
          CTA
      ===================================================== */}

      <Box
        component="section"
        sx={{
          position: 'relative',
          overflow: 'hidden',

          py: {
            xs: 8,
            md: 12,
          },

          color: '#fff',
          textAlign: 'center',

          borderTop: '6px solid #ff5805',

          // FOTO DE FUNDO
          backgroundImage:
            'url("/images/seminovos/avantte.png")',

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundRepeat: 'no-repeat',

          // CAMADA ESCURA SOBRE A FOTO
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,

            background:
              'rgba(10, 25, 40, 0.72)',

            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={3}
            sx={{
              position: 'relative',

              maxWidth: 900,

              mx: 'auto',

              alignItems: 'center',
            }}
          >
            <SectionLabel sx={{ mx: 'auto' }}>Pronto para sua operação</SectionLabel>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: '2rem',
                  md: '3.2rem',
                },

                lineHeight: 1.12,

                fontWeight: 800,
              }}
            >
              Na estrada, o tempo não para.
            </Typography>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.76)',

                fontSize: {
                  xs: '1rem',
                  md: '1.15rem',
                },

                lineHeight: 1.8,

                maxWidth: 780,
              }}
            >
              Seu próximo caminhão pode estar pronto para colocar sua operação
              em movimento. Encontre o seminovo ideal para o seu negócio.
            </Typography>

            <Button
              component={Link}
              href="https://wa.me/554192393384?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20equipe%20da%20Pizzattolog."
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'fit-content',
                },

                px: 4,

                py: 1.5,

                borderRadius: 3,

                bgcolor: '#ff5805',

                fontWeight: 800,

                textTransform: 'none',

                '&:hover': {
                  bgcolor: '#e64e00',

                  transform: 'translateY(-2px)',
                },

                transition: 'all 0.3s ease',
              }}
            >
              Falar com nossa equipe
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <Box
        component="section"
        sx={{
          py: {
            xs: 7,
            md: 11,
          },

          bgcolor: '#f8fafc',
        }}
      >
        <Container maxWidth="md">
          <Stack
            spacing={2}
            sx={{
              textAlign: 'center',

              mb: 5,
            }}
          >
            <SectionLabel sx={{ mx: 'auto' }}>FAQ</SectionLabel>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },

                fontWeight: 800,

                color: '#172033',
              }}
            >
              Perguntas frequentes
            </Typography>

            <Typography
              sx={{
                color: 'text.secondary',

                lineHeight: 1.8,
              }}
            >
              Tire suas principais dúvidas sobre nossos seminovos.
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {perguntasEditaveis.map((item) => (
              <Accordion
                key={item.pergunta}
                disableGutters
                elevation={0}
                sx={{
                  bgcolor: '#fff',

                  border: '1px solid',

                  borderColor: 'rgba(15, 23, 42, 0.08)',

                  borderRadius: '16px !important',

                  overflow: 'hidden',

                  transition: 'all 0.25s ease',

                  '&::before': {
                    display: 'none',
                  },

                  '&:hover': {
                    borderColor: 'rgba(255, 88, 5, 0.25)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <KeyboardArrowDownRoundedIcon
                      sx={{
                        color: '#ff5805',
                      }}
                    />
                  }
                  sx={{
                    px: 3,

                    py: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,

                      color: '#172033',
                    }}
                  >
                    {item.pergunta}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: 3,

                    pb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: 'text.secondary',

                      lineHeight: 1.8,
                    }}
                  >
                    {item.resposta}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
