import {
  ArrowForwardRounded,
  AutoStoriesRounded,
  Diversity3Rounded,
  ElectricCarRounded,
  EmojiEventsRounded,
  ForestRounded,
  GavelRounded,
  GroupsRounded,
  OpenInNewRounded,
  PublicRounded,
  ShieldRounded,
  WorkspacePremiumRounded,
} from '@mui/icons-material';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { ProgramasSection } from './programas';
import { SectionLabel } from '@/components/site/section-label';

import type { Subpagina } from '@/types/site';
import {
  getContentString,
  type SiteContent,
} from '@/utils/site-content';

import { AmbientalSection } from './ambiental';
import { GovernancaSection } from './governancia';
import { SocialSection } from './social';
import { RelatorioSection } from './relatorio';


interface EsgSectionsProps {
  conteudo?: SiteContent;
}

export function EsgSections({
  conteudo,
}: EsgSectionsProps) {
  return (
    <>
      <NossoCompromissoEsgSection
        conteudo={conteudo}
      />

      <AmbientalSection conteudo={conteudo} />

      <SocialSection conteudo={conteudo} />

      <ProgramasSection />

      <GovernancaSection conteudo={conteudo} />

      <RelatorioSection />
    </>
  );
}


interface NossoCompromissoEsgSectionProps {
  subpagina?: Subpagina;
  conteudo?: SiteContent;
}

const programas = [
  {
    titulo: 'Rota Verde',
    descricao:
      'O Rota Verde é nossa operação de carga fracionada conduzida exclusivamente por mulheres ao volante de veículos 100% elétricos em Curitiba e região. Unimos a meta de zero emissões ao protagonismo feminino, transformando a logística urbana em um modelo de impacto positivo.',
    icon: <ElectricCarRounded />,
  },
  {
    titulo: 'Rota do Saber',
    descricao:
      'O Rota do Saber promove a capacitação contínua de nossas equipes, unindo o desenvolvimento pessoal e profissional a uma cultura de segurança viária. Assim, garantimos que nossos profissionais estejam sempre preparados para os desafios e as transformações da logística moderna.',
    icon: <AutoStoriesRounded />,
  },
  {
    titulo: 'Rota de Oportunidade',
    descricao:
      'O Rota de Oportunidade é o nosso canal direto com você: através de QR Codes adesivados em nossos caminhões, abrimos espaço para feedbacks sobre nossa frota e atuação nas estradas. Esse reconhecimento é a base de premiações trimestrais e do nosso grande destaque anual, onde os motoristas com melhor desempenho e avaliação são premiados pela integridade e qualidade mantidas em cada viagem.',
    icon: <EmojiEventsRounded />,
  },
  {
    titulo: 'Diversidade e Inclusão',
    descricao:
      'Valorizar e integrar as diferenças é o que fortalece a nossa equipe. No programa Diversidade e Inclusão, garantimos um ambiente seguro onde diferentes vivências e habilidades são reconhecidas. Nosso compromisso é construir uma operação onde o respeito e a multiplicidade de talentos caminhem juntos para resolver desafios com excelência.',
    icon: <Diversity3Rounded />,
  },
];

export function NossoCompromissoEsgSection({
  subpagina,
  conteudo,
}: NossoCompromissoEsgSectionProps) {
  const imagemBanner = getContentString(
    conteudo,
    'compromisso.imagemUrl',
    '/images/esg/banner-esg.jpeg',
  );

  const etiquetaBanner = getContentString(
    conteudo,
    'compromisso.etiqueta',
    '',
  ).trim();

  const tituloBanner = getContentString(
    conteudo,
    'compromisso.titulo',
    '',
  ).trim();

  const descricaoBanner = getContentString(
    conteudo,
    'compromisso.descricao',
    '',
  ).trim();

  return (
    <Box
      component="section"
      id={subpagina?.ancora ?? 'nosso-compromisso-esg'}
      sx={{
        bgcolor: 'background.default',
      }}
    >
      {/* =====================================================
        BANNER / HERO ESG
    ====================================================== */}

      <Box
        sx={{
          position: 'relative',

          minHeight: {
            xs: 360,
            sm: 430,
            md: 520,
          },

          display: 'flex',
          alignItems: 'center',

          backgroundImage: `url("${imagemBanner}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

          color: 'common.white',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={2.5}
            sx={{
              maxWidth: {
                xs: '100%',
                md: 820,
              },

              py: {
                xs: 8,
                md: 10,
              },
            }}
          >
            {/* ETIQUETA */}

            {etiquetaBanner && (
              <Stack
                component="span"
                direction="row"
                spacing={0.75}
                sx={{
                  width: 'fit-content',
                  alignItems: 'center',

                  px: 1.5,
                  py: 0.7,

                  borderRadius: 999,

                  bgcolor: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.22)',

                  color: 'common.white',

                  fontSize: 13,
                  fontWeight: 700,
                  lineHeight: 1.4,
                }}
              >
                <PublicRounded
                  sx={{
                    fontSize: 18,
                  }}
                />

                <Box component="span">
                  {etiquetaBanner}
                </Box>
              </Stack>
            )}

            {/* TÍTULO */}

            {tituloBanner && (
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  maxWidth: 850,

                  fontSize: {
                    xs: '2.6rem',
                    sm: '3.4rem',
                    md: '4.4rem',
                  },

                  fontWeight: 800,
                  lineHeight: 1.03,

                  color: 'common.white',

                  textShadow: '0 3px 18px rgba(0,0,0,0.20)',
                }}
              >
                {tituloBanner}
              </Typography>
            )}

            {/* DESCRIÇÃO */}

            {descricaoBanner && (
              <Typography
                sx={{
                  maxWidth: 760,

                  fontSize: {
                    xs: '1rem',
                    md: '1.18rem',
                  },

                  lineHeight: 1.75,

                  color: 'rgba(255,255,255,0.88)',

                  textShadow: '0 2px 12px rgba(0,0,0,0.20)',
                }}
              >
                {descricaoBanner}
              </Typography>
            )}
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
        CONTEÚDO ABAIXO DO BANNER
    ====================================================== */}

      <Container maxWidth="xl">
        <Stack
          spacing={{
            xs: 7,
            md: 10,
          }}
          sx={{
            py: {
              xs: 7,
              md: 10,
            },
          }}
        >

          {/* =====================================================
    NOSSO COMPROMISSO ESG - CONTEÚDO FIXO
====================================================== */}

          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',

              p: {
                xs: 3,
                sm: 4,
                md: 6,
              },

              borderRadius: {
                xs: 4,
                md: 5,
              },

              border: '1px solid rgba(15, 23, 42, 0.06)',

              bgcolor: '#F8FAFB',

              background:
                'linear-gradient(135deg, rgba(255,88,5,0.06) 0%, rgba(255,255,255,0) 45%)',

              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.06)',
            }}
          >
            {/* DECORAÇÃO DE FUNDO */}

            <Box
              sx={{
                position: 'absolute',
                width: 260,
                height: 260,

                top: -150,
                left: -120,

                borderRadius: '50%',

                bgcolor: 'rgba(255,88,5,0.06)',

                pointerEvents: 'none',
              }}
            />

            <Grid
              container
              spacing={{
                xs: 5,
                md: 7,
              }}
              sx={{
                position: 'relative',
                zIndex: 1,
                alignItems: 'center',
              }}
            >
              {/* =====================================================
        LADO ESQUERDO
    ====================================================== */}

              <Grid size={{ xs: 12, md: 5 }}>
                <Stack spacing={3}>
                  <SectionLabel>ESG</SectionLabel>

                  <Box
                    sx={{
                      position: 'relative',
                      pl: {
                        xs: 2.5,
                        md: 3,
                      },

                      '&::before': {
                        content: '""',
                        position: 'absolute',

                        left: 0,
                        top: 4,
                        bottom: 4,

                        width: 5,

                        borderRadius: 99,

                        bgcolor: '#ff5805',
                      },
                    }}
                  >
                    <Typography
                      component="h2"
                      sx={{
                        fontSize: {
                          xs: '2.35rem',
                          sm: '2.8rem',
                          md: '3.55rem',
                        },

                        fontWeight: 850,
                        lineHeight: 1.03,

                        letterSpacing: '-0.035em',

                        color: 'text.primary',
                      }}
                    >
                      Nosso
                      <br />
                      Compromisso ESG
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      maxWidth: 540,

                      color: 'text.secondary',

                      fontSize: {
                        xs: '1rem',
                        md: '1.15rem',
                      },

                      lineHeight: 1.75,
                    }}
                  >
                    Transportar com responsabilidade define a trajetória da
                    Pizzattolog há cinco décadas.
                  </Typography>
                </Stack>
              </Grid>

              {/* =====================================================
        LADO DIREITO
    ====================================================== */}

              <Grid size={{ xs: 12, md: 7 }}>
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',

                    p: {
                      xs: 3,
                      sm: 4,
                      md: 4.5,
                    },

                    borderRadius: {
                      xs: 3,
                      md: 4,
                    },

                    bgcolor: 'background.paper',

                    border: '1px solid rgba(15, 23, 42, 0.07)',

                    boxShadow: '0 16px 38px rgba(15, 23, 42, 0.07)',

                    overflow: 'hidden',
                  }}
                >
                  {/* ASPAS DECORATIVAS */}

                  <Typography
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',

                      top: {
                        xs: 5,
                        md: 0,
                      },

                      right: {
                        xs: 18,
                        md: 24,
                      },

                      fontSize: {
                        xs: 72,
                        md: 100,
                      },

                      fontWeight: 900,

                      lineHeight: 1,

                      color: 'rgba(255,88,5,0.09)',

                      userSelect: 'none',
                    }}
                  >
                    “
                  </Typography>

                  {/* PEQUENO DESTAQUE */}

                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{
                      alignItems: 'center',
                      mb: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,

                        borderRadius: '50%',

                        bgcolor: '#ff5805',
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 800,

                        textTransform: 'uppercase',

                        letterSpacing: '0.08em',

                        color: '#ff5805',
                      }}
                    >
                      Nosso propósito
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      position: 'relative',
                      zIndex: 1,

                      color: 'text.primary',

                      fontSize: {
                        xs: '1rem',
                        md: '1.08rem',
                      },

                      lineHeight: 1.9,
                    }}
                  >
                    Aqui, a eficiência logística exige mais do que velocidade.
                    Exige governança transparente nos negócios, segurança para as
                    nossas pessoas e gestão inteligente do nosso impacto ambiental.
                    É essa base que sustenta a nossa operação e guia a precisão de
                    entrega em cada viagem.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* =========================================================
              EMPRESA B
          ========================================================== */}

          <Paper
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: 5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              p: { xs: 2, md: 3 },
            }}
          >
            <Grid container spacing={{ xs: 3, md: 5 }} sx={{ alignItems: 'center' }}>
              <Grid
                size={{ xs: 12, md: 5 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 9',
                    overflow: 'hidden',
                    borderRadius: 3,
                    bgcolor: 'grey.100',
                    boxShadow: '0 18px 38px rgba(15, 23, 42, 0.12)',
                  }}
                >
                  <Box
                    component="iframe"
                    src="https://www.youtube.com/embed/iR3IOLvDGtA"
                    title="Pizzattolog - Uma Empresa B Certificada"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Stack
                  spacing={3}
                  sx={{
                    p: {
                      xs: 1,
                      sm: 2,
                      md: 3,
                    },
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      fontWeight: 800,
                      lineHeight: 1.12,
                    }}
                  >
                    {getContentString(conteudo, 'empresaB.titulo', 'Empresa B Certificada')}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        md: '1.08rem',
                      },
                      lineHeight: 1.9,
                    }}
                  >
                    <Link
                      href="https://www.bcorporation.net/en-us/find-a-b-corp/company/pizzattolog/"
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        fontWeight: 800,
                        color: '#ff5805',

                        '&:hover': {
                          color: '#e64f00',
                        },
                      }}
                    >
                      Somos uma Empresa B
                    </Link>
                    . Isso significa que nossa operação é rigorosamente
                    auditada por padrões internacionais, garantindo que o
                    lucro caminhe lado a lado com o impacto social positivo, a
                    ética nos negócios e a eficiência ambiental.
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        md: '1.08rem',
                      },
                      lineHeight: 1.9,
                    }}
                  >
                    Equilibrar alta performance com responsabilidade não é
                    apenas uma meta corporativa, é a nossa prática diária em
                    cada rota.
                  </Typography>

                  <Button
                    component="a"
                    href="https://www.bcorporation.net/en-us/find-a-b-corp/company/pizzattolog/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    endIcon={<OpenInNewRounded />}
                    sx={{
                      width: 'fit-content',
                      borderRadius: 99,
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 700,

                      color: '#ff5805',
                      borderColor: '#ff5805',

                      '&:hover': {
                        color: '#e64f00',
                        borderColor: '#e64f00',
                        bgcolor: 'rgba(255, 88, 5, 0.05)',
                      },
                    }}
                  >
                    {getContentString(
                      conteudo,
                      'empresaB.botaoTexto',
                      'Conheça nossa certificação',
                    )}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
