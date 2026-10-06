import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');
const jsx = (type, props) => ({ type, props });
const components = new Proxy({}, { get: (_, key) => key });

function load(file, mocks = {}, extra = '', env = {}) {
  const source = readFileSync(resolve(root, file), 'utf8') + extra;
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const context = {
    exports: {}, process: { env }, URL, console: { log() {}, error() {} },
    require(name) {
      if (name in mocks) return mocks[name];
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'Fragment' };
      if (name.startsWith('@mui/')) return components;
      throw new Error(`Missing mock: ${name}`);
    },
  };
  vm.runInNewContext(compiled, context);
  return context.exports;
}

const contentUtils = load('src/utils/site-content.ts');
function nodes(tree) {
  if (tree === null || tree === undefined || typeof tree !== 'object') return [];
  if (Array.isArray(tree)) return tree.flatMap(nodes);
  return [tree, ...nodes(tree.props?.children)];
}

async function page(content, slug = 'solucoes') {
  const module = load('src/components/site/institucional/InstitutionalPageSection.tsx', {
    'next/navigation': { notFound() { throw new Error('notFound'); } },
    '@/components/site': components,
    '@/utils/routes': { normalizeSitePath: (value) => value },
    '@/utils/site-content': contentUtils,
    '@/services/site.service': {
      getSiteHomeData: async () => ({ solucoes: [] }),
      getPaginaBySlug: async () => ({ titulo: 'Soluções' }),
      getSubpaginasByPagina: async () => [],
      getPaginaPublicadaSite: async () => content ? { conteudo: content } : null,
    },
  });
  return nodes(await module.default({ slug }));
}

test('banner usa a imagem publicada no campo do editor de Soluções', async () => {
  const url = 'https://crm.example/api/public/site/assets/solucoes/nova.png';
  const tree = await page({ cabecalho: { imagemUrl: url } });
  const banner = tree.find((node) => node.props?.sx?.background);
  assert.ok(banner.props.sx.background.includes(url));
  assert.ok(!banner.props.sx.background.includes('/images/solucoes/solucoes-banner.png'));
});

test('banner conserva a imagem original sem conteúdo publicado', async () => {
  const tree = await page(null);
  assert.ok(tree.find((node) => node.props?.sx?.background).props.sx.background.includes('/images/solucoes/solucoes-banner.png'));
});

test('Carreiras continua lendo hero.imagemUrl', async () => {
  const tree = await page({ hero: { imagemUrl: 'https://example.com/carreiras.png' } }, 'carreiras');
  assert.ok(tree.find((node) => node.props?.sx?.background).props.sx.background.includes('https://example.com/carreiras.png'));
});

const solutionModule = load('src/components/site/solucoes/Solucoes.tsx', {
  '@/components/site/section-label': { SectionLabel: 'SectionLabel' },
  '@/utils/site-content': contentUtils,
});
const solutions = [
  { slug: 'armazenagem', titulo: 'Armazenagem' },
  { slug: 'transporte-de-cargas', titulo: 'Transporte de Cargas' },
  { slug: 'operador-logistico', titulo: 'Operador Logístico' },
];
function cardImages(conteudo) {
  return nodes(solutionModule.Solucoes({ solucoes: solutions, conteudo, mostrarBanner: false, mostrarComplementos: false }))
    .filter((node) => node.props?.component === 'img')
    .map((node) => node.props.src);
}

test('três cards usam imagens do CRM com a ordem correta por solução', () => {
  const images = cardImages({ solucoes: [
    { imagemUrl: 'https://example.com/armazenagem.png' },
    { imagemUrl: 'https://example.com/operador.png' },
    { imagemUrl: 'https://example.com/transporte.png' },
  ] });
  assert.deepEqual(images.slice(0, 3), [
    'https://example.com/armazenagem.png',
    'https://example.com/transporte.png',
    'https://example.com/operador.png',
  ]);
});

test('cards continuam aceitando imagens antigas em itens', () => {
  const images = cardImages({ itens: [
    { imagemUrl: 'https://example.com/armazenagem-antiga.png' },
    { imagemUrl: 'https://example.com/transporte-antiga.png' },
    { imagemUrl: 'https://example.com/operador-antiga.png' },
  ] });
  assert.deepEqual(images.slice(0, 3), [
    'https://example.com/armazenagem-antiga.png',
    'https://example.com/transporte-antiga.png',
    'https://example.com/operador-antiga.png',
  ]);
});

test('conteúdo público converte os arquivos do CRM em URLs acessíveis', async () => {
  const source = readFileSync(resolve(root, 'src/services/site.service.ts'), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = {
    exports: {}, process: { env: { CRM_API_URL: 'https://crm.example/api' } }, URL,
    console: { log() {}, error() {} },
    require: () => ({ buildMenuPrincipal: () => [], buildRotasMenuPrincipal: () => [] }),
    fetch: async (url) => {
      assert.equal(url, 'https://crm.example/api/public/site/paginas/solucoes');
      return { ok: true, json: async () => ({ conteudo: { cabecalho: { imagemUrl: '/api/public/site/assets/solucoes/banner.png' }, solucoes: [{ imagemUrl: '/api/public/site/assets/solucoes/card.png' }] } }) };
    },
  };
  vm.runInNewContext(compiled, context);
  const result = await context.exports.getPaginaPublicadaSite('solucoes');
  assert.equal(result.conteudo.cabecalho.imagemUrl, 'https://crm.example/api/public/site/assets/solucoes/banner.png');
  assert.equal(result.conteudo.solucoes[0].imagemUrl, 'https://crm.example/api/public/site/assets/solucoes/card.png');
});

function preview(apiBase) {
  const file = resolve(root, '../../frontend-crm/frontend-crm/src/components/site-institucional/SiteImageUpload.tsx');
  return load(file, {
    react: {}, 'lucide-react': components,
    '@/components/mui/crm-primitives': { crmPalette: {} },
    '@/services/api': { API_BASE_URL: apiBase },
    '@/services/site-institucional.service': {},
  }, '\nexport { getPreviewSrc };', { NEXT_PUBLIC_SITE_PUBLIC_URL: 'https://site.example' }).getPreviewSrc;
}

test('prévia no CRM usa o backend para uploads e o site para imagens originais', () => {
  const resolvePreview = preview('http://localhost:3001/api');
  assert.equal(resolvePreview('/api/public/site/assets/solucoes/nova.png'), 'http://localhost:3001/api/public/site/assets/solucoes/nova.png');
  assert.equal(resolvePreview('/images/solucoes/solucoes-banner.png'), 'https://site.example/images/solucoes/solucoes-banner.png');
  assert.equal(resolvePreview('https://cdn.example/image.png'), 'https://cdn.example/image.png');
});

test('prévia mantém o proxy relativo quando o CRM usa /api', () => {
  assert.equal(preview('/api')('/api/public/site/assets/solucoes/nova.png'), '/api/public/site/assets/solucoes/nova.png');
});
