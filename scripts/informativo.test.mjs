import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const { NextResponse } = require('next/server');
const source = readFileSync(new URL('../src/app/api/informativo/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;

function route(fetch, env = { CRM_API_URL: 'http://localhost:3001/api/', SITE_LEAD_INTEGRATION_TOKEN: 'server-only-secret' }) {
  const context = { exports: {}, require: () => ({ NextResponse }), process: { env }, fetch, AbortSignal, console: { error() {} } };
  vm.runInNewContext(compiled, context);
  return (payload) => context.exports.POST(new Request('http://localhost:3002/api/informativo', {
    method: 'POST', body: typeof payload === 'string' ? payload : JSON.stringify(payload), headers: { 'Content-Type': 'application/json' },
  }));
}

test('encaminha campos normalizados ao CRM com token somente no servidor', async () => {
  let calls = 0;
  const post = route(async (url, init) => {
    calls++;
    assert.equal(url, 'http://localhost:3001/api/informativo/site');
    assert.equal(init.headers['x-integration-token'], 'server-only-secret');
    assert.deepEqual(JSON.parse(init.body), { nome: 'Maria Silva', email: 'maria@example.com', aceitePrivacidade: true });
    assert.equal(init.cache, 'no-store');
    assert.ok(init.signal);
    return Response.json({ id: 'private-id', message: 'success' });
  });
  const response = await post({ nome: ' Maria  Silva ', email: ' MARIA@EXAMPLE.COM ', aceitePrivacidade: true, ignored: 'unused' });
  assert.equal(response.status, 200);
  const text = JSON.stringify(await response.json());
  assert.match(text, /Cadastro realizado com sucesso/);
  assert.doesNotMatch(text, /server-only-secret|private-id/);
  assert.equal(calls, 1);
});

test('rejeita dados inválidos sem chamar o CRM', async () => {
  const post = route(() => { throw new Error('Não deveria chamar fetch'); });
  for (const payload of [null, [], '{', { nome: ' ', email: 'maria@example.com' }, { nome: 'Maria', email: 'bad' },
    { nome: 'Maria', email: 'maria@example.com', aceitePrivacidade: 'true' }]) {
    assert.equal((await post(payload)).status, 400);
  }
});

test('configuração ausente retorna mensagem amigável', async () => {
  const post = route(() => { throw new Error('Não deveria chamar fetch'); }, {});
  const response = await post({ nome: 'Maria', email: 'maria@example.com' });
  assert.equal(response.status, 503);
  assert.doesNotMatch(JSON.stringify(await response.json()), /TOKEN|CRM_API_URL/);
});

test('não repassa erros técnicos, tokens ou corpo do CRM', async () => {
  for (const status of [400, 403, 500]) {
    const post = route(async () => Response.json({ message: 'Prisma error server-only-secret' }, { status }));
    const response = await post({ nome: 'Maria', email: 'maria@example.com' });
    assert.equal(response.status, status === 400 ? 400 : 502);
    assert.doesNotMatch(JSON.stringify(await response.json()), /Prisma|server-only-secret/);
  }
});

test('trata CRM indisponível ou timeout com mensagem amigável', async () => {
  const post = route(async () => { throw new Error('network timeout'); });
  const response = await post({ nome: 'Maria', email: 'maria@example.com' });
  assert.equal(response.status, 502);
  assert.match((await response.json()).message, /Tente novamente/);
});
