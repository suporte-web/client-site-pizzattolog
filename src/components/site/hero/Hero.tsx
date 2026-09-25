'use client';

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import type { HeroPaginaInicial } from '@/types/site';
import { buildHeroSlides } from './hero-slides';

interface HeroProps {
  hero: HeroPaginaInicial;
}

export function Hero({ hero }: HeroProps) {
  const slides = buildHeroSlides(hero);

  const [imagemAtual, setImagemAtual] = useState(0);

  const slideAtual = slides[imagemAtual];

  useEffect(() => {
    if (imagemAtual >= slides.length) {
      setImagemAtual(0);
    }
  }, [imagemAtual, slides.length]);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setImagemAtual((atual) => (atual + 1) % slides.length);
    }, 6000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [slides.length]);

  return (
    <Box
      component="section"
      sx={{
        minHeight: {
          xs: 620,
          md: 680,
        },

        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',

        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* ======================================================
          IMAGENS DO CARROSSEL
      ====================================================== */}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,

          width: '100%',
          height: '100%',

          display: 'flex',

          transform: `translateX(-${imagemAtual * 100}%)`,

          transition: 'transform 0.8s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={`${slide.imagem}-${index}`}
            sx={{
              width: '100%',
              height: '100%',
              flex: '0 0 100%',
              position: 'relative',
              bgcolor: slide.backgroundColor,
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={slide.imagem}
              alt={`Banner Pizzattolog ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: slide.objectFit,
                objectPosition: slide.objectPosition,
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                inset: 0,

                background: `
          linear-gradient(
            90deg,
            rgba(15, 23, 42, 0.48) 0%,
            rgba(15, 23, 42, 0.24) 38%,
            rgba(15, 23, 42, 0.05) 70%,
            rgba(15, 23, 42, 0) 100%
          )
        `,

                pointerEvents: 'none',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* ======================================================
          CONTEÚDO
      ====================================================== */}

      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 2,

          display: 'flex',
          alignItems: 'center',

          width: '100%',

          py: {
            xs: 8,
            md: 10,
          },
        }}
      >
        {/* ==================================================
    AÇÕES DO BANNER
================================================== */}

        <Box
          sx={{
            position: 'absolute',

            left: {
              xs: 20,
              sm: 32,
              md: 80,
              lg: 110,
            },

            bottom: {
              xs: 70,
              md: 82,
            },

            zIndex: 4,
          }}
        >
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1.5}
            sx={{
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
            }}
          >
            <Button
              component={Link}
              href="/solicitar-cotacao"
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                minHeight: 48,

                px: 3.2,

                borderRadius: 2,

                bgcolor: '#ff5805',

                color: '#ffffff',

                fontSize: {
                  xs: '0.9rem',
                  md: '1rem',
                },

                fontWeight: 800,

                textTransform: 'none',

                boxShadow:
                  '0 12px 30px rgba(255, 88, 5, 0.30)',

                '&:hover': {
                  bgcolor: '#e94f00',

                  transform: 'translateY(-2px)',

                  boxShadow:
                    '0 16px 34px rgba(255, 88, 5, 0.38)',
                },

                transition: 'all 0.25s ease',
              }}
            >
              Solicitar cotação
            </Button>

            <Button
              component={Link}
              href="/solucoes"
              variant="outlined"
              sx={{
                minHeight: 48,

                px: 3.2,

                borderRadius: 2,

                borderColor: 'rgba(255,255,255,0.75)',

                color: '#ffffff',

                fontSize: {
                  xs: '0.9rem',
                  md: '1rem',
                },

                fontWeight: 700,

                textTransform: 'none',

                bgcolor: 'rgba(15,23,42,0.18)',

                backdropFilter: 'blur(8px)',

                '&:hover': {
                  borderColor: '#ffffff',

                  bgcolor: 'rgba(255,255,255,0.12)',

                  transform: 'translateY(-2px)',
                },

                transition: 'all 0.25s ease',
              }}
            >
              Ver soluções
            </Button>
          </Stack>
        </Box>
        {/* ==================================================
            SLIDE 1
        ================================================== */}

        {/* {slideAtual?.tipo === 'movimento' && (
          <Box
            sx={{
              width: {
                xs: '100%',
                md: 650,
              },

              mt: {
                xs: 3,
                md: 0,
              },
            }}
          >
            <Typography
              component="div"
              sx={{
                color: '#ffffff',

                fontSize: {
                  xs: '2rem',
                  sm: '2.35rem',
                  md: '2.5rem',
                },

                fontWeight: 400,
                lineHeight: 1,

                textShadow:
                  '0 2px 10px rgba(0, 0, 0, 0.20)',
              }}
            >
              Vamos juntos
            </Typography>

            <Typography
              component="div"
              sx={{
                color: '#ffffff',

                fontSize: {
                  xs: '3.5rem',
                  sm: '4.2rem',
                  md: '4.7rem',
                },

                fontWeight: 800,
                fontStyle: 'italic',

                lineHeight: 0.92,

                ml: {
                  xs: 4,
                  sm: 7,
                  md: 9,
                },

                textShadow:
                  '0 2px 10px rgba(0, 0, 0, 0.20)',
              }}
            >
              movimentar
            </Typography>

            <Typography
              component="div"
              sx={{
                color: '#ffffff',

                fontSize: {
                  xs: '2.3rem',
                  sm: '2.7rem',
                  md: '3rem',
                },

                fontWeight: 400,
                lineHeight: 1,

                ml: {
                  xs: 15,
                  sm: 27,
                  md: 40,
                },

                mt: 0.5,

                whiteSpace: 'nowrap',

                textShadow:
                  '0 2px 10px rgba(0, 0, 0, 0.20)',
              }}
            >
              o mundo
            </Typography>
          </Box>
        )} */}

        {/* ==================================================
            SLIDE 2
        ================================================== */}

        {slideAtual?.tipo === 'historia' && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: {
                  xs: 290,
                  sm: 340,
                  md: 410,
                  lg: 450,
                },

                ml: {
                  xs: 2,
                  sm: 4,
                  md: 10,
                  lg: 14,
                },

                mt: {
                  xs: 12,
                  sm: 8,
                  md: 2,
                },

                transform: {
                  md: 'translateY(-15px)',
                },
              }}
            >
              {/* <Typography
                component="div"
                sx={{
                  color: '#1f2937',

                  fontSize: {
                    xs: '2rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '3.3rem',
                  },

                  fontWeight: 800,
                  fontStyle: 'italic',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                A trilha de
              </Typography> */}

              {/* <Typography
                component="div"
                sx={{
                  color: '#1f2937',

                  fontSize: {
                    xs: '2.4rem',
                    sm: '3rem',
                    md: '3.5rem',
                    lg: '3.8rem',
                  },

                  fontWeight: 800,
                  lineHeight: 0.98,
                  letterSpacing: '-0.03em',
                  mt: 0.8,
                }}
              >
                Sucesso da
              </Typography> */}

              {/* <Typography
                component="div"
                sx={{
                  color: '#ff5805',

                  fontSize: {
                    xs: '2.4rem',
                    sm: '3rem',
                    md: '3.5rem',
                    lg: '3.8rem',
                  },

                  fontWeight: 800,
                  lineHeight: 0.98,
                  letterSpacing: '-0.03em',
                  mt: 0.3,
                }}
              >
                Pizzattolog
              </Typography> */}
            </Box>
          </Box>
        )}
        {/* ==================================================
            INDICADORES
        ================================================== */}

        {slides.length > 1 && (
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              position: 'absolute',

              bottom: {
                xs: 22,
                md: 28,
              },

              left: '50%',
              transform: 'translateX(-50%)',

              zIndex: 5,
            }}
          >
            {slides.map((_, index) => (
              <Box
                key={index}
                component="button"
                type="button"
                aria-label={`Ir para banner ${index + 1}`}
                onClick={() => setImagemAtual(index)}
                sx={{
                  width: 14,
                  height: 14,

                  p: 0,

                  border: 0,
                  borderRadius: '50%',

                  cursor: 'pointer',

                  bgcolor:
                    index === imagemAtual
                      ? '#ffb000'
                      : 'rgba(255, 183, 27, 0.25)',

                  transition:
                    'background-color 0.3s ease, transform 0.3s ease',

                  '&:hover': {
                    transform: 'scale(1.15)',
                  },
                }}
              />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
