'use client';

import { FormEvent, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  enviarEntradaSite,
  type EntradaSitePayload,
} from '@/services/site/entrada-site.service';
import { trackSolicitarCotacaoEnviado } from '@/lib/analytics/tracking';


import type {
  CotacaoFormErrors,
  CotacaoSubmitStatus,
  FormularioCotacao,
} from '@/types/site/cotacao';

import { onlyDigits } from '@/utils/site/masks';
import { isValidCnpj, isValidEmail, isValidPhone } from '@/utils/site/validation';
import CotacaoDadosCliente from './CotacaoDadosCliente';
import CotacaoDadosSolucao from './CotacaoDadosSolucao';
import CotacaoSuccess from './CotacaoSuccess';
import { FORMULARIO_COTACAO_INICIAL, SOLUCOES_COTACAO } from './cotacao.constants';

function getServicoLabel(tipoServico: FormularioCotacao['tipoServico']) {
  return SOLUCOES_COTACAO.find((item) => item.value === tipoServico)?.label ?? tipoServico;
}

function validateForm(formulario: FormularioCotacao) {
  const errors: CotacaoFormErrors = {};

  if (!formulario.nome.trim()) {
    errors.nome = 'Informe seu nome.';
  }

  if (!formulario.empresa.trim()) {
    errors.empresa = 'Informe o nome da empresa.';
  }

  if (formulario.cnpj.trim() && !isValidCnpj(formulario.cnpj)) {
    errors.cnpj = 'Informe um CNPJ válido.';
  }

  if (!formulario.email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!isValidEmail(formulario.email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!formulario.telefone.trim()) {
    errors.telefone = 'Informe seu telefone.';
  } else if (!isValidPhone(formulario.telefone)) {
    errors.telefone = 'Informe um telefone válido.';
  }

  if (!formulario.tipoServico) {
    errors.tipoServico = 'Selecione o tipo de serviço.';
  }

  if (!formulario.aceitePrivacidade) {
    errors.aceitePrivacidade = 'Você precisa aceitar o tratamento dos dados.';
  }

  return errors;
}

function buildMensagem(formulario: FormularioCotacao) {
  const detalhes = [
    `Empresa: ${formulario.empresa.trim()}`,
    formulario.cnpj.trim()
      ? `CNPJ: ${onlyDigits(formulario.cnpj)}`
      : null,
    `Tipo de serviço: ${getServicoLabel(formulario.tipoServico)}`,
  ];

  if (formulario.observacoes.trim()) {
    detalhes.push(
      `Observações: ${formulario.observacoes.trim()}`,
    );
  }

  return detalhes.filter(Boolean).join('\n');
}

function buildPayload(
  formulario: FormularioCotacao,
): EntradaSitePayload {
  return {
    tipo: 'COTACAO',

    nome: formulario.nome.trim(),

    email: formulario.email.trim(),

    telefone: onlyDigits(
      formulario.telefone,
    ),

    empresa: formulario.empresa.trim(),

    cnpj:
      onlyDigits(formulario.cnpj) ||
      undefined,

    solucao: getServicoLabel(
      formulario.tipoServico,
    ),

    mensagem:
      formulario.observacoes.trim() ||
      undefined,

    aceitePrivacidade:
      formulario.aceitePrivacidade,

    aceiteComunicacoes: false,
  };
}

export default function SolicitarCotacaoForm() {
  const [formulario, setFormulario] = useState<FormularioCotacao>(FORMULARIO_COTACAO_INICIAL);
  const [erros, setErros] = useState<CotacaoFormErrors>({});
  const [status, setStatus] = useState<CotacaoSubmitStatus>('idle');
  const [erroEnvio, setErroEnvio] = useState('');
  const enviando = status === 'enviando';

  function atualizarCampo<K extends keyof FormularioCotacao>(campo: K, valor: FormularioCotacao[K]) {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
    setErros((anterior) => ({
      ...anterior,
      [campo]: undefined,
    }));
    setErroEnvio('');
    setStatus((current) => (current === 'sucesso' ? 'idle' : current));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (enviando) {
      return;
    }

    setErroEnvio('');
    setStatus('idle');

    const novosErros = validateForm(formulario);
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      return;
    }

    setStatus('enviando');

    try {
      await enviarEntradaSite(
        buildPayload(formulario),
      );
      setFormulario(FORMULARIO_COTACAO_INICIAL);
      setErros({});
      setStatus('sucesso');
      trackSolicitarCotacaoEnviado();
    } catch (error) {
      setErroEnvio(error instanceof Error ? error.message : 'Não foi possível enviar sua solicitação. Tente novamente.');
      setStatus('erro');
    }
  }

  return (
    <>
      {status === 'sucesso' ? <CotacaoSuccess /> : null}
      {status === 'erro' && erroEnvio ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {erroEnvio}
        </Alert>
      ) : null}

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: { xs: 2.5, sm: 4, md: 5 } }}>
          <Stack spacing={4}>
            <CotacaoDadosCliente erros={erros} formulario={formulario} onChange={atualizarCampo} />
            <Divider />
            <CotacaoDadosSolucao
              erros={erros}
              formulario={formulario}
              onChange={atualizarCampo}
            />
            <Divider />

            <Box>
              <Typography component="h2" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 900 }}>
                3. Informações adicionais
              </Typography>
              <Typography sx={{ mt: 0.5, mb: 3, color: 'text.secondary', fontSize: 14 }}>
                Caso necessário, conte mais detalhes sobre a sua operação.
              </Typography>
              <TextField
                label="Conte mais sobre sua operação"
                value={formulario.observacoes}
                onChange={(event) => atualizarCampo('observacoes', event.target.value)}
                multiline
                minRows={5}
                fullWidth
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formulario.aceitePrivacidade}
                    onChange={(event) => atualizarCampo('aceitePrivacidade', event.target.checked)}
                  />
                }
                label={
                  <Typography component="span" sx={{ color: 'text.secondary' }}>
                    Li e concordo com o tratamento dos meus dados para que a Pizzattolog entre em contato sobre esta solicitação.{' '}
                    <Link
                      href="http://localhost:3000/lei-geral-de-protecao-de-dados"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LGPD
                    </Link>
                  </Typography>
                }
              />
              {erros.aceitePrivacidade ? (
                <Typography sx={{ ml: 1.75, color: 'error.main', fontSize: 12 }}>{erros.aceitePrivacidade}</Typography>
              ) : null}
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'flex-end' }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={enviando}
                sx={{ minHeight: 52, px: 4, fontSize: 15, fontWeight: 900 }}
              >
                {enviando ? (
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>Enviando solicitação...</span>
                  </Stack>
                ) : (
                  'Solicitar cotação'
                )}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
