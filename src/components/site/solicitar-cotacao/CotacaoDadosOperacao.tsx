import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import type { CotacaoFormErrors, FormularioCotacao, ProdutoPerigoso } from '@/types/site/cotacao';
import { UFS } from './cotacao.constants';

interface CotacaoDadosOperacaoProps {
  erros: CotacaoFormErrors;
  formulario: FormularioCotacao;
  onChange: <K extends keyof FormularioCotacao>(campo: K, valor: FormularioCotacao[K]) => void;
}

function UfSelect({
  error,
  label,
  value,
  onChange,
}: {
  error?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormControl fullWidth error={Boolean(error)}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        {UFS.map((uf) => (
          <MenuItem key={uf} value={uf}>
            {uf}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}

export default function CotacaoDadosOperacao({ erros, formulario, onChange }: CotacaoDadosOperacaoProps) {
  const transporteRodoviario = formulario.tipoServico === 'TRANSPORTE_RODOVIARIO';
  const armazenagem = formulario.tipoServico === 'ARMAZENAGEM';

  if (!transporteRodoviario && !armazenagem) {
    return null;
  }

  return (
    <Box>
      <Typography component="h2" sx={{ color: 'text.primary', fontSize: 22, fontWeight: 900 }}>
        3. Dados da operação
      </Typography>
      <Typography sx={{ mt: 0.5, mb: 3, color: 'text.secondary', fontSize: 14 }}>
        Informe os dados necessários para a análise comercial.
      </Typography>

      {transporteRodoviario ? (
        <>
          <Typography sx={{ mb: 2, color: 'text.primary', fontWeight: 800 }}>Origem</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 160px' }, gap: 2.5 }}>
            <TextField
              label="Cidade de origem *"
              value={formulario.cidadeOrigem}
              onChange={(event) => onChange('cidadeOrigem', event.target.value)}
              error={Boolean(erros.cidadeOrigem)}
              helperText={erros.cidadeOrigem}
              fullWidth
            />
            <UfSelect label="UF de origem *" value={formulario.ufOrigem} error={erros.ufOrigem} onChange={(value) => onChange('ufOrigem', value)} />
          </Box>

          <Typography sx={{ mt: 4, mb: 2, color: 'text.primary', fontWeight: 800 }}>Destino</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 160px' }, gap: 2.5 }}>
            <TextField
              label="Cidade de destino *"
              value={formulario.cidadeDestino}
              onChange={(event) => onChange('cidadeDestino', event.target.value)}
              error={Boolean(erros.cidadeDestino)}
              helperText={erros.cidadeDestino}
              fullWidth
            />
            <UfSelect label="UF de destino *" value={formulario.ufDestino} error={erros.ufDestino} onChange={(value) => onChange('ufDestino', value)} />
          </Box>

          <Typography sx={{ mt: 4, mb: 2, color: 'text.primary', fontWeight: 800 }}>Dados da carga</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
            <TextField
              label="Tipo de carga *"
              value={formulario.tipoCarga}
              onChange={(event) => onChange('tipoCarga', event.target.value)}
              error={Boolean(erros.tipoCarga)}
              helperText={erros.tipoCarga}
              fullWidth
            />
            <TextField
              label="Tipo de veículo *"
              value={formulario.tipoVeiculo}
              onChange={(event) => onChange('tipoVeiculo', event.target.value)}
              error={Boolean(erros.tipoVeiculo)}
              helperText={erros.tipoVeiculo}
              fullWidth
            />
            <TextField
              label="Peso médio *"
              value={formulario.pesoMedio}
              onChange={(event) => onChange('pesoMedio', event.target.value)}
              error={Boolean(erros.pesoMedio)}
              helperText={erros.pesoMedio}
              placeholder="Ex.: 15000 kg"
              fullWidth
            />
            <TextField
              label="Valor aproximado da mercadoria *"
              value={formulario.valorMercadoria}
              onChange={(event) => onChange('valorMercadoria', event.target.value)}
              error={Boolean(erros.valorMercadoria)}
              helperText={erros.valorMercadoria}
              placeholder="Ex.: R$ 80000,00"
              fullWidth
            />
            <TextField
              label="Cubagem"
              value={formulario.cubagem}
              onChange={(event) => onChange('cubagem', event.target.value)}
              error={Boolean(erros.cubagem)}
              helperText={erros.cubagem}
              placeholder="Ex.: 30 m3"
              fullWidth
            />
            <TextField
              label="Quantidade estimada de embarques por mês"
              value={formulario.embarquesMes}
              onChange={(event) => onChange('embarquesMes', event.target.value)}
              error={Boolean(erros.embarquesMes)}
              helperText={erros.embarquesMes}
              placeholder="Ex.: 20"
              fullWidth
            />
          </Box>

          <Box sx={{ mt: 4 }}>
            <FormControl fullWidth error={Boolean(erros.produtoPerigoso)}>
              <InputLabel>A carga possui produto perigoso? *</InputLabel>
              <Select
                label="A carga possui produto perigoso? *"
                value={formulario.produtoPerigoso}
                onChange={(event) => {
                  const value = event.target.value as ProdutoPerigoso;
                  onChange('produtoPerigoso', value);

                  if (value === 'NAO') {
                    onChange('informacoesProdutoPerigoso', '');
                  }
                }}
              >
                <MenuItem value="SIM">Sim</MenuItem>
                <MenuItem value="NAO">Não</MenuItem>
              </Select>
              <FormHelperText>{erros.produtoPerigoso}</FormHelperText>
            </FormControl>

            {formulario.produtoPerigoso === 'SIM' ? (
              <TextField
                label="FDS / Ficha de Emergência / Informações do produto perigoso *"
                value={formulario.informacoesProdutoPerigoso}
                onChange={(event) => onChange('informacoesProdutoPerigoso', event.target.value)}
                error={Boolean(erros.informacoesProdutoPerigoso)}
                helperText={erros.informacoesProdutoPerigoso}
                multiline
                minRows={3}
                fullWidth
                sx={{ mt: 2.5 }}
              />
            ) : null}
          </Box>
        </>
      ) : null}

      {armazenagem ? (
        <>
          {/* TODO(tecnico): validar estes campos de armazenagem com a regra comercial antes de evoluir o payload operacional. */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
            <TextField
              label="Serviço desejado"
              value={formulario.armazenagemServicoDesejado}
              onChange={(event) => onChange('armazenagemServicoDesejado', event.target.value)}
              fullWidth
            />
            <TextField
              label="Volume aproximado"
              value={formulario.armazenagemVolumeAproximado}
              onChange={(event) => onChange('armazenagemVolumeAproximado', event.target.value)}
              error={Boolean(erros.armazenagemVolumeAproximado)}
              helperText={erros.armazenagemVolumeAproximado}
              fullWidth
            />
            <TextField
              label="Cidade"
              value={formulario.armazenagemCidade}
              onChange={(event) => onChange('armazenagemCidade', event.target.value)}
              fullWidth
            />
            <UfSelect label="UF" value={formulario.armazenagemUf} onChange={(value) => onChange('armazenagemUf', value)} />
          </Box>
        </>
      ) : null}
    </Box>
  );
}
