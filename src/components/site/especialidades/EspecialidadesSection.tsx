import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { SectionLabel } from '@/components/site/section-label';
import {
  getContentString,
  mergeStringItems,
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';

const especialidades = [
  {
    id: 'produtos-quimicos',
    titulo: 'Produtos Químicos',
    etiqueta: 'Operações reguladas',
    descricao:
      'Atendemos operações logísticas para produtos químicos com foco em segurança, conformidade documental, rastreabilidade e processos controlados. Nossa estrutura foi desenhada para empresas que exigem cuidado técnico, previsibilidade e gestão de risco em toda a cadeia.',
    icone: <BiotechRoundedIcon />,
    cor: '#ff5805',
    pontos: ['Processos com foco em segurança operacional', 'Atenção a licenças, normas e documentação', 'Rastreabilidade e controle em cada etapa'],
  },
  {
    id: 'cosmeticos-higiene',
    titulo: 'Cosméticos e Higiene',
    etiqueta: 'Cuidado com a marca',
    descricao:
      'Soluções logísticas para cosméticos e higiene pessoal, preservando integridade, apresentação e prazo de entrega. Atuamos para manter a experiência do cliente final alinhada ao padrão de qualidade da sua marca.',
    icone: <SpaRoundedIcon />,
    cor: '#ffb71b',
    pontos: ['Controle no manuseio e movimentação', 'Agilidade para demandas sazonais', 'Distribuição alinhada ao varejo e indústria'],
  },
  {
    id: 'saude-nutricao-pet',
    titulo: 'Saúde e Nutrição Pet',
    etiqueta: 'Mercado pet',
    descricao:
      'Atendemos empresas do mercado pet com soluções para produtos de saúde, nutrição e bem-estar animal. Nossa operação combina cuidado no transporte, previsibilidade e capacidade para apoiar cadeias com alto volume e exigência de qualidade.',
    icone: <PetsRoundedIcon />,
    cor: '#f23f35',
    pontos: ['Operação preparada para produtos sensíveis', 'Previsibilidade para abastecimento recorrente', 'Suporte logístico para crescimento do segmento pet'],
  },
];

interface EspecialidadesSectionProps {
  conteudo?: SiteContent;
}

export default function EspecialidadesSection({
  conteudo,
}: EspecialidadesSectionProps) {

  const imagemHero = getContentString(
    conteudo,
    'hero.imagemUrl',
    '',
  );

  const etiquetaHero = getContentString(
    conteudo,
    'hero.etiqueta',
    '',
  ).trim();

  const tituloHero = getContentString(
    conteudo,
    'hero.titulo',
    '',
  ).trim();

  const descricaoHero = getContentString(
    conteudo,
    'hero.descricao',
    '',
  ).trim();


  const especialidadesEditaveis =
    mergeTextItems(especialidades, conteudo, 'especialidades', [
      'titulo',
      'etiqueta',
      'descricao',
    ]).map((item, index) => ({
      ...item,
      pontos: mergeStringItems(
        item.pontos,
        conteudo,
        `especialidades.${index}.pontos`,
      ),
    }));

  return (
    <Box component="main">
      <Box
        component="section"
        sx={{
          pt: { xs: 14, md: 17 },
          pb: { xs: 7, md: 10 },

          minHeight: { xs: 320, md: 420 },
          display: 'flex',
          alignItems: 'center',

          bgcolor: 'primary.dark',

          backgroundImage: imagemHero
            ? `linear-gradient(
          rgba(15, 39, 49, 0.74),
          rgba(15, 39, 49, 0.74)
        ), url("${imagemHero}")`
            : 'none',

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',

          color: 'white',
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2.5} sx={{ maxWidth: 960 }}>
            {etiquetaHero && (
              <Stack
                component="span"
                direction="row"
                spacing={0.75}
                sx={{
                  width: 'fit-content',
                  alignItems: 'center',
                  px: 1.5,
                  py: 0.65,
                  borderRadius: 999,
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  fontSize: 13,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                <Inventory2RoundedIcon sx={{ fontSize: 18 }} />

                <Box component="span">
                  {etiquetaHero}
                </Box>
              </Stack>
            )}
            {tituloHero && (
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '2.55rem',
                    md: '4.35rem',
                  },
                  lineHeight: 1.04,
                }}
              >
                {tituloHero}
              </Typography>
            )}
            {descricaoHero && (
              <Typography
                sx={{
                  maxWidth: 800,
                  color: 'rgba(255,255,255,0.78)',
                  fontSize: 19,
                  lineHeight: 1.7,
                }}
              >
                {descricaoHero}
              </Typography>
            )}
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 5, md: 7 }}>
            {especialidadesEditaveis.map((item, index) => {
              const inverter = index % 2 === 1;

              return (
                <Paper
                  key={item.id}
                  id={item.id}
                  elevation={0}
                  sx={{
                    scrollMarginTop: { xs: 96, md: 110 },
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: 3,
                    border: '1px solid rgba(15, 23, 42, 0.06)',
                    bgcolor: 'white',
                    overflow: 'hidden',
                    boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
                  }}
                >
                  <Grid
                    container
                    spacing={{ xs: 3, md: 6 }}
                    sx={{
                      alignItems: 'center',
                      flexDirection: { xs: 'column', md: inverter ? 'row-reverse' : 'row' },
                    }}
                  >
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Box
                        sx={{
                          minHeight: { xs: 220, sm: 270, md: 340 },
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: 2,
                          bgcolor: '#F4F7F7',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 132, md: 172 },
                            height: { xs: 132, md: 172 },
                            borderRadius: 4,
                            display: 'grid',
                            placeItems: 'center',
                            color: item.cor,
                            bgcolor: `${item.cor}18`,
                            border: `1px solid ${item.cor}38`,
                            '& svg': { fontSize: { xs: 76, md: 98 } },
                          }}
                        >
                          {item.icone}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                      <Stack
                        spacing={2.25}
                        sx={{
                          maxWidth: 760,
                          mx: { xs: 0, md: inverter ? 0 : 'auto' },
                          textAlign: { xs: 'center', md: 'left' },
                          alignItems: { xs: 'center', md: 'flex-start' },
                        }}
                      >
                        <SectionLabel>{item.etiqueta}</SectionLabel>
                        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.08 }}>
                          {item.titulo}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75 }}>
                          {item.descricao}
                        </Typography>
                        <Grid container spacing={1.5} sx={{ width: '100%', pt: 1 }}>
                          {item.pontos.map((ponto) => (
                            <Grid key={ponto} size={{ xs: 12, md: 4 }}>
                              <Paper
                                elevation={0}
                                sx={{
                                  height: '100%',
                                  p: 2,
                                  borderRadius: 2,
                                  bgcolor: '#F4F7F7',
                                  border: '1px solid rgba(15, 23, 42, 0.05)',
                                }}
                              >
                                <Stack spacing={1} sx={{ alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' } }}>
                                  <VerifiedRoundedIcon sx={{ color: item.cor, fontSize: 22 }} />
                                  <Typography sx={{ fontWeight: 800, lineHeight: 1.35, fontSize: 14.5 }}>
                                    {ponto}
                                  </Typography>
                                </Stack>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
