import type { HeroPaginaInicial } from '@/types/site';

export type HeroSlide = {
  imagem: string;
  tipo: 'movimento' | 'historia';
  objectPosition: string;
  objectFit: 'cover' | 'contain';
  backgroundColor: string;
};

export function buildHeroSlides(hero: HeroPaginaInicial): HeroSlide[] {
  const imagemPrincipal =
    hero.imagemUrl === undefined || hero.imagemUrl === null
      ? '/images/home/caminhao-tela-inicial.png'
      : hero.imagemUrl;

  return [
    {
      imagem: imagemPrincipal,
      tipo: 'movimento',
      objectPosition: '62% center',
      objectFit: 'cover',
      backgroundColor: 'transparent',
    },
    {
      imagem: hero.imagemUrlSecundaria,
      tipo: 'historia',
      objectPosition: 'center center',
      objectFit: 'cover',
      backgroundColor: 'transparent',
    },
  ].filter((slide): slide is HeroSlide => Boolean(slide.imagem));
}
