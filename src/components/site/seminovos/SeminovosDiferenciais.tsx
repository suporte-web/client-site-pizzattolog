'use client';

import { useEffect, useRef, useState } from 'react';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';

import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';

const diferenciais = [
  {
    titulo: 'Documentação 100% regularizada',
    descricao:
      'Sem burocracia: todos os caminhões saem com documentação em dia, prontos para rodar com segurança.',
    icon: <ArticleRoundedIcon />,
  },
  {
    titulo: 'Check-up completo antes da entrega',
    descricao:
      'Veículos passam por inspeção técnica rigorosa, garantindo confiabilidade desde o primeiro dia.',
    icon: <FactCheckRoundedIcon />,
  },
  {
    titulo: 'Modelos multimarcas à sua disposição',
    descricao:
      'Diversas marcas e modelos para você escolher o caminhão que melhor atende sua operação.',
    icon: <LocalShippingRoundedIcon />,
  },
  {
    titulo: 'Suporte consultivo na escolha',
    descricao:
      'Equipe especializada orienta na escolha certa para sua frota, garantindo investimento inteligente.',
    icon: <SupportAgentRoundedIcon />,
  },
  {
    titulo: 'A confiança de quem entende de logística',
    descricao:
      'Com experiência no setor, a Pizzattolog oferece não apenas caminhões, mas tranquilidade e segurança.',
    icon: <WorkspacePremiumRoundedIcon />,
  },
];

export function SeminovosDiferenciais() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToCard(index: number) {
    const container = carouselRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) {
      return;
    }

    const left =
      card.offsetLeft -
      container.offsetLeft;

    container.scrollTo({
      left,
      behavior: 'smooth',
    });

    setActiveIndex(index);
  }

  function handleScroll() {
    const container = carouselRef.current;

    if (!container) {
      return;
    }

    const currentScroll = container.scrollLeft;

    let closestIndex = 0;
    let smallestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const cardPosition =
        card.offsetLeft -
        container.offsetLeft;

      const distance = Math.abs(
        currentScroll - cardPosition,
      );

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextIndex =
        activeIndex === diferenciais.length - 1
          ? 0
          : activeIndex + 1;

      scrollToCard(nextIndex);
    }, 4500);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeIndex]);

  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        bgcolor: '#ff5805',

        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        {/* TÍTULO */}
        <Stack
          spacing={2}
          sx={{
            textAlign: 'center',

            maxWidth: 850,

            mx: 'auto',

            mb: {
              xs: 5,
              md: 6,
            },
          }}
        >
          <Typography
            component="h2"
            sx={{
              color: '#fff',

              fontSize: {
                xs: '2rem',
                md: '3rem',
              },

              lineHeight: 1.15,

              fontWeight: 800,
            }}
          >
            Diferenciais exclusivos que entregam valor
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.82)',

              fontSize: {
                xs: '1rem',
                md: '1.08rem',
              },

              lineHeight: 1.8,
            }}
          >
            Mais segurança, transparência e confiança para
            escolher o caminhão certo para sua operação.
          </Typography>
        </Stack>

        {/* CARROSSEL */}
        <Box
          ref={carouselRef}
          onScroll={handleScroll}
          sx={{
            display: 'flex',

            gap: {
              xs: 2,
              md: 3,
            },

            overflowX: 'auto',

            overflowY: 'hidden',

            scrollSnapType: 'x mandatory',

            scrollBehavior: 'smooth',

            pb: 2,

            px: {
              xs: 1,
              md: 0,
            },

            WebkitOverflowScrolling: 'touch',

            scrollbarWidth: 'none',

            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {diferenciais.map((item, index) => (
            <Box
              key={item.titulo}
              ref={(element: HTMLDivElement | null) => {
                cardRefs.current[index] = element;
              }}
              sx={{
                flex: {
                  xs: '0 0 86%',
                  sm: '0 0 48%',
                  md: '0 0 calc((100% - 48px) / 3)',
                },

                scrollSnapAlign: 'start',
              }}
            >
              <Card
                elevation={0}
                sx={{
                  position: 'relative',

                  height: '100%',

                  minHeight: {
                    xs: 270,
                    md: 290,
                  },

                  borderRadius: 4,

                  bgcolor: '#fff',

                  overflow: 'hidden',

                  border: '1px solid rgba(255,255,255,0.25)',

                  transition: 'all 0.3s ease',

                  '&::before': {
                    content: '""',

                    position: 'absolute',

                    top: 0,

                    left: 24,

                    width: 76,

                    height: 5,

                    borderRadius: '0 0 8px 8px',

                    bgcolor: '#ffb71b',
                  },

                  '&:hover': {
                    transform: 'translateY(-6px)',

                    boxShadow:
                      '0 22px 50px rgba(60, 20, 0, 0.20)',

                    '& .diferencial-icon': {
                      transform: 'scale(1.07)',

                      bgcolor: '#ff5805',

                      color: '#fff',
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
                  {/* ÍCONE */}
                  <Box
                    className="diferencial-icon"
                    sx={{
                      width: 64,

                      height: 64,

                      display: 'flex',

                      alignItems: 'center',

                      justifyContent: 'center',

                      borderRadius: 2.5,

                      bgcolor: '#f23f35',

                      color: '#fff',

                      mb: 2.5,

                      transition: 'all 0.3s ease',

                      '& svg': {
                        fontSize: 34,
                      },
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TÍTULO DO CARD */}
                  <Typography
                    component="h3"
                    sx={{
                      color: '#2f2f2f',

                      fontSize: {
                        xs: '1.15rem',
                        md: '1.25rem',
                      },

                      lineHeight: 1.25,

                      fontWeight: 800,

                      mb: 1.3,
                    }}
                  >
                    {item.titulo}
                  </Typography>

                  {/* DESCRIÇÃO */}
                  <Typography
                    sx={{
                      color: 'text.secondary',

                      fontSize: '0.96rem',

                      lineHeight: 1.65,
                    }}
                  >
                    {item.descricao}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* BOLINHAS */}
        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            justifyContent: 'center',

            alignItems: 'center',

            mt: 2,
          }}
        >
          {diferenciais.map((item, index) => (
            <Box
              key={item.titulo}
              component="button"
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`Ir para diferencial ${index + 1}`}
              sx={{
                width:
                  activeIndex === index
                    ? 14
                    : 10,

                height:
                  activeIndex === index
                    ? 14
                    : 10,

                p: 0,

                border: 0,

                borderRadius: '50%',

                cursor: 'pointer',

                bgcolor:
                  activeIndex === index
                    ? '#ffb71b'
                    : 'rgba(255,255,255,0.25)',

                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}