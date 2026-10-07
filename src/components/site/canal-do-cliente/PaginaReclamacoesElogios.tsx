'use client';
import { FormEvent, useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Container, Grid, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { estadosBrasileiros } from '@/lib/relato-cliente';

function gerarIdUnico() {
  if (
    typeof window !== 'undefined' &&
    typeof window.crypto?.randomUUID === 'function'
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function PaginaReclamacoesElogios() {
  const [arquivos, definirArquivos] = useState<Array<{ id: string; arquivo: File; comentario: string }>>([]);
  const [enviando, definirEnviando] = useState(false);
  const [erro, definirErro] = useState('');
  const [protocolo, definirProtocolo] = useState('');
  const identificador = useRef<string | null>(null);
  const envioEmAndamento = useRef(false);
  function alterarDados() { identificador.current = null; }
  function selecionarArquivos(novos: File[]) {
    const selecionados = [
      ...arquivos,
      ...novos.map(arquivo => ({
        id: gerarIdUnico(),
        arquivo,
        comentario: '',
      })),
    ];
    if (selecionados.length > 5 || selecionados.some(({ arquivo }) => !['application/pdf', 'image/jpeg', 'image/png'].includes(arquivo.type) || arquivo.size > 10 * 1024 * 1024 || !arquivo.size)) {
      definirErro('Selecione até 5 arquivos PDF, JPG ou PNG, de até 10 MB cada.'); return;
    }
    alterarDados(); definirArquivos(selecionados); definirErro('');
  }
  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (envioEmAndamento.current) return;
    const formulario = new FormData(evento.currentTarget);
    identificador.current ??= gerarIdUnico();
    formulario.set('identificador', identificador.current);
    arquivos.forEach(({ arquivo }) => formulario.append('arquivos', arquivo));
    formulario.set('comentariosAnexos', JSON.stringify(arquivos.map(anexo => anexo.comentario.trim())));
    envioEmAndamento.current = true; definirEnviando(true); definirErro('');
    try {
      const resposta = await fetch('/api/reclamacoes-elogios', { method: 'POST', body: formulario, signal: AbortSignal.timeout(35000) });
      const resultado = await resposta.json();
      if (!resposta.ok) definirErro(resultado.message ?? 'Não foi possível confirmar o envio. Tente novamente.');
      else definirProtocolo(resultado.protocolo);
    } catch { definirErro('Não foi possível confirmar o envio. Tente novamente usando os mesmos dados.'); }
    finally { envioEmAndamento.current = false; definirEnviando(false); }
  }
  return <Box component="main" sx={{ bgcolor: '#F7F8F8', pt: { xs: 13, md: 16 }, pb: { xs: 6, md: 10 } }}>
    <Container maxWidth="lg">
      <Typography component="h1" sx={{ fontSize: { xs: '2.2rem', md: '3.3rem' }, fontWeight: 850, lineHeight: 1.15, mb: 3 }}>Registro de Reclamações e Elogios</Typography>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 3 }}>
        <Typography sx={{ fontWeight: 700, mb: 1 }}>Estamos aqui para ouvir você.</Typography>
        <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>Registre um elogio ou reclamação para a equipe de atendimento da Pizzattolog. Informe seus dados de contato para que a equipe possa responder ao seu relato.</Typography>
      </Paper>
      {protocolo ? <Stack spacing={3}>
        <Alert severity="success">Solicitação enviada com sucesso. Protocolo: <strong>{protocolo}</strong>.</Alert>
        <Button variant="outlined" sx={{ alignSelf: 'flex-start' }} onClick={() => { definirProtocolo(''); definirArquivos([]); definirErro(''); identificador.current = null; }}>Registrar outro relato</Button>
      </Stack> : <Box component="form" onSubmit={enviar} onChange={alterarDados}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 3 }}>
          <Typography component="h2" sx={{ fontSize: 21, fontWeight: 800, mb: 3 }}>Registro da ocorrência</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth required name="nome" label="Nome completo" autoComplete="name" disabled={enviando} helperText="Insira o nome de quem está abrindo o registro." slotProps={{ htmlInput: { minLength: 3, maxLength: 150 } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth required name="telefone" label="Telefone" type="tel" autoComplete="tel" disabled={enviando} helperText="Insira um telefone para contato com DDD." slotProps={{ htmlInput: { maxLength: 25 } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth required name="email" label="E-mail" type="email" autoComplete="email" disabled={enviando} helperText="Insira seu e-mail para contato." slotProps={{ htmlInput: { maxLength: 254 } }} /></Grid>
            <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth required select name="estado" label="Estado" defaultValue="" disabled={enviando}>{estadosBrasileiros.map(([uf, nome]) => <MenuItem key={uf} value={uf}>{nome} ({uf})</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12 }}><TextField fullWidth required select name="tipo" label="Tipo de registro" defaultValue="" disabled={enviando}><MenuItem value="RECLAMACAO">Reclamação</MenuItem><MenuItem value="ELOGIO">Elogio</MenuItem></TextField></Grid>
            {([{ nome: 'empresa', rotulo: 'Empresa (opcional)' }, { nome: 'cidade', rotulo: 'Cidade (opcional)' }, { nome: 'tipoReclamacao', rotulo: 'Tipo da reclamação (opcional)' }, { nome: 'documento', rotulo: 'CT-e / NF / documento (opcional)' }] as const).map(campo => <Grid key={campo.nome} size={{ xs: 12, sm: 6 }}><TextField fullWidth name={campo.nome} label={campo.rotulo} disabled={enviando} slotProps={{ htmlInput: { maxLength: 150 } }} /></Grid>)}
            <Grid size={{ xs: 12 }}><TextField fullWidth required multiline minRows={6} name="relato" label="Relato" disabled={enviando} helperText="Descreva de maneira clara seu relato. Mínimo de 10 caracteres." slotProps={{ htmlInput: { minLength: 10, maxLength: 10000 } }} /></Grid>
          </Grid>
        </Paper>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 3 }}>
          <Typography component="h2" sx={{ fontSize: 21, fontWeight: 800, mb: 1 }}>Anexos opcionais</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>Até 5 arquivos PDF, JPG ou PNG, de até 10 MB cada.</Typography>
          <Button component="label" variant="outlined" startIcon={<AttachFileRoundedIcon />} disabled={enviando || arquivos.length >= 5}>Adicionar anexos<input type="file" hidden multiple accept=".pdf,.jpg,.jpeg,.png" disabled={enviando || arquivos.length >= 5} onChange={evento => { selecionarArquivos(Array.from(evento.target.files ?? [])); evento.target.value = ''; }} /></Button>
          <Typography sx={{ mt: 2, color: 'text.secondary', fontSize: 14 }}>{arquivos.length} de 5 anexos selecionados. Você pode selecionar vários de uma vez ou adicionar em etapas.</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>{arquivos.map(anexo => <Box key={anexo.id} sx={{ p: 2, border: '1px solid #e5e7eb', borderRadius: 2 }}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography sx={{ fontWeight: 700, overflowWrap: 'anywhere', minWidth: 0 }}>{anexo.arquivo.name}</Typography>
              <Button type="button" color="error" disabled={enviando} aria-label={'Excluir anexo ' + anexo.arquivo.name} onClick={() => { alterarDados(); definirArquivos(atuais => atuais.filter(item => item.id !== anexo.id)); }}>Excluir</Button>
            </Stack>
            <TextField fullWidth multiline minRows={2} label={'Comentário sobre ' + anexo.arquivo.name} placeholder="Explique o que este anexo mostra ou por que ele foi enviado." value={anexo.comentario} disabled={enviando} onChange={evento => { alterarDados(); const comentario = evento.target.value; definirArquivos(atuais => atuais.map(item => item.id === anexo.id ? { ...item, comentario } : item)); }} helperText={'Opcional · ' + anexo.comentario.length + '/1000 caracteres'} slotProps={{ htmlInput: { maxLength: 1000 } }} />
          </Box>)}</Stack>
        </Paper>
        <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>Usaremos os dados informados para tratar seu registro, conforme nossa <Box component="a" href="/politica-de-privacidade" sx={{ color: '#ff5805' }}>Política de Privacidade</Box>.</Typography>
        <Box aria-live="polite" sx={{ mb: 2 }}>{erro && <Alert severity="error">{erro}</Alert>}</Box>
        <Button type="submit" variant="contained" disabled={enviando} startIcon={enviando ? <CircularProgress size={20} color="inherit" /> : <SendRoundedIcon />} sx={{ bgcolor: '#ff5805', px: 4, py: 1.5, '&:hover': { bgcolor: '#f23f35' } }}>{enviando ? 'Enviando…' : 'Enviar solicitação'}</Button>
      </Box>}
    </Container>
  </Box>;
}
