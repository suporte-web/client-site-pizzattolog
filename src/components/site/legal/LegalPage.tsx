import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import PrivacyTipRoundedIcon from '@mui/icons-material/PrivacyTipRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

export type LegalPageKind = 'lgpd' | 'termos' | 'privacidade';

export interface LegalSection {
  titulo: string;
  paragrafos: string[];
}

interface LegalPageProps {
  tipo: LegalPageKind;
  titulo: string;
  resumo: string;
  secoes: LegalSection[];
}

const icones = {
  lgpd: <SecurityRoundedIcon />,
  termos: <GavelRoundedIcon />,
  privacidade: <PrivacyTipRoundedIcon />,
};

export function LegalPage({ tipo, titulo, resumo, secoes }: LegalPageProps) {
  return (
    <Box component="main">
      <Box
        component="section"
        sx={{
          pt: { xs: 14, md: 17 },
          pb: { xs: 7, md: 10 },
          bgcolor: 'primary.dark',
          color: 'white',
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2.5} sx={{ maxWidth: 980 }}>
            <Box
              sx={{
                width: 'fit-content',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.75,
                borderRadius: 99,
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.14)',
                border: '1px solid rgba(255,255,255,0.18)',
                '& svg': { fontSize: 20, flexShrink: 0 },
              }}
            >
              {icones[tipo]}
              <Typography component="span" sx={{ fontSize: 13, fontWeight: 800, lineHeight: 1 }}>
                Informações legais
              </Typography>
            </Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4.2rem' }, lineHeight: 1.04 }}>
              {titulo}
            </Typography>
            <Typography sx={{ maxWidth: 820, color: 'rgba(255,255,255,0.78)', fontSize: 19, lineHeight: 1.7 }}>
              {resumo}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              border: '1px solid rgba(15, 23, 42, 0.06)',
              bgcolor: 'white',
              boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
            }}
          >
            <Stack spacing={4}>
              {secoes.map((secao) => (
                <Stack key={secao.titulo} spacing={1.5}>
                  <Typography variant="h3" sx={{ fontSize: { xs: '1.55rem', md: '2.1rem' }, fontWeight: 900 }}>
                    {secao.titulo}
                  </Typography>
                  {secao.paragrafos.map((paragrafo) => (
                    <Typography key={paragrafo} sx={{ color: 'text.secondary', fontSize: 17, lineHeight: 1.82 }}>
                      {paragrafo}
                    </Typography>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
