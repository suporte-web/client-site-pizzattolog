export const marketingEventNames = {
  faleConoscoEnviado: 'fale_conosco_enviado',
  solicitarCotacaoEnviado: 'solicitar_cotacao_enviado',
  whatsappClicado: 'whatsapp_clicado',
  portalCrmClicado: 'portal_crm_clicado',
} as const;

export type MarketingEventName =
  (typeof marketingEventNames)[keyof typeof marketingEventNames];

export type MarketingEventPayload = {
  event: MarketingEventName;
  event_category?: 'formulario' | 'contato' | 'navegacao';
  event_label?: string;
  page_path?: string;
  area?: string;
};

