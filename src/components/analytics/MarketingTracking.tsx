'use client';

import { useEffect } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';

import { prepareDataLayer } from '@/lib/analytics/tracking';

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

export function MarketingTracking() {
  useEffect(() => {
    prepareDataLayer();
  }, []);

  if (!gtmId) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}
