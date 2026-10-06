'use client';

import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';

const opcoes: Array<{ titulo: string; descricao: string; icone: typeof ChatBubbleOutlineRoundedIcon; href?: string; botao?: string; telefone?: string }> = [
  {
    titulo: 'Registro de Reclamações e Elogios',
    descricao: 'Sua experiência com a Pizzattolog.',
    icone: ChatBubbleOutlineRoundedIcon,
    href: '/reclamacoes-elogios',
    botao: 'Registrar ocorrência',
  },
  {
    titulo: 'Rastreamento de Carga',
    descricao: 'Informações sobre o transporte da sua carga.',
    icone: LocalShippingOutlinedIcon,
    href: '/rastreamento',
    botao: 'Rastrear carga',
  },
  {
    titulo: 'Fale com Atendente',
    descricao: 'Atendimento para dúvidas e solicitações.',
    icone: SupportAgentRoundedIcon,
    href: 'https://wa.me/554192668847',
    botao: 'Falar pelo WhatsApp',
    // telefone: '+55 (41) 9266-8847',
  },
];

export function PaginaCanalDoCliente() {
  return (
    <Box component="main" sx={{ bgcolor: '#F7F8F8', pt: { xs: 13, md: 16 }, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Stack spacing={2} sx={{ mb: { xs: 4, md: 6 }, maxWidth: 760 }}>
          <Typography component="h1" sx={{ fontSize: { xs: '2.45rem', md: '4rem' }, fontWeight: 850, lineHeight: 1.1, color: 'text.primary' }}>
            Canal do Cliente
          </Typography>
          <Typography sx={{ fontSize: { xs: 17, md: 20 }, color: 'text.secondary', lineHeight: 1.7 }}>
            Um espaço para acompanhar sua carga e se comunicar com a Pizzattolog.
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          {opcoes.map(({ titulo, descricao, icone: Icone, href, botao, telefone }) => (
            <Grid key={titulo} size={{ xs: 12, sm: 6, md: 4 }}>
              <Paper component="section" elevation={0} sx={{ height: '100%', p: { xs: 3, md: 4 }, border: '1px solid #e5e7eb', borderRadius: 3, bgcolor: 'white' }}>
                <Box sx={{ display: 'inline-flex', p: 1.5, mb: 3, bgcolor: 'rgba(255,88,5,0.08)', color: '#ff5805', borderRadius: 2 }}>
                  <Icone sx={{ fontSize: 32 }} />
                </Box>
                <Typography component="h2" sx={{ fontSize: 21, fontWeight: 800, lineHeight: 1.35, mb: 1.5 }}>
                  {titulo}
                </Typography>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{descricao}</Typography>
                {telefone && <Typography sx={{ mt: 1, fontWeight: 700 }}>{telefone}</Typography>}
                {href && <Button component="a" href={href} variant="contained" sx={{ mt: 3, bgcolor: '#ff5805', '&:hover': { bgcolor: '#f23f35' } }}>{botao}</Button>}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
