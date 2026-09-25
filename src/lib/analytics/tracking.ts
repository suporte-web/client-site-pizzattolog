import {
  marketingEventNames,
  type MarketingEventName,
  type MarketingEventPayload,
} from './events';

export type TrackingConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const CONSENT_STORAGE_KEY = 'pizzattolog_tracking_consent';

export const defaultTrackingConsent: TrackingConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const blockedPayloadKeys = new Set([
  'nome',
  'name',
  'email',
  'telefone',
  'phone',
  'cnpj',
  'documento',
  'document',
  'empresa',
  'company',
]);

function isBrowser() {
  return typeof window !== 'undefined';
}

function readStoredConsent(): TrackingConsent {
  if (!isBrowser()) {
    return defaultTrackingConsent;
  }

  const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  if (!storedValue) {
    return defaultTrackingConsent;
  }

  try {
    const parsedValue = JSON.parse(storedValue) as Partial<TrackingConsent>;

    return {
      necessary: true,
      analytics: parsedValue.analytics === true,
      marketing: parsedValue.marketing === true,
    };
  } catch {
    return defaultTrackingConsent;
  }
}

function sanitizePayload(
  payload: MarketingEventPayload,
): MarketingEventPayload {
  return Object.fromEntries(
    Object.entries(payload).filter(([key]) => !blockedPayloadKeys.has(key)),
  ) as MarketingEventPayload;
}

export function prepareDataLayer() {
  if (!isBrowser()) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];

  const consent = readStoredConsent();

  window.dataLayer.push({
    event: 'tracking_consent_initialized',
    consent,
  });
}

export function getTrackingConsent() {
  return readStoredConsent();
}

export function updateTrackingConsent(
  consent: Pick<TrackingConsent, 'analytics' | 'marketing'>,
) {
  if (!isBrowser()) {
    return;
  }

  const nextConsent: TrackingConsent = {
    necessary: true,
    analytics: consent.analytics,
    marketing: consent.marketing,
  };

  window.localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify(nextConsent),
  );

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: 'tracking_consent_updated',
    consent: nextConsent,
  });
}

export function trackMarketingEvent(
  event: MarketingEventName,
  payload: Omit<MarketingEventPayload, 'event'> = {},
) {
  if (!isBrowser()) {
    return;
  }

  const consent = readStoredConsent();

  if (!consent.analytics && !consent.marketing) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(
    sanitizePayload({
      event,
      page_path: window.location.pathname,
      ...payload,
    }),
  );
}

export function trackFaleConoscoEnviado(area?: string) {
  trackMarketingEvent(marketingEventNames.faleConoscoEnviado, {
    event_category: 'formulario',
    event_label: 'Fale conosco',
    area,
  });
}

export function trackSolicitarCotacaoEnviado() {
  trackMarketingEvent(marketingEventNames.solicitarCotacaoEnviado, {
    event_category: 'formulario',
    event_label: 'Solicitar cotacao',
  });
}

export function trackWhatsappClicado(eventLabel: string) {
  trackMarketingEvent(marketingEventNames.whatsappClicado, {
    event_category: 'contato',
    event_label: eventLabel,
  });
}

export function trackPortalCrmClicado(eventLabel: string) {
  trackMarketingEvent(marketingEventNames.portalCrmClicado, {
    event_category: 'navegacao',
    event_label: eventLabel,
  });
}

