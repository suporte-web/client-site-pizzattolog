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

interface SocialSectionProps {
  conteudo?: SiteContent;
}

export function SocialSection({
  conteudo,
}: SocialSectionProps) {
  const imagemSocial = getContentString(
    conteudo,
    'social.imagemUrl',
    '/images/esg/Social-ESG.png',
  );

  return (
    <Box
      component="section"
      id="social"
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        bgcolor: 'background.paper',
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
              IMAGEM
              CELULAR: aparece depois do texto
              DESKTOP: fica do lado esquerdo
          ====================================================== */}

          <Box
            sx={{
              order: {
                xs: 2,
                md: 1,
              },

              position: 'relative',

              width: '100%',

              overflow: 'hidden',

              borderRadius: {
                xs: 3,
                md: 4,
              },
            }}
          >
            <Box
              component="img"
              src={imagemSocial}
              alt="Compromisso social da Pizzattolog"
              sx={{
                display: 'block',

                width: '100%',

                height: {
                  xs: 300,
                  sm: 400,
                  md: 500,
                },

                objectFit: 'contain',

                borderRadius: {
                  xs: 3,
                  md: 4,
                },
              }}
            />
          </Box>

          {/* =====================================================
              TEXTO
              CELULAR: aparece primeiro
              DESKTOP: fica do lado direito
          ====================================================== */}

          <Stack
            spacing={3}
            sx={{
              order: {
                xs: 1,
                md: 2,
              },

              position: 'relative',

              left: {
                xs: 0,
                md: -40,
                lg: -64,
              },

              pr: {
                xs: 0,
                md: 2,
                lg: 4,
              },
            }}
          >
            <SectionLabel>Social</SectionLabel>

            <Typography
              component="h2"
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Social
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
              Nosso compromisso social começa dentro de casa, priorizando uma
              cultura de cuidado com a segurança e o desenvolvimento de nossos
              colaboradores.
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
              Estamos em constante movimento, aprimorando nossas práticas para
              garantir que a nossa evolução como empresa acompanhe, de forma
              genuína, o bem-estar de quem está ao nosso lado todos os dias.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}