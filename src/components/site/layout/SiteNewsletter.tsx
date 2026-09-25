'use client';

import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

export function SiteNewsletter() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!nome.trim() || !email.trim()) {
      return;
    }

    setEnviado(true);
    setNome('');
    setEmail('');
  }

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, bgcolor: '#ECECEC' }}>
      <Container maxWidth="xl">
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Stack spacing={3} sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Box
              sx={{
                width: 62,
                height: 62,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: '#ff5805',
                color: 'white',
                boxShadow: '0 16px 34px rgba(255, 88, 5, 0.26)',
                '& svg': { fontSize: 34 },
              }}
            >
              <MarkEmailReadRoundedIcon />
            </Box>

            <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
              <Typography variant="h2" sx={{ color: '#555', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.08 }}>
                Informativo Pizzattolog
              </Typography>
              <Typography sx={{ maxWidth: 850, color: '#5d5d5d', fontSize: { xs: 17, md: 21 }, lineHeight: 1.55 }}>
                Receba mensalmente conteúdos sobre logística, tecnologia e tendências do setor, com insights práticos
                para apoiar decisões e aprimorar a eficiência das operações.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 2, md: 1.5 }}
              sx={{ width: '100%', alignItems: { xs: 'stretch', md: 'flex-start' } }}
            >
              <TextField
                required
                fullWidth
                label="Nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                sx={{
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': { borderRadius: 1 },
                }}
              />
              <TextField
                required
                fullWidth
                type="email"
                label="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': { borderRadius: 1 },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                endIcon={<SendRoundedIcon />}
                sx={{
                  minHeight: 56,
                  px: { xs: 4, md: 7 },
                  flexShrink: 0,
                  fontSize: 18,
                  fontWeight: 900,
                }}
              >
                Assine
              </Button>
            </Stack>

            <Typography sx={{ width: '100%', color: '#626262', fontSize: 15.5, textAlign: { xs: 'center', md: 'left' } }}>
              {enviado
                ? 'Cadastro recebido. Obrigado por assinar o informativo Pizzattolog.'
                : 'Seus dados estão seguros conosco. Ao assinar, você concorda com nossa Política de Privacidade e com o recebimento de conteúdos informativos.'}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
