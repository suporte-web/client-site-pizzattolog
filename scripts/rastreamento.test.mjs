import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const { NextResponse } = require('next/server');
const source = readFileSync(new URL('../src/app/api/rastreamento/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function rota(fetch, env = { CRM_API_URL: 'http://crm-interno:3001/api/' }) {
  const contexto = { exports: {}, require: () => ({ NextResponse }), process: { env }, fetch, URL, URLSearchParams, AbortSignal, Error };
  vm.runInNewContext(compiled, contexto);
  return dados => contexto.exports.POST(new Request('http://site/api/rastreamento', { method: 'POST', body: typeof dados === 'string' ? dados : JSON.stringify(dados) }));
}
const consulta = { cnpj: '02.012.862/0037-70', codigo: ' PED-123 ', tipo: 'pedido' };
test('proxy usa CRM somente no servidor e retorna contrato público fechado', async () => {
  const post = rota(async (url, init) => {
    assert.equal(url, 'http://crm-interno:3001/api/public/trackings/PED-123?cnpj=02012862003770&tipo=pedido');
    assert.equal(init.cache, 'no-store'); assert.equal(init.redirect, 'error'); assert.ok(init.signal);
    assert.equal(init.headers.Authorization, undefined);
    return Response.json({ status: 'Em trânsito', origem: 'Curitiba', destino: 'São Paulo', documento: '123', token: 'segredo', nome_recebedor: 'privado', eventos: [{ ocorrencia: 'Coletada', dataHora: '01/10/2026 08:00', local: 'Curitiba', nome_recebedor: 'privado' }] });
  });
  const resposta = await post(consulta);
  assert.equal(resposta.status, 200); assert.equal(resposta.headers.get('cache-control'), 'no-store');
  const texto = JSON.stringify(await resposta.json());
  assert.match(texto, /Em trânsito/); assert.doesNotMatch(texto, /segredo|privado|crm-interno/);
});
test('valida entradas antes de chamar integração', async () => {
  const post = rota(() => { throw new Error('não deve consultar'); });
  for (const dados of [null, [], '{', { ...consulta, cnpj: 'abc02012862003770' }, { ...consulta, codigo: '<script>' }, { ...consulta, codigo: 'a'.repeat(81) }, { ...consulta, tipo: 'outro' }, { ...consulta, tipo: 'chave_nfe' }]) assert.equal((await post(dados)).status, 400);
});
test('404, 400 e falhas da integração não vazam corpos técnicos', async () => {
  for (const status of [400, 404, 429, 500, 503, 504]) {
    const resposta = await rota(async () => Response.json({ message: 'token=segredo crm-interno' }, { status }))(consulta);
    assert.equal(resposta.status, [400, 404, 429, 504].includes(status) ? status : 502);
    assert.doesNotMatch(JSON.stringify(await resposta.json()), /segredo|crm-interno/);
  }
});
test('configuração ausente, resposta inválida e erro de rede têm mensagens públicas', async () => {
  assert.equal((await rota(() => { throw new Error(); }, {})(consulta)).status, 503);
  assert.equal((await rota(async () => Response.json({ token: 'segredo' }))(consulta)).status, 502);
  const resposta = await rota(() => { throw new Error('segredo'); })(consulta);
  assert.equal(resposta.status, 502); assert.doesNotMatch(JSON.stringify(await resposta.json()), /segredo/);
});
test('CRM_API_URL também aceita origem sem /api, sem duplicar prefixo', async () => {
  const post = rota(async url => {
    assert.equal(url, 'http://crm-interno:3001/api/public/trackings/PED-123?cnpj=02012862003770&tipo=pedido');
    return Response.json({ status: 'Coletada', eventos: [] });
  }, { CRM_API_URL: 'http://crm-interno:3001' });
  assert.equal((await post(consulta)).status, 200);
});
test('client consulta somente a API do site e canal aponta para a landing page', () => {
  const pagina = readFileSync(new URL('../src/components/site/rastreamento/PaginaRastreamento.tsx', import.meta.url), 'utf8');
  const canal = readFileSync(new URL('../src/components/site/canal-do-cliente/PaginaCanalDoCliente.tsx', import.meta.url), 'utf8');
  assert.match(pagina, /fetch\('\/api\/rastreamento'/); assert.doesNotMatch(pagina, /CRM_API_URL|ssw\.inf|Authorization|NEXT_PUBLIC/);
  assert.match(canal, /href: '\/rastreamento'/);
});
