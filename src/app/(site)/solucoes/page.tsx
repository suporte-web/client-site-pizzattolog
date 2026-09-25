import type { Metadata } from 'next';
import SolucoesSection from '@/components/site/solucoes/SolucoesSection';

export const metadata: Metadata = {
  title: 'Solucoes | Pizzattolog',
  description: 'Conheca as solucoes logisticas apresentadas pela Pizzattolog.',
};

export default function SolucoesPage() {
  return <SolucoesSection />;
}
