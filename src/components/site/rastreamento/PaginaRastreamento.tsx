'use client';

import { FormEvent, useRef, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Alert, Box, Button, Chip, CircularProgress, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import type { ResultadoRastreamento, TipoConsultaRastreamento } from '@/types/rastreamento';

const tipos: Array<{ valor: TipoConsultaRastreamento; titulo: string }> = [
  { valor: 'nro_nf', titulo: 'Número da nota fiscal' },
  { valor: 'pedido', titulo: 'Número do pedido' },
  { valor: 'chave_nfe', titulo: 'Chave da NFe' },
  { valor: 'nro_coleta', titulo: 'Número da coleta' },
];
function formatarData(valor: string | null) {
  if (!valor) return 'Data não informada';
  if (/^\d{2}[/-]\d{2}[/-]\d{2,4}/.test(valor)) return valor;
  // Datas sem fuso da fonte são horários locais; preservar o horário informado.
  const local = valor.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::\d{2})?)?$/);
  if (local) return local[3] + '/' + local[2] + '/' + local[1] + (local[4] ? ' ' + local[4] + ':' + local[5] : '');
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) return valor;
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', ...(valor.includes(':') ? { timeStyle: 'short' as const } : {}), timeZone: 'America/Sao_Paulo' }).format(data);
}

export function PaginaRastreamento() {
  const [cnpj, definirCnpj] = useState('');
  const [codigo, definirCodigo] = useState('');
  const [tipo, definirTipo] = useState<TipoConsultaRastreamento>('nro_nf');
  const [carregando, definirCarregando] = useState(false);
  const [mensagem, definirMensagem] = useState('');
  const [naoEncontrado, definirNaoEncontrado] = useState(false);
  const [resultado, definirResultado] = useState<ResultadoRastreamento | null>(null);
  const consultaEmAndamento = useRef(false);

  async function rastrear(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (consultaEmAndamento.current) return;
    definirResultado(null); definirMensagem(''); definirNaoEncontrado(false);
    consultaEmAndamento.current = true; definirCarregando(true);
    try {
      const resposta = await fetch('/api/rastreamento', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnpj, codigo, tipo }), signal: AbortSignal.timeout(25000),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        definirNaoEncontrado(resposta.status === 404);
        definirMensagem(typeof dados.message === 'string' ? dados.message : 'Não foi possível consultar o rastreamento.');
      } else definirResultado(dados);
    } catch {
      definirMensagem('Não foi possível consultar o rastreamento. Tente novamente.');
    } finally { consultaEmAndamento.current = false; definirCarregando(false); }
  }

  return (
    <Box component="main" sx={{ bgcolor: '#F7F8F8', pt: { xs: 13, md: 16 }, pb: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 4, maxWidth: 760 }}>
          <Chip icon={<LocalShippingOutlinedIcon />} label="Rastreamento de carga" sx={{ alignSelf: 'flex-start', bgcolor: '#ffb71b', color: '#17212B', fontWeight: 700 }} />
          <Typography component="h1" sx={{ fontSize: { xs: '2.45rem', md: '4rem' }, fontWeight: 850, lineHeight: 1.1 }}>Rastreie sua carga</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: { xs: 17, md: 20 }, lineHeight: 1.7 }}>Informe o CNPJ do destinatário e o número ou documento da carga para acompanhar suas movimentações.</Typography>
        </Stack>
        <Paper component="form" onSubmit={rastrear} elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e5e7eb' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}><TextField label="CNPJ do destinatário" value={cnpj} onChange={evento => definirCnpj(evento.target.value)} required fullWidth disabled={carregando} autoComplete="off" slotProps={{ htmlInput: { maxLength: 18, inputMode: 'numeric' } }} /></Grid>
            <Grid size={{ xs: 12, md: 4 }}><TextField select label="Tipo de consulta" value={tipo} onChange={evento => definirTipo(evento.target.value as TipoConsultaRastreamento)} fullWidth disabled={carregando}>{tipos.map(item => <MenuItem key={item.valor} value={item.valor}>{item.titulo}</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12, md: 4 }}><TextField label={tipos.find(item => item.valor === tipo)?.titulo ?? 'Código de rastreamento'} value={codigo} onChange={evento => definirCodigo(evento.target.value)} required fullWidth disabled={carregando} autoComplete="off" slotProps={{ htmlInput: { maxLength: tipo === 'chave_nfe' ? 44 : 80 } }} /></Grid>
          </Grid>
          <Button type="submit" variant="contained" disabled={carregando} startIcon={carregando ? <CircularProgress size={20} color="inherit" /> : <SearchRoundedIcon />} sx={{ mt: 3, py: 1.4, px: 4, bgcolor: '#ff5805', boxShadow: 'none', '&:hover': { bgcolor: '#f23f35', boxShadow: 'none' } }}>{carregando ? 'Consultando…' : 'Rastrear'}</Button>
        </Paper>
        <Box aria-live="polite" aria-busy={carregando} sx={{ mt: 4 }}>
          {mensagem && <Alert severity={naoEncontrado ? 'info' : 'error'}>{mensagem}</Alert>}
          {resultado && <Stack spacing={3}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e5e7eb' }}>
              <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>Status atual</Typography>
              <Typography component="h2" sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: '#ff5805', mb: 3 }}>{resultado.status}</Typography>
              <Grid container spacing={3}>{[
                ['Origem', resultado.origem], ['Destino', resultado.destino], ['Previsão de entrega', resultado.previsaoEntrega ? formatarData(resultado.previsaoEntrega) : null],
                ['Número consultado', resultado.codigo], ...(resultado.documento ? [['Documento de transporte', resultado.documento]] : []),
              ].map(([titulo, valor]) => <Grid key={titulo} size={{ xs: 12, sm: 6, md: 4 }}><Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{titulo}</Typography><Typography sx={{ fontWeight: 700, mt: 0.5, overflowWrap: 'anywhere' }}>{valor ?? 'Não informado pela transportadora'}</Typography></Grid>)}</Grid>
            </Paper>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #e5e7eb' }}>
              <Typography component="h2" sx={{ fontSize: 24, fontWeight: 800, mb: 3 }}>Movimentações da carga</Typography>
              {!resultado.eventos.length ? <Alert severity="info">Ainda não há movimentações disponíveis para esta carga.</Alert> : <Stack component="ol" spacing={0} sx={{ m: 0, pl: 0, listStyle: 'none' }}>
                {[...resultado.eventos].reverse().map((evento, indice) => <Box component="li" key={`${evento.dataHora}-${indice}`} sx={{ position: 'relative', pl: 3.5, pb: indice === resultado.eventos.length - 1 ? 0 : 4, borderLeft: '2px solid #ffb71b', ml: 1 }}>
                  <Box sx={{ position: 'absolute', left: -7, top: 4, width: 12, height: 12, borderRadius: '50%', bgcolor: indice === 0 ? '#ff5805' : '#ffb71b', outline: '4px solid white' }} />
                  <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{formatarData(evento.dataHora)}</Typography>
                  <Typography component="h3" sx={{ fontWeight: 800, fontSize: 18, mt: 0.5 }}>{evento.ocorrencia}</Typography>
                  {evento.local && <Typography sx={{ color: 'text.secondary', mt: 0.5 }}>{evento.local}</Typography>}
                  {evento.descricao && <Typography sx={{ mt: 1, lineHeight: 1.7, overflowWrap: 'anywhere' }}>{evento.descricao}</Typography>}
                </Box>)}
              </Stack>}
            </Paper>
          </Stack>}
        </Box>
      </Container>
    </Box>
  );
}
