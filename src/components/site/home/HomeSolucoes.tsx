'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';

import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';

import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { SectionLabel } from '@/components/site/section-label';
import { trackWhatsappClicado } from '@/lib/analytics/tracking';

import type { Solucao } from '@/types/site';



/* =========================================================
   TIPOS
========================================================= */

type SolucaoComImagem = Solucao & {
  imagemUrl?: string | null;
};

interface HomeSolucoesProps {
  solucoes: SolucaoComImagem[];
}

// Agregados imagens

const imagemAgregados =
  'https://pizzattolog.com.br/wp-content/uploads/2026/03/bannerrrrr-AGREGADOS-e1776274417156.png';


/* =========================================================
 BOTÕES DAS SOLUÇÕES
========================================================= */

const configuracaoSolucoes = {
  armazenagem: {
    botaoTexto:
      'Garanta a segurança do seu estoque',

    botaoUrl:
      'https://api.whatsapp.com/send?phone=554132481042&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20de%20armazenagem%20da%20Pizzattolog.',
  },

  'operador-logistico': {
    botaoTexto:
      'Descubra a execução que garante a eficiência',

    botaoUrl:
      'https://api.whatsapp.com/send?phone=554132481042&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20de%20log%C3%ADstica%20da%20Pizzattolog.',
  },

  'transporte-de-cargas': {
    botaoTexto:
      'Planeje seu transporte com segurança',

    botaoUrl:
      'https://api.whatsapp.com/send?phone=554132481042&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20de%20transporte%20da%20Pizzattolog.',
  },
} as const;

/* =========================================================
   ORDEM DAS SOLUÇÕES NA HOME
========================================================= */

const ordemHome = [
  'armazenagem',
  'operador-logistico',
  'transporte-de-cargas',
] as const;

/* =========================================================
   CORES DAS SOLUÇÕES
========================================================= */

const coresSolucoes: Record<string, string> = {
  armazenagem: '#ffb71b',

  'operador-logistico': '#ff5805',

  'transporte-de-cargas': '#f23f35',
};

/* =========================================================
   SEGMENTOS DE ATUAÇÃO

   Esses dados ficam fixos no código.
   Não dependem do CRM.
========================================================= */

const segmentos = [
  {
    titulo:
      'Cosméticos e Higiene Pessoal',

    icone: (
      <SpaRoundedIcon
        sx={{
          fontSize: 76,
        }}
      />
    ),

    cor: '#ffb71b',
  },

  {
    titulo:
      'Produtos Químicos',

    icone: (
      <BiotechRoundedIcon
        sx={{
          fontSize: 76,
        }}
      />
    ),

    cor: '#ff5805',
  },

  {
    titulo:
      'Higiene, Nutrição e Saúde Pets',

    icone: (
      <PetsRoundedIcon
        sx={{
          fontSize: 76,
        }}
      />
    ),

    cor: '#f23f35',
  },
];

/* =========================================================
   CABEÇALHO PADRÃO

   Mesmo estilo utilizado na página de Soluções.
========================================================= */

interface SectionHeaderProps {
  label: string;

  title: string;

  description?: string;

  align?: 'left' | 'center';

  titleMaxWidth?: number;

  descriptionMaxWidth?: number;
}

function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  titleMaxWidth = 900,
  descriptionMaxWidth = 880,
}: SectionHeaderProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems:
          align === 'center'
            ? 'center'
            : 'flex-start',

        textAlign: align,


      }}
    >
      {label ? (
        <SectionLabel>
          {label}
        </SectionLabel>
      ) : null}

      <Typography
        variant="h2"
        sx={{
          maxWidth: titleMaxWidth,



          fontSize: {
            xs: '2rem',
            md: '3rem',
          },

          fontWeight: 800,

          lineHeight: 1.12,

          color: 'text.primary',
        }}
      >
        {title}
      </Typography>

      {description ? (
        <Typography
          sx={{
            maxWidth:
              descriptionMaxWidth,



            color:
              'text.secondary',

            fontSize: '16px',

            fontWeight: 400,

            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}


const diferenciais = [
  {
    titulo: 'Logística Integrada',
    destaque:
      'Sua operação conectada de ponta a ponta.',
    texto:
      'Com processos inteligentes e comunicação ativa, entregamos fluidez, previsibilidade e alinhamento total com a estratégia do cliente.',
    icone: <HubRoundedIcon />,
    cor: '#ffb71b',
  },

  {
    titulo: 'Inteligência de Dados',
    destaque:
      'Informações em tempo real.',
    texto:
      'Consolidamos sistemas de alta tecnologia, rastreamento e dashboards inteligentes para assegurar visibilidade estratégica, agilidade e segurança às suas operações.',
    icone: <QueryStatsRoundedIcon />,
    cor: '#ff5805',
  },

  {
    titulo: 'Parceria Estratégica',
    destaque:
      'Logística desenhada para o seu negócio.',
    texto:
      'Além de seu transportador, somos o seu parceiro estratégico. Criamos soluções sob medida para entender, prever e resolver as complexidades da sua cadeia logística.',
    icone: <Diversity3RoundedIcon />,
    cor: '#f23f35',
  },

  {
    titulo: 'Segurança Operacional',
    destaque:
      'A carga é sua, o cuidado é nosso.',
    texto:
      'Operamos com frota monitorada e protocolos rigorosos para garantir a preservação da sua carga, a segurança viária e a excelência em cada rota.',
    icone: <SecurityRoundedIcon />,
    cor: '#ffb71b',
  },

  {
    titulo: 'ESG',
    destaque:
      'Compromisso com o futuro.',
    texto:
      'Através de governança ética, inclusão e projetos contínuos, avançamos na construção de uma logística consciente que agrega valor real aos parceiros.',
    icone: <VerifiedRoundedIcon />,
    cor: '#ff5805',
  },

  {
    titulo: 'Eficiência',
    destaque:
      'Menos desperdício, mais performance.',
    texto:
      'Aplicamos a filosofia Lean Thinking para otimizar fluxos e eliminar desperdícios, garantindo máxima produtividade e uma logística ágil focada no que gera valor real.',
    icone: <AutoGraphRoundedIcon />,
    cor: '#f23f35',
  },
];

const numeros = [
  {
    valor: '+50 anos',
    rotulo: 'de história',
    icone: <FavoriteBorderRoundedIcon />,
  },
  {
    valor: '+740',
    rotulo: 'ativos',
    icone: <LocalShippingRoundedIcon />,
  },
  {
    valor: '+850',
    rotulo: 'colaboradores',
    icone: <GroupsRoundedIcon />,
  },
  {
    valor: '+490 mil',
    rotulo: 'toneladas/ano',
    icone: <WarehouseRoundedIcon />,
  },
];

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export function HomeSolucoes({
  solucoes = [],
}: HomeSolucoesProps) {
  const theme = useTheme();

  const desktop = useMediaQuery(
    theme.breakpoints.up('md'),
  );

  const tablet = useMediaQuery(
    theme.breakpoints.up('sm'),
  );
  const cardsPorPagina = desktop
    ? 3
    : tablet
      ? 2
      : 1;

  const totalPaginas = Math.ceil(
    diferenciais.length /
    cardsPorPagina,
  );

  const [paginaDiferenciais, setPaginaDiferenciais] =
    useState(0);

  useEffect(() => {
    setPaginaDiferenciais(0);
  }, [cardsPorPagina]);

  useEffect(() => {
    if (totalPaginas <= 1) {
      return;
    }

    const intervalo =
      window.setInterval(() => {
        setPaginaDiferenciais(
          (paginaAtual) =>
            (paginaAtual + 1) %
            totalPaginas,
        );
      }, 5500);

    return () => {
      window.clearInterval(
        intervalo,
      );
    };
  }, [totalPaginas]);

  const paginasDiferenciais =
    Array.from(
      {
        length: totalPaginas,
      },
      (_, pagina) =>
        diferenciais.slice(
          pagina *
          cardsPorPagina,

          pagina *
          cardsPorPagina +
          cardsPorPagina,
        ),
    );

  function paginaAnterior() {
    setPaginaDiferenciais(
      (paginaAtual) =>
        paginaAtual === 0
          ? totalPaginas - 1
          : paginaAtual - 1,
    );
  }

  function proximaPagina() {
    setPaginaDiferenciais(
      (paginaAtual) =>
        (paginaAtual + 1) %
        totalPaginas,
    );
  }
  const solucoesHome =
    ordemHome.flatMap(
      (slug) => {
        const solucao =
          solucoes.find(
            (item) =>
              item.slug === slug,
          );

        if (!solucao) {
          return [];
        }

        return [
          {
            ...solucao,

            ...configuracaoSolucoes[
            slug
            ],
          },
        ];
      },
    );

  return (
    <>
      {/* =====================================================
          SOLUÇÕES
      ===================================================== */}

      <Box
        component="section"
        id="home-solucoes"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },

          bgcolor:
            'background.default',



          '@keyframes solucaoSobe': {
            '0%': {
              opacity: 0,

              transform:
                'translateY(44px)',
            },

            '100%': {
              opacity: 1,

              transform:
                'translateY(0)',
            },
          },

          '@media (prefers-reduced-motion: reduce)': {
            '.solucao-home-animada':
            {
              animation: 'none',

              opacity: 1,

              transform: 'none',
            },
          },
        }}
      >
        <Container maxWidth="xl">
          {/* ===============================================
              CABEÇALHO SOLUÇÕES
          =============================================== */}

          <Box
            sx={{
              mb: {
                xs: 6,
                md: 8,
              },
            }}
          >
            <SectionHeader
              label="Soluções"
              title="Soluções Completas e Integradas"
              description="Nós cuidamos da logística de ponta a ponta, dedicados a atender exclusivamente outras empresas (B2B). Nossa especialidade é fazer com que tudo chegue ao seu destino no tempo certo e com segurança. Oferecemos soluções logísticas completas e integradas, e garantimos que a cadeia de fornecimento de nossos clientes seja eficiente e livre de preocupações."
              titleMaxWidth={840}
              descriptionMaxWidth={900}
            />
          </Box>

          {/* ===============================================
              LISTA DE SOLUÇÕES
          =============================================== */}

          <Stack
            spacing={{
              xs: 7,
              md: 10,
            }}
          >
            {solucoesHome.map(
              (
                solucao,
                indice,
              ) => {
                const corSolucao =
                  coresSolucoes[
                  solucao.slug
                  ] ??
                  '#ff5805';

                const inverter =
                  indice % 2 === 1;

                return (
                  <Box
                    key={
                      solucao.id
                    }
                    id={
                      solucao.slug
                    }
                    className="solucao-home-animada"
                    sx={{
                      opacity: 0,

                      transform:
                        'translateY(44px)',

                      animation:
                        'solucaoSobe 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards',

                      animationDelay:
                        `${indice * 0.14}s`,
                    }}
                  >
                    <Grid
                      container
                      spacing={{
                        xs: 4,
                        md: 7,
                      }}
                      sx={{
                        alignItems:
                          'center',

                        flexDirection:
                        {
                          md: inverter
                            ? 'row-reverse'
                            : 'row',
                        },
                      }}
                    >
                      {/* =================================
                          IMAGEM
                      ================================= */}

                      <Grid
                        size={{
                          xs: 12,
                          md: 5,
                        }}
                      >
                        <Box
                          sx={{
                            position:
                              'relative',

                            width:
                              '100%',

                            maxWidth:
                              520,

                            mx: 'auto',
                          }}
                        >
                          {solucao.imagemUrl ? (
                            <Box
                              component="img"
                              src={
                                solucao.imagemUrl
                              }
                              alt={
                                solucao.titulo
                              }
                              sx={{
                                position:
                                  'relative',

                                zIndex:
                                  1,

                                display:
                                  'block',

                                width:
                                  '100%',

                                height:
                                  'auto',

                                objectFit:
                                  'contain',

                                objectPosition:
                                  'center',

                                filter:
                                  `drop-shadow(0 24px 34px ${corSolucao}22)`,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width:
                                  '100%',

                                aspectRatio:
                                  '1 / 1',

                                borderRadius:
                                  3,

                                bgcolor:
                                  'rgba(0,0,0,0.03)',
                              }}
                            />
                          )}
                        </Box>
                      </Grid>

                      {/* =================================
                          TEXTO
                      ================================= */}

                      <Grid
                        size={{
                          xs: 12,
                          md: 7,
                        }}
                      >
                        <Stack
                          spacing={
                            2.25
                          }
                          sx={{
                            maxWidth:
                              620,

                            mx: {
                              xs: 0,

                              md: inverter
                                ? 'auto'
                                : 0,
                            },
                          }}
                        >
                          {/* TÍTULO */}

                          <Typography
                            variant="h3"
                            sx={{


                              fontSize:
                              {
                                xs: '2rem',

                                md: '2.55rem',
                              },

                              fontWeight:
                                800,

                              lineHeight:
                                1.15,

                              color:
                                'text.primary',
                            }}
                          >
                            {
                              solucao.titulo
                            }
                          </Typography>

                          {/* DESCRIÇÃO */}

                          <Typography
                            sx={{


                              color:
                                'text.secondary',

                              fontSize:
                                '16px',

                              fontWeight:
                                400,

                              lineHeight:
                                1.75,
                            }}
                          >
                            {
                              solucao.descricao
                            }
                          </Typography>

                          {/* BOTÃO */}

                          <Box
                            sx={{
                              pt: 1,
                            }}
                          >
                            <Button
                              component="a"
                              href={
                                solucao.botaoUrl
                              }
                              onClick={() =>
                                trackWhatsappClicado(
                                  solucao.titulo,
                                )
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="contained"
                              size="large"
                              endIcon={
                                <ArrowForwardRoundedIcon />
                              }
                              sx={{
                                width:
                                {
                                  xs: '100%',

                                  sm: 'fit-content',
                                },

                                minHeight:
                                  46,

                                px: 3,

                                borderRadius:
                                  2,

                                bgcolor:
                                  corSolucao,

                                color:
                                  '#ffffff',



                                fontSize:
                                  '15px',

                                fontWeight:
                                  700,

                                textTransform:
                                  'none',

                                boxShadow:
                                  'none',

                                transition:
                                  'transform 0.2s ease, box-shadow 0.2s ease',

                                '&:hover':
                                {
                                  bgcolor:
                                    corSolucao,

                                  boxShadow:
                                    `0 10px 24px ${corSolucao}38`,

                                  transform:
                                    'translateY(-1px)',
                                },
                              }}
                            >
                              {
                                solucao.botaoTexto
                              }
                            </Button>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                );
              },
            )}
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
          SEGMENTOS DE ATUAÇÃO
      ===================================================== */}

      <Box
        component="section"
        id="segmentos-de-atuacao"
        sx={{
          py: {
            xs: 8,
            md: 11,
          },

          bgcolor: '#ffffff',


        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={{
              xs: 5,
              md: 7,
            }}
            sx={{
              alignItems:
                'center',
            }}
          >
            {/* ===============================================
                TEXTO ESQUERDA
            =============================================== */}

            <Grid
              size={{
                xs: 12,
                md: 5,
              }}
            >
              <SectionHeader
                label="Segmentos de atuação"
                title="Especialistas em logística B2B para operações reguladas."
                description="Somos especialistas em logística B2B para os segmentos de Químicos, Cosméticos e mercado Pet. Nossas soluções atendem empresas que buscam transportadora especializada em produtos regulados, com foco em segurança operacional, conformidade legal, licenças obrigatórias e previsibilidade nas entregas, gestão de riscos que garantem eficiência em ambientes logísticos de alta complexidade."
                align="left"
                titleMaxWidth={560}
                descriptionMaxWidth={600}
              />
            </Grid>

            {/* ===============================================
                CARDS DIREITA
            =============================================== */}

            <Grid
              size={{
                xs: 12,
                md: 7,
              }}
            >
              <Grid
                container
                spacing={3}
              >
                {segmentos.map(
                  (
                    segmento,
                  ) => (
                    <Grid
                      key={
                        segmento.titulo
                      }
                      size={{
                        xs: 12,
                        sm: 4,
                      }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          position:
                            'relative',

                          overflow:
                            'hidden',

                          height:
                            '100%',

                          minHeight:
                          {
                            xs: 220,

                            md: 264,
                          },

                          p: {
                            xs: 3,

                            md: 3.5,
                          },

                          display:
                            'flex',

                          flexDirection:
                            'column',

                          alignItems:
                            'center',

                          justifyContent:
                            'center',

                          textAlign:
                            'center',

                          border:
                            '1px solid rgba(15, 23, 42, 0.05)',

                          bgcolor:
                            '#ECECEC',

                          borderRadius:
                            3,

                          boxShadow:
                            '0 16px 34px rgba(19, 39, 57, 0.08)',

                          transition:
                            'transform 0.2s ease, box-shadow 0.2s ease',

                          /* BARRA COLORIDA */

                          '&::before':
                          {
                            content:
                              '""',

                            position:
                              'absolute',

                            top: 0,

                            left:
                              '50%',

                            width:
                              94,

                            height:
                              7,

                            bgcolor:
                              segmento.cor,

                            borderRadius:
                              '0 0 8px 8px',

                            transform:
                              'translateX(-50%)',
                          },

                          '&:hover':
                          {
                            transform:
                              'translateY(-4px)',

                            boxShadow:
                              `0 22px 42px ${segmento.cor}33`,
                          },
                        }}
                      >
                        {/* ÍCONE */}

                        <Box
                          sx={{
                            display:
                              'grid',

                            placeItems:
                              'center',

                            color:
                              segmento.cor,

                            mb: 3,
                          }}
                        >
                          {
                            segmento.icone
                          }
                        </Box>

                        {/* TÍTULO */}

                        <Typography
                          variant="h5"
                          sx={{
                            maxWidth:
                              240,


                            fontWeight:
                              900,

                            fontSize:
                            {
                              xs: '1.25rem',

                              md: '1.35rem',
                            },

                            lineHeight:
                              1.16,

                            color:
                              'text.primary',
                          }}
                        >
                          {
                            segmento.titulo
                          }
                        </Typography>
                      </Paper>
                    </Grid>
                  ),
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* =====================================================
    NOSSOS DIFERENCIAIS
===================================================== */}

      <Box
        component="section"
        id="nossos-diferenciais"
        sx={{
          position: 'relative',

          overflow: 'hidden',

          pt: {
            xs: 10,
            md: 12,
          },

          pb: {
            xs: 8,
            md: 10,
          },



          background:
            'linear-gradient(135deg, #ffb71b 0%, #ff8a18 42%, #ff5805 68%, #f23f35 100%)',

          /*
           * Cria a curva branca no topo,
           * como na referência.
           */
          '&::before': {
            content: '""',

            position: 'absolute',

            top: -1,
            left: 0,

            width: '100%',
            height: {
              xs: 35,
              md: 55,
            },

            bgcolor: '#ffffff',

            clipPath:
              'ellipse(62% 55% at 50% 0%)',
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ===============================================
        TÍTULO
    =============================================== */}

          <Typography
            component="h2"
            sx={{
              mb: {
                xs: 5,
                md: 6,
              },

              textAlign: 'center',



              fontSize: {
                xs: '2.25rem',
                md: '3rem',
              },

              fontWeight: 800,

              lineHeight: 1.1,

              color: '#ffffff',
            }}
          >
            Nossos diferenciais
          </Typography>



          {/* ===============================================
        CARROSSEL
    =============================================== */}

          <Box
            sx={{
              position: 'relative',
            }}
          >
            {/* SETA ESQUERDA */}

            {totalPaginas > 1 && (
              <IconButton
                type="button"
                aria-label="Diferenciais anteriores"
                onClick={paginaAnterior}
                sx={{
                  position: 'absolute',

                  left: {
                    xs: -8,
                    md: -26,
                  },

                  top: '50%',

                  zIndex: 5,

                  transform:
                    'translateY(-50%)',

                  width: {
                    xs: 30,
                    md: 34,
                  },

                  height: {
                    xs: 30,
                    md: 34,
                  },

                  bgcolor:
                    'rgba(255,255,255,0.95)',

                  color: '#ff5805',

                  boxShadow:
                    '0 8px 24px rgba(0,0,0,0.14)',

                  '&:hover': {
                    bgcolor: '#ffffff',
                  },
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>
            )}

            {/* JANELA DO CARROSSEL */}

            <Box
              sx={{
                overflow: 'hidden',

                px: {
                  xs: 1,
                  md: 0,
                },
              }}
            >
              {/* TRILHO */}

              <Box
                sx={{
                  display: 'flex',

                  width: '100%',

                  transform:
                    `translateX(-${paginaDiferenciais * 100}%)`,

                  transition:
                    'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {paginasDiferenciais.map(
                  (
                    pagina,
                    indicePagina,
                  ) => (
                    <Box
                      key={
                        indicePagina
                      }
                      sx={{
                        width: '100%',

                        flex:
                          '0 0 100%',

                        px: {
                          xs: 0.5,
                          md: 1,
                        },
                      }}
                    >
                      <Grid
                        container
                        spacing={{
                          xs: 2.5,
                          md: 3,
                        }}
                      >
                        {pagina.map(
                          (item) => (
                            <Grid
                              key={
                                item.titulo
                              }
                              size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                              }}
                            >
                              <Paper
                                elevation={0}
                                sx={{
                                  position:
                                    'relative',

                                  height:
                                    '100%',

                                  minHeight:
                                  {
                                    xs: 300,

                                    md: 315,
                                  },

                                  p: {
                                    xs: 3,

                                    md: 3.5,
                                  },

                                  overflow:
                                    'hidden',

                                  bgcolor:
                                    '#ffffff',

                                  borderRadius:
                                    3,

                                  border:
                                    '1px solid rgba(15, 23, 42, 0.06)',

                                  boxShadow:
                                    '0 18px 42px rgba(15,23,42,0.14)',

                                  transition:
                                    'transform 0.25s ease, box-shadow 0.25s ease',

                                  /*
                                   * Barra superior.
                                   */
                                  '&::before':
                                  {
                                    content:
                                      '""',

                                    position:
                                      'absolute',

                                    top: 0,

                                    left: 24,

                                    width:
                                      76,

                                    height:
                                      5,

                                    bgcolor:
                                      item.cor,

                                    borderRadius:
                                      '0 0 8px 8px',
                                  },

                                  '&:hover':
                                  {
                                    transform:
                                    {
                                      md: 'translateY(-6px)',
                                    },

                                    boxShadow:
                                      '0 24px 50px rgba(15,23,42,0.20)',
                                  },
                                }}
                              >
                                <Stack
                                  spacing={
                                    2
                                  }
                                >
                                  {/* ÍCONE */}

                                  <Box
                                    sx={{
                                      width:
                                        76,

                                      height:
                                        76,

                                      display:
                                        'grid',

                                      placeItems:
                                        'center',

                                      borderRadius:
                                        2,

                                      bgcolor:
                                        '#f23f35',

                                      color:
                                        '#ffffff',

                                      '& svg':
                                      {
                                        fontSize:
                                          42,
                                      },
                                    }}
                                  >
                                    {
                                      item.icone
                                    }
                                  </Box>

                                  {/* TÍTULO */}

                                  <Typography
                                    component="h3"
                                    sx={{


                                      fontSize:
                                      {
                                        xs: '1.35rem',

                                        md: '1.5rem',
                                      },

                                      fontWeight:
                                        800,

                                      lineHeight:
                                        1.15,

                                      color:
                                        '#17212B',
                                    }}
                                  >
                                    {
                                      item.titulo
                                    }
                                  </Typography>

                                  {/* SUBTÍTULO */}

                                  <Typography
                                    sx={{


                                      fontSize:
                                        '16px',

                                      fontWeight:
                                        700,

                                      lineHeight:
                                        1.45,

                                      color:
                                        '#17212B',
                                    }}
                                  >
                                    {
                                      item.destaque
                                    }
                                  </Typography>

                                  {/* DESCRIÇÃO */}

                                  <Typography
                                    sx={{


                                      fontSize:
                                        '16px',

                                      fontWeight:
                                        400,

                                      lineHeight:
                                        1.55,

                                      color:
                                        '#3f3f3f',
                                    }}
                                  >
                                    {
                                      item.texto
                                    }
                                  </Typography>
                                </Stack>
                              </Paper>
                            </Grid>
                          ),
                        )}
                      </Grid>
                    </Box>
                  ),
                )}
              </Box>
            </Box>

            {/* SETA DIREITA */}

            {totalPaginas > 1 && (
              <IconButton
                type="button"
                aria-label="Próximos diferenciais"
                onClick={proximaPagina}
                sx={{
                  position: 'absolute',

                  right: {
                    xs: -8,
                    md: -26,
                  },

                  top: '50%',

                  zIndex: 5,

                  transform:
                    'translateY(-50%)',

                  width: {
                    xs: 30,
                    md: 34,
                  },

                  height: {
                    xs: 30,
                    md: 34,
                  },

                  bgcolor:
                    'rgba(255,255,255,0.95)',

                  color: '#ff5805',

                  boxShadow:
                    '0 8px 24px rgba(0,0,0,0.14)',

                  '&:hover': {
                    bgcolor: '#ffffff',
                  },
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            )}
          </Box>

          {/* ===============================================
        BOLINHAS
    =============================================== */}

          {totalPaginas > 1 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 5,

                alignItems: 'center',

                justifyContent:
                  'center',
              }}
            >
              {Array.from(
                {
                  length:
                    totalPaginas,
                },
                (_, index) => (
                  <Box
                    key={index}
                    component="button"
                    type="button"
                    aria-label={`Ir para página ${index + 1
                      } dos diferenciais`}
                    onClick={() =>
                      setPaginaDiferenciais(
                        index,
                      )
                    }
                    sx={{
                      width:
                        index ===
                          paginaDiferenciais
                          ? 26
                          : 9,

                      height: 9,

                      p: 0,

                      border: 0,

                      borderRadius:
                        99,

                      cursor:
                        'pointer',

                      bgcolor:
                        index ===
                          paginaDiferenciais
                          ? '#ffffff'
                          : 'rgba(255,255,255,0.38)',

                      transition:
                        'all 0.3s ease',
                    }}
                  />
                ),
              )}
            </Stack>
          )}
        </Container>
      </Box>
      {/* =====================================================
    NOSSOS NÚMEROS
===================================================== */}

      <Box
        component="section"
        id="nossos-numeros"
        sx={{
          position: 'relative',
          overflow: 'hidden',

          py: {
            xs: 8,
            md: 11,
          },

          bgcolor: '#ffffff',
        }}
      >


        {/* ===================================================
      FUNDO GEOMÉTRICO
  =================================================== */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,

            pointerEvents: 'none',

            opacity: 0.35,

            backgroundImage: `
        linear-gradient(
          135deg,
          transparent 0 22%,
          rgba(242,63,53,0.18) 22.2%,
          transparent 22.6%
        ),
        linear-gradient(
          35deg,
          transparent 0 55%,
          rgba(255,183,27,0.16) 55.2%,
          transparent 55.8%
        )
      `,

            backgroundSize:
              '420px 260px, 520px 340px',
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* =================================================
        TÍTULO
    ================================================= */}
          <Box
            sx={{
              mb: {
                xs: 5,
                md: 6,
              },
            }}
          >
            <SectionHeader
              label=""
              title="Nossos números"
            />
          </Box>

          {/* =================================================
        CARDS
    ================================================= */}

          <Grid
            container
            spacing={{
              xs: 3,
              md: 3,
            }}
          >
            {numeros.map((numero) => (
              <Grid
                key={numero.rotulo}
                size={{
                  xs: 12,
                  sm: 6,
                  lg: 3,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',

                    overflow: 'hidden',

                    height: '100%',

                    minHeight: {
                      xs: 230,
                      md: 275,
                    },

                    p: {
                      xs: 3,
                      md: 3.5,
                    },

                    display: 'flex',

                    flexDirection: 'column',

                    justifyContent:
                      'space-between',

                    border:
                      '4px solid #ffb71b',

                    borderTopWidth: 5,

                    borderRadius:
                      '0 34px 0 34px',

                    bgcolor:
                      'rgba(255,255,255,0.96)',

                    boxShadow:
                      '0 16px 34px rgba(19,39,57,0.08)',

                    transition:
                      'transform 0.2s ease, box-shadow 0.2s ease',

                    '&:hover': {
                      transform: {
                        md: 'translateY(-5px)',
                      },

                      boxShadow:
                        '0 22px 44px rgba(255,183,27,0.22)',
                    },
                  }}
                >


                  {/* ===========================================
                ÍCONE
            =========================================== */}

                  <Box
                    sx={{
                      width: {
                        xs: 64,
                        md: 74,
                      },

                      height: {
                        xs: 64,
                        md: 74,
                      },

                      display: 'grid',

                      placeItems: 'center',

                      bgcolor: '#f23f35',

                      color: '#ffffff',

                      borderRadius: 2,

                      '& svg': {
                        fontSize: {
                          xs: 34,
                          md: 40,
                        },
                      },
                    }}
                  >
                    {numero.icone}
                  </Box>

                  {/* ===========================================
                NÚMERO
            =========================================== */}

                  <Box>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 38,
                          md: 46,
                        },

                        fontWeight: 900,

                        lineHeight: 0.95,

                        letterSpacing: '-0.03em',

                        color: '#292929',
                      }}
                    >
                      {numero.valor}
                    </Typography>



                    {/* =========================================
                  DESCRIÇÃO
              ========================================= */}

                    <Typography
                      sx={{
                        mt: 0.75,

                        fontSize: {
                          xs: 25,
                          md: 29,
                        },

                        fontWeight: 800,

                        lineHeight: 1.05,

                        letterSpacing: '-0.02em',

                        color: '#292929',
                      }}
                    >
                      {numero.rotulo}
                    </Typography>
                  </Box>

                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* =====================================================
    AGREGADOS
===================================================== */}

      <Box
        component="section"
        id="agregados-home"
        sx={{
          position: 'relative',

          overflow: 'hidden',

          minHeight: {
            xs: 420,
            md: 520,
          },

          display: 'flex',

          alignItems: 'center',

          color: '#ffffff',

          backgroundColor: '#0b344d',

          backgroundImage:
            'url("/images/agregados/banneragregados.jpg")',

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundRepeat: 'no-repeat',

          '&::after': {
            content: '""',

            position: 'absolute',

            left: 0,
            right: 0,
            bottom: -1,

            height: {
              xs: 52,
              md: 78,
            },

            bgcolor: '#ffffff',

            clipPath:
              'polygon(0 60%, 100% 18%, 100% 100%, 0% 100%)',
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',

            zIndex: 1,

            py: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              maxWidth: 720,
            }}
          >
            {/* ===============================================
          TÍTULO
      =============================================== */}

            {/* <Box
              sx={{
                position: 'relative',

                width: '100%',

                maxWidth: 700,

                minHeight: {
                  xs: 260,
                  md: 340,
                },

                display: 'flex',
                alignItems: 'center',

                px: {
                  xs: 3,
                  md: 5,
                },

                py: {
                  xs: 4,
                  md: 5,
                },

                backgroundImage: 'url("/images/agregados/banneragregados.jpg")',

                backgroundSize: 'cover',

                backgroundPosition: 'center',

                backgroundRepeat: 'no-repeat',
              }}
            > */}
              <Typography
                component="h2"
                sx={{
                  position: 'relative',
                  zIndex: 1,

                  maxWidth: 620,

                  fontSize: {
                    xs: '2.3rem',
                    sm: '2.8rem',
                    md: '3.45rem',
                  },

                  fontWeight: 900,

                  lineHeight: 1.05,

                  letterSpacing: '-0.035em',

                  color: '#ffffff',
                }}
              >
                Venha ser agregado e conheça o Clube de Benefícios exclusivos.
              </Typography>
    

            {/* ===============================================
          BOTÃO
      =============================================== */}

            <Button
              href="/agregados"
              variant="contained"
              size="large"
              endIcon={
                <ArrowForwardRoundedIcon />
              }
              sx={{
                alignSelf: 'flex-start',

                px: {
                  xs: 3,
                  md: 4,
                },

                py: 1.35,

                bgcolor: '#ff5805',

                color: '#ffffff',

                borderRadius: 2,

                fontWeight: 800,

                textTransform: 'none',

                boxShadow: 'none',

                '&:hover': {
                  bgcolor: '#e94f00',

                  boxShadow:
                    '0 10px 26px rgba(255,88,5,0.26)',
                },
              }}
            >
              Saiba mais
            </Button>
          </Stack>
        </Container>
      </Box>
    </>

  );
}
