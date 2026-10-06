import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { NextResponse } = require('next/server');
const compilar = arquivo => ts.transpileModule(readFileSync(new URL(arquivo, import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const helper = { exports: {} }; vm.runInNewContext(compilar('../src/lib/relato-cliente.ts'), helper);
const codigo = compilar('../src/app/api/reclamacoes-elogios/route.ts');
function rota(fetch, env = { CRM_API_URL: 'http://crm-interno/api', SITE_LEAD_INTEGRATION_TOKEN: 'segredo-servidor' }) {
  const contexto = { exports: {}, require: nome => nome === 'next/server' ? { NextResponse } : helper.exports, process: { env }, fetch, URL, FormData, AbortSignal };
  vm.runInNewContext(codigo, contexto);
  return formulario => contexto.exports.POST(new Request('http://site/api/reclamacoes-elogios', { method: 'POST', body: formulario }));
}
function formulario() {
  const form = new FormData();
  for (const [chave, valor] of Object.entries({ identificador: '915bb8a8-fad6-4a39-9a51-583d2927e67d', nome: ' Pessoa Teste ', telefone: '(41) 99999-9999', email: ' TESTE@EXAMPLE.INVALID ', estado: 'PR', tipo: 'ELOGIO', relato: 'Relato com detalhes para atendimento.' })) form.set(chave, valor);
  return form;
}
test('envia formulário e anexo com token apenas no servidor e devolve só protocolo', async () => {
  const form = formulario(); form.append('arquivos', new Blob(['%PDF-1.4\n%%EOF'], { type: 'application/pdf' }), 'documento.pdf');
  const post = rota(async (url, init) => {
    assert.equal(url, 'http://crm-interno/api/atendimentos/site/relatos');
    assert.equal(init.headers['x-integration-token'], 'segredo-servidor');
    assert.equal(init.body.get('nome'), 'Pessoa Teste'); assert.equal(init.body.get('email'), 'teste@example.invalid');
    assert.equal(init.body.get('telefone'), '41999999999'); assert.equal(init.body.get('estado'), 'PR');
    assert.equal(init.body.get('arquivos').name, 'documento.pdf');
    assert.equal(init.cache, 'no-store'); assert.equal(init.redirect, 'error'); assert.ok(init.signal);
    return Response.json({ sucesso: true, protocolo: 'SAC-2026-000001', ticket: { email: 'privado' }, token: 'segredo-servidor' }, { status: 201 });
  });
  const resposta = await post(form); assert.equal(resposta.status, 201);
  assert.deepEqual(await resposta.json(), { sucesso: true, protocolo: 'SAC-2026-000001' });
});
test('valida campos obrigatórios, estado, tipo e identificação do reenvio', async () => {
  const post = rota(() => { throw new Error('não deve consultar'); });
  for (const [campo, valor] of [['nome',''],['email','inválido'],['telefone','abc'],['estado','XX'],['tipo','outro'],['relato','curto'],['identificador','errado']]) {
    const form = formulario(); form.set(campo, valor); assert.equal((await post(form)).status, 400);
  }
});
test('rejeita anexos excessivos, vazios e tipos não suportados antes do CRM', async () => {
  const post = rota(() => { throw new Error('não deve consultar'); });
  const form = formulario(); for (let i=0;i<6;i++) form.append('arquivos', new Blob(['%PDF-'], { type: 'application/pdf' }), 'x.pdf');
  assert.equal((await post(form)).status, 400);
  for (const arquivo of [new Blob([], { type: 'application/pdf' }), new Blob(['x'], { type: 'text/html' })]) {
    const form = formulario(); form.append('arquivos', arquivo, 'x'); assert.equal((await post(form)).status, 400);
  }
});
test('erros técnicos e token não são repassados ao site', async () => {
  for (const status of [400,403,413,500]) {
    const resposta = await rota(async () => Response.json({ message: 'segredo-servidor crm-interno' }, { status }))(formulario());
    assert.equal(resposta.status, [400,413].includes(status) ? status : 502);
    assert.doesNotMatch(JSON.stringify(await resposta.json()), /segredo|crm-interno/);
  }
});
test('configuração ausente e erro de rede retornam mensagem pública', async () => {
  assert.equal((await rota(() => { throw new Error(); }, {})(formulario())).status, 503);
  assert.equal((await rota(() => { throw new Error('segredo'); })(formulario())).status, 502);
});

test('envia vários anexos com comentários associados na ordem correta', async () => {
  const form = formulario();
  form.append('arquivos', new Blob(['%PDF-'], { type: 'application/pdf' }), 'primeiro.pdf');
  form.append('arquivos', new Blob(['%PDF-'], { type: 'application/pdf' }), 'segundo.pdf');
  form.set('comentariosAnexos', JSON.stringify([' Primeiro comentário ', 'Segundo comentário']));
  const post = rota(async (_url, init) => {
    assert.deepEqual(init.body.getAll('arquivos').map(item => item.name), ['primeiro.pdf', 'segundo.pdf']);
    assert.deepEqual(JSON.parse(init.body.get('comentariosAnexos')), ['Primeiro comentário', 'Segundo comentário']);
    return Response.json({ sucesso: true, protocolo: 'SAC-2026-000001' });
  });
  assert.equal((await post(form)).status, 201);
});
test('rejeita comentários inválidos, longos ou sem arquivo correspondente', async () => {
  const post = rota(() => { throw new Error('não deve consultar'); });
  for (const comentarios of ['{', '{}', '[123]', JSON.stringify(['x'.repeat(1001)]), JSON.stringify(['Sem arquivo'])]) {
    const form = formulario(); form.set('comentariosAnexos', comentarios); assert.equal((await post(form)).status, 400);
  }
});

test('excluir um arquivo mantém o comentário do outro e permite adicionar mais anexos', () => {
  const valores = []; let posicao = 0;
  const hooks = {
    useState(inicial) { const indice = posicao++; if (!(indice in valores)) valores[indice] = inicial; return [valores[indice], valor => { valores[indice] = typeof valor === 'function' ? valor(valores[indice]) : valor; }]; },
    useRef(inicial) { const indice = posicao++; if (!(indice in valores)) valores[indice] = { current: inicial }; return valores[indice]; },
  };
  const fonte = readFileSync(new URL('../src/components/site/canal-do-cliente/PaginaReclamacoesElogios.tsx', import.meta.url), 'utf8');
  const compilado = ts.transpileModule(fonte, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const mui = Object.fromEntries(['Alert','Box','Button','CircularProgress','Container','Grid','MenuItem','Paper','Stack','TextField','Typography'].map(nome => [nome,nome]));
  const contexto = { exports: {}, crypto: require('node:crypto'), require: nome => {
    if (nome === 'react') return hooks;
    if (nome === '@mui/material') return mui;
    if (nome.startsWith('@mui/icons-material/')) return { default: () => null };
    if (nome === '@/lib/relato-cliente') return helper.exports;
    return require(nome);
  } };
  vm.runInNewContext(compilado, contexto);
  const renderizar = () => { posicao = 0; return contexto.exports.PaginaReclamacoesElogios(); };
  function elementos(no) { if (Array.isArray(no)) return no.flatMap(elementos); if (!no || typeof no !== 'object') return []; return [no, ...elementos(no.props?.children)]; }
  const buscar = predicado => elementos(renderizar()).find(predicado);
  const adicionar = nomes => buscar(no => no.type === 'input' && no.props.type === 'file').props.onChange({ target: { files: nomes.map(nome => new File(['%PDF-'], nome, { type: 'application/pdf' })), value: 'arquivo' } });
  adicionar(['primeiro.pdf','segundo.pdf']);
  buscar(no => no.type === 'TextField' && no.props.label === 'Comentário sobre segundo.pdf').props.onChange({ target: { value: 'Comentário do segundo arquivo' } });
  buscar(no => no.type === 'Button' && no.props['aria-label'] === 'Excluir anexo primeiro.pdf').props.onClick();
  assert.equal(buscar(no => no.type === 'TextField' && no.props.label === 'Comentário sobre segundo.pdf').props.value, 'Comentário do segundo arquivo');
  assert.equal(buscar(no => no.type === 'TextField' && no.props.label === 'Comentário sobre primeiro.pdf'), undefined);
  adicionar(['terceiro.pdf']);
  assert.equal(buscar(no => no.type === 'TextField' && no.props.label === 'Comentário sobre terceiro.pdf').props.value, '');
  assert.equal(buscar(no => no.type === 'TextField' && no.props.label === 'Comentário sobre segundo.pdf').props.value, 'Comentário do segundo arquivo');
});

test('encaminha empresa, cidade, tipo da ocorrência e documento ao SAC', async () => {
  const form = formulario();
  for (const [campo, valor] of Object.entries({ empresa: ' Empresa exemplo ', cidade: ' Curitiba ', tipoReclamacao: ' Avaria ', documento: ' CT-e 321 ' })) form.set(campo, valor);
  const post = rota(async (_url, init) => {
    for (const [campo, valor] of Object.entries({ empresa: 'Empresa exemplo', cidade: 'Curitiba', tipoReclamacao: 'Avaria', documento: 'CT-e 321' })) assert.equal(init.body.get(campo), valor);
    return Response.json({ sucesso: true, protocolo: 'SAC-2026-000001' });
  });
  assert.deepEqual(await (await post(form)).json(), { sucesso: true, protocolo: 'SAC-2026-000001' });
  const extenso = formulario(); extenso.set('empresa', 'x'.repeat(151));
  assert.equal((await rota(() => { throw new Error('Não deve chamar o CRM'); })(extenso)).status, 400);
});
