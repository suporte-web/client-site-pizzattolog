import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';

import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import type {
  Subpagina,
} from '@/types/site';

import type {
  QuemSomosConteudo,
} from '@/types/site-institucional';

import {
  SectionLabel,
} from '@/components/site/section-label';

interface MissaoSectionProps {
  missao?: Subpagina;

  visao?: Subpagina;

  conteudoMissao?: QuemSomosConteudo['missao'];

  conteudoVisao?: QuemSomosConteudo['visao'];

  valores?: QuemSomosConteudo['valores'];

  valoresResumo?: QuemSomosConteudo['valoresResumo'];
}

export function MissaoSection({
  missao,
  visao,
  conteudoMissao,
  conteudoVisao,
  valores,
  valoresResumo,
}: MissaoSectionProps) {
  /*
  |--------------------------------------------------------------------------
  | RESUMO DOS VALORES
  |--------------------------------------------------------------------------
  */

  const valoresValidos =
    valores?.filter(
      (valor) =>
        valor.titulo?.trim() ||
        valor.descricao?.trim(),
    ) ?? [];

  const descricaoValores =
    valoresValidos.length > 0
      ? valoresValidos
          .map((valor) => {
            const titulo =
              valor.titulo?.trim();

            const descricao =
              valor.descricao?.trim();

            if (
              titulo &&
              descricao
            ) {
              return `${titulo}: ${descricao}`;
            }

            return (
              titulo ||
              descricao ||
              ''
            );
          })
          .filter(Boolean)
          .join(' • ')
      : 'Influenciamos positivamente nossos colaboradores. Somos comprometidos com o sucesso do cliente. Criamos espaços para diálogo com respeito e humildade. Estimulamos a inovação simples.';

  const cards = [
    {
      id:
        missao?.ancora ??
        'missao',

      titulo:
        conteudoMissao?.titulo?.trim() ||
        'Propósito',

      descricao:
        conteudoMissao?.texto?.trim() ||
        'Simplificar soluções para cuidar do que importa.',

      icone:
        <FlagRoundedIcon />,

      cor: '#ffb71b',
    },

    {
      id:
        visao?.ancora ??
        'visao',

      titulo:
        conteudoVisao?.titulo?.trim() ||
        'Visão',

      descricao:
        conteudoVisao?.texto?.trim() ||
        'Somos um parceiro estratégico, integramos soluções personalizadas, com geração de valor a clientes, colaboradores e sociedade.',

      icone:
        <VisibilityRoundedIcon />,

      cor: '#ff5805',
    },

    {
      id: 'valores',

      titulo:
        valoresResumo?.titulo?.trim() ||
        'Valores',

      descricao:
        valoresResumo?.texto?.trim() ||
        descricaoValores,

      icone:
        <VolunteerActivismRoundedIcon />,

      cor: '#f23f35',
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        bgcolor:
          'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Stack
          spacing={2}
          sx={{
            mb: 4,
          }}
        >
          <SectionLabel>
            Propósito, visão e valores
          </SectionLabel>

          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '2rem',
                md: '3rem',
              },
            }}
          >
            O que orienta a nossa
            atuação
          </Typography>
        </Stack>

        <Grid
          container
          spacing={3}
        >
          {cards.map((card) => (
            <Grid
              key={card.id}
              id={card.id}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  position:
                    'relative',

                  height: '100%',

                  p: {
                    xs: 3,
                    md: 4,
                  },

                  pt: {
                    xs: 4,
                    md: 4.5,
                  },

                  border:
                    '1px solid',

                  borderColor:
                    'divider',

                  borderRadius: 2,

                  overflow:
                    'hidden',

                  transition:
                    'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',

                  '&:before': {
                    content: '""',

                    position:
                      'absolute',

                    top: 0,
                    left: 0,
                    right: 0,

                    height: 5,

                    bgcolor:
                      card.cor,
                  },

                  '&:hover': {
                    transform: {
                      md: 'translateY(-4px)',
                    },

                    borderColor:
                      card.cor,

                    boxShadow:
                      '0 18px 42px rgba(23, 69, 107, 0.14)',
                  },
                }}
              >
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,

                      borderRadius: 2,

                      display: 'grid',

                      placeItems:
                        'center',

                      color:
                        card.cor,

                      bgcolor: `${card.cor}18`,

                      '& svg': {
                        fontSize: 34,
                      },
                    }}
                  >
                    {card.icone}
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 850,
                    }}
                  >
                    {card.titulo}
                  </Typography>

                  <Typography
                    sx={{
                      color:
                        'text.secondary',

                      lineHeight:
                        1.75,

                      whiteSpace:
                        'pre-line',
                    }}
                  >
                    {card.descricao}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
