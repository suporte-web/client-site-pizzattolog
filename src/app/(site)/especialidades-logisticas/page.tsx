import type { Metadata } from 'next';
import EspecialidadesSection from '@/components/site/especialidades/EspecialidadesSection';
import { getPaginaPublicadaSite } from '@/services/site.service';

export const metadata: Metadata = {
  title: 'Especialidades Logisticas | Pizzattolog',
  description: 'Conheca as especialidades logisticas atendidas pela Pizzattolog.',
};

export default async function EspecialidadesLogisticasPage() {
  const pagina =
    await getPaginaPublicadaSite<Record<string, unknown>>('especialidades-logisticas');

  return <EspecialidadesSection conteudo={pagina?.conteudo ?? null} />;
}
