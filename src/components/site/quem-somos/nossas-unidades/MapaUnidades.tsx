'use client';

import { useEffect, useMemo } from 'react';

import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';

export interface UnidadeMapa {
  id: string;
  nome: string;
  tipo: string;
  endereco: string;
  cidade: string;
  latitude: number;
  longitude: number;
}

interface MapaUnidadesProps {
  unidades: UnidadeMapa[];
  unidadeSelecionada?: UnidadeMapa;
  onSelecionarUnidade?: (unidade: UnidadeMapa) => void;
}

function ControladorMapa({
  unidades,
  unidadeSelecionada,
}: {
  unidades: UnidadeMapa[];
  unidadeSelecionada?: UnidadeMapa;
}) {
  const map = useMap();

  useEffect(() => {
    if (!unidadeSelecionada) {
      return;
    }

    map.flyTo([unidadeSelecionada.latitude, unidadeSelecionada.longitude], 11, {
      duration: 0.8,
    });
  }, [map, unidadeSelecionada]);

  useEffect(() => {
    const pontos = unidades.map((unidade) => [
      unidade.latitude,
      unidade.longitude,
    ]) as [number, number][];

    if (pontos.length > 1) {
      map.fitBounds(pontos, {
        padding: [34, 34],
        maxZoom: 6,
      });
    }
  }, [map, unidades]);

  return null;
}

function BotaoVerTodas({ unidades }: { unidades: UnidadeMapa[] }) {
  const map = useMap();

  const verTodas = () => {
    const pontos = unidades.map((unidade) => [
      unidade.latitude,
      unidade.longitude,
    ]) as [number, number][];

    map.fitBounds(pontos, {
      padding: [36, 36],
      maxZoom: 6,
    });
  };

  return (
    <Button
      type="button"
      size="small"
      variant="contained"
      color="secondary"
      startIcon={<FullscreenRoundedIcon />}
      onClick={verTodas}
      sx={{
        position: 'absolute',
        zIndex: 500,
        left: 16,
        bottom: 16,
        minHeight: 38,
        boxShadow: '0 12px 28px rgba(9, 43, 67, 0.25)',
      }}
    >
      Ver todas
    </Button>
  );
}

export function MapaUnidades({
  unidades,
  unidadeSelecionada,
  onSelecionarUnidade,
}: MapaUnidadesProps) {
  const centroInicial = useMemo<[number, number]>(() => {
    if (!unidadeSelecionada) {
      return [-17.2, -44.3];
    }

    return [unidadeSelecionada.latitude, unidadeSelecionada.longitude];
  }, [unidadeSelecionada]);

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0 24px 70px rgba(23, 33, 43, 0.1)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 500,
          top: 16,
          left: 16,
          right: 16,
          pointerEvents: 'none',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Chip
            icon={<LocationOnRoundedIcon />}
            label={unidadeSelecionada?.nome ?? 'Selecione uma unidade'}
            sx={{
              maxWidth: { xs: '100%', sm: 360 },
              bgcolor: 'background.paper',
              boxShadow: '0 12px 28px rgba(23, 33, 43, 0.16)',
              '& .MuiChip-icon': {
                color: '#ff5805',
              },
              '& .MuiChip-label': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />

          <Chip
            label="Mapa interativo"
            color="secondary"
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              boxShadow: '0 12px 28px rgba(217, 104, 49, 0.22)',
            }}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          width: '100%',
          height: {
            xs: 430,
            sm: 500,
            lg: 620,
          },
          minHeight: '100%',

          '& .leaflet-container': {
            width: '100%',
            height: '100%',
            zIndex: 1,
            bgcolor: '#E8EEF0',
          },
          '& .leaflet-popup-content-wrapper': {
            borderRadius: '8px',
            boxShadow: '0 18px 46px rgba(23, 33, 43, 0.2)',
          },
          '& .leaflet-popup-content': {
            margin: '14px 16px',
          },
          '& .leaflet-control-attribution': {
            fontSize: 10,
          },
        }}
      >
        <MapContainer
          center={centroInicial}
          zoom={unidadeSelecionada ? 11 : 5}
          scrollWheelZoom={false}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {unidades.map((unidade) => {
            const selecionada = unidade.id === unidadeSelecionada?.id;

            return (
              <CircleMarker
                key={unidade.id}
                center={[unidade.latitude, unidade.longitude]}
                radius={selecionada ? 15 : 10}
                pathOptions={{
                  color: selecionada
                    ? '#ff5805'
                    : '#ffb71b',
                  weight: selecionada ? 4 : 2,
                  fillColor: selecionada
                    ? '#ff5805'
                    : '#ffb71b',
                  fillOpacity: selecionada ? 0.95 : 0.82,
                }}
                eventHandlers={{
                  click: () => onSelecionarUnidade?.(unidade),
                  mouseover: (event) => event.target.openPopup(),
                }}
              >
                <Popup>
                  <Box sx={{ minWidth: 210 }}>
                    <Typography
                      component="strong"
                      sx={{
                        display: 'block',
                        fontWeight: 850,
                        mb: 0.5,
                      }}
                    >
                      {unidade.nome}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        display: 'block',
                        color: 'secondary.main',
                        fontSize: 13,
                        fontWeight: 800,
                        mb: 0.75,
                      }}
                    >
                      {unidade.tipo}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        display: 'block',
                        color: 'text.secondary',
                        fontSize: 13,
                        lineHeight: 1.45,
                      }}
                    >
                      {unidade.endereco}
                    </Typography>
                  </Box>
                </Popup>
              </CircleMarker>
            );
          })}

          <ControladorMapa
            unidades={unidades}
            unidadeSelecionada={unidadeSelecionada}
          />
          <BotaoVerTodas unidades={unidades} />
        </MapContainer>
      </Box>
    </Paper>
  );
}
