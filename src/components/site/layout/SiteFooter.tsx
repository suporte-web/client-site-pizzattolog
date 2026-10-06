 'use client';

import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Container, Divider, Grid, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import type { Rodape } from '@/types/site';
import { normalizeSitePath } from '@/utils/routes';
import { CanalDoCliente } from './CanalDoCliente';

interface SiteFooterProps {
  nomeEmpresa: string;
  rodape: Rodape;
}

function SpotifyIcon() {
  return (
    <SvgIcon viewBox="0 0 496 512">
      <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4Zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7 0 10.8-8.5 19.5-19.4 19.5Zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3Z" />
    </SvgIcon>
  );
}

const redesSociais = [
  {
    titulo: 'Facebook',
    url: 'https://www.facebook.com/pizzattolog/',
    icone: <FacebookRoundedIcon />,
  },
  {
    titulo: 'Instagram',
    url: 'https://www.instagram.com/pizzattolog/',
    icone: <InstagramIcon />,
  },
  {
    titulo: 'LinkedIn',
    url: 'https://www.linkedin.com/company/pizzattolog',
    icone: <LinkedInIcon />,
  },
  {
    titulo: 'YouTube',
    url: 'https://www.youtube.com/c/PIZZATTOLOG',
    icone: <YouTubeIcon />,
  },
  {
    titulo: 'Spotify',
    url: 'https://open.spotify.com/show/4tBjaCuCzKGSCETk6r6pWP?si=ec55c1a3bcb647fa&nd=1&dlsi=b2426b9a4f03443b',
    icone: <SpotifyIcon />,
  },
];

const linksLegais = [
  {
    titulo: 'Nossos Programas Sociais',
    url: '/social',
  },
  {
    titulo: 'Canal de Ouvidoria',
    url: 'https://www.contatoseguro.com.br/pizzattolog',
  },
  {
    titulo: 'Termos de Uso',
    url: '/termos-de-uso',
  },
  {
    titulo: 'LGPD',
    url: '/lei-geral-de-protecao-de-dados',
  },
  {
    titulo: 'Política de Privacidade',
    url: '/politica-de-privacidade',
  },
];

const logoUrl = 'https://pizzattolog.com.br/wp-content/uploads/2025/06/logo-pizzattolog.png';
const blogFooterLink = { id: 'blog', titulo: 'Blog', url: '/blog/', ordem: 999, ativo: true };

function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url);
}

function getFooterSectionsWithBlog(rodape: Rodape) {
  return rodape.secoes.map((secao) => {
    const isEmpresa = secao.titulo.trim().toLowerCase() === 'empresa';
    const hasBlog = secao.links.some((link) => link.url?.replace(/\/$/, '') === '/blog');

    if (!isEmpresa || hasBlog) {
      return secao;
    }

    return {
      ...secao,
      links: [...secao.links, blogFooterLink].sort(
        (a, b) => a.ordem - b.ordem || a.titulo.localeCompare(b.titulo, 'pt-BR'),
      ),
    };
  });
}

export function SiteFooter({ nomeEmpresa, rodape }: SiteFooterProps) {
  const secoesRodape = getFooterSectionsWithBlog(rodape);

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#525252',
        color: 'white',
        pt: { xs: 6, md: 8 },
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack sx={{ alignItems: 'flex-start', mb: 2 }}>
              <Box
                component="img"
                src="/images/logo/logobranca.png"
                alt={rodape.nomeEmpresa || nomeEmpresa}
                sx={{
                  width: 220,
                  maxWidth: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Stack>

            <Typography sx={{ color: 'rgba(255,255,255,0.68)', maxWidth: 460, lineHeight: 1.8 }}>
              {rodape.descricao}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
              {redesSociais.map((rede) => (
                <IconButton
                  key={rede.titulo}
                  component="a"
                  href={rede.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${rede.titulo} da Pizzattolog`}
                  sx={{
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.18)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  {rede.icone}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {secoesRodape.map((secao) => (
            <Grid key={secao.id} size={{ xs: 12, sm: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 800, mb: 1.5 }}>{secao.titulo}</Typography>

              <Stack spacing={1}>
                {secao.links.map((link) => {
                  const href = normalizeSitePath(link.url);
                  return (
                    <Button
                      key={link.id}
                      component="a"
                      href={href}
                      target={isExternalUrl(href) ? '_blank' : undefined}
                      rel={isExternalUrl(href) ? 'noopener noreferrer' : undefined}
                      sx={{
                        justifyContent: 'flex-start',
                        color: 'rgba(255,255,255,0.68)',
                        minHeight: 28,
                        px: 0,
                        '&:hover': { color: 'white', bgcolor: 'transparent' },
                      }}
                    >
                      {link.titulo}
                    </Button>
                  );
                })}
                {(secao.id === 'contato' || /^contatos?$/i.test(secao.titulo.trim())) && <CanalDoCliente />}
              </Stack>
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Links legais</Typography>
            <Stack spacing={1}>
              {linksLegais.map((link) => (
                <Button
                  key={link.titulo}
                  component="a"
                  href={link.url}
                  target={isExternalUrl(link.url) ? '_blank' : undefined}
                  rel={isExternalUrl(link.url) ? 'noopener noreferrer' : undefined}
                  sx={{
                    justifyContent: 'flex-start',
                    color: 'rgba(255,255,255,0.68)',
                    minHeight: 28,
                    px: 0,
                    '&:hover': { color: 'white', bgcolor: 'transparent' },
                  }}
                >
                  {link.titulo}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5, borderColor: 'rgba(255,255,255,0.12)' }} />

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.55)' }}>
          {rodape.direitosAutorais}
        </Typography>
      </Container>
    </Box>
  );
}
