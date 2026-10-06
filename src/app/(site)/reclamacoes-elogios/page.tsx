import type { Metadata } from 'next';
import { PaginaReclamacoesElogios } from '@/components/site/canal-do-cliente/PaginaReclamacoesElogios';
export const metadata: Metadata = {
  title: 'Reclamações e Elogios | Pizzattolog',
  description: 'Registre sua reclamação ou elogio para a equipe de atendimento da Pizzattolog.',
};
export default function ReclamacoesElogiosPagina() { return <PaginaReclamacoesElogios />; }
