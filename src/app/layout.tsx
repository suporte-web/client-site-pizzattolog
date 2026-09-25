import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { MarketingTracking } from '@/components/analytics/MarketingTracking';
import { Providers } from './providers';
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: 'Pizzattolog',
  description: 'Soluções logísticas inteligentes para conectar negócios.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <MarketingTracking />
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
