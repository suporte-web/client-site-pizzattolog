import type { ReactNode } from 'react';
import SitePageLayout from '@/components/site/layout/SitePageLayout';
import { getSiteHomeData } from '@/services/site.service';

interface SiteLayoutProps {
  children: ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const site = await getSiteHomeData();

  return <SitePageLayout site={site}>{children}</SitePageLayout>;
}
