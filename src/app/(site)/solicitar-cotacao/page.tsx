import type { Metadata } from 'next';
import SolicitarCotacaoSection from '@/components/site/solicitar-cotacao/SolicitarCotacaoSection';
import { getPaginaPublicadaSite } from '@/services/site.service';

export const metadata: Metadata = {
  title: 'Solicitar Cotação | Pizzattolog',
  description: 'Solicite uma cotação para transporte, armazenagem e soluções logísticas com a Pizzattolog.',
};

export default async function SolicitarCotacaoPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('solicitar-cotacao');

  return <SolicitarCotacaoSection conteudo={pagina?.conteudo ?? null} />;
}
