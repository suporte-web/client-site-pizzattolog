import type { Metadata } from 'next';
import { PaginaCanalDoCliente } from '@/components/site/canal-do-cliente/PaginaCanalDoCliente';

export const metadata: Metadata = {
  title: 'Canal do Cliente | Pizzattolog',
  description: 'Canal do Cliente da Pizzattolog: reclamações e elogios, rastreamento de carga e atendimento.',
};

export default function CanalDoClientePagina() {
  return <PaginaCanalDoCliente />;
}
