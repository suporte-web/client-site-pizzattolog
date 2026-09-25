import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadTsModule(relativePath) {
  const filePath = resolve(rootDir, relativePath);
  const source = readFileSync(filePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;

  const module = { exports: {} };
  const context = vm.createContext({
    exports: module.exports,
    module,
    require: (name) => {
      throw new Error(`Unexpected runtime import in test module: ${name}`);
    },
  });

  vm.runInContext(compiled, context, { filename: filePath });
  return module.exports;
}

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test('buildMenuPrincipal links A Pizzattolog directly without expanding institutional child links', () => {
  const { buildMenuPrincipal } = loadTsModule('src/utils/site/navigation.ts');
  const [quemSomos] = buildMenuPrincipal();

  assert.equal(quemSomos.titulo, 'Quem somos');
  assert.equal(quemSomos.slug, 'quem-somos');
  assert.equal(
    JSON.stringify(quemSomos.itens.map((item) => item.titulo)),
    JSON.stringify(['A Pizzattolog', 'Eficiência', 'Unidades']),
  );

  const [aPizzattolog, eficiencia, unidades] = quemSomos.itens;

  assert.equal(aPizzattolog.url, '/quem-somos');
  assert.equal(aPizzattolog.filhos, undefined);
  assert.equal(eficiencia.url, '/quem-somos#eficiencia');
  assert.equal(unidades.url, '/quem-somos#unidades');
});

test('buildMenuPrincipal keeps social and segmentos out and makes contact direct', () => {
  const { buildMenuPrincipal } = loadTsModule('src/utils/site/navigation.ts');
  const menus = buildMenuPrincipal();
  const titles = menus.map((menu) => menu.titulo);
  const slugs = menus.map((menu) => menu.slug);
  const esg = menus.find((menu) => menu.slug === 'esg');
  const contato = menus.find((menu) => menu.slug === 'contatos');
  const fallbackSource = readFileSync(resolve(rootDir, 'src/services/site.service.ts'), 'utf8');
  const socialSource = readFileSync(resolve(rootDir, 'src/components/site/social/SocialSection.tsx'), 'utf8');

  assert.equal(
    JSON.stringify(titles),
    JSON.stringify(['Quem somos', 'Soluções', 'Carreiras', 'Agregados', 'ESG', 'Seminovos', 'Contato']),
  );
  assert.ok(slugs.includes('carreiras'));
  assert.ok(slugs.includes('agregados'));
  assert.ok(slugs.includes('esg'));
  assert.ok(slugs.includes('seminovos'));
  assert.equal(slugs.includes('social'), false);
  assert.equal(slugs.includes('blog'), false);
  assert.equal(slugs.includes('especialidades-logisticas'), false);
  assert.equal(esg?.itens.some((item) => item.slug === 'social'), true);
  assert.equal(contato?.itens.length, 0);
  assert.equal(JSON.stringify(menus).includes('Oportunidades de trabalho'), false);
  assert.equal(fallbackSource.includes("id: 'historias-que-inspiram'"), false);
  assert.equal(socialSource.includes('id="historias-que-inspiram"'), false);
});

test('HomePage renders the blog preview after the home solutions flow', () => {
  const source = readFileSync(resolve(rootDir, 'src/components/site/home/HomePage.tsx'), 'utf8');
  const solucoesIndex = source.indexOf('<HomeSolucoes');
  const blogIndex = source.indexOf('<HomeBlogPreview');

  assert.notEqual(blogIndex, -1);
  assert.ok(blogIndex > solucoesIndex);
});

test('institutional page template no longer renders the team contact CTA', () => {
  const source = readFileSync(
    resolve(rootDir, 'src/components/site/institucional/InstitutionalPageSection.tsx'),
    'utf8',
  );

  assert.equal(source.includes('Precisa falar com a'), false);
  assert.equal(source.includes('Ir para contato'), false);
});

test('footer uses the requested gray palette color', () => {
  const source = readFileSync(resolve(rootDir, 'src/components/site/layout/SiteFooter.tsx'), 'utf8');

  assert.ok(source.includes("bgcolor: '#525252'"));
});

test('home blog preview renders each post photo when available', () => {
  const source = readFileSync(resolve(rootDir, 'src/components/site/home/HomeBlogPreview.tsx'), 'utf8');

  assert.ok(source.includes('post.image'));
  assert.ok(source.includes('backgroundImage'));
});

test('solutions CTA is image driven and keeps only the quote button copy visible', () => {
  const source = readFileSync(resolve(rootDir, 'src/components/site/solucoes/Solucoes.tsx'), 'utf8');

  assert.ok(source.includes("'cta.imagemUrl'"));
  assert.ok(source.includes('ctaImagemEditavel'));
  assert.ok(source.includes('url("${ctaImagemEditavel}")'));
  assert.ok(source.includes("width: '100vw'"));
  assert.ok(source.includes("ml: 'calc(50% - 50vw)'"));
  assert.equal(source.includes("'cta.titulo'"), false);
  assert.equal(source.includes("'cta.descricao'"), false);
});

test('solutions cards accept CRM image URLs by solution slug', () => {
  const source = readFileSync(resolve(rootDir, 'src/components/site/solucoes/Solucoes.tsx'), 'utf8');

  assert.ok(source.includes('getContentString('));
  assert.ok(source.includes('`itens.${solucao.slug}.imagemUrl`'));
});

test('quem somos content supports editable certification logos and units', () => {
  const typeSource = readFileSync(resolve(rootDir, 'src/types/site-institucional.ts'), 'utf8');
  const certificationsSource = readFileSync(
    resolve(rootDir, 'src/components/site/quem-somos/certificacoes/CertificacoesSection.tsx'),
    'utf8',
  );
  const unitsSource = readFileSync(
    resolve(rootDir, 'src/components/site/quem-somos/nossas-unidades/NossasUnidadesSection.tsx'),
    'utf8',
  );

  assert.ok(typeSource.includes('imagemUrl?: string'));
  assert.ok(typeSource.includes('itens?: UnidadeQuemSomos[]'));
  assert.ok(certificationsSource.includes('certificacoesEditaveis?.map'));
  assert.ok(certificationsSource.includes('certificacao.imagemUrl'));
  assert.ok(unitsSource.includes('unidadesEditaveis'));
});

test('CRM site editor exposes persisted controls for site pages and editable media lists', () => {
  const crmRoot = resolve(rootDir, '../../../../crm-portal/frontend-crm');
  const source = readFileSync(resolve(crmRoot, 'src/components/site-institucional/SiteInstitucionalPage.tsx'), 'utf8');
  const serviceSource = readFileSync(resolve(crmRoot, 'src/services/portal-content.service.ts'), 'utf8');

  assert.ok(serviceSource.includes('getSitePageContent'));
  assert.ok(serviceSource.includes('saveSitePageContent'));
  assert.ok(source.includes('QuemSomosEditor'));
  assert.ok(source.includes('SolucoesEditor'));
  assert.ok(source.includes('Adicionar unidade'));
  assert.ok(source.includes('Adicionar certificação'));
  assert.ok(source.includes('CTA soluções eficientes'));
});

test('CRM backend exposes public and authenticated site page content endpoints', () => {
  const backendRoot = resolve(rootDir, '../../../../crm-portal/backend-crm');
  const controllerSource = readFileSync(
    resolve(backendRoot, 'src/modules/portal-content/portal-content.controller.ts'),
    'utf8',
  );
  const serviceSource = readFileSync(
    resolve(backendRoot, 'src/modules/portal-content/portal-content.service.ts'),
    'utf8',
  );

  assert.ok(controllerSource.includes("@Controller('public/site/paginas')"));
  assert.ok(controllerSource.includes("@Controller('site/paginas')"));
  assert.ok(serviceSource.includes('findPublishedSitePage'));
  assert.ok(serviceSource.includes('upsertSitePage'));
});

test('buildHeroSlides covers the full hero with the success trail image when provided', () => {
  const { buildHeroSlides } = loadTsModule('src/components/site/hero/hero-slides.ts');
  const slides = buildHeroSlides({
    id: 'hero',
    etiqueta: '',
    titulo: '',
    descricao: '',
    imagemUrl: null,
    imagemUrlSecundaria: '/images/home/trilha-sucesso.png',
    textoBotaoPrimario: '',
    textoBotaoSecundario: '',
  });

  assert.equal(slides.length, 2);
  assert.equal(
    JSON.stringify(slides[1]),
    JSON.stringify({
      imagem: '/images/home/trilha-sucesso.png',
      tipo: 'historia',
      objectPosition: 'center center',
      objectFit: 'cover',
      backgroundColor: 'transparent',
    }),
  );
});

test('contact page no longer renders the Fale com a Pizzattolog CTA', () => {
  const source = readFileSync(resolve(rootDir, 'src/components/site/contatos/ContatosSection.tsx'), 'utf8');

  assert.equal(source.includes('Fale com a Pizzattolog'), false);
});

test('contact page builds CRM site queue payloads for every non-quote contact path', () => {
  const {
    buildAgregadoSitePayload,
    buildContatoSitePayload,
    getTipoEntradaPorArea,
  } = loadTsModule('src/components/site/contatos/contatos-form.ts');

  assert.equal(getTipoEntradaPorArea('Seja um agregado'), 'AGREGADO');
  assert.equal(getTipoEntradaPorArea('Seja um fornecedor'), 'FORNECEDOR');
  assert.equal(getTipoEntradaPorArea('Frota e Manutenção'), 'FROTA');
  assert.equal(getTipoEntradaPorArea('Marketing e Comunicação'), 'MARKETING');
  assert.equal(getTipoEntradaPorArea('Financeiro'), 'FINANCEIRO');
  assert.equal(getTipoEntradaPorArea('Jurídico'), 'JURIDICO');
  assert.equal(getTipoEntradaPorArea('Fiscal'), 'FISCAL');

  const contatoPayload = buildContatoSitePayload('Financeiro', {
    nome: '  Ana Souza  ',
    email: ' ana@example.com ',
    cargo: 'Compras',
    telefone: '(41) 99999-0000',
    mensagem: 'Preciso falar sobre cobrança.',
    aceiteComunicacao: true,
  });

  assert.equal(contatoPayload.nomeSolicitante, 'Ana Souza');
  assert.equal(contatoPayload.emailSolicitante, 'ana@example.com');
  assert.equal(contatoPayload.telefoneSolicitante, '41999990000');
  assert.equal(contatoPayload.tipo, 'FINANCEIRO');
  assert.equal(contatoPayload.prioridade, 'NORMAL');
  assert.equal(contatoPayload.formPayload.area, 'Financeiro');
  assert.equal(contatoPayload.formPayload.origemFormulario, 'fale-conosco');

  const agregadoPayload = buildAgregadoSitePayload({
    nome: 'Joao Motorista',
    email: 'joao@example.com',
    telefone: '(11) 98888-7777',
    cidade: 'Curitiba',
    categoriaCnh: 'Categoria E',
    possuiMopp: 'Sim',
    possuiEar: 'Sim',
    marcaVeiculo: 'Volvo',
    anoVeiculo: '2020',
    mensagem: 'Tenho carreta propria.',
    aceiteComunicacao: true,
    aceitePrivacidade: true,
  });

  assert.equal(agregadoPayload.tipo, 'AGREGADO');
  assert.equal(agregadoPayload.formPayload.area, 'Seja um agregado');
  assert.equal(agregadoPayload.formPayload.categoriaCnh, 'Categoria E');
});

test('contact submissions use CRM site queue while quote submissions go to leads', () => {
  const contatoSource = readFileSync(resolve(rootDir, 'src/components/site/contatos/ContatosSection.tsx'), 'utf8');
  const entradaServiceSource = readFileSync(resolve(rootDir, 'src/services/site/entrada-site.service.ts'), 'utf8');
  const cotacaoServiceSource = readFileSync(resolve(rootDir, 'src/services/site/cotacao.service.ts'), 'utf8');
  const entradaRouteSource = readFileSync(resolve(rootDir, 'src/app/api/entradas/site/route.ts'), 'utf8');
  const leadRouteSource = readFileSync(resolve(rootDir, 'src/app/api/leads/site/route.ts'), 'utf8');
  const leadsControllerSource = readFileSync(
    resolve(rootDir, '../../../../crm-portal/backend-crm/src/modules/leads/leads.controller.ts'),
    'utf8',
  );
  const leadsServiceSource = readFileSync(
    resolve(rootDir, '../../../../crm-portal/backend-crm/src/modules/leads/leads.service.ts'),
    'utf8',
  );

  assert.ok(contatoSource.includes('enviarEntradaSite'));
  assert.ok(entradaServiceSource.includes('/api/entradas/site'));
  assert.equal(entradaServiceSource.includes('NEXT_PUBLIC_CRM_API_URL'), false);
  assert.equal(entradaServiceSource.includes('NEXT_PUBLIC_API_URL'), false);
  assert.equal(entradaServiceSource.includes('/leads'), false);
  assert.ok(cotacaoServiceSource.includes('/api/leads/site'));
  assert.equal(cotacaoServiceSource.includes('/api/entradas/site'), false);
  assert.equal(cotacaoServiceSource.includes('NEXT_PUBLIC_CRM_API_URL'), false);
  assert.equal(cotacaoServiceSource.includes('NEXT_PUBLIC_API_URL'), false);
  assert.ok(entradaRouteSource.includes('CRM_API_URL'));
  assert.ok(entradaRouteSource.includes('/entradas/site'));
  assert.ok(leadRouteSource.includes('CRM_API_URL'));
  assert.ok(leadRouteSource.includes('/leads/site'));
  assert.ok(leadsControllerSource.includes("@Post('site')"));
  assert.ok(leadsServiceSource.includes('createFromSite'));
  assert.ok(leadsControllerSource.includes("@Post('integrations/whatsapp')"));
  assert.ok(leadsServiceSource.includes("source: 'whatsapp'"));
  assert.ok(leadsServiceSource.includes('createTicket: true'));
});

test('site queue detail uses the new Fila do site route while legacy entradas stays central', () => {
  const crmRoot = resolve(rootDir, '../../../../crm-portal/frontend-crm');
  const headerSource = readFileSync(resolve(crmRoot, 'src/components/layout/header.tsx'), 'utf8');
  const detailSource = readFileSync(resolve(crmRoot, 'src/app/entradas/[id]/page.tsx'), 'utf8');
  const siteDetailSource = readFileSync(resolve(crmRoot, 'src/app/entradas-site/[id]/page.tsx'), 'utf8');

  assert.ok(headerSource.includes('if (pathname.startsWith("/entradas-site")) return "Fila do site";'));
  assert.ok(headerSource.includes('if (pathname.startsWith("/entradas")) return "Central de Entradas";'));
  assert.ok(detailSource.includes('const isSiteQueue = pathname.startsWith("/entradas-site");'));
  assert.ok(detailSource.includes('Voltar para Fila do site'));
  assert.ok(detailSource.includes('Voltar para Central de Entradas'));
  assert.ok(detailSource.includes('Origem site, fila do site e acompanhamento do contato.'));
  assert.ok(detailSource.includes('Origem site, tratamento comercial e conversao em cliente.'));
  assert.ok(detailSource.includes('["ADMIN", "GESTAO", "COMERCIAL", "MARKETING"].includes(user.role)'));
  assert.ok(siteDetailSource.includes('export { default } from "../../entradas/[id]/page";'));
});

test('site entry notifications always open the Fila do site detail route', () => {
  const crmRoot = resolve(rootDir, '../../../../crm-portal/frontend-crm');
  const headerSource = readFileSync(resolve(crmRoot, 'src/components/layout/header.tsx'), 'utf8');

  assert.ok(headerSource.includes('function getNotificationTargetLink'));
  assert.ok(headerSource.includes('Nova entrada recebida pelo site'));
  assert.ok(headerSource.includes('targetLink?.startsWith("/entradas/")'));
  assert.ok(headerSource.includes('return targetLink.replace("/entradas/", "/entradas-site/");'));
});

test('CRM presents site entries in a separate Marketing site queue without hiding non-quote contact paths', () => {
  const crmRoot = resolve(rootDir, '../../../../crm-portal/frontend-crm');
  const backendRoot = resolve(rootDir, '../../../../crm-portal/backend-crm');
  const screensSource = readFileSync(resolve(crmRoot, 'src/config/screens.ts'), 'utf8');
  const sidebarSource = readFileSync(resolve(crmRoot, 'src/components/layout/sidebar.tsx'), 'utf8');
  const entradasTypesSource = readFileSync(resolve(crmRoot, 'src/types/entradas.ts'), 'utf8');
  const entradasPageSource = readFileSync(resolve(crmRoot, 'src/app/entradas/page.tsx'), 'utf8');
  const entradasSitePageSource = readFileSync(resolve(crmRoot, 'src/app/entradas-site/page.tsx'), 'utf8');
  const entradasServiceSource = readFileSync(
    resolve(backendRoot, 'src/modules/entradas/entradas.service.ts'),
    'utf8',
  );

  assert.ok(screensSource.includes("key: 'entradas'"));
  assert.ok(screensSource.includes("label: 'Central de Entradas'"));
  assert.ok(screensSource.includes("key: 'entradasSite'"));
  assert.ok(screensSource.includes("href: '/entradas-site'"));
  assert.ok(screensSource.includes("label: 'Fila do site'"));
  assert.ok(screensSource.includes("roles: ['ADMIN', 'GESTAO', 'COMERCIAL', 'MARKETING']"));
  assert.ok(entradasTypesSource.includes("| 'LEAD'"));
  assert.ok(entradasTypesSource.includes("| 'SUPORTE'"));
  assert.ok(sidebarSource.includes('keys: ["entradas", "tickets", "chat", "helpCenter"]'));
  assert.ok(sidebarSource.includes('keys: ["marketing", "entradasSite", "siteInstitucional"]'));
  assert.ok(sidebarSource.includes('? "Criação de conteúdo"'));
  assert.ok(entradasPageSource.includes('Central de Entradas'));
  assert.ok(entradasPageSource.includes('href={`/entradas/${entrada.id}`}'));
  assert.ok(entradasSitePageSource.includes('Fila do site'));
  assert.ok(entradasSitePageSource.includes("Acompanhe agregados e contatos recebidos pelo site da Pizzattolog."));
  assert.ok(entradasSitePageSource.includes('href={`/entradas-site/${entrada.id}`}'));
  assert.ok(entradasSitePageSource.includes('getEntradas(token, {'));
  assert.ok(entradasSitePageSource.includes('window.setInterval'));
  assert.ok(entradasSitePageSource.includes('visibilitychange'));
  assert.ok(entradasSitePageSource.includes("tipo: \"TODOS\""));
  assert.ok(entradasSitePageSource.includes("origem: \"SITE\""));
  assert.ok(entradasSitePageSource.includes("entrada.type !== \"LEAD\""));
  assert.ok(entradasSitePageSource.includes("entrada.type !== \"COTACAO\""));
  assert.ok(entradasPageSource.includes("tipo: \"COTACAO\""));
  assert.ok(entradasPageSource.includes("origem: \"SITE\""));
  assert.ok(entradasServiceSource.includes("['ADMIN', 'GESTAO', 'COMERCIAL', 'MARKETING']"));
  assert.ok(entradasServiceSource.includes('link: `/entradas-site/${ticket.id}`'));
});

test('legacy lead integrations stay in leads module', () => {
  const leadsControllerSource = readFileSync(
    resolve(rootDir, '../../../../crm-portal/backend-crm/src/modules/leads/leads.controller.ts'),
    'utf8',
  );
  const leadsServiceSource = readFileSync(
    resolve(rootDir, '../../../../crm-portal/backend-crm/src/modules/leads/leads.service.ts'),
    'utf8',
  );

  assert.ok(leadsControllerSource.includes("@Post('integrations/whatsapp')"));
  assert.ok(leadsServiceSource.includes("source: 'whatsapp'"));
  assert.ok(leadsServiceSource.includes('createTicket: true'));
});

let failures = 0;

for (const { name, fn } of tests) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`not ok - ${name}`);
    console.error(error);
  }
}

if (failures > 0) {
  process.exitCode = 1;
}
