import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import type { Subpagina } from '@/types/site';
import type { QuemSomosConteudo } from '@/types/site-institucional';
import { SectionLabel } from '@/components/site/section-label';

interface CertificacoesSectionProps {
  subpagina?: Subpagina;
  certificacoes?: QuemSomosConteudo['certificacoes'];
}

const certificacoes = [
  {
    id: 'plvb',
    titulo: 'PLVB',
    descricao:
      'Membro certificado do Programa de Logística Verde Brasil, reforçando nosso compromisso com práticas logísticas mais sustentáveis.',
    imagem: '/images/certificacoes/plvb.png',
    icone: <LocalShippingRoundedIcon />,
    cor: '#2f8061',
  },
  {
    id: 'sassmaq',
    titulo: 'SASSMAQ',
    descricao:
      'Empresa aprovada no Sistema de Avaliação de Segurança, Saúde, Meio Ambiente e Qualidade para operações responsáveis.',
    imagem: '/images/certificacoes/sassmaq.png',
    icone: <HealthAndSafetyRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    id: 'hospital-pequeno-principe',
    titulo: 'Hospital Pequeno Príncipe',
    descricao:
      'Empresa apoiadora do Hospital Pequeno Príncipe, contribuindo com uma das principais instituições pediátricas do país.',
    imagem: '/images/certificacoes/hospital-pequeno-principe.png',
    icone: <VolunteerActivismRoundedIcon />,
    cor: '#f23f35',
  },
  {
    id: 'empresa-b',
    titulo: 'Empresa B Certificada',
    descricao:
      'Certificação que reconhece empresas comprometidas com impacto social e ambiental positivo, ética e responsabilidade nos negócios.',
    imagem: '/images/certificacoes/empresa-b.png',
    icone: <WorkspacePremiumRoundedIcon />,
    cor: '#010102',
  },
];

export function CertificacoesSection({
  subpagina,
  certificacoes: certificacoesEditaveis,
}: CertificacoesSectionProps) {
  const cards = certificacoesEditaveis
    ? certificacoesEditaveis?.map((certificacaoEditavel, index) => {
      const certificacao =
        certificacoes[index] ?? certificacoes[0];

      return {
      ...certificacao,
      id:
        certificacaoEditavel.id?.trim() ||
        certificacao.id,
      titulo:
        certificacaoEditavel.titulo?.trim() ||
        certificacao.titulo,
      descricao:
        certificacaoEditavel.descricao?.trim() ||
        certificacao.descricao,
      imagemUrl:
        certificacaoEditavel.imagemUrl?.trim() ||
        certificacao.imagem,
      };
    })
    : certificacoes.map((certificacao) => ({
      ...certificacao,
      imagemUrl: certificacao.imagem,
    }));

  return (
    <Box
      component="section"
      id={subpagina?.ancora ?? 'certificacoes'}
      sx={{
        py: { xs: 8, md: 11 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={5}>
          <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <SectionLabel>Certificações</SectionLabel>
            <Typography variant="h2" sx={{ maxWidth: 860, fontSize: { xs: '2rem', md: '3rem' } }}>
              Reconhecimentos que reforçam nossa responsabilidade
            </Typography>
            <Typography sx={{ maxWidth: 820, color: 'text.secondary', fontSize: 18, lineHeight: 1.75 }}>
              Nossas certificações e parcerias demonstram compromisso com qualidade, segurança, sustentabilidade,
              governança e impacto social positivo.
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            {cards.map((certificacao) => (
              <Grid key={certificacao.id} id={certificacao.id} size={{ xs: 12, sm: 6, lg: 3 }}>
                <Paper
                  elevation={0}
                  sx={{
                    scrollMarginTop: { xs: 96, md: 110 },
                    position: 'relative',
                    height: '100%',
                    minHeight: 360,
                    p: { xs: 3, md: 3.5 },
                    borderRadius: 3,
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                    bgcolor: 'white',
                    overflow: 'hidden',
                    boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '50%',
                      width: 76,
                      height: 5,
                      borderRadius: '0 0 999px 999px',
                      bgcolor: certificacao.cor,
                      transform: 'translateX(-50%)',
                    },
                    '&:hover': {
                      transform: { md: 'translateY(-5px)' },
                      boxShadow: `0 22px 44px ${certificacao.cor}2e`,
                    },
                  }}
                >
                  <Stack spacing={2.4} sx={{ height: '100%', alignItems: 'center', textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: '100%',
                        minHeight: 150,
                        display: 'grid',
                        placeItems: 'center',
                        p: { xs: 1, md: 1.5 },
                      }}
                    >
                      <Box
                        component="img"
                        src={certificacao.imagemUrl}
                        alt={certificacao.titulo}
                        sx={{
                          display: 'block',
                          maxWidth: '100%',
                          maxHeight: 112,
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 58,
                        height: 58,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        bgcolor: certificacao.cor,
                        color: 'white',
                        boxShadow: `0 14px 28px ${certificacao.cor}38`,
                        '& svg': { fontSize: 31 },
                      }}
                    >
                      {certificacao.icone}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.18 }}>
                      {certificacao.titulo}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.68 }}>
                      {certificacao.descricao}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
