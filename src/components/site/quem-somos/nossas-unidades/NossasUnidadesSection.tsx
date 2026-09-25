'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import type { Subpagina } from '@/types/site';
import type { QuemSomosConteudo } from '@/types/site-institucional';
import { SectionLabel } from '@/components/site/section-label';

import type { UnidadeMapa } from './MapaUnidades';

interface NossasUnidadesSectionProps {
  subpagina?: Subpagina;
  id?: string;
  etiqueta?: string;
  titulo?: string;
  descricao?: string;
  bgcolor?: string;
  unidadesEditaveis?: NonNullable<QuemSomosConteudo['unidades']>['itens'];
}

const MapaUnidades = dynamic(
  () => import('./MapaUnidades').then((modulo) => modulo.MapaUnidades),
  {
    ssr: false,
    loading: () => (
      <Paper
        elevation={0}
        sx={{
          display: 'grid',
          placeItems: 'center',
          minHeight: { xs: 430, sm: 500, lg: 620 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>
          Carregando mapa...
        </Typography>
      </Paper>
    ),
  },
);

const unidades: UnidadeMapa[] = [
  {
    id: 'curitiba-matriz',
    nome: 'Curitiba - PR (Matriz)',
    tipo: 'Matriz',
    endereco: 'Rua Nunes Machado, 68 - 15º andar, Batel, 80250-000.',
    cidade: 'Curitiba - PR',
    latitude: -25.4389,
    longitude: -49.2768,
  },
  {
    id: 'curitiba-filial',
    nome: 'Filial Curitiba - PR',
    tipo: 'Filial',
    endereco: 'Rua Frei Gaspar da Madre de Deus, 830 - Prédio 26, Portão, 81050-590.',
    cidade: 'Curitiba - PR',
    latitude: -25.4767,
    longitude: -49.3048,
  },
  {
    id: 'sao-jose-dos-pinhais',
    nome: 'Filial São José dos Pinhais - PR',
    tipo: 'Filial',
    endereco: 'Rua do Colono, 2146 - Costeira, 83075-000.',
    cidade: 'São José dos Pinhais - PR',
    latitude: -25.5486,
    longitude: -49.1784,
  },
  {
    id: 'rodeio',
    nome: 'Filial Rodeio - SC',
    tipo: 'Filial',
    endereco: 'Rua Jose Ostrowski Junior, 623 - Kaspereit, 89136-000.',
    cidade: 'Rodeio - SC',
    latitude: -26.9237,
    longitude: -49.3652,
  },
  {
    id: 'guarulhos',
    nome: 'Filial Guarulhos - SP',
    tipo: 'Filial',
    endereco: 'Estrada Velha, 100 - Cumbica, 07231-010.',
    cidade: 'Guarulhos - SP',
    latitude: -23.4422,
    longitude: -46.4743,
  },
  {
    id: 'varginha',
    nome: 'Filial Varginha - MG',
    tipo: 'Filial',
    endereco: 'Avenida Princesa do Sul, 950 - Jardim Andere, 37.026-080.',
    cidade: 'Varginha - MG',
    latitude: -21.5549,
    longitude: -45.4364,
  },
  {
    id: 'feira-de-santana',
    nome: 'Filial Feira de Santana - BA',
    tipo: 'Filial',
    endereco: 'Avenida Deputado Luís Eduardo Magalhaes - Limoeiro, 44.097-324.',
    cidade: 'Feira de Santana - BA',
    latitude: -12.246,
    longitude: -38.9437,
  },
  {
    id: 'parnamirim',
    nome: 'Filial Parnamirim - RN',
    tipo: 'Filial',
    endereco: 'Rua Piloto Pereira Tim, 1762 - Monte Claro, 59146-220.',
    cidade: 'Parnamirim - RN',
    latitude: -5.9275,
    longitude: -35.2631,
  },
];

export function NossasUnidadesSection({
  subpagina,
  id,
  etiqueta = 'Nossas unidades',
  titulo = 'Nossas Unidades',
  descricao = 'Confira nossas unidades estrategicamente localizadas para apoiar operações logísticas de alta complexidade em diferentes regiões do Brasil.',
  bgcolor = 'background.default',
  unidadesEditaveis,
}: NossasUnidadesSectionProps) {
  const unidadesVisiveis = unidadesEditaveis ?? unidades;
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<UnidadeMapa | undefined>(
    unidadesVisiveis[0],
  );

  useEffect(() => {
    if (
      unidadeSelecionada &&
      unidadesVisiveis.some((unidade) => unidade.id === unidadeSelecionada.id)
    ) {
      return;
    }

    setUnidadeSelecionada(unidadesVisiveis[0]);
  }, [unidadeSelecionada, unidadesVisiveis]);

  const estadosAtendidos = useMemo(
    () =>
      Array.from(
        new Set(unidadesVisiveis.map((unidade) => unidade.cidade.split(' - ').at(-1))),
      ).filter(Boolean),
    [unidadesVisiveis],
  );

  return (
    <Box
      component="section"
      id={id ?? subpagina?.ancora ?? 'nossas-unidades'}
      sx={{
        py: {
          xs: 7,
          md: 10,
        },
        bgcolor,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Grid
            container
            spacing={{ xs: 3, md: 5 }}
            sx={{ alignItems: 'flex-end' }}
          >
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={2}>
                <SectionLabel>{etiqueta}</SectionLabel>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: '2rem',
                      md: '3rem',
                    },
                  }}
                >
                  {titulo}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: {
                      xs: 16,
                      md: 18,
                    },
                    lineHeight: 1.75,
                    maxWidth: 750,
                  }}
                >
                  {descricao}
                </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{ justifyContent: { md: 'flex-end' } }}
              >
                <Chip
                  label={`${unidadesVisiveis.length} unidades`}
                  sx={{ bgcolor: 'rgba(255, 183, 27, 0.18)', color: 'text.primary', fontWeight: 800 }}
                />
                <Chip
                  label={`${estadosAtendidos.length} estados atendidos`}
                  sx={{ bgcolor: 'rgba(255, 88, 5, 0.14)', color: 'text.primary', fontWeight: 800 }}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={{ xs: 3, md: 4 }}
            sx={{ alignItems: 'stretch' }}
          >
            <Grid size={{ xs: 12, lg: 8 }}>
              {unidadesVisiveis.length ? (
                <MapaUnidades
                  unidades={unidadesVisiveis}
                  unidadeSelecionada={unidadeSelecionada}
                  onSelecionarUnidade={setUnidadeSelecionada}
                />
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    display: 'grid',
                    placeItems: 'center',
                    minHeight: { xs: 430, sm: 500, lg: 620 },
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    Nenhuma unidade cadastrada.
                  </Typography>
                </Paper>
              )}
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 850,
                      fontSize: 20,
                    }}
                  >
                    Escolha uma unidade
                  </Typography>

                  <Typography sx={{ color: 'text.secondary', mt: 0.75 }}>
                    Clique no card ou no pin do mapa para ver os detalhes.
                  </Typography>
                </Box>

                <Stack
                  spacing={1.25}
                  sx={{
                    p: { xs: 2, md: 2.5 },
                    maxHeight: { lg: 540 },
                    overflowY: 'auto',
                  }}
                >
                  {unidadesVisiveis.map((unidade) => {
                    const selecionada = unidade.id === unidadeSelecionada?.id;

                    return (
                      <Paper
                        key={unidade.id}
                        component="button"
                        type="button"
                        elevation={0}
                        onClick={() => setUnidadeSelecionada(unidade)}
                        aria-pressed={selecionada}
                        sx={{
                          width: '100%',
                          textAlign: 'left',
                          p: 2,
                          border: '1px solid',
                          borderColor: selecionada
                            ? '#ff5805'
                            : 'divider',
                          bgcolor: selecionada
                            ? 'rgba(255, 88, 5, 0.08)'
                            : 'background.paper',
                          borderRadius: 2,
                          cursor: 'pointer',
                          transition:
                            'border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
                          '&:hover': {
                            borderColor: '#ff5805',
                            boxShadow: '0 14px 34px rgba(23, 69, 107, 0.12)',
                            transform: {
                              md: 'translateY(-2px)',
                            },
                          },
                          '&:focus-visible': {
                            outline: '3px solid rgba(217, 104, 49, 0.35)',
                            outlineOffset: 2,
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 40,
                              height: 40,
                              flexShrink: 0,
                              borderRadius: 2,
                              bgcolor: selecionada
                                ? '#ff5805'
                                : 'rgba(255, 183, 27, 0.2)',
                              color: selecionada
                                ? 'white'
                                : '#ff5805',
                            }}
                          >
                            <BusinessRoundedIcon fontSize="small" />
                          </Box>

                          <Stack spacing={0.75} sx={{ minWidth: 0 }}>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                alignItems: 'center',
                                flexWrap: 'wrap',
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 850,
                                  fontSize: 16,
                                }}
                              >
                                {unidade.nome}
                              </Typography>

                              {unidade.tipo === 'Matriz' && (
                                <Chip
                                  label="Matriz"
                                  size="small"
                                  color="secondary"
                                  sx={{ height: 22 }}
                                />
                              )}
                            </Stack>

                            <Stack
                              direction="row"
                              spacing={0.75}
                              sx={{ alignItems: 'flex-start' }}
                            >
                              <LocationOnRoundedIcon
                                sx={{
                                  fontSize: 17,
                                  mt: '2px',
                                  color: 'secondary.main',
                                }}
                              />

                              <Typography
                                sx={{
                                  color: 'text.secondary',
                                  fontSize: 14,
                                  lineHeight: 1.5,
                                }}
                              >
                                {unidade.endereco}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Paper>
                    );
                  })}
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          {unidadeSelecionada ? (
            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${unidadeSelecionada.endereco} ${unidadeSelecionada.cidade}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              startIcon={<NearMeRoundedIcon />}
              sx={{
                width: { xs: '100%', sm: 'fit-content' },
                alignSelf: { sm: 'flex-end' },
              }}
            >
              Abrir unidade selecionada no Google Maps
            </Button>
          ) : null}
        </Stack>
      </Container>
    </Box>
  );
}
