import {
  Box,
  Container,
  Stack,
  Typography,
} from '@mui/material';

import {
  getContentString,
  type SiteContent,
} from '@/utils/site-content';

import SolicitarCotacaoForm from './SolicitarCotacaoForm';

interface SolicitarCotacaoSectionProps {
  conteudo?: SiteContent;
}

export default function SolicitarCotacaoSection({
  conteudo,
}: SolicitarCotacaoSectionProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        bgcolor: '#f7f8fa',
        pt: {
          xs: 11,
          sm: 12,
          md: 14,
        },
        pb: {
          xs: 7,
          md: 12,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* CABEÇALHO DA PÁGINA */}
        <Box
          sx={{
            mb: {
              xs: 4,
              md: 6,
            },
            maxWidth: 850,
          }}
        >
          <Box
            sx={{
              mb: {
                xs: 4,
                md: 6,
              },
              maxWidth: 850,
            }}
          >
            <Typography
              component="h1"
              sx={{
                mt: 6,
                fontSize: {
                  xs: '2.25rem',
                  sm: '3rem',
                  md: '4rem',
                },
                fontWeight: 700,
                lineHeight: {
                  xs: 1.1,
                  md: 1.05,
                },
                letterSpacing: '-0.03em',
                color: '#202124',
              }}
            >
              {getContentString(
                conteudo,
                'hero.titulo',
                'Solicite sua cotação',
              )}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 700,
                color: 'text.secondary',
                fontSize: {
                  xs: 20,
                  md: 18,
                },
                lineHeight: 1.7,
              }}
            >
              {getContentString(
                conteudo,
                'hero.descricao',
                'Conte um pouco sobre a sua operação. Nossa equipe comercial analisará as informações e entrará em contato com você.',
              )}
            </Typography>
          </Box>
        </Box>

        {/* CONTEÚDO / FORMULÁRIO */}
        <Box
          sx={{
            position: 'relative',

          }}
        >
          <SolicitarCotacaoForm />
        </Box>

      </Container>
    </Box>
  );
}