import { Box, TextField, Typography } from '@mui/material';
import type { CotacaoFormErrors, FormularioCotacao } from '@/types/site/cotacao';
import { formatCnpj, formatPhone } from '@/utils/site/masks';

interface CotacaoDadosClienteProps {
  erros: CotacaoFormErrors;
  formulario: FormularioCotacao;
  onChange: <K extends keyof FormularioCotacao>(campo: K, valor: FormularioCotacao[K]) => void;
}

export default function CotacaoDadosCliente({ erros, formulario, onChange }: CotacaoDadosClienteProps) {
  return (
    <Box>
      <Typography component="h2" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 900 }}>
        1. Dados do solicitante
      </Typography>
      <Typography sx={{ mt: 0.5, mb: 3, color: 'text.secondary', fontSize: 14 }}>
        Informe os dados para que nossa equipe possa entrar em contato.
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
        <TextField
          label="Nome *"
          value={formulario.nome}
          onChange={(event) => onChange('nome', event.target.value)}
          error={Boolean(erros.nome)}
          helperText={erros.nome}
          fullWidth
        />
        <TextField
          label="Empresa *"
          value={formulario.empresa}
          onChange={(event) => onChange('empresa', event.target.value)}
          error={Boolean(erros.empresa)}
          helperText={erros.empresa}
          fullWidth
        />
        <TextField
          label="CNPJ"
          value={formulario.cnpj}
          onChange={(event) => onChange('cnpj', formatCnpj(event.target.value))}
          error={Boolean(erros.cnpj)}
          helperText={erros.cnpj}
          placeholder="00.000.000/0000-00"
          fullWidth
        />
        <TextField
          label="Telefone *"
          value={formulario.telefone}
          onChange={(event) => onChange('telefone', formatPhone(event.target.value))}
          error={Boolean(erros.telefone)}
          helperText={erros.telefone}
          placeholder="(41) 99999-9999"
          fullWidth
        />
        <TextField
          label="E-mail *"
          type="email"
          value={formulario.email}
          onChange={(event) => onChange('email', event.target.value)}
          error={Boolean(erros.email)}
          helperText={erros.email}
          fullWidth
          sx={{ gridColumn: { xs: 'auto', md: '1 / -1' } }}
        />
      </Box>
    </Box>
  );
}
