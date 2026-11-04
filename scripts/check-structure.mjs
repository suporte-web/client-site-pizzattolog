import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = resolve(root, 'src');
const appRoot = resolve(sourceRoot, 'app');
const configPath = resolve(root, 'tsconfig.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
const { options, errors } = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
if (errors.length) throw new Error(ts.flattenDiagnosticMessageText(errors[0].messageText, '\n'));

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

const files = walk(sourceRoot).filter((file) => /\.tsx?$/.test(file));
const graph = new Map(files.map((file) => [file, []]));
const missing = [];
const label = (file) => relative(root, file).replaceAll('\\', '/');

for (const file of files) {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  const specifiers = [];

  function visit(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      specifiers.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && node.arguments[0] && ts.isStringLiteral(node.arguments[0]) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(source) === 'require')) {
      specifiers.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);

  for (const specifier of specifiers) {
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) continue;
    const resolved = ts.resolveModuleName(specifier, file, options, ts.sys).resolvedModule;
    if (resolved) {
      const target = resolve(resolved.resolvedFileName);
      if (graph.has(target)) graph.get(file).push(target);
      continue;
    }

    // Static image imports are declared by Next.js rather than TypeScript's resolver.
    const asset = specifier.startsWith('@/')
      ? resolve(sourceRoot, specifier.slice(2))
      : resolve(dirname(file), specifier);
    if (!/\.(png|jpe?g|gif|webp|avif|svg|ico)$/.test(asset) || !existsSync(asset)) {
      missing.push(`${label(file)} -> ${specifier}`);
    }
  }
}

const reached = new Set();
function visitDependency(file) {
  if (reached.has(file)) return;
  reached.add(file);
  graph.get(file).forEach(visitDependency);
}
// App Router entry points are discovered by Next.js, not imported by other files.
for (const file of files.filter((file) => relative(appRoot, file).split(/[\\/]/)[0] !== '..')) {
  visitDependency(file);
}
const unused = files.filter((file) => !reached.has(file));

if (missing.length) console.error('Referências locais ausentes:\n' + missing.join('\n'));
if (unused.length) console.error('Arquivos sem ligação com as rotas:\n' + unused.map(label).join('\n'));
if (missing.length || unused.length) {
  process.exitCode = 1;
} else {
  console.log(`Estrutura válida: ${files.length} arquivos de código ligados às rotas, sem imports locais ausentes.`);
}
