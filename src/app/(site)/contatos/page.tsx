import type { Metadata } from 'next';
import ContatosSection from '@/components/site/contatos/ContatosSection';
import { getPaginaPublicadaSite } from '@/services/site.service';

export const metadata: Metadata = {
  title: 'Contatos | Pizzattolog',
  description: 'Fale com a Pizzattolog para duvidas, atendimento geral e canais institucionais.',
};

export default async function ContatosPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('contatos');

  return <ContatosSection conteudo={pagina?.conteudo ?? null} />;
}
