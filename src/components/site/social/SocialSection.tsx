import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { SectionLabel } from '@/components/site/section-label';
import {
  getContentString,
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';

const iniciativas = [
  {
    id: 'entre-rotas',
    titulo: 'Entre Rotas',
    etiqueta: 'Conteúdo e conexão',
    descricao:
      'Um espaço para compartilhar histórias, aprendizados e conteúdos que aproximam pessoas da rotina da logística. O Entre Rotas valoriza quem constrói nossa operação todos os dias.',
    imagem: '/images/programas/logo Entre Rotas.png',
    icone: <ForumRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    id: 'rota-verde',
    titulo: 'Rota Verde',
    etiqueta: 'Sustentabilidade',
    descricao:
      'O Rota Verde é nossa operação de carga fracionada conduzida exclusivamente por mulheres ao volante de veículos 100% elétricos em Curitiba e região. Unimos a meta de zero emissões ao protagonismo feminino, transformando a logística urbana em um modelo de impacto positivo.',
    imagem: '/images/programas/Rota Verde.png',
    icone: <SpaRoundedIcon />,
    cor: '#2f8061',
  },
  {
    id: 'rota-do-saber',
    titulo: 'Rota do Saber',
    etiqueta: 'Capacitação',
    descricao:
      'O Rota do Saber promove a capacitação contínua de nossas equipes, unindo o desenvolvimento pessoal e profissional a uma cultura de segurança viária. Assim, garantimos que nossos profissionais estejam sempre preparados para os desafios e as transformações da logística moderna.',
    imagem: '/images/programas/Rota do Saber.png',
    icone: <AutoStoriesRoundedIcon />,
    cor: '#ff5805',
  },
  {
    id: 'rota-de-oportunidade',
    titulo: 'Rota de Oportunidade',
    etiqueta: 'Reconhecimento',
    descricao:
      'O Rota de Oportunidade é o nosso canal direto com você: através de QR Codes adesivados em nossos caminhões, abrimos espaço para feedbacks sobre nossa frota e atuação nas estradas. Esse reconhecimento é a base de premiações trimestrais e do nosso grande destaque anual, onde os motoristas com melhor desempenho e avaliação são premiados pela integridade e qualidade mantidas em cada viagem.',
    imagem: '/images/programas/Rota de Oportunidade.png',
    icone: <EmojiEventsRoundedIcon />,
    cor: '#f23f35',
  },
  {
    id: 'diversidade-e-inclusao',
    titulo: 'Diversidade e Inclusão',
    etiqueta: 'Cultura',
    descricao:
      'Valorizar e integrar as diferenças é o que fortalece a nossa equipe. No programa Diversidade e Inclusão, garantimos um ambiente seguro onde diferentes vivências e habilidades são reconhecidas. Nosso compromisso é construir uma operação onde o respeito e a multiplicidade de talentos caminhem juntos para resolver desafios com excelência.',
    imagem: '/images/programas/Diversidade e Inclusão.png',
    icone: <Diversity3RoundedIcon />,
    cor: '#ff5805',
  },
];

interface SocialSectionProps {
  conteudo?: SiteContent;
}

export default function SocialSection({
  conteudo,
}: SocialSectionProps) {
  const heroEtiqueta = getContentString(
    conteudo,
    'hero.etiqueta',
    '/social/',
  );
  const heroTitulo = getContentString(
    conteudo,
    'hero.titulo',
    'Social',
  );
  const heroDescricao = getContentString(
    conteudo,
    'hero.descricao',
    'Iniciativas, programas e histórias que fortalecem nossa cultura, reconhecem pessoas e ampliam impacto positivo dentro e fora da operação.',
  );
  const heroImagem = getContentString(
    conteudo,
    'hero.imagemUrl',
    '/images/programas/logo Entre Rotas.png',
  );
  const iniciativasEditaveis =
    mergeTextItems(iniciativas, conteudo, 'iniciativas', [
      'titulo',
      'etiqueta',
      'descricao',
    ]);

  return (
    <Box component="main">
      {/* =====================================================
    BANNER DO TOPO
   ===================================================== */}
      <Box
        component="section"
        aria-label="Social Pizzattolog"
        sx={{
          width: '100%',

          minHeight: {
            xs: 280,
            sm: 360,
            md: 500,
          },

          backgroundImage: `
      linear-gradient(
        90deg,
        rgba(9,43,67,0.30) 0%,
        rgba(9,43,67,0.12) 50%,
        rgba(9,43,67,0.04) 100%
      ),
      url("${heroImagem}")
    `,

          backgroundSize: 'cover',

          backgroundPosition: 'center',

          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* =====================================================
    INTRODUÇÃO SOCIAL
   ===================================================== */}
      <Box
        component="section"
        sx={{
          py: {
            xs: 5,
            md: 7,
          },

          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={2}
            sx={{
              maxWidth: 850,
            }}
          >
            <SectionLabel>
              {heroEtiqueta}
            </SectionLabel>

            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: '2.4rem',
                  md: '3.5rem',
                },

                lineHeight: 1.05,
              }}
            >
              {heroTitulo}
            </Typography>

            <Typography
              sx={{
                maxWidth: 780,

                color: 'text.secondary',

                fontSize: {
                  xs: 16,
                  md: 18,
                },

                lineHeight: 1.7,
              }}
            >
              {heroDescricao}
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 5, md: 7 }}>
            {iniciativasEditaveis.map((item, index) => {
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
                          minHeight: { xs: 210, sm: 260, md: 330 },
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: 2,
                          bgcolor: '#F4F7F7',
                          overflow: 'hidden',
                        }}
                      >
                        {item.imagem ? (
                          <Box
                            component="img"
                            src={item.imagem}
                            alt={item.titulo}
                            sx={{
                              display: 'block',
                              width: '86%',
                              maxHeight: { xs: 170, sm: 210, md: 260 },
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 112,
                              height: 112,
                              borderRadius: 3,
                              display: 'grid',
                              placeItems: 'center',
                              color: item.cor,
                              bgcolor: `${item.cor}18`,
                              '& svg': { fontSize: 66 },
                            }}
                          >
                            {item.icone}
                          </Box>
                        )}
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                      <Stack
                        spacing={2.25}
                        sx={{
                          maxWidth: 720,
                          mx: { xs: 0, md: inverter ? 0 : 'auto' },
                          textAlign: { xs: 'center', md: 'left' },
                          alignItems: { xs: 'center', md: 'flex-start' },
                        }}
                      >
                        <Box
                          sx={{
                            width: 62,
                            height: 62,
                            borderRadius: 2,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: item.cor,
                            color: 'white',
                            boxShadow: `0 14px 28px ${item.cor}38`,
                            '& svg': { fontSize: 34 },
                          }}
                        >
                          {item.icone}
                        </Box>
                        <SectionLabel>{item.etiqueta}</SectionLabel>
                        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.08 }}>
                          {item.titulo}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75 }}>
                          {item.descricao}
                        </Typography>
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
