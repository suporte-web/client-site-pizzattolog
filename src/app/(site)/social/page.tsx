import type { Metadata } from 'next';
import SocialSection from '@/components/site/social/SocialSection';
import { getPaginaPublicadaSite } from '@/services/site.service';

export const metadata: Metadata = {
  title: 'Social | Pizzattolog',
  description: 'Conheca as iniciativas sociais e conteudos da Pizzattolog.',
};

export default async function SocialPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('social');

  return <SocialSection conteudo={pagina?.conteudo ?? null} />;
}
