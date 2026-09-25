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

interface GovernancaSectionProps {
  conteudo?: SiteContent;
}

export function GovernancaSection({
  conteudo,
}: GovernancaSectionProps) {
  const imagemGovernanca = getContentString(
    conteudo,
    'governanca.imagemUrl',
    '/images/esg/Governanca-Corporativa.png',
  );

  return (
    <Box
      component="section"
      id="governanca"
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        bgcolor: '#ffffff',
        color: '#17212B',

        fontFamily:
          '"Roboto", Arial, ui-sans-serif, system-ui, sans-serif',
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
              TEXTO - LADO ESQUERDO
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
            <SectionLabel>Governança</SectionLabel>

            <Typography
              component="h2"
              sx={{
                fontFamily:
                  '"Roboto", Arial, ui-sans-serif, system-ui, sans-serif',

                fontSize: {
                  xs: '2.5rem',
                  md: '54.857px',
                },

                fontWeight: 800,

                lineHeight: 1.1,

                color: '#17212B',

                letterSpacing: '-0.02em',
              }}
            >
              Governança Corporativa
            </Typography>

            <Box
              sx={{
                width: 72,
                height: 4,

                borderRadius: 99,

                bgcolor: '#ff5805',
              }}
            />

            <Typography
              sx={{
                fontFamily:
                  '"Roboto", Arial, ui-sans-serif, system-ui, sans-serif',

                lineHeight: 1.9,

                color: '#17212B',

                fontSize: {
                  xs: '1rem',
                  md: '1.05rem',
                },
              }}
            >
              Nossa Governança é o alicerce que sustenta a integridade de cada
              quilômetro percorrido. Mais do que gerir riscos, mantemos uma
              estrutura sólida que orienta decisões, assegura transparência e
              fortalece a confiança de clientes, fornecedores e parceiros.
            </Typography>

            <Typography
              sx={{
                fontFamily:
                  '"Roboto", Arial, ui-sans-serif, system-ui, sans-serif',

                lineHeight: 1.9,

                color: '#17212B',

                fontSize: {
                  xs: '1rem',
                  md: '1.05rem',
                },
              }}
            >
              Atuamos com processos definidos, compliance operacional, gestão
              ética e respeito às pessoas, assegurando que crescimento,
              segurança e performance caminhem juntos.
            </Typography>

            <Typography
              sx={{
                fontFamily:
                  '"Roboto", Arial, ui-sans-serif, system-ui, sans-serif',

                lineHeight: 1.9,

                color: '#17212B',

                fontSize: {
                  xs: '1rem',
                  md: '1.05rem',
                },
              }}
            >
              Essa base de governança é o que nos permite evoluir com
              consistência, preservar nossa essência e preparar a empresa para
              as próximas gerações.
            </Typography>
          </Stack>

          {/* =====================================================
              IMAGEM - LADO DIREITO
          ====================================================== */}

          <Box
            sx={{
              width: '100%',

              display: 'flex',

              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={imagemGovernanca}
              alt="Governança corporativa da Pizzattolog"
              sx={{
                display: 'block',

                width: '100%',

                maxWidth: 620,

                height: 'auto',

                objectFit: 'contain',

                borderRadius: {
                  xs: 3,
                  md: 4,
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}