import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { test } from 'node:test';
import vm from 'node:vm';
import React from 'react';
import { renderToString } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const headerPath = new URL('../src/components/site/header/Header.tsx', import.meta.url);
const source = readFileSync(headerPath, 'utf8');
const ast = ts.createSourceFile('Header.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let dropdown;
function findDropdown(node) {
  if (ts.isJsxElement(node) && node.openingElement.tagName.getText(ast) === 'Paper') {
    dropdown = node.getText(ast);
  }
  ts.forEachChild(node, findDropdown);
}
findDropdown(ast);
assert.ok(dropdown, 'Header must expose its dropdown Paper for the runtime regression test');

function compileModule(code, filename) {
  const compiled = ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module,
    exports: module.exports,
    require: (name) => name.startsWith('@/')
      ? compileModule(readFileSync(resolve('src', `${name.slice(2)}.ts`), 'utf8'), name)
      : require(name),
  }, { filename });
  return module.exports;
}

// Render the actual dropdown JSX and its recursive renderer with real MUI
// components. The closed Popper would otherwise hide the invalid subtree in SSR.
const { DropdownRegression } = compileModule(`${source}
export function DropdownRegression({ menusSemEsg, itemEsg, indiceAtual, itemDesktopExpandido }) {
  const manterMenu = () => {};
  const agendarFechamento = () => {};
  const fecharMenu = () => {};
  const alternarItemDesktop = () => {};
  return (${dropdown});
}
`, 'Header.runtime-test.tsx');

const child = { id: 'child', slug: 'child', titulo: 'Subcategoria', url: '/solucoes#child' };
const parent = { id: 'parent', slug: 'parent', titulo: 'Categoria', url: '/solucoes#parent', filhos: [child] };

for (const [name, indiceAtual, itens, expanded] of [
  ['desktop links', 0, [child], null],
  ['expanded nested desktop links', 0, [parent], 'parent'],
  ['legacy ESG dropdown', null, [child], null],
]) {
  test(`header supplies MUI menu context for ${name}`, () => {
    const html = renderToString(React.createElement(DropdownRegression, {
      menusSemEsg: [{ id: 'solucoes', itens }],
      itemEsg: { filhos: itens },
      indiceAtual,
      itemDesktopExpandido: expanded,
    }));
    assert.match(html, /role="menu"/);
    assert.match(html, /Subcategoria/);
    assert.match(html, /href="\/solucoes#child"/);
  });
}
