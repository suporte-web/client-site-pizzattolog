import type { Metadata } from 'next';
import { PaginaRastreamento } from '@/components/site/rastreamento/PaginaRastreamento';

export const metadata: Metadata = {
  title: 'Rastreamento de Carga | Pizzattolog',
  description: 'Acompanhe o status e as movimentações da sua carga com a Pizzattolog.',
};
export default function RastreamentoPagina() {
  return <PaginaRastreamento />;
}
