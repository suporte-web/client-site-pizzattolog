import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { SectionLabel } from '@/components/site/section-label';


const programas = [
  {
    titulo: 'Rota Verde',
    descricao:
      'O Rota Verde é nossa operação de carga fracionada conduzida exclusivamente por mulheres ao volante de veículos 100% elétricos em Curitiba e região. Unimos a meta de zero emissões ao protagonismo feminino, transformando a logística urbana em um modelo de impacto positivo.',
    imagem: '/images/programas/Rota Verde.png',
    alt: 'Logo do programa Rota Verde',
    href: '/social#rota-verde',
  },
  {
    titulo: 'Rota do Saber',
    descricao:
      'O Rota do Saber promove a capacitação contínua de nossas equipes, unindo o desenvolvimento pessoal e profissional a uma cultura de segurança viária. Assim, garantimos que nossos profissionais estejam sempre preparados para os desafios e as transformações da logística moderna.',
    imagem: '/images/programas/Rota do Saber.png',
    alt: 'Logo do programa Rota do Saber',
    href: '/social#rota-do-saber',
  },
  {
    titulo: 'Rota de Oportunidade',
    descricao:
      'O Rota de Oportunidade é o nosso canal direto com você: através de QR Codes adesivados em nossos caminhões, abrimos espaço para feedbacks sobre nossa frota e atuação nas estradas. Esse reconhecimento é a base de premiações trimestrais e do nosso grande destaque anual, onde os motoristas com melhor desempenho e avaliação são premiados pela integridade e qualidade mantidas em cada viagem.',
    imagem: '/images/programas/Rota de Oportunidade.png',
    alt: 'Logo do programa Rota de Oportunidade',
    href: '/social#rota-de-oportunidade',
  },
  {
    titulo: 'Diversidade e Inclusão',
    descricao:
      'Valorizar e integrar as diferenças é o que fortalece a nossa equipe. No programa Diversidade e Inclusão, garantimos um ambiente seguro onde diferentes vivências e habilidades são reconhecidas. Nosso compromisso é construir uma operação onde o respeito e a multiplicidade de talentos caminhem juntos para resolver desafios com excelência.',
    imagem: '/images/programas/Diversidade e Inclusão.png',
    alt: 'Logo do programa Diversidade e Inclusão',
    href: '/social#diversidade-e-inclusao',
  },
];

export function ProgramasSection() {
  return (
    <Box
      component="section"
      id="programas"
      sx={{
        py: {
          xs: 7,
          md: 10,
        },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={5} sx={{ width: '100%', alignItems: 'center' }}>
          {/* CABEÇALHO */}
          <Stack
            spacing={1.5}
            sx={{
              width: '100%',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 980,
              mx: 'auto',
            }}
          >
            <SectionLabel sx={{ mx: 'auto' }}>Nossos Programas Internos</SectionLabel>

            <Typography
              component="h2"
              variant="h3"
              sx={{
                width: '100%',
                maxWidth: 900,
                mx: 'auto',
                fontWeight: 800,
                lineHeight: 1.1,
                textAlign: 'center',
              }}
            >
              Programas que fortalecem nossa cultura
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 800,
                lineHeight: 1.8,
                textAlign: 'center',
                mx: 'auto',
              }}
            >
              Iniciativas que unem sustentabilidade, capacitação, reconhecimento,
              diversidade e cuidado com as pessoas que fazem parte da nossa operação.
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              width: '100%',
              maxWidth: 1500,
              mx: 'auto',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                xl: 'repeat(4, 1fr)',
              },

              gap: 3,

              // força todas as linhas a terem a mesma altura
              gridAutoRows: '1fr',

              // estica os cards dentro da grade
              alignItems: 'stretch',
              justifyContent: 'center',
            }}
          >
            
            {programas.map((programa) => (
              <Link
                key={programa.titulo}
                href={programa.href}
                style={{
                  display: 'flex',
                  height: '100%',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',

                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',

                    minHeight: {
                      xs: 440,
                      md: 500,
                    },

                    p: {
                      xs: 3,
                      md: 3.5,
                    },

                    borderRadius: 5,

                    border: '1px solid',
                    borderColor: 'rgba(15, 23, 42, 0.08)',

                    bgcolor: 'background.paper',

                    overflow: 'hidden',

                    cursor: 'pointer',

                    boxShadow:
                      '0 8px 30px rgba(15, 23, 42, 0.06)',

                    transition:
                      'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',

                    '&:hover': {
                      transform: 'translateY(-6px)',

                      borderColor: 'success.main',

                      boxShadow:
                        '0 18px 45px rgba(15, 23, 42, 0.12)',
                    },
                  }}
                >
                  {/* LINHA DECORATIVA SUPERIOR */}

                  <Box
                    sx={{
                      position: 'absolute',

                      top: 0,
                      left: '50%',

                      width: 72,
                      height: 4,

                      borderRadius: '0 0 999px 999px',

                      bgcolor: 'success.main',
                      transform: 'translateX(-50%)',
                    }}
                  />

                  {/* ÁREA DO LOGO */}

                  <Box
                    sx={{
                      minHeight: {
                        xs: 130,
                        md: 160,
                      },

                      display: 'flex',

                      alignItems: 'center',
                      justifyContent: 'center',

                      mb: 2.5,

                      borderRadius: 4,

                      bgcolor: 'rgba(15, 118, 110, 0.035)',
                    }}
                  >
                    <Box
                      component="img"
                      src={programa.imagem}
                      alt={programa.alt}
                      sx={{
                        display: 'block',

                        maxWidth: '88%',

                        maxHeight: {
                          xs: 105,
                          md: 130,
                        },

                        width: 'auto',
                        height: 'auto',

                        objectFit: 'contain',

                        transition: 'transform 0.3s ease',

                        '.MuiPaper-root:hover &': {
                          transform: 'scale(1.04)',
                        },
                      }}
                    />
                  </Box>

                  {/* CONTEÚDO */}

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',

                      flex: 1,

                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h5"
                      sx={{
                        mb: 1.5,

                        fontWeight: 800,

                        color: 'text.primary',

                        lineHeight: 1.25,
                      }}
                    >
                      {programa.titulo}
                    </Typography>

                    <Box
                      sx={{
                        width: 36,
                        height: 3,

                        mx: 'auto',
                        mb: 2.5,

                        borderRadius: 99,

                        bgcolor: 'success.main',

                        opacity: 0.7,
                      }}
                    />

                    <Typography
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.75,

                        fontSize: {
                          xs: '0.98rem',
                          md: '1rem',
                        },
                      }}
                    >
                      {programa.descricao}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
