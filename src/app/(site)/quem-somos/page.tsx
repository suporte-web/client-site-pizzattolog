import type { Metadata } from 'next';
import { InstitutionalPageSection } from '@/components/site/institucional';

export const metadata: Metadata = {
  title: 'Quem Somos | Pizzattolog',
  description: 'Conheca a estrutura institucional da Pizzattolog.',
};

export default function QuemSomosPage() {
  return <InstitutionalPageSection slug="quem-somos" />;
}
