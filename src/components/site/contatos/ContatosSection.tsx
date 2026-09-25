'use client';

import { FormEvent, ReactNode, useState } from 'react';

import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import GavelRoundedIcon from '@mui/icons-material/GavelRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

import { NossasUnidadesSection } from '@/components/site/quem-somos/nossas-unidades/NossasUnidadesSection';
import {
  enviarAnexosSolicitacaoSite,
  enviarEntradaSite,
} from '@/services/site/entrada-site.service';
import { trackFaleConoscoEnviado } from '@/lib/analytics/tracking';

import {
  mergeTextItems,
  type SiteContent,
} from '@/utils/site-content';
import {
  buildAgregadoSitePayload,
  buildContatoSitePayload,
} from './contatos-form';

const areasContato = [
  { titulo: 'Solicite uma cotação', icone: <RequestQuoteRoundedIcon />, href: '/solicitar-cotacao' },
  { titulo: 'Seja um agregado', icone: <LocalShippingRoundedIcon /> },
  { titulo: 'Seja um fornecedor', icone: <HandshakeRoundedIcon /> },
  { titulo: 'Frota e Manutenção', icone: <BuildRoundedIcon /> },
  { titulo: 'Marketing e Comunicação', icone: <CampaignRoundedIcon /> },
  { titulo: 'Financeiro', icone: <AccountBalanceWalletRoundedIcon /> },
  { titulo: 'Jurídico', icone: <GavelRoundedIcon /> },
  { titulo: 'Fiscal', icone: <ReceiptLongRoundedIcon /> },
] as const;

const canaisAtendimento = [
  {
    titulo: 'Canal de ouvidoria',
    texto:
      'Envie situações de forma anônima e segura, com confidencialidade em todo o registro.',
    botao: 'Ouvidor Digital',
    href: 'https://www.contatoseguro.com.br/pizzattolog',
    icone: <MarkUnreadChatAltRoundedIcon />,
    cor: '#ee2737',
  },
  {
    titulo: 'Agregados',
    texto:
      'Conheça o clube de benefícios para motoristas agregados e acompanhe as oportunidades.',
    botao: 'Quero ser agregado',
    href: '/agregados',
    icone: <LocalShippingRoundedIcon />,
    cor: '#ee2737',
  },
  {
    titulo: 'Lei Geral de Proteção de Dados',
    texto:
      'Acesse nossas informações sobre transparência no tratamento de dados pessoais.',
    botao: 'Tratamento de Dados',
    href: '/lei-geral-de-protecao-de-dados',
    icone: <VisibilityRoundedIcon />,
    cor: '#ee2737',
  },
] as const;

function ContactTextField({
  label,
  multiline = false,
  name,
  required = false,
  type,
}: {
  label: string;
  multiline?: boolean;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <TextField
      label={label}
      name={name}
      required={required}
      type={type}
      variant="standard"
      fullWidth
      multiline={multiline}
      minRows={multiline ? 4 : undefined}
      slotProps={{
        inputLabel: {
          sx: {
            color: 'text.primary',
            fontWeight: 500,
          },
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: 16,
        },
        '& .MuiInput-underline:before': {
          borderBottomColor: alpha('#17212B', 0.16),
        },
        '& .MuiInput-underline:hover:before': {
          borderBottomColor: alpha('#ff5805', 0.55),
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#ff5805',
        },
      }}
    />
  );
}

function AgregadoTextField({
  label,
  multiline = false,
  select = false,
  defaultValue = '',
  name,
  required = false,
  children,
}: {
  label: string;
  multiline?: boolean;
  select?: boolean;
  defaultValue?: string;
  name: string;
  required?: boolean;
  children?: ReactNode;
}) {
  return (
    <TextField
      label={label}
      name={name}
      required={required}
      defaultValue={defaultValue}
      select={select}
      fullWidth
      multiline={multiline}
      minRows={multiline ? 4 : undefined}
      variant="outlined"
      slotProps={{
        inputLabel: {
          sx: {
            color: 'text.secondary',
            fontWeight: 700,
          },
        },
        input: {
          sx: {
            borderRadius: 2,
            bgcolor: '#fff',
            fontSize: 16,
          },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          transition: 'box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
          '& fieldset': {
            borderColor: alpha('#17212B', 0.16),
          },
          '&:hover fieldset': {
            borderColor: alpha('#ff5805', 0.72),
          },
          '&.Mui-focused': {
            bgcolor: '#fff',
            boxShadow: '0 0 0 4px rgba(255, 88, 5, 0.1)',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ff5805',
            borderWidth: 1,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: 2,
        },
      }}
    >
      {children}
    </TextField>
  );
}

function AreaButton({
  active,
  children,
  href,
  icon,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  href?: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      type={href ? undefined : 'button'}
      href={href}
      onClick={onClick}
      fullWidth
      startIcon={icon}
      sx={{
        minHeight: 58,
        justifyContent: 'flex-start',
        gap: 1.25,
        px: 2,
        py: 1.4,
        borderRadius: 2,
        color: active ? 'white' : 'text.primary',
        bgcolor: active ? '#ff5805' : 'white',
        boxShadow: active ? '0 16px 34px rgba(255, 88, 5, 0.24)' : 'none',
        '& .MuiButton-startIcon': {
          m: 0,
          color: active ? 'white' : '#17456B',
        },
        '&:hover': {
          bgcolor: active ? '#e84f04' : alpha('#ff5805', 0.08),
          boxShadow: active
            ? '0 18px 38px rgba(255, 88, 5, 0.28)'
            : '0 10px 22px rgba(23, 69, 107, 0.08)',
        },
      }}
    >
      <Box component="span" sx={{ minWidth: 0, textAlign: 'left', fontWeight: 850 }}>
        {children}
      </Box>
    </Button>
  );
}

interface ContatosSectionProps {
  conteudo?: SiteContent;
}

type ContactSubmitStatus = 'idle' | 'enviando' | 'sucesso' | 'erro';


function getMensagemSucesso(area: string) {
  switch (area) {
    case 'Seja um agregado':
      return {
        titulo: 'Cadastro enviado com sucesso!',
        descricao:
          'Recebemos seus dados e documentos. O time responsável por Agregados da Pizzattolog irá analisar as informações enviadas e dará continuidade ao atendimento.',
      };

    case 'Seja um fornecedor':
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos seu contato. As informações serão encaminhadas ao time responsável por fornecedores da Pizzattolog.',
      };

    case 'Frota e Manutenção':
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos sua mensagem e ela será direcionada ao time de Frota e Manutenção da Pizzattolog.',
      };

    case 'Marketing e Comunicação':
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos sua mensagem e ela será direcionada ao time de Marketing e Comunicação da Pizzattolog.',
      };

    case 'Financeiro':
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos sua mensagem e ela será direcionada ao time Financeiro da Pizzattolog para análise.',
      };

    case 'Jurídico':
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos sua mensagem e ela será direcionada ao time Jurídico da Pizzattolog.',
      };

    case 'Fiscal':
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos sua mensagem e ela será direcionada ao time Fiscal da Pizzattolog.',
      };

    default:
      return {
        titulo: 'Solicitação enviada com sucesso!',
        descricao:
          'Recebemos suas informações. O time responsável da Pizzattolog irá analisar sua solicitação e dará continuidade ao atendimento.',
      };
  }
}

export default function ContatosSection({
  conteudo,
}: ContatosSectionProps) {
  const areasContatoEditaveis =
    mergeTextItems(areasContato, conteudo, 'areasContato', [
      'titulo',
    ]);
  const canaisAtendimentoEditaveis =
    mergeTextItems(canaisAtendimento, conteudo, 'canaisAtendimento', [
      'titulo',
      'texto',
    ]);
  const [areaSelecionada, setAreaSelecionada] = useState<string>('Seja um fornecedor');
  const [statusEnvio, setStatusEnvio] = useState<ContactSubmitStatus>('idle');
  const [erroEnvio, setErroEnvio] = useState('');
  const formularioAgregado = areaSelecionada === 'Seja um agregado';
  const enviando = statusEnvio === 'enviando';
  const mensagemSucesso = getMensagemSucesso(areaSelecionada);

  function getFormValue(formData: FormData, name: string) {
    const value = formData.get(name);
    return typeof value === 'string' ? value : '';
  }

  function selecionarAreaContato(area: string) {
    setAreaSelecionada(area);
    setErroEnvio('');
    setStatusEnvio('idle');
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (enviando) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const arquivos = formularioAgregado
      ? formData
        .getAll('arquivos')
        .filter(
          (item): item is File =>
            item instanceof File &&
            item.size > 0,
        )
      : [];


    setErroEnvio('');
    setStatusEnvio('enviando');

    try {
      const payload = formularioAgregado
        ? buildAgregadoSitePayload({
          nome: getFormValue(
            formData,
            'nome',
          ),

          email: getFormValue(
            formData,
            'email',
          ),

          telefone: getFormValue(
            formData,
            'telefone',
          ),

          cidade: getFormValue(
            formData,
            'cidade',
          ),

          categoriaCnh: getFormValue(
            formData,
            'categoriaCnh',
          ),

          possuiMopp: getFormValue(
            formData,
            'possuiMopp',
          ),

          possuiEar: getFormValue(
            formData,
            'possuiEar',
          ),

          marcaVeiculo: getFormValue(
            formData,
            'marcaVeiculo',
          ),

          anoVeiculo: getFormValue(
            formData,
            'anoVeiculo',
          ),

          mensagem: getFormValue(
            formData,
            'mensagem',
          ),

          aceiteComunicacao:
            formData.has(
              'aceiteComunicacao',
            ),

          aceitePrivacidade:
            formData.has(
              'aceitePrivacidade',
            ),
        })
        : buildContatoSitePayload(
          areaSelecionada,
          {
            nome: getFormValue(
              formData,
              'nome',
            ),

            email: getFormValue(
              formData,
              'email',
            ),

            cargo: getFormValue(
              formData,
              'cargo',
            ),

            telefone: getFormValue(
              formData,
              'telefone',
            ),

            mensagem: getFormValue(
              formData,
              'mensagem',
            ),

            aceiteComunicacao:
              formData.has(
                'aceiteComunicacao',
              ),
          },
        );

      const resultado =
        await enviarEntradaSite(payload);

      if (
        formularioAgregado &&
        arquivos.length > 0
      ) {
        await enviarAnexosSolicitacaoSite(
          resultado.solicitacao.id,
          arquivos,
        );
      }

      form.reset();

      setStatusEnvio('sucesso');
      trackFaleConoscoEnviado(areaSelecionada);
    } catch (error) {
      setErroEnvio(
        error instanceof Error
          ? error.message
          : 'Não foi possível enviar sua solicitação. Tente novamente.',
      );

      setStatusEnvio('erro');
    }
  }

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#F7F8F8',
      }}
    >
      <Box
        id="fale-conosco"
        component="section"
        sx={{
          pt: { xs: 13, md: 16 },
          pb: { xs: 7, md: 9 },
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 4, md: 5 }}>
            <Box
              sx={{
                maxWidth: 820,

                position: 'relative',

                left: {
                  xs: 0,
                  md: 40,
                },
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                sx={{
                  color: 'text.primary',
                  fontSize: { xs: '2.45rem', md: '4rem' },
                  lineHeight: 1.04,
                }}
              >
                Fale conosco
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  color: 'text.secondary',
                  fontSize: { xs: 17, md: 20 },
                  fontWeight: 650,
                }}
              >
                Escolha a área de interesse e nos envie uma mensagem.
              </Typography>
            </Box>

            <Grid
              container
              spacing={{ xs: 3, lg: 4 }}
              sx={{
                alignItems: 'stretch',

                maxWidth: 1420,
                mx: 'auto',

                px: {
                  xs: 0,
                  md: 2,
                  lg: 3,
                },
              }}
            >
              <Grid size={{ xs: 12, md: 3 }}>
                <Stack spacing={1.75}>
                  {areasContatoEditaveis.map((area) => {
                    const href = 'href' in area ? area.href : undefined;

                    return (
                      <AreaButton
                        key={area.titulo}
                        active={!href && areaSelecionada === area.titulo}
                        href={href}
                        icon={area.icone}
                        onClick={href ? undefined : () => selecionarAreaContato(area.titulo)}
                      >
                        {area.titulo}
                      </AreaButton>
                    );
                  })}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 9 }}
                sx={{
                  position: 'relative',

                  left: {
                    xs: 0,

                  },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: { xs: 3, sm: 4, md: 5 },
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: alpha('#17212B', 0.06),
                    bgcolor: 'white',
                    boxShadow: '0 24px 70px rgba(23, 33, 43, 0.08)',
                  }}
                >
                  <Box component="form" key={areaSelecionada} onSubmit={handleSubmit}>
                    <Stack spacing={3}>


                      {statusEnvio === 'erro' && erroEnvio ? (
                        <Alert severity="error">
                          {erroEnvio}
                        </Alert>
                      ) : null}




                      {formularioAgregado ? (
                        <>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            sx={{
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              justifyContent: 'space-between',
                              p: { xs: 2.5, md: 3 },
                              borderRadius: 3,
                              bgcolor: alpha('#ff5805', 0.08),
                              border: '1px solid',
                              borderColor: alpha('#ff5805', 0.16),
                            }}
                          >
                            <Stack direction="row" spacing={1.75} sx={{ alignItems: 'center' }}>
                              <Box
                                sx={{
                                  display: 'grid',
                                  placeItems: 'center',
                                  width: 54,
                                  height: 54,
                                  flexShrink: 0,
                                  borderRadius: 2,
                                  bgcolor: '#ff5805',
                                  color: 'white',
                                }}
                              >
                                <PersonAddAlt1RoundedIcon />
                              </Box>

                              <Box>
                                <Typography
                                  component="h2"
                                  sx={{
                                    color: 'text.primary',
                                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                  }}
                                >
                                  Cadastre-se agora
                                </Typography>
                                <Typography sx={{ mt: 0.75, color: 'text.secondary', lineHeight: 1.6 }}>
                                  Preencha seus dados para participar do programa de agregados Pizzattolog.
                                </Typography>
                              </Box>
                            </Stack>
                          </Stack>

                          <Grid container spacing={{ xs: 2.5, md: 3 }}>
                            <Grid size={{ xs: 12 }}>
                              <AgregadoTextField label="Nome" name="nome" required />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <AgregadoTextField label="E-mail" name="email" required />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <AgregadoTextField label="Telefone" name="telefone" required />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <AgregadoTextField label="Cidade" name="cidade" />
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <AgregadoTextField label="Categoria CNH" name="categoriaCnh" select defaultValue="Categoria A">
                                <MenuItem value="Categoria A">Categoria A</MenuItem>
                                <MenuItem value="Categoria B">Categoria B</MenuItem>
                                <MenuItem value="Categoria C">Categoria C</MenuItem>
                                <MenuItem value="Categoria D">Categoria D</MenuItem>
                                <MenuItem value="Categoria E">Categoria E</MenuItem>
                              </AgregadoTextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <AgregadoTextField label="Possui MOPP?" name="possuiMopp" select defaultValue="Sim">
                                <MenuItem value="Sim">Sim</MenuItem>
                                <MenuItem value="Não">Não</MenuItem>
                              </AgregadoTextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <AgregadoTextField label="Possui EAR?" name="possuiEar" select defaultValue="Sim">
                                <MenuItem value="Sim">Sim</MenuItem>
                                <MenuItem value="Não">Não</MenuItem>
                              </AgregadoTextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <AgregadoTextField label="Marca do veículo" name="marcaVeiculo" select defaultValue="Volvo">
                                <MenuItem value="Volvo">Volvo</MenuItem>
                                <MenuItem value="Scania">Scania</MenuItem>
                                <MenuItem value="Mercedes-Benz">Mercedes-Benz</MenuItem>
                                <MenuItem value="DAF">DAF</MenuItem>
                                <MenuItem value="Iveco">Iveco</MenuItem>
                                <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                                <MenuItem value="Outro">Outro</MenuItem>
                              </AgregadoTextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <AgregadoTextField label="Ano do veículo" name="anoVeiculo" select defaultValue="2010">
                                {Array.from({ length: 18 }, (_, index) => String(2010 + index)).map((ano) => (
                                  <MenuItem key={ano} value={ano}>
                                    {ano}
                                  </MenuItem>
                                ))}
                              </AgregadoTextField>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                              <AgregadoTextField label="Sua mensagem" name="mensagem" multiline />
                            </Grid>
                          </Grid>

                          <Paper
                            elevation={0}
                            sx={{
                              p: { xs: 2, md: 2.5 },
                              borderRadius: 3,
                              border: '1px dashed',
                              borderColor: alpha('#17456B', 0.28),
                              bgcolor: alpha('#17456B', 0.04),
                            }}
                          >
                            <Stack
                              direction={{ xs: 'column', sm: 'row' }}
                              spacing={2}
                              sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}
                            >
                              <Box>
                                <Typography sx={{ color: 'text.primary', fontSize: 16, fontWeight: 850 }}>
                                  Anexar arquivos
                                </Typography>
                                <Typography sx={{ mt: 0.5, color: 'text.secondary', fontSize: 14 }}>
                                  Envie CNH, documento do veículo ou arquivos de apoio.
                                </Typography>
                              </Box>

                              <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadRoundedIcon />}
                                sx={{
                                  minHeight: 48,
                                  borderColor: alpha('#17456B', 0.24),
                                  color: '#17456B',
                                  fontWeight: 900,
                                  '&:hover': {
                                    borderColor: '#ff5805',
                                    color: '#ff5805',
                                    bgcolor: alpha('#ff5805', 0.08),
                                  },
                                }}
                              >
                                Escolher arquivos
                                <Box
                                  component="input"
                                  type="file"
                                  name="arquivos"
                                  multiple
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  hidden
                                />
                              </Button>
                            </Stack>
                          </Paper>

                          <Stack spacing={1.5}>
                            <FormControlLabel
                              control={<Checkbox name="aceiteComunicacao" sx={{ color: alpha('#17212B', 0.56), '&.Mui-checked': { color: '#ff5805' } }} />}
                              label={
                                <Typography component="span" sx={{ color: 'text.secondary', fontSize: 16 }}>
                                  Aceito receber material de comunicação e respostas por e-mail.
                                </Typography>
                              }
                            />
                            <FormControlLabel
                              control={<Checkbox name="aceitePrivacidade" required sx={{ color: alpha('#17212B', 0.56), '&.Mui-checked': { color: '#ff5805' } }} />}
                              label={
                                <Typography component="span" sx={{ color: 'text.secondary', fontSize: 16 }}>
                                  Eu concordo com a{' '}
                                  <Link href="/politica-de-privacidade" sx={{ textDecoration: 'underline' }}>
                                    Política de Privacidade
                                  </Link>{' '}
                                  e com os{' '}
                                  <Link href="/termos-de-uso" sx={{ textDecoration: 'underline' }}>
                                    Termos de uso
                                  </Link>{' '}
                                  da Pizzattolog.
                                </Typography>
                              }
                            />
                          </Stack>

                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={enviando}
                            endIcon={<SendRoundedIcon />}
                            sx={{
                              minHeight: 54,
                              width: '100%',
                              borderRadius: 999,
                              fontSize: 16,
                              fontWeight: 900,
                              bgcolor: '#ff5805',
                              boxShadow: '0 16px 34px rgba(255, 88, 5, 0.26)',
                              '&:hover': {
                                bgcolor: '#e84f04',
                                boxShadow: '0 18px 38px rgba(255, 88, 5, 0.32)',
                              },
                            }}
                          >
                            {enviando ? (
                              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                                <CircularProgress size={20} color="inherit" />
                                <span>Enviando...</span>
                              </Stack>
                            ) : (
                              'Enviar'
                            )}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 1,
                              width: 'fit-content',
                              px: 1.5,
                              py: 0.75,
                              borderRadius: 2,
                              color: '#ff5805',
                              bgcolor: alpha('#ff5805', 0.08),
                              fontWeight: 850,
                            }}
                          >
                            <ShieldRoundedIcon fontSize="small" />
                            {areaSelecionada}
                          </Box>

                          <Grid container spacing={{ xs: 2.5, md: 3 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <ContactTextField
                                label="Nome"
                                name="nome"
                                required
                              />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                              <ContactTextField
                                label="Email"
                                name="email"
                                type="email"
                                required
                              />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                              <ContactTextField
                                label="Cargo"
                                name="cargo"
                                required
                              />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                              <ContactTextField
                                label="Telefone"
                                name="telefone"
                                required
                              />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                              <ContactTextField
                                label="Mensagem"
                                name="mensagem"
                                multiline
                              />
                            </Grid>
                          </Grid>

                          <Stack spacing={1.5}>
                            <FormControlLabel
                              control={<Checkbox name="aceiteComunicacao" sx={{ color: alpha('#17212B', 0.56) }} />}
                              label={
                                <Typography component="span" sx={{ color: 'text.secondary' }}>
                                  Eu concordo em receber comunicações.
                                </Typography>
                              }
                            />
                            <Typography sx={{ color: 'text.secondary' }}>
                              Eu concordo com a{' '}
                              <Link href="/politica-de-privacidade" sx={{ textDecoration: 'underline' }}>
                                Política de Privacidade
                              </Link>{' '}
                              e com os{' '}
                              <Link href="/termos-de-uso" sx={{ textDecoration: 'underline' }}>
                                Termos de uso
                              </Link>{' '}
                              da PIZZATTOLOG.
                            </Typography>
                          </Stack>

                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={enviando}
                            endIcon={<SendRoundedIcon />}
                            sx={{
                              minHeight: 54,
                              width: '100%',
                              borderRadius: 999,
                              fontSize: 18,
                              fontWeight: 900,
                              bgcolor: '#ffb22e',
                              color: '#17212B',
                              '&:hover': {
                                bgcolor: '#ff5805',
                                color: 'white',
                              },
                            }}
                          >
                            {enviando ? (
                              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                                <CircularProgress size={20} color="inherit" />
                                <span>Enviando...</span>
                              </Stack>
                            ) : (
                              'Cadastrar'
                            )}
                          </Button>
                          <Typography sx={{ color: 'text.secondary', fontSize: 13.5 }}>
                            Prometemos não utilizar suas informações de contato para enviar qualquer tipo de SPAM.
                          </Typography>
                        </>
                      )}

                      {statusEnvio === 'sucesso' ? (
                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 2.5, md: 3 },
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'rgba(46, 125, 50, 0.22)',
                            bgcolor: 'rgba(46, 125, 50, 0.06)',
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                              alignItems: 'flex-start',
                            }}
                          >
                            <Box
                              sx={{
                                display: 'grid',
                                placeItems: 'center',
                                width: 48,
                                height: 48,
                                flexShrink: 0,
                                borderRadius: '50%',
                                bgcolor: 'success.main',
                                color: 'white',
                              }}
                            >
                              <CheckCircleRoundedIcon />
                            </Box>

                            <Box>
                              <Typography
                                sx={{
                                  color: 'success.dark',
                                  fontSize: { xs: 16, md: 18 },
                                  fontWeight: 900,
                                }}
                              >
                                {mensagemSucesso.titulo}
                              </Typography>

                              <Typography
                                sx={{
                                  mt: 0.75,
                                  color: 'text.secondary',
                                  fontSize: 15,
                                  lineHeight: 1.65,
                                }}
                              >
                                {mensagemSucesso.descricao}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      ) : null}
                    </Stack>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 7, md: 9 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Stack spacing={{ xs: 3.5, md: 4.5 }}>
            <Typography
              component="h2"
              variant="h2"
              sx={{
                color: 'text.primary',
                textAlign: 'center',
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Outros canais de atendimento
            </Typography>

            <Grid container spacing={3}>
              {canaisAtendimentoEditaveis.map((canal) => (
                <Grid key={canal.titulo} size={{ xs: 12, md: 4 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      position: 'relative',
                      height: '100%',
                      minHeight: 330,
                      p: { xs: 3, md: 3.5 },
                      overflow: 'hidden',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: alpha('#ffb71b', 0.42),
                      bgcolor: '#ffb71b',
                      color: 'white',
                      boxShadow: '0 22px 52px rgba(255, 183, 27, 0.24)',
                    }}
                  >
                    <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
                      <Box
                        sx={{
                          display: 'grid',
                          placeItems: 'center',
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          bgcolor: canal.cor,
                          color: 'white',
                          '& svg': { fontSize: 30 },
                        }}
                      >
                        {canal.icone}
                      </Box>

                      <Typography
                        component="h3"
                        sx={{
                          fontSize: { xs: '1.65rem', md: '1.8rem' },
                          lineHeight: 1.05,
                          fontWeight: 900,
                        }}
                      >
                        {canal.titulo}
                      </Typography>

                      <Typography sx={{ fontSize: 16, lineHeight: 1.6, fontWeight: 700 }}>
                        {canal.texto}
                      </Typography>

                      <Box sx={{ flexGrow: 1 }} />

                      <Button
                        href={canal.href}
                        target={canal.href.startsWith('http') ? '_blank' : undefined}
                        rel={canal.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        endIcon={<ArrowForwardRoundedIcon />}
                        sx={{
                          alignSelf: 'flex-start',
                          minHeight: 48,
                          bgcolor: '#4f4f4f',
                          color: 'white',
                          px: 2.5,
                          fontWeight: 900,
                          '&:hover': {
                            bgcolor: '#17212B',
                          },
                        }}
                      >
                        {canal.botao}
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      <NossasUnidadesSection
        id="onde-estamos"
        etiqueta="Onde estamos"
        titulo="Onde estamos"
        descricao="Encontre a unidade Pizzattolog mais próxima e veja os endereços que apoiam nossas operações pelo Brasil."
        bgcolor="#F7F8F8"
      />
    </Box>
  );
}
