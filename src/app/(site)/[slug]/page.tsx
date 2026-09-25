import type {
  Metadata,
} from 'next';

import {
  InstitutionalPageSection,
} from '@/components/site/institucional';

import {
  fallbackSiteData,
} from '@/services/site.service';

/*
|--------------------------------------------------------------------------
| IMPORTANTE

|
| Impede que o Next deixe o Quem Somos preso em uma versão estática
| gerada no build.


*/

export const dynamic =
  'force-dynamic';

interface RotaConteudoProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return fallbackSiteData.subpaginas
    .filter(
      (subpagina) =>
        subpagina.slug ===
        subpagina.paginaPai,
    )
    .map((subpagina) => ({
      slug: subpagina.slug,
    }));
}

export async function generateMetadata({
  params,
}: RotaConteudoProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  const subpagina =
    fallbackSiteData.subpaginas.find(
      (item) =>
        item.slug === slug &&
        item.paginaPai === slug,
    );

  const titulo =
    subpagina?.titulo ?? slug;

  return {
    title: `${titulo} | Pizzattolog`,

    description:
      subpagina?.descricao ??
      'Conteúdo institucional da Pizzattolog.',
  };
}

export default async function RotaConteudo({
  params,
}: RotaConteudoProps) {
  const {
    slug,
  } = await params;

  return (
    <InstitutionalPageSection
      slug={slug}
    />
  );
}