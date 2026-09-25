import type { Metadata } from 'next';
import SeminovosSection from '@/components/site/seminovos/SeminovosSection';
import { getPaginaPublicadaSite } from '@/services/site.service';

export const metadata: Metadata = {
  title: 'Seminovos | Pizzattolog',
  description:
    'Conheca os caminhoes seminovos da Pizzattolog com procedencia, seguranca e suporte especializado.',
};

export default async function SeminovosPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('seminovos');

  return <SeminovosSection conteudo={pagina?.conteudo ?? null} />;
}
