import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import type { SiteHomeData } from '@/types/site';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { SiteNewsletter } from './SiteNewsletter';

interface SitePageLayoutProps {
  children: ReactNode;
  site: SiteHomeData;
}

export default function SitePageLayout({ children, site }: SitePageLayoutProps) {
  return (
    <Box>
      <SiteHeader menus={site.menus} nomeEmpresa={site.nomeEmpresa} />
      {children}
      <SiteNewsletter />
      <SiteFooter rodape={site.rodape} nomeEmpresa={site.nomeEmpresa} />
    </Box>
  );
}
