# Cotação do site: triagem de Marketing

**Objetivo:** receber cotações como leads na Fila do site e criar oportunidade no Comercial somente após encaminhamento pelo Marketing.

**Fluxo aprovado pelo pedido:** Site → Lead / Marketing → Reprovar ou Enviar ao Comercial → Oportunidade / fluxo comercial existente.

**Arquitetura:** manter o POST público atual do site. Usar status/departamento da solicitação e metadados do lead para registrar a decisão e o vínculo da oportunidade, sem alterar o cadastro unificado nem o funil comercial existente. Executar decisões em transação com bloqueio da solicitação para evitar duplicação. ADMIN e GESTAO conservam supervisão.

**Repositórios:** backend em `Desktop/repositório/backend-crm`; interface do CRM em `Desktop/repositório/frontend-crm/frontend-crm`; site no projeto atual.

- [x] Backend: testes para entrada em Marketing, encaminhamento, reprovação, permissões e repetição. Criar serviço de triagem e endpoints autenticados, manter histórico e notificar Comercial somente depois da aprovação.
- [x] CRM: integrar triagem à tela de detalhes da Fila do site. Selecionar responsável Comercial, exigir motivo de reprovação e abrir a oportunidade criada. Preservar os demais tipos de solicitação.
- [x] Site: ajustar confirmação para informar análise da solicitação. Validar TypeScript, testes do fluxo e builds dos projetos afetados.

**Critérios de aceite:** nenhuma oportunidade na entrada/reprovação; uma oportunidade por encaminhamento; lead permanece vinculado ao cadastro; Comercial responsável recebe o vínculo; histórico registra autor, data e decisão; falha em qualquer etapa reverte a transação.

**Validação:** 9 testes do backend e 5 da interface passaram. TypeScript dos três projetos passou. Builds do backend, site e frontend do CRM passaram. No CRM foi usado Webpack com cache desativado somente durante a compilação, após falha local de IPC do Turbopack e falta de espaço no disco; a configuração original foi restaurada. Wrappers de `cadastros/[id]` e `clientes/[id]` corrigem a exportação de props extras que bloqueava o build sem alterar o componente de detalhes.
