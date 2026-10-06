'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';

import { prepareDataLayer } from '@/lib/analytics/tracking';

const gtmPizzattoId =
  process.env.NEXT_PUBLIC_GTM_PIZZATTO_ID?.trim() ||
  'GTM-MHBBZ5X';

const gtmAnalyticsId =
  process.env.NEXT_PUBLIC_GTM_ANALYTICS_ID?.trim() ||
  'GTM-PR994Z6H';

const metaPixelId =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ||
  '2414865788814190';

const linkedinPartnerId =
  process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID?.trim() ||
  '3624538';

export function RastreamentoMarketing() {
  useEffect(() => {
    prepareDataLayer();
  }, []);

  return (
    <>
      {/* =========================================================
          GOOGLE TAG MANAGER - PIZZATTO
          Contém Google Ads e Google Analytics
      ========================================================= */}
      <GoogleTagManager gtmId={gtmPizzattoId} />

      {/* =========================================================
          GOOGLE TAG MANAGER - ANALYTICS
      ========================================================= */}
      <GoogleTagManager gtmId={gtmAnalyticsId} />

      {/* =========================================================
          GTM PIZZATTO - NOSCRIPT
      ========================================================= */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmPizzattoId}`}
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
          title="Google Tag Manager Pizzattolog"
        />
      </noscript>

      {/* =========================================================
          GTM ANALYTICS - NOSCRIPT
      ========================================================= */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmAnalyticsId}`}
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden',
          }}
          title="Google Tag Manager Analytics"
        />
      </noscript>

      {/* =========================================================
          META PIXEL
      ========================================================= */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {
            if(f.fbq)return;

            n=f.fbq=function(){
              n.callMethod
                ? n.callMethod.apply(n,arguments)
                : n.queue.push(arguments)
            };

            if(!f._fbq)f._fbq=n;

            n.push=n;
            n.loaded=!0;
            n.version='2.0';
            n.queue=[];

            t=b.createElement(e);
            t.async=!0;
            t.src=v;

            s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s);

          }(
            window,
            document,
            'script',
            'https://connect.facebook.net/en_US/fbevents.js'
          );

          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* META PIXEL - NOSCRIPT */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{
            display: 'none',
          }}
          src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      {/* =========================================================
          LINKEDIN INSIGHT TAG
      ========================================================= */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${linkedinPartnerId}";

          window._linkedin_data_partner_ids =
            window._linkedin_data_partner_ids || [];

          window._linkedin_data_partner_ids.push(
            _linkedin_partner_id
          );

          (function(l) {
            if (!l) {
              window.lintrk = function(a,b) {
                window.lintrk.q.push([a,b]);
              };

              window.lintrk.q = [];
            }

            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");

            b.type = "text/javascript";
            b.async = true;
            b.src =
              "https://snap.licdn.com/li.lms-analytics/insight.min.js";

            s.parentNode.insertBefore(b, s);

          })(window.lintrk);
        `}
      </Script>

      {/* LINKEDIN - NOSCRIPT */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{
            display: 'none',
          }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${linkedinPartnerId}&fmt=gif`}
        />
      </noscript>
    </>
  );
}