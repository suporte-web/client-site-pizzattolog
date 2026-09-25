'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import CarRepairRoundedIcon from '@mui/icons-material/CarRepairRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import OilBarrelRoundedIcon from '@mui/icons-material/OilBarrelRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import SavedSearchRoundedIcon from '@mui/icons-material/SavedSearchRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import { Box, Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { SectionLabel } from '@/components/site/section-label';
import { trackWhatsappClicado } from '@/lib/analytics/tracking';
import {
  getContentString,
  mergeStringItems,
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';

const whatsappAgregados =
  'https://api.whatsapp.com/send?phone=554132481042&text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20virar%20um%20agregado%20da%20Pizzattolog';

const vantagens = [
  { titulo: 'Cartão de abastecimento', icone: <LocalGasStationRoundedIcon />, cor: '#ffb71b' },
  { titulo: 'Carretas revisadas', icone: <BuildRoundedIcon />, cor: '#ff5805' },
  { titulo: 'Seguro contra terceiros com preço diferenciado', icone: <SecurityRoundedIcon />, cor: '#f23f35' },
  { titulo: 'Transparência nas negociações', icone: <HandshakeRoundedIcon />, cor: '#ffb71b' },
  { titulo: 'Rastreador em comodato', icone: <RouteRoundedIcon />, cor: '#ff5805' },
  { titulo: 'Fluxo de cargas com sinergia o ano todo', icone: <LocalShippingRoundedIcon />, cor: '#f23f35' },
  { titulo: 'Clube exclusivo de benefícios', icone: <WorkspacePremiumRoundedIcon />, cor: '#ffb71b' },
  { titulo: 'Bonificação para segurança e produtividade', icone: <CheckCircleRoundedIcon />, cor: '#ff5805' },
];

const beneficiosClube = [
  {
    titulo: 'Indicação com valores acessíveis para inspeção veicular',
    icone: <SavedSearchRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    titulo: 'Bonificação do motorista com atualização variável de acordo com performance',
    icone: <TrendingUpRoundedIcon />,
    cor: '#ff5805',
  },
  {
    titulo: 'Material de apoio para educação financeira',
    icone: <AccountBalanceWalletRoundedIcon />,
    cor: '#f23f35',
  },
  {
    titulo: 'Indicação de clínica com melhor preço para Exame Toxicológico',
    icone: <MedicalServicesRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    titulo: 'Material de apoio com dicas de saúde e qualidade de vida',
    icone: <HealthAndSafetyRoundedIcon />,
    cor: '#ff5805',
  },
  {
    titulo: 'Bonificação por tempo de agregamento',
    icone: <CalendarMonthRoundedIcon />,
    cor: '#f23f35',
  },
  {
    titulo: 'Pneus com preços e condições especiais',
    icone: <CarRepairRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    titulo: 'Indique e ganhe bônus',
    icone: <CardGiftcardRoundedIcon />,
    cor: '#ff5805',
  },
  {
    titulo: 'Indicação dos melhores locais para manutenção preventiva (sistema lubrificação / rodante)',
    icone: <ConstructionRoundedIcon />,
    cor: '#f23f35',
  },
  {
    titulo: 'Diesel e Arla com indicação de melhores preços nos postos homologados',
    icone: <OilBarrelRoundedIcon />,
    cor: '#ffb71b',
  },
];

const requisitosVeiculo = [
  'Cavalos 4x2/6x2 frontal',
  'Idade máxima de 10 anos para veículos acima de 2016',
  'Manutenção em dia',
  'Documentação em dia',
];

const requisitosMotorista = [
  'CNH categoria E',
  'Motorista com experiência',
  'MOPP',
  'EAR',
  'ASO',
  'Exame toxicológico',
  'Perfil securitário',
];

const unidades = [
  {
    nome: 'Curitiba - PR (Matriz)',
    endereco: 'Rua Nunes Machado, 68 - 15º andar, Batel, 80250-000.',
  },
  {
    nome: 'Filial Curitiba - PR',
    endereco: 'Rua Frei Gaspar da Madre de Deus, 830 - Prédio 26, Portão, 81050-590.',
  },
  {
    nome: 'Filial São José dos Pinhais - PR',
    endereco: 'Rua do Colono, 2146 - Costeira, 83075-000.',
  },
  {
    nome: 'Filial Rodeio - SC',
    endereco: 'Rua Jose Ostrowski Junior, 623 - Kaspereit, 89136-000.',
  },
  {
    nome: 'Filial Guarulhos - SP',
    endereco: 'Estrada Velha, 100 - Cumbica, 07231-010.',
  },
  {
    nome: 'Filial Varginha - MG',
    endereco: 'Avenida Princesa do Sul, 950 - Jardim Andere, 37.026-080.',
  },
  {
    nome: 'Filial Feira de Santana - BA',
    endereco: 'Avenida Deputado Luís Eduardo Magalhães - Limoeiro, 44.097-324.',
  },
  {
    nome: 'Filial Parnamirim - RN',
    endereco: 'Rua Piloto Pereira Tim, 1762 - Monte Claro, 59146-220.',
  },
];

function ImagemAgregados({
  src,
  alt,
}: {
  src: string;
  alt: string;
  cor?: string;
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 560,
        mx: 'auto',
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          display: 'block',

          width: '100%',

          aspectRatio: '1 / 0.86',

          objectFit: 'cover',

          borderRadius: 0,

          boxShadow: 'none',
        }}
      />
    </Box>
  );
}

function ListaRequisitos({ itens }: { itens: string[] }) {
  return (
    <Stack spacing={1.4}>
      {itens.map((item) => (
        <Stack key={item} direction="row" spacing={1.2} sx={{ alignItems: 'flex-start' }}>
          <CheckCircleRoundedIcon sx={{ color: '#ff5805', fontSize: 20, mt: 0.2, flexShrink: 0 }} />
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.55 }}>{item}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

interface AgregadosSectionProps {
  conteudo?: SiteContent;
}

export function AgregadosSection({
  conteudo,
}: AgregadosSectionProps) {
  const vantagensEditaveis =
    mergeTextItems(vantagens, conteudo, 'vantagens', [
      'titulo',
    ]);
  const beneficiosClubeEditaveis =
    mergeTextItems(beneficiosClube, conteudo, 'beneficiosClube', [
      'titulo',
    ]);
  const requisitosVeiculoEditaveis =
    mergeStringItems(
      requisitosVeiculo,
      conteudo,
      'requisitos.veiculo',
    );
  const requisitosMotoristaEditaveis =
    mergeStringItems(
      requisitosMotorista,
      conteudo,
      'requisitos.motorista',
    );
  const unidadesEditaveis =
    mergeTextItems(unidades, conteudo, 'unidades', [
      'nome',
      'endereco',
    ]);
  const beneficiosAnimados = [
    ...beneficiosClubeEditaveis,
    ...beneficiosClubeEditaveis,
  ];
  const bannerImagem =
    getContentString(
      conteudo,
      'banner.imagemUrl',
      '/imagens/agregados/banneragregados.png',
    );

  return (
    <>
      <Box
        component="section"
        aria-label="Venha ser agregado Pizzattolog"
        sx={{
          position: 'relative',
          minHeight: { xs: 330, md: 500 },
          bgcolor: 'primary.dark',
          backgroundImage: `url("${bannerImagem}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                spacing={3}
                sx={{
                  width: '100%',
                  boxSizing: 'border-box',

                  pl: {
                    xs: 0,
                    md: 5,
                    lg: 8,
                  },

                  pr: {
                    xs: 0,
                    md: 1,
                  },
                }}
              >
                <SectionLabel>Agregados Pizzattolog</SectionLabel>
                <Typography variant="h2" sx={{ maxWidth: 640, fontSize: { xs: '2.35rem', md: '3.45rem' }, lineHeight: 1.05 }}>
                  Programa de agregados Pizzattolog
                </Typography>
                <Typography sx={{ maxWidth: 670, color: 'text.primary', fontSize: { xs: 18, md: 21 }, lineHeight: 1.55, fontWeight: 750 }}>
                  Está buscando uma empresa para agregar seu veículo? Temos vários benefícios para nossos agregados.
                </Typography>
                <Typography sx={{ maxWidth: 720, color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75 }}>
                  O programa de agregados foi desenvolvido para conectar profissionais ao fluxo contínuo de operações
                  logísticas, garantindo cargas frequentes, suporte operacional e benefícios exclusivos, sem abrir mão
                  da sua autonomia como transportador.
                </Typography>
                <Button
                  href={whatsappAgregados}
                  onClick={() => trackWhatsappClicado('Agregados - introducao')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                >
                  Falar pelo WhatsApp
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ImagemAgregados
                src={getContentString(conteudo, 'intro.imagemUrl', '/images/agregados/agregados-frota.png')}
                alt="Frota Pizzattolog para agregados"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 5, md: 8 }} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <ImagemAgregados
                src={getContentString(conteudo, 'oQueE.imagemUrl', '/images/agregados/agregados-motorista.png')}
                alt="Motorista agregado Pizzattolog"
                cor="#ffb71b"
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{
                position: 'relative',

                left: {
                  xs: 0,
                  md: -40,
                  lg: -64,
                },
              }}
            >

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 3,
                  border: '1px solid rgba(15, 23, 42, 0.06)',
                  boxShadow: '0 18px 42px rgba(19, 39, 57, 0.08)',
                }}
              >
                <Stack spacing={2.25}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: '#ff5805',
                      color: 'white',
                    }}
                  >
                    <LocalShippingRoundedIcon sx={{ fontSize: 36 }} />
                  </Box>
                  <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' } }}>
                    O que é ser um agregado?
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75 }}>
                    O modelo de agregamento de caminhão permite que motoristas autônomos trabalhem de forma recorrente
                    com uma transportadora, utilizando seu próprio veículo para realizar fretes, sem vínculo
                    empregatício direto.
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75 }}>
                    Na prática, isso significa mais previsibilidade de ganhos e menos tempo com o caminhão parado, além
                    de acesso a uma estrutura profissional que potencializa seus resultados.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Stack spacing={5}>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <SectionLabel>Vantagens ao ser um agregado</SectionLabel>
              <Typography variant="h2" sx={{ maxWidth: 860, fontSize: { xs: '2rem', md: '3rem' } }}>
                Uma operação estruturada para reduzir custos e aumentar produtividade
              </Typography>
            </Stack>

            <Grid container spacing={2.5}>
              {vantagensEditaveis.map((vantagem) => (
                <Grid key={vantagem.titulo} size={{ xs: 12, sm: 6, lg: 3 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'relative',
                      height: '100%',
                      minHeight: 214,
                      p: { xs: 3, md: 3.5 },
                      borderRadius: 5,
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      bgcolor: 'background.paper',
                      overflow: 'hidden',
                      boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: 72,
                        height: 4,
                        borderRadius: '0 0 999px 999px',
                        bgcolor: vantagem.cor,
                        transform: 'translateX(-50%)',
                      },
                      '&:hover': {
                        transform: { md: 'translateY(-6px)' },
                        borderColor: `${vantagem.cor}66`,
                        boxShadow: `0 18px 45px ${vantagem.cor}2e`,
                      },
                    }}
                  >
                    <Stack spacing={2} sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 68,
                          height: 68,
                          borderRadius: 3,
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: `${vantagem.cor}18`,
                          color: vantagem.cor,
                          '& svg': { fontSize: 36 },
                        }}
                      >
                        {vantagem.icone}
                      </Box>
                      <Typography sx={{ fontWeight: 900, fontSize: 18, lineHeight: 1.3 }}>{vantagem.titulo}</Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'background.default', overflow: 'hidden' }}>
        <Container maxWidth="xl">
          <Stack spacing={5}>
            <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
              <SectionLabel>Clube de Benefícios</SectionLabel>
              <Typography variant="h2" sx={{ maxWidth: 820, fontSize: { xs: '2rem', md: '3rem' } }}>
                Benefícios para apoiar o motorista dentro e fora da operação
              </Typography>
            </Stack>

            <Box
              sx={{
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'visible',
                py: 1,
                '@keyframes beneficiosAgregadosMarquee': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' },
                },
                '&:hover .beneficios-agregados-track': {
                  animationPlayState: 'paused',
                },
                '@media (prefers-reduced-motion: reduce)': {
                  '.beneficios-agregados-track': {
                    animation: 'none',
                  },
                },
              }}
            >
              <Box
                className="beneficios-agregados-track"
                sx={{
                  display: 'flex',
                  gap: { xs: 2, md: 2.5 },
                  width: 'max-content',
                  animation: 'beneficiosAgregadosMarquee 38s linear infinite',
                }}
              >
                {beneficiosAnimados.map((beneficio, index) => (
                  <Paper
                    key={`${beneficio.titulo}-${index}`}
                    elevation={0}
                    aria-hidden={index >= beneficiosClubeEditaveis.length ? true : undefined}
                    sx={{
                      position: 'relative',
                      flex: '0 0 auto',
                      width: { xs: 220, sm: 240, md: 260 },
                      minHeight: { xs: 270, md: 300 },
                      p: { xs: 2.5, md: 3 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 5,
                      border: '1px solid rgba(15, 23, 42, 0.06)',
                      bgcolor: 'background.paper',
                      overflow: 'hidden',
                      boxShadow: '0 12px 34px rgba(15, 23, 42, 0.07)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        width: 72,
                        height: 4,
                        borderRadius: '0 0 999px 999px',
                        bgcolor: beneficio.cor,
                        transform: 'translateX(-50%)',
                      },
                    }}
                  >
                    <Stack spacing={2.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: { xs: 88, md: 104 },
                          height: { xs: 88, md: 104 },
                          display: 'grid',
                          placeItems: 'center',
                          color: beneficio.cor,
                          '& svg': {
                            fontSize: { xs: 72, md: 88 },
                            strokeWidth: 1.25,
                          },
                        }}
                      >
                        {beneficio.icone}
                      </Box>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontSize: { xs: 15, md: 16 },
                          fontStyle: 'italic',
                          fontWeight: 800,
                          lineHeight: 1.32,
                        }}
                      >
                        {beneficio.titulo}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  width: { xs: 34, md: 96 },
                  pointerEvents: 'none',
                  background: 'linear-gradient(90deg, #F4F7F7 0%, rgba(244,247,247,0) 100%)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  inset: '0 0 0 auto',
                  width: { xs: 34, md: 96 },
                  pointerEvents: 'none',
                  background: 'linear-gradient(270deg, #F4F7F7 0%, rgba(244,247,247,0) 100%)',
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  border: '1px solid rgba(255, 88, 5, 0.18)',
                  boxShadow: '0 16px 34px rgba(19, 39, 57, 0.07)',
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <Inventory2RoundedIcon sx={{ color: '#ff5805', fontSize: 34 }} />
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
                      O que pedimos do veículo?
                    </Typography>
                  </Stack>
                  <ListaRequisitos itens={requisitosVeiculoEditaveis} />
                </Stack>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  border: '1px solid rgba(255, 183, 27, 0.26)',
                  boxShadow: '0 16px 34px rgba(19, 39, 57, 0.07)',
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <FactCheckRoundedIcon sx={{ color: '#ffb71b', fontSize: 34 }} />
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
                      O que pedimos do motorista?
                    </Typography>
                  </Stack>
                  <ListaRequisitos itens={requisitosMotoristaEditaveis} />
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{
          position: 'relative',

          width: '100%',

          minHeight: {
            xs: 360,
            md: 380,
          },

          display: 'flex',
          alignItems: 'center',

          color: 'white',

          backgroundImage:
            'url("/images/agregados/banneragregados.jpg")',

          backgroundSize: 'cover',

          backgroundPosition: {
            xs: 'center',
            md: 'center',
          },

          backgroundRepeat: 'no-repeat',

          overflow: 'hidden',

          py: {
            xs: 6,
            md: 7,
          },

          // camada escura por cima da foto
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,

            background:
              'linear-gradient(90deg, rgba(8, 43, 65, 0.92) 0%, rgba(8, 43, 65, 0.72) 45%, rgba(8, 43, 65, 0.28) 100%)',

            zIndex: 0,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',

              flexDirection: {
                xs: 'column',
                md: 'row',
              },

              alignItems: {
                xs: 'flex-start',
                md: 'center',
              },

              justifyContent: 'space-between',

              gap: {
                xs: 4,
                md: 6,
              },

              width: '100%',
            }}
          >
            {/* TEXTO */}
            <Box
              sx={{
                maxWidth: 780,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: '2rem',
                    sm: '2.3rem',
                    md: '2.7rem',
                  },

                  fontWeight: 800,

                  lineHeight: 1.1,

                  mb: 1.5,

                  color: 'white',
                }}
              >
                Quer agregar seu veículo?
              </Typography>

              <Typography
                sx={{
                  maxWidth: 740,

                  color: 'rgba(255,255,255,0.88)',

                  fontSize: {
                    xs: 16,
                    md: 18,
                  },

                  lineHeight: 1.7,
                }}
              >
                Fale com a nossa equipe e saiba como participar do programa de
                agregados Pizzattolog.
              </Typography>
            </Box>

            {/* BOTÃO */}
            <Button
              href={whatsappAgregados}
              onClick={() =>
                trackWhatsappClicado('Agregados - chamada final')
              }
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                flexShrink: 0,

                width: {
                  xs: '100%',
                  sm: 'fit-content',
                },

                px: {
                  xs: 3,
                  md: 4,
                },

                py: 1.6,

                fontWeight: 800,

                whiteSpace: 'nowrap',
              }}
            >
              {getContentString(
                conteudo,
                'cta.botaoTexto',
                'Quero ser agregado',
              )}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
