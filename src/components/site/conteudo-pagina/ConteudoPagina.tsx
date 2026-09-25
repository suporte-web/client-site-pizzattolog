 'use client';

import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { Box, Button, Stack, Typography } from '@mui/material';

type BlocoConteudo =
  | { tipo: 'titulo'; texto: string; nivel: 2 | 3 }
  | { tipo: 'imagem'; url: string; legenda: string }
  | { tipo: 'link'; texto: string; url: string }
  | { tipo: 'paragrafo'; texto: string };

export function parseConteudoPagina(conteudo: string): BlocoConteudo[] {
  return conteudo
    .split(/\n{2,}/)
    .map((bloco) => bloco.trim())
    .filter(Boolean)
    .map((bloco) => {
      const imagem = bloco.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imagem) {
        return {
          tipo: 'imagem',
          legenda: imagem[1],
          url: imagem[2],
        };
      }

      if (bloco.startsWith('### ')) {
        return { tipo: 'titulo', nivel: 3, texto: bloco.replace(/^###\s+/, '') };
      }

      if (bloco.startsWith('## ')) {
        return { tipo: 'titulo', nivel: 2, texto: bloco.replace(/^##\s+/, '') };
      }

      const link = bloco.match(/^\[(.*?)\]\((.*?)\)$/);
      if (link) {
        return {
          tipo: 'link',
          texto: link[1],
          url: link[2],
        };
      }

      return { tipo: 'paragrafo', texto: bloco };
    });
}

interface ConteudoPaginaProps {
  conteudo: string;
}

export function ConteudoPagina({ conteudo }: ConteudoPaginaProps) {
  const blocos = parseConteudoPagina(conteudo);

  return (
    <Stack spacing={2.4}>
      {blocos.map((bloco, index) => {
        if (bloco.tipo === 'imagem') {
          return (
            <Box
              key={`${bloco.url}-${index}`}
              component="figure"
              sx={{
                m: 0,
                overflow: 'hidden',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.default',
              }}
            >
              <Box
                component="img"
                src={bloco.url}
                alt={bloco.legenda}
                sx={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
              {bloco.legenda ? (
                <Typography
                  component="figcaption"
                  variant="body2"
                  sx={{ px: 2, py: 1.25, color: 'text.secondary' }}
                >
                  {bloco.legenda}
                </Typography>
              ) : null}
            </Box>
          );
        }

        if (bloco.tipo === 'titulo') {
          return (
            <Typography
              key={`${bloco.texto}-${index}`}
              component={bloco.nivel === 2 ? 'h2' : 'h3'}
              variant={bloco.nivel === 2 ? 'h3' : 'h5'}
              sx={{
                color: 'text.primary',
                fontWeight: 850,
                lineHeight: 1.18,
                mt: index === 0 ? 0 : 1.5,
              }}
            >
              {bloco.texto}
            </Typography>
          );
        }

        if (bloco.tipo === 'link') {
          return (
            <Button
              key={`${bloco.url}-${index}`}
              href={bloco.url}
              variant="contained"
              endIcon={<OpenInNewRoundedIcon />}
              sx={{ alignSelf: 'flex-start' }}
            >
              {bloco.texto}
            </Button>
          );
        }

        return (
          <Typography key={`${bloco.texto}-${index}`} sx={{ color: 'text.secondary', fontSize: 18, lineHeight: 1.8 }}>
            {bloco.texto}
          </Typography>
        );
      })}
    </Stack>
  );
}
