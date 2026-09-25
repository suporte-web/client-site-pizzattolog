import { Alert } from '@mui/material';

export default function CotacaoSuccess() {
  return (
    <Alert severity="success" sx={{ mb: 3 }}>
      <strong>Solicitação enviada com sucesso!</strong>
      <br />
      Recebemos as informações da sua operação. Nossa equipe comercial fará a análise e entrará em contato.
    </Alert>
  );
}
