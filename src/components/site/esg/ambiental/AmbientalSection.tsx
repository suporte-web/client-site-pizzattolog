import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import { SectionLabel } from '@/components/site/section-label';

import {
  getContentString,
  type SiteContent,
} from '@/utils/site-content';

interface AmbientalSectionProps {
  conteudo?: SiteContent;
}

export function AmbientalSection({
  conteudo,
}: AmbientalSectionProps) {
  const imagemAmbiental = getContentString(
    conteudo,
    'ambiental.imagemUrl',
    '/images/esg/Ambiental-ESG.png',
  );

  return (
    <Box
      component="section"
      id="ambiental"
      sx={{
        pt: {
          xs: 0,
          md: 0,
        },

        pb: {
          xs: 7,
          md: 10,
        },

        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },

            gap: {
              xs: 5,
              md: 8,
            },

            alignItems: 'center',
          }}
        >
          {/* =====================================================
              LADO ESQUERDO - TEXTO
          ====================================================== */}

          <Stack
            spacing={3}
            sx={{
              width: '100%',
              boxSizing: 'border-box',

              pl: {
                xs: 0,
                md: 5,
                lg: 8,
              },

              pr: {
                xs: 0,
                md: 2,
              },
            }}
          >
            <SectionLabel>ESG</SectionLabel>

            <Typography
              component="h2"
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Ambiental
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
              O transporte rodoviário é a base da movimentação de cargas no
              Brasil, mas também representa um desafio ambiental crítico devido
              às emissões de CO₂.
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
              Na Pizzattolog, encaramos essa realidade com transparência e ação:{' '}

              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                }}
              >
                otimizamos rotas
              </Box>

              ,{' '}

              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                }}
              >
                consolidamos cargas
              </Box>{' '}

              e{' '}

              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                }}
              >
                modernizamos a frota
              </Box>{' '}

              para{' '}

              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  color: 'text.primary',
                }}
              >
                reduzir continuamente a nossa pegada de carbono
              </Box>
              .
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
              A evolução contínua da nossa operação nos guia para uma logística
              cada vez mais limpa e responsável.
            </Typography>
          </Stack>

          {/* =====================================================
              LADO DIREITO - IMAGEM
          ====================================================== */}

          <Box
            sx={{
              position: 'relative',

              width: '100%',

              maxWidth: {
                xs: 520,
                md: 600,
              },

              mx: {
                xs: 'auto',
                md: 0,
              },

              aspectRatio: '1 / 1',

              borderRadius: {
                xs: '28px 28px 28px 60px',
                md: '40px 40px 40px 90px',
              },

              overflow: 'hidden',

              bgcolor: 'grey.100',
            }}
          >
            <Box
              component="img"
              src={imagemAmbiental}
              alt="Compromisso ambiental da Pizzattolog com uma logística mais sustentável"
              sx={{
                display: 'block',

                width: '100%',

                height: '100%',

                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}