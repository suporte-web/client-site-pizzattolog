# Site Pizzattolog

Site institucional desenvolvido com Next.js App Router, React, TypeScript e Material UI. O conteúdo publicado e os formulários se integram ao CRM; o painel administrativo fica no projeto do CRM.

## Executar

```bash
npm install
```

Copie `.env.example` para `.env.local` e configure os endereços das APIs e o token de integração do servidor. Depois execute:

```bash
npm run dev
```

O site abre em http://localhost:3002. Para executar a versão de produção, use `npm run build` e depois `npm start`.

## Estrutura

```text
src/
  app/
    (site)/                  Páginas públicas e rota dinâmica por slug
    api/                     Integrações executadas no servidor Next.js
    layout.tsx               Layout raiz e metadados
    providers.tsx            Tema e providers do React
  assets/
    icons/
      home/                  Imagens importadas pela Home
      agregados/             Imagens do clube de benefícios
      agregados-beneficios/  Imagens das vantagens para agregados
  components/
    analytics/               Rastreamento de navegação e campanhas
    site/
      layout/                Cabeçalho, rodapé, newsletter e layout do site
      shared/                Decoração dos banners, títulos e fundo dos números
      home/
        hero/                Banner e slides exclusivos da Home
      quem-somos/            História, missão, valores, unidades e certificações
      esg/                   Ambiental, social, governança e programas ESG
      social/                Página social independente
      .../                   Demais componentes agrupados por página
  lib/                       Funções de suporte e eventos de analytics
  services/site/             Acesso aos dados e envio de formulários
  theme/                     Tema do Material UI
  types/site/                Contratos e tipos do site
  utils/site/                Rotas, conteúdo, navegação, máscaras e validação
public/                      Arquivos servidos por URL pública
scripts/                     Ferramentas de manutenção e sincronização do blog
tests/                       Testes locais do site
  integration/               Verificações opcionais dos projetos do CRM
docs/                        Documentação e planos de alterações
```

## Convenções

- As rotas em `app` carregam dados e compõem os componentes da página correspondente.
- Componentes exclusivos de uma página ficam na pasta dessa página. Elementos usados por várias páginas ficam em `components/site/shared`.
- Cabeçalho e rodapé possuem uma implementação única em `components/site/layout`.
- Use imports com `@/` para dependências entre pastas e imports relativos para arquivos da mesma funcionalidade.
- Imagens importadas pelo código ficam em `src/assets`; imagens e documentos acessados por URL ficam em `public`.
- Não remova um arquivo público apenas pela ausência de imports: ele também pode ser referenciado pelo conteúdo publicado no CRM.
- Páginas atendidas por `[slug]`, como Carreiras e Agregados, dependem do componente institucional e do conteúdo do site.

## Verificação

```bash
npm run typecheck
npm run check:structure
npm test
npm run build
```

O TypeScript verifica também imports, parâmetros e variáveis locais sem uso. A verificação de estrutura percorre imports, reexports e imports dinâmicos com caminhos literais a partir de `app`, verifica as imagens importadas e aponta arquivos de código sem ligação com as rotas. Ela não determina o uso de arquivos públicos pelo CRM.

Os testes usam o executor nativo do Node.js, sem criar processos separados, para funcionar também em ambientes restritos. As verificações que leem os repositórios do CRM ficam separadas:

```bash
npm run test:integration
```

Essas verificações são ignoradas quando os respectivos repositórios não estão disponíveis nos caminhos locais esperados pelos testes.
