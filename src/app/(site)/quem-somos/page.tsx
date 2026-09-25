import type { Metadata } from 'next';
import QuemSomosSection from '@/components/site/quem-somos/QuemSomosSection';

export const metadata: Metadata = {
  title: 'Quem Somos | Pizzattolog',
  description: 'Conheca a estrutura institucional da Pizzattolog.',
};

export default function QuemSomosPage() {
  return <QuemSomosSection />;
}
