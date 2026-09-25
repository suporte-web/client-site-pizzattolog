import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { SectionLabel } from '@/components/site/section-label';

export function RelatorioSection() {
  return (
    <Box
      component="section"
      id="relatorio-sustentabilidade"
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            position: 'relative',

            overflow: 'hidden',

            borderRadius: {
              xs: 4,
              md: 5,
            },

            border: '1px solid rgba(255, 88, 5, 0.20)',
            borderColor: 'divider',

            bgcolor: '#FFF4ED',

            px: {
              xs: 3,
              sm: 4,
              md: 6,
            },

            py: {
              xs: 4,
              md: 5,
            },

            boxShadow: '0 16px 40px rgba(255, 88, 5, 0.10)',
          }}
        >
          {/* DETALHE DECORATIVO */}

          <Box
            sx={{
              position: 'absolute',

              top: 0,
              left: 0,

              width: {
                xs: 80,
                md: 130,
              },

              height: 5,

              bgcolor: '#ff5805',

              borderRadius: '0 0 999px 0',
            }}
          />

          <Box
            sx={{
              display: 'flex',

              flexDirection: {
                xs: 'column',
                md: 'row',
              },

              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },

              justifyContent: 'space-between',

              gap: {
                xs: 4,
                md: 6,
              },
            }}
          >
            {/* ==============================================
                LADO ESQUERDO
            =============================================== */}

            <Stack
              spacing={2}
              sx={{
                maxWidth: 800,
              }}
            >
              <Box
                sx={{
                  width: 58,
                  height: 58,

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  borderRadius: 3,

                  bgcolor: 'rgba(255, 88, 5, 0.10)',
                  color: '#ff5805',
                }}
              >
                <PictureAsPdfRoundedIcon
                  sx={{
                    fontSize: 32,
                  }}
                />
              </Box>

              <SectionLabel>Transparência e Sustentabilidade</SectionLabel>

              <Typography
                component="h2"
                variant="h4"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Relatório de Sustentabilidade 2024
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.8,

                  fontSize: {
                    xs: '1rem',
                    md: '1.05rem',
                  },
                }}
              >
                Abaixo, está disponível para consulta o nosso Relatório de
                Sustentabilidade 2024, reunindo nossas principais iniciativas,
                resultados e compromissos ambientais, sociais e de governança.
              </Typography>
            </Stack>

            {/* ==============================================
                BOTÃO
            =============================================== */}

            <Button
              component="a"
              href="/documentos/Relatorio-Sustentabilidade-2024.pdf"
              download
              variant="contained"

              startIcon={<DownloadRoundedIcon />}
              sx={{
                flexShrink: 0,

                px: 3.5,
                py: 1.4,
                bgcolor: '#ff5805',
                color: '#ffffff',
                borderRadius: 99,

                textTransform: 'none',

                fontSize: '0.95rem',
                fontWeight: 800,

                boxShadow: 'none',

                '&:hover': {
                  boxShadow: 'none',
                },
              }}
            >
              Baixar relatório
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
