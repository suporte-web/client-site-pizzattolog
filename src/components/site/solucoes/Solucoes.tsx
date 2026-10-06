'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import BiotechRoundedIcon from '@mui/icons-material/BiotechRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
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
import type { Solucao } from '@/types/site';
import { SectionLabel } from '@/components/site/section-label';
import {
  getContentString,
  getContentValue,
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';

const icones = {
  local_shipping: <LocalShippingRoundedIcon fontSize="large" />,
  transporte: <LocalShippingRoundedIcon fontSize="large" />,
  inventory: <Inventory2RoundedIcon fontSize="large" />,
  armazenagem: <Inventory2RoundedIcon fontSize="large" />,
  settings: <SettingsSuggestRoundedIcon fontSize="large" />,
  operador: <SettingsSuggestRoundedIcon fontSize="large" />,
};

const segmentos = [
  {
    titulo: 'Cosméticos e Higiene Pessoal',
    icone: <SpaRoundedIcon sx={{ fontSize: 76 }} />,
    cor: '#ffb71b',
  },
  {
    titulo: 'Produtos Químicos',
    icone: <BiotechRoundedIcon sx={{ fontSize: 76 }} />,
    cor: '#ff5805',
  },
  {
    titulo: 'Higiene, Nutrição e Saúde Pets',
    icone: <PetsRoundedIcon sx={{ fontSize: 76 }} />,
    cor: '#f23f35',
  },
];

const diferenciais = [
  {
    titulo: 'Logística Integrada',
    texto:
      'Sua operação conectada de ponta a ponta. Com processos inteligentes e comunicação ativa, entregamos fluidez, previsibilidade e alinhamento total com a estratégia do cliente.',
    icone: <HubRoundedIcon sx={{ fontSize: 58 }} />,
    cor: '#ffb71b',
  },
  {
    titulo: 'Inteligência de Dados',
    texto:
      'Informações em tempo real. Consolidamos sistemas de alta tecnologia, rastreamento e dashboards inteligentes para assegurar visibilidade estratégica, agilidade e segurança às suas operações.',
    icone: <QueryStatsRoundedIcon sx={{ fontSize: 58 }} />,
    cor: '#ff5805',
  },
  {
    titulo: 'Parceria Estratégica',
    texto:
      'Logística desenhada para o seu negócio. Além de seu transportador, somos o seu parceiro estratégico. Criamos soluções sob medida para entender, prever e resolver as complexidades da sua cadeia logística.',
    icone: <Diversity3RoundedIcon sx={{ fontSize: 58 }} />,
    cor: '#f23f35',
  },
  {
    titulo: 'Segurança Operacional',
    texto:
      'A carga é sua, o cuidado é nosso. Operamos com frota monitorada e protocolos rigorosos para garantir a preservação da sua carga, a segurança viária e a excelência em cada rota.',
    icone: <SecurityRoundedIcon sx={{ fontSize: 58 }} />,
    cor: '#ffb71b',
  },
  {
    titulo: 'ESG',
    texto:
      'Compromisso com o futuro. Através de governança ética, inclusão e projetos contínuos, avançamos na construção de uma logística consciente que agrega valor real aos parceiros.',
    icone: <VerifiedRoundedIcon sx={{ fontSize: 58 }} />,
    cor: '#ff5805',
  },
  {
    titulo: 'Eficiência',
    texto:
      'Menos desperdício, mais performance. Aplicamos a filosofia Lean Thinking para otimizar fluxos e eliminar desperdícios, garantindo máxima produtividade e uma logística ágil focada no que gera valor real.',
    icone: <AutoGraphRoundedIcon sx={{ fontSize: 58 }} />,
    cor: '#f23f35',
  },
];

type ConteudoSolucao = Pick<Solucao, 'titulo' | 'descricao' | 'icone' | 'ordem'> & {
  itens: string[];
  detalhes: Array<{
    titulo: string;
    texto: string;
  }>;
};

const conteudoSolucoes: Record<string, ConteudoSolucao> = {
  armazenagem: {
    titulo: 'Armazenagem',
    descricao:
      'Unimos infraestrutura moderna à inteligência logística para garantir que seu produto esteja disponível no lugar certo, na hora certa e com integridade absoluta.',
    icone: 'inventory',
    ordem: 1,
    itens: [
      'Inbound & Outbound: Gestão completa do fluxo de entrada e saída.',
      'Cross-docking: Agilidade na redistribuição sem necessidade de estocagem longa.',
      'Gestão de Estoque Just-in-Time: Redução de custos e estoque zero.',
    ],
    detalhes: [
      {
        titulo: 'Tecnologia e Controle',
        texto:
          'Utilizamos sistemas de gestão (WMS) que permitem o controle em tempo real, garantindo precisão de estoque e rastreabilidade total, do recebimento à expedição.',
      },
      {
        titulo: 'Segurança e Integridade',
        texto:
          'Nossa estrutura é projetada para o gerenciamento de riscos, com monitoramento contínuo e processos rigorosos de movimentação para eliminar perdas e avarias.',
      },
      {
        titulo: 'Flexibilidade e Escala',
        texto:
          'Soluções sob medida para operações de alta complexidade, preparadas para absorver sazonalidades e variações de demanda com agilidade.',
      },
    ],
  },
  'transporte-de-cargas': {
    titulo: 'Transporte de Cargas',
    descricao:
      'Especialista no atendimento B2B, a Pizzattolog oferece muito mais do que o deslocamento de cargas: entregamos previsibilidade e inteligência logística.',
    icone: 'local_shipping',
    ordem: 2,
    itens: [
      'Carga Lotação (FTL): Transporte de carga completa, ideal para volumes elevados.',
      'Carga Fracionada (LTL): Consolidação de cargas, rastreabilidade e alto controle operacional.',
      'Importação e Exportação: Integração entre transporte, armazenagem e documentação.',
      'Distribuição Urbana e Regional: Gestão de rotas, janelas e eficiência no last mile.',
    ],
    detalhes: [
      {
        titulo: 'Gestão de Riscos e Rastreabilidade',
        texto:
          'Monitoramento em tempo real, protocolos de segurança e gestão ativa de riscos para garantir integridade da carga em toda a jornada.',
      },
      {
        titulo: 'Operações Dedicadas',
        texto:
          'Frota, equipe e gestão exclusivas, desenhadas para demandas contínuas, rotas específicas e operações críticas.',
      },
      {
        titulo: 'Milk Run e Circuitos Logísticos',
        texto:
          'Coletas programadas e rotas inteligentes para otimização de custos, redução de lead time e consolidação de cargas.',
      },
      {
        titulo: 'Transferência e Distribuição',
        texto:
          'Movimentação estruturada entre plantas, centros de distribuição e pontos de entrega, com fluidez operacional e cumprimento de prazos.',
      },
    ],
  },
  'operador-logistico': {
    titulo: 'Operador Logístico',
    descricao:
      'A Pizzattolog atua como um Operador Logístico 3PL, parceiro estratégico que assume a gestão completa da sua logística, da organização do estoque ao transporte final.',
    icone: 'settings',
    ordem: 3,
    itens: [
      'Gestão inteligente e integrada para previsibilidade total.',
      'Atuação dentro da sua estrutura ou em nossos centros de distribuição.',
      'Equipes qualificadas e processos rigorosos para operações de alta complexidade.',
    ],
    detalhes: [
      {
        titulo: 'Inteligência e Gestão Logística',
        texto:
          'Monitoramento em tempo real, análise de dados e otimização contínua para reduzir custos, eliminar ineficiências e garantir performance máxima.',
      },
      {
        titulo: 'Preparação e Movimentação',
        texto:
          'Soluções completas de picking e packing integradas a uma gestão de transportes ágil e rastreável.',
      },
      {
        titulo: 'Suporte à Produção',
        texto:
          'Abastecimento de linhas de produção com máxima sincronia para garantir que sua indústria nunca pare.',
      },
    ],
  },
};

const coresSolucoes: Record<string, string> = {
  armazenagem: '#ffb71b',
  'operador-logistico': '#ff5805',
  'transporte-de-cargas': '#f23f35',
};

const numeros = [
  {
    valor: '+50',
    rotulo: 'Anos de História',
    icone: <FavoriteBorderRoundedIcon />,
    cor: '#ffb71b',
  },
  {
    valor: '+740',
    rotulo: 'ativos',
    icone: <LocalShippingRoundedIcon />,
    cor: '#ff5805',
  },
  {
    valor: '+850',
    rotulo: 'colaboradores',
    icone: <GroupsRoundedIcon />,
    cor: '#f23f35',
  },
  {
    valor: '+490 mil',
    rotulo: 'toneladas / ano',
    icone: <WarehouseRoundedIcon />,
    cor: '#ffb71b',
  },
];

const postsInsights = [
  {
    titulo: 'O guia definitivo do piso mínimo de frete da ANTT',
    categorias: ['Dicas', 'Logística', 'Notícias'],
    imagem: 'https://pizzattolog.com.br/wp-content/uploads/2026/08/o-guia-definitivo-do-piso-minimo-de-frete-da-antt.png',
  },
  {
    titulo: 'Logística de alta densidade: A ciência por trás das carretas Double-Deck e a sua eficiência',
    categorias: ['Inovação', 'Logística'],
    imagem: 'https://pizzattolog.com.br/wp-content/uploads/2026/07/carretas-double-deck-eficiencia.png',
  },
  {
    titulo: 'Caminhos que transformam: a nossa parceria com o Hospital Pequeno Príncipe',
    categorias: ['ESG'],
    imagem: 'https://pizzattolog.com.br/wp-content/uploads/2026/07/parceria-pequeno-principe.png',
  },
];

const imagemAgregados =
  'https://pizzattolog.com.br/wp-content/uploads/2026/03/bannerrrrr-AGREGADOS-e1776274417156.png';
const imagemSolucoes = '/images/solucoes/solucoes-banner.png';
const imagemSolucoesCard = '/images/solucoes/solucoes-card.png';
const imagemSolucoesEficientes = '/images/solucoes/solucoes-eficientes.png';
const imagensCardsSolucoes: Record<string, string> = {
  armazenagem: '/images/solucoes/solucoes-armazenagem-card.png',
  'transporte-de-cargas': '/images/solucoes/solucoes-transporte-card.png',
  'operador-logistico': '/images/solucoes/solucoes-card.png',
};

function getIcone(nome: string | null | undefined) {
  const chave = (nome ?? '').toLowerCase();
  return icones[chave as keyof typeof icones] ?? <SettingsSuggestRoundedIcon fontSize="large" />;
}

interface SolucoesProps {
  solucoes: Solucao[];
  conteudo?: SiteContent;
  mostrarBanner?: boolean;
  mostrarComplementos?: boolean;
}

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
  titleMaxWidth?: number;
  descriptionMaxWidth?: number;
}

function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  inverse = false,
  titleMaxWidth = 900,
  descriptionMaxWidth = 880,
}: SectionHeaderProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
      }}
    >
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <Typography
        variant="h2"
        sx={{
          maxWidth: titleMaxWidth,
          fontSize: { xs: '2rem', md: '3rem' },
          lineHeight: 1.12,
          color: inverse ? 'white' : 'text.primary',
        }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          sx={{
            maxWidth: descriptionMaxWidth,
            color: inverse ? 'rgba(255,255,255,0.82)' : 'text.secondary',
            fontSize: 18,
            lineHeight: 1.75,
          }}
        >
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}

export function Solucoes({ solucoes, conteudo, mostrarBanner = true, mostrarComplementos = true }: SolucoesProps) {
  const solucoesComConteudo = solucoes
    .map((solucao, index) => {
      const fallback =
        conteudoSolucoes[solucao.slug];
      const crmItemPorSlug =
        getContentValue(
          conteudo,
          `itens.${solucao.slug}`,
        ) as
        | (Partial<ConteudoSolucao> & {
          pontos?: string[];
          imagemUrl?: string;
        })
        | undefined;
      // O editor atual usa a ordem Armazenagem, Operador, Transporte.
      // O conteúdo legado em itens continua sendo aceito.
      const editorIndices: Record<string, number> = {
        armazenagem: 0,
        'operador-logistico': 1,
        'transporte-de-cargas': 2,
      };
      const editorIndex = editorIndices[solucao.slug];
      const crmImagemEditavel = editorIndex === undefined
        ? ''
        : getContentString(conteudo, `solucoes.${editorIndex}.imagemUrl`, '');
      const crmImagemUrlPorSlug =
        getContentString(
          conteudo,
          `itens.${solucao.slug}.imagemUrl`,
          '',
        );

      const crmItem =
        crmItemPorSlug ||
        (conteudo && Array.isArray(
          (conteudo as Record<string, unknown>).itens,
        )
          ? (
            (conteudo as Record<string, unknown>).itens as Array<
              Partial<ConteudoSolucao> & {
                pontos?: string[];
                imagemUrl?: string;
              }
            >
          )[index]
          : undefined);

      return {
        ...solucao,
        ...fallback,
        imagemUrl:
          crmImagemEditavel ||
          crmImagemUrlPorSlug ||
          crmItem?.imagemUrl ||
          solucao.imagemUrl ||
          imagensCardsSolucoes[solucao.slug],
        titulo: crmItem?.titulo || fallback.titulo,
        descricao:
          crmItem?.descricao || fallback.descricao,
        itens: crmItem?.pontos?.length
          ? fallback.itens.map(
            (item, itemIndex) =>
              crmItem.pontos?.[itemIndex] || item,
          )
          : fallback.itens,
      };
    })
    .sort((a, b) => a.ordem - b.ordem);
  const segmentosEditaveis =
    mergeTextItems(segmentos, conteudo, 'segmentos', [
      'titulo',
    ]);
  const diferenciaisEditaveis =
    mergeTextItems(diferenciais, conteudo, 'diferenciais', [
      'titulo',
      'texto',
    ]);
  const numerosEditaveis =
    mergeTextItems(numeros, conteudo, 'numeros', [
      'valor',
      'rotulo',
    ]);
  const postsInsightsEditaveis =
    mergeTextItems(postsInsights, conteudo, 'insights', [
      'titulo',
    ]);
  const imagemSolucoesEditavel =
    getContentString(
      conteudo,
      'cabecalho.imagemUrl',
      imagemSolucoes,
    );
  const imagemAgregadosEditavel =
    getContentString(
      conteudo,
      'agregados.imagemUrl',
      imagemAgregados,
    );
  const ctaImagemEditavel =
    getContentString(
      conteudo,
      'cta.imagemUrl',
      imagemSolucoesEficientes,
    );
  const diferenciaisAnimados = [
    ...diferenciaisEditaveis,
    ...diferenciaisEditaveis,
  ];

  return (
    <>
      <Box
        component="section"
        id="solucoes"
        sx={{
          py: {
            xs: 8,
            md: 12,
          },
          bgcolor: 'background.default',
          '@keyframes solucaoSobe': {
            '0%': {
              opacity: 0,
              transform: 'translateY(44px)',
            },
            '100%': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '.solucao-animada': {
              animation: 'none',
              opacity: 1,
              transform: 'none',
            },
          },
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 6 }}>
            <SectionHeader
              label={getContentString(conteudo, 'cabecalho.etiqueta', 'Soluções')}
              title={getContentString(conteudo, 'cabecalho.titulo', 'Soluções Completas e Integradas')}
              description={getContentString(conteudo, 'cabecalho.descricao', 'Nossa operação B2B transforma a complexidade logística em vantagem competitiva, assumindo a gestão total da sua cadeia de suprimentos. Do planejamento à entrega final, entregamos a previsibilidade que o seu negócio exige e a confiança que a sua marca merece.')}
              titleMaxWidth={840}
              descriptionMaxWidth={760}
            />
          </Box>

          {mostrarBanner ? (
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',

                minHeight: {
                  xs: 260,
                  sm: 340,
                  md: 430,
                },

                mb: {
                  xs: 5,
                  md: 6,
                },

                backgroundImage: `url("${imagemSolucoesEditavel}")`,

                backgroundSize: 'cover',

                backgroundPosition: 'center',

                backgroundRepeat: 'no-repeat',
              }}
            />
          ) : null}

          <Stack spacing={{ xs: 7, md: 10 }}>
            {solucoesComConteudo.map((solucao, indice) => {
              const corSolucao = coresSolucoes[solucao.slug] ?? '#ff5805';
              const inverter = indice % 2 === 1;

              return (
                <Box
                  key={solucao.id}
                  id={solucao.slug}
                  className="solucao-animada"
                  sx={{
                    opacity: 0,
                    transform: 'translateY(44px)',
                    animation: 'solucaoSobe 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                    animationDelay: `${indice * 0.14}s`,
                  }}
                >
                  <Grid
                    container
                    spacing={{ xs: 4, md: 7 }}
                    sx={{
                      alignItems: 'center',
                      flexDirection: { md: inverter ? 'row-reverse' : 'row' },
                    }}
                  >
                    <Grid size={{ xs: 12, md: 5 }}>
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          maxWidth: 520,
                          mx: 'auto',
                        }}
                      >
                        <Box
                          component="img"
                          src={solucao.imagemUrl || imagemSolucoesCard}
                          alt={solucao.titulo}
                          sx={{
                            position: 'relative',
                            zIndex: 1,
                            display: 'block',
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                      <Stack spacing={2.25} sx={{ maxWidth: 620, mx: { xs: 0, md: inverter ? 'auto' : 0 } }}>
                        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.55rem' }, fontWeight: 950 }}>
                          {solucao.titulo}
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', fontSize: 17, lineHeight: 1.75 }}>
                          {solucao.descricao}
                        </Typography>

                        {'itens' in solucao && solucao.itens.length ? (
                          <Stack spacing={1.15}>
                            {solucao.itens.map((item) => (
                              <Stack key={item} direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
                                <CheckCircleRoundedIcon
                                  sx={{ mt: '3px', fontSize: 18, color: corSolucao, flexShrink: 0 }}
                                />
                                <Typography sx={{ color: 'text.primary', fontSize: 15.5, lineHeight: 1.55 }}>
                                  {item}
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                        ) : null}
                      </Stack>
                    </Grid>
                  </Grid>

                  {'detalhes' in solucao && solucao.detalhes.length ? (
                    <Grid container spacing={2.25} sx={{ mt: { xs: 4, md: 6 } }}>
                      {solucao.detalhes.map((detalhe) => (
                        <Grid key={detalhe.titulo} size={{ xs: 12, md: solucao.detalhes.length === 4 ? 3 : 4 }}>
                          <Paper
                            elevation={0}
                            sx={{
                              position: 'relative',
                              height: '100%',
                              minHeight: 210,
                              p: { xs: 3, md: 3.25 },
                              borderRadius: 2,
                              border: '1px solid rgba(15, 23, 42, 0.05)',
                              bgcolor: '#ECECEC',
                              overflow: 'hidden',
                              boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 24,
                                width: 68,
                                height: 5,
                                bgcolor: corSolucao,
                                borderRadius: '0 0 8px 8px',
                              },
                              '&:hover': {
                                transform: { md: 'translateY(-4px)' },
                                boxShadow: `0 22px 42px ${corSolucao}33`,
                              },
                            }}
                          >
                            <Stack spacing={1.75}>
                              <Box
                                sx={{
                                  width: 58,
                                  height: 58,
                                  borderRadius: 2,
                                  display: 'grid',
                                  placeItems: 'center',
                                  bgcolor: '#f23f35',
                                  color: 'white',
                                  '& svg': { fontSize: 30 },
                                }}
                              >
                                {getIcone(solucao.icone)}
                              </Box>
                              <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.18 }}>
                                {detalhe.titulo}
                              </Typography>
                              <Typography sx={{ color: 'text.primary', lineHeight: 1.62 }}>{detalhe.texto}</Typography>
                            </Stack>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : null}
                </Box>
              );
            })}
          </Stack>

          <Paper
            elevation={0}
            sx={{
              mt: 5,
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: { xs: 'stretch', sm: 'flex-end' },
              width: '100vw',
              maxWidth: 'none',
              ml: 'calc(50% - 50vw)',
              mr: 'calc(50% - 50vw)',
              minHeight: { xs: 260, sm: 340, md: 430 },
              p: { xs: 3, md: 4, lg: 6 },
              borderRadius: 0,
              overflow: 'hidden',
              backgroundImage: `url("${ctaImagemEditavel}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',

            }}
          >
            <Button
              href="/solicitar-cotacao"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                position: 'relative',
                zIndex: 1,
                width: { xs: '100%', sm: 'fit-content' },
                flexShrink: 0,
              }}
            >
              {getContentString(conteudo, 'cta.botaoTexto', 'Solicitar cotação')}
            </Button>
          </Paper>
        </Container>
      </Box>

      {mostrarComplementos ? (
        <>
          <Box component="section" id="segmentos-de-atuacao" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'white' }}>
            <Container maxWidth="xl">
              <Grid container spacing={{ xs: 4, md: 7 }} sx={{ alignItems: 'center' }}>
                <Grid size={{ xs: 12, md: 5 }}>
                  <SectionHeader
                    label="Segmentos de atuação"
                    title={getContentString(conteudo, 'segmentosCabecalho.titulo', 'Especialistas em logística B2B para operações reguladas.')}
                    description={getContentString(conteudo, 'segmentosCabecalho.descricao', 'Somos especialistas em logística B2B para os segmentos de Químicos, Cosméticos e mercado Pet. Nossas soluções atendem empresas que buscam transportadora especializada em produtos regulados, com foco em segurança operacional, conformidade legal, licenças obrigatórias, previsibilidade nas entregas e gestão de riscos.')}
                    align="left"
                    titleMaxWidth={560}
                    descriptionMaxWidth={600}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                  <Grid container spacing={3}>
                    {segmentosEditaveis.map((segmento) => (
                      <Grid key={segmento.titulo} size={{ xs: 12, sm: 4 }}>
                        <Paper
                          elevation={0}
                          sx={{
                            position: 'relative',
                            overflow: 'hidden',
                            height: '100%',
                            minHeight: { xs: 220, md: 264 },
                            p: { xs: 3, md: 3.5 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            border: '1px solid rgba(15, 23, 42, 0.05)',
                            bgcolor: '#ECECEC',
                            borderRadius: 3,
                            boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '50%',
                              width: 94,
                              height: 7,
                              bgcolor: segmento.cor,
                              borderRadius: '0 0 8px 8px',
                              transform: 'translateX(-50%)',
                            },
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: `0 22px 42px ${segmento.cor}33`,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'grid',
                              placeItems: 'center',
                              color: segmento.cor,
                              mb: 3,
                            }}
                          >
                            {segmento.icone}
                          </Box>
                          <Typography
                            variant="h5"
                            sx={{
                              maxWidth: 240,
                              fontWeight: 900,
                              lineHeight: 1.16,
                              color: 'text.primary',
                            }}
                          >
                            {segmento.titulo}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>

          <Box component="section" id="diferenciais" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
              <Box sx={{ mb: 5 }}>
                <SectionHeader
                  label="Nossos diferenciais"
                  title={getContentString(conteudo, 'diferenciaisCabecalho.titulo', 'Diferenciais que conectam performance, segurança e estratégia.')}
                  titleMaxWidth={820}
                />
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  pb: 2,
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '&:hover .diferenciais-track': {
                    animationPlayState: 'paused',
                  },
                  '@keyframes diferenciaisMarquee': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    '.diferenciais-track': {
                      animation: 'none',
                    },
                  },
                }}
              >
                <Box
                  className="diferenciais-track"
                  sx={{
                    display: 'flex',
                    gap: 3,
                    width: 'max-content',
                    animation: 'diferenciaisMarquee 34s linear infinite',
                  }}
                >
                  {diferenciaisAnimados.map((item, index) => (
                    <Paper
                      key={`${item.titulo}-${index}`}
                      elevation={0}
                      aria-hidden={index >= diferenciaisEditaveis.length ? true : undefined}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        flex: '0 0 auto',
                        width: { xs: 292, sm: 360, md: 420 },
                        minHeight: 330,
                        p: { xs: 3.25, md: 4 },
                        border: '1px solid rgba(15, 23, 42, 0.05)',
                        bgcolor: 'white',
                        borderRadius: 3,
                        boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 32,
                          width: 96,
                          height: 7,
                          bgcolor: item.cor,
                          borderRadius: '0 0 8px 8px',
                        },
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 22px 42px ${item.cor}33`,
                        },
                      }}
                    >
                      <Stack spacing={2.25}>
                        <Box
                          sx={{
                            width: 82,
                            height: 82,
                            display: 'grid',
                            placeItems: 'center',
                            color: item.cor,
                            bgcolor: `${item.cor}17`,
                            border: `1px solid ${item.cor}45`,
                            borderRadius: 2.5,
                          }}
                        >
                          {item.icone}
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 900, lineHeight: 1.18 }}>
                          {item.titulo}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', lineHeight: 1.75 }}>{item.texto}</Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: '0 auto 0 0',
                    width: { xs: 32, md: 90 },
                    pointerEvents: 'none',
                    background: 'linear-gradient(90deg, #F4F7F7 0%, rgba(244,247,247,0) 100%)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: '0 0 0 auto',
                    width: { xs: 32, md: 90 },
                    pointerEvents: 'none',
                    background: 'linear-gradient(270deg, #F4F7F7 0%, rgba(244,247,247,0) 100%)',
                  }}
                />
              </Box>
            </Container>
          </Box>

          <Box
            component="section"
            id="nossos-numeros"
            sx={{
              position: 'relative',
              overflow: 'hidden',
              py: { xs: 8, md: 11 },
              bgcolor: 'white',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                opacity: 0.28,
                backgroundImage:
                  'linear-gradient(135deg, transparent 0 22%, rgba(242,63,53,0.18) 22.2%, transparent 22.6%), linear-gradient(35deg, transparent 0 55%, rgba(255,183,27,0.18) 55.2%, transparent 55.8%)',
                backgroundSize: '420px 260px, 520px 340px',
              }}
            />
            <Container maxWidth="xl" sx={{ position: 'relative' }}>
              <Box sx={{ mb: 6 }}>
                <SectionHeader label="Nossos números" title="Nossos números" />
              </Box>

              <Grid container spacing={3}>
                {numerosEditaveis.map((numero) => (
                  <Grid key={numero.rotulo} size={{ xs: 12, sm: 6, lg: 3 }}>
                    <Paper
                      elevation={0}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: '100%',
                        minHeight: 250,
                        p: { xs: 3.25, md: 4 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        border: `4px solid ${numero.cor}`,
                        borderTopWidth: 7,
                        borderRadius: '0 30px 0 30px',
                        bgcolor: 'rgba(255,255,255,0.92)',
                        boxShadow: '0 18px 38px rgba(19, 39, 57, 0.08)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 24px 46px ${numero.cor}38`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 74,
                          height: 74,
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: '#f23f35',
                          color: 'white',
                          borderRadius: 2,
                          '& svg': { fontSize: 38 },
                        }}
                      >
                        {numero.icone}
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: 40, md: 48 },
                            fontWeight: 950,
                            lineHeight: 0.95,
                            color: 'text.primary',
                          }}
                        >
                          {numero.valor}
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.75,
                            fontSize: { xs: 24, md: 29 },
                            fontWeight: 900,
                            lineHeight: 1.08,
                            color: 'text.primary',
                          }}
                        >
                          {numero.rotulo}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Box
            component="section"
            id="agregados"
            sx={{
              position: 'relative',
              overflow: 'hidden',
              minHeight: { xs: 420, md: 520 },
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              backgroundColor: 'primary.dark',
              backgroundImage: imagemAgregadosEditavel
                ? `url("${imagemAgregadosEditavel}")`
                : 'none',

              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 10 } }}>
              <Stack spacing={3} sx={{ maxWidth: 720 }}>
                <SectionHeader
                  label="Agregados"
                  title={getContentString(conteudo, 'agregados.titulo', 'Venha ser agregado e conheça o Clube de Benefícios exclusivos.')}
                  align="left"
                  inverse
                  titleMaxWidth={620}
                />
                <Button
                  href="/agregados"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {getContentString(conteudo, 'agregados.botaoTexto', 'Saiba mais')}
                </Button>
              </Stack>
            </Container>
          </Box>

          <Box component="section" id="insights-tendencias" sx={{ py: { xs: 8, md: 11 }, bgcolor: 'white' }}>
            <Container maxWidth="xl">
              <Box sx={{ mb: 6 }}>
                <SectionHeader
                  label=""
                  title={getContentString(conteudo, 'insightsCabecalho.titulo', 'Insights & Tendências')}
                  description={getContentString(conteudo, 'insightsCabecalho.descricao', 'Conheça as últimas tendências em logística, transformação digital e gestão estratégica que impulsionam o sucesso dos nossos clientes.')}
                  descriptionMaxWidth={960}
                />
              </Box>

              <Grid container spacing={3}>
                {postsInsightsEditaveis.map((post) => (
                  <Grid key={post.titulo} size={{ xs: 12, md: 4 }}>
                    <Paper
                      component="a"
                      href="/blog"
                      elevation={0}
                      sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'flex-end',
                        minHeight: { xs: 360, md: 420 },
                        p: { xs: 3, md: 3.5 },
                        borderRadius: 4,
                        color: 'white',
                        backgroundImage: `linear-gradient(180deg, rgba(9,43,67,0.12) 0%, rgba(9,43,67,0.56) 42%, rgba(9,43,67,0.88) 100%), url("${post.imagem}")`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        boxShadow: '0 18px 38px rgba(19, 39, 57, 0.12)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 24px 48px rgba(255, 88, 5, 0.26)',
                        },
                      }}
                    >
                      <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                          {post.categorias.map((categoria) => (
                            <Chip
                              key={categoria}
                              label={categoria}
                              size="small"
                              sx={{
                                color: 'white',
                                bgcolor: '#ffb71b',
                                fontWeight: 900,
                              }}
                            />
                          ))}
                        </Stack>
                        <Typography variant="h5" sx={{ fontWeight: 950, lineHeight: 1.22 }}>
                          {post.titulo}
                        </Typography>
                        <Button
                          component="span"
                          endIcon={<ArrowForwardRoundedIcon />}
                          sx={{
                            alignSelf: 'flex-start',
                            minHeight: 32,
                            px: 0,
                            color: 'white',
                            fontWeight: 900,
                            '&:hover': {
                              bgcolor: 'transparent',
                              boxShadow: 'none',
                            },
                          }}
                        >
                          Saiba mais
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Stack sx={{ alignItems: 'center', mt: 6 }}>
                <Button href="/blog" variant="contained" color="secondary" size="large">
                  Ver todas as notícias
                </Button>
              </Stack>
            </Container>
          </Box>
        </>
      ) : null}
    </>
  );
}
