import { EsgSections } from '@/components/site/esg';
import { getPaginaPublicadaSite } from '@/services/site.service';

export default async function EsgPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('esg');

  return <EsgSections conteudo={pagina?.conteudo ?? null} />;
}
