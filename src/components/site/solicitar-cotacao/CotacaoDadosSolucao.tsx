import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import type { CotacaoFormErrors, FormularioCotacao, TipoServicoCotacao } from '@/types/site/cotacao';
import { SOLUCOES_COTACAO } from './cotacao.constants';

interface CotacaoDadosSolucaoProps {
  erros: CotacaoFormErrors;
  formulario: FormularioCotacao;
  onChange: <K extends keyof FormularioCotacao>(campo: K, valor: FormularioCotacao[K]) => void;
}

export default function CotacaoDadosSolucao({ erros, formulario, onChange }: CotacaoDadosSolucaoProps) {
  return (
    <Box>
      <Typography component="h2" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 900 }}>
        2. Solução
      </Typography>
      <Typography sx={{ mt: 0.5, mb: 3, color: 'text.secondary', fontSize: 14 }}>
        Selecione o serviço relacionado à sua necessidade.
      </Typography>

      <FormControl fullWidth error={Boolean(erros.tipoServico)}>
        <InputLabel id="tipo-servico-label">Qual solução você precisa? *</InputLabel>
        <Select
          labelId="tipo-servico-label"
          label="Qual solução você precisa? *"
          value={formulario.tipoServico}
          onChange={(event) => onChange('tipoServico', event.target.value as TipoServicoCotacao)}
        >
          <MenuItem value="">
            <em>Selecione</em>
          </MenuItem>
          {SOLUCOES_COTACAO.map((solucao) => (
            <MenuItem key={solucao.value} value={solucao.value}>
              {solucao.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{erros.tipoServico}</FormHelperText>
      </FormControl>
    </Box>
  );
}
