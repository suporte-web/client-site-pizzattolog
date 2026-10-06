export const estadosBrasileiros = [
  ['AC','Acre'],['AL','Alagoas'],['AP','Amapá'],['AM','Amazonas'],['BA','Bahia'],['CE','Ceará'],['DF','Distrito Federal'],
  ['ES','Espírito Santo'],['GO','Goiás'],['MA','Maranhão'],['MT','Mato Grosso'],['MS','Mato Grosso do Sul'],['MG','Minas Gerais'],
  ['PA','Pará'],['PB','Paraíba'],['PR','Paraná'],['PE','Pernambuco'],['PI','Piauí'],['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],
  ['RS','Rio Grande do Sul'],['RO','Rondônia'],['RR','Roraima'],['SC','Santa Catarina'],['SP','São Paulo'],['SE','Sergipe'],['TO','Tocantins'],
] as const;
export function validarRelato(formulario: FormData) {
  const campos = ['identificador','nome','telefone','email','estado','tipo','relato','empresa','cidade','tipoReclamacao','documento'] as const;
  const dados = Object.fromEntries(campos.map(campo => [campo, typeof formulario.get(campo) === 'string' ? String(formulario.get(campo)).trim() : ''])) as Record<typeof campos[number], string>;
  dados.telefone = dados.telefone.replace(/[()+.\-\s]/g, '');
  dados.email = dados.email.toLowerCase();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(dados.identificador)
    || dados.nome.length < 3 || dados.nome.length > 150 || !/^\d{10,13}$/.test(dados.telefone)
    || dados.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)
    || !estadosBrasileiros.some(([uf]) => uf === dados.estado) || !['RECLAMACAO','ELOGIO'].includes(dados.tipo)
    || ['empresa','cidade','tipoReclamacao','documento'].some(campo => dados[campo as keyof typeof dados].length > 150)
    || dados.relato.length < 10 || dados.relato.length > 10000) return null;
  return dados;
}
