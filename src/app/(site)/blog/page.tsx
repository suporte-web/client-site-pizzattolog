import type { Metadata } from 'next';
import { BlogSection } from '@/components/site/blog';
import {
  blogPosts,
  getBlogPostSlug,
  type BlogPost,
} from '@/components/site/blog/blog-posts';
import { getPaginaPublicadaSite } from '@/services/site.service';

export const metadata: Metadata = {
  title: 'Blog | Pizzattolog',
  description: 'Conteúdos da Pizzattolog sobre logística, tecnologia, sustentabilidade e operações eficientes.',
};

type BlogConteudoCrm = Record<string, unknown> & {
  posts?: BlogPost[];
};

const blogContentKeys = [
  'destaque',
  'lista',
  'busca',
  'categorias',
  'acoes',
  'vazio',
] as const;

function getPostsPublicados(
  posts: BlogPost[] | undefined,
): BlogPost[] {
  if (!posts) {
    return [];
  }

  return posts.filter(
    (post) =>
      post.published &&
      post.title?.trim() &&
      post.excerpt?.trim(),
  ).map((post) => ({
    ...post,
    href:
      post.href?.trim() ||
      getBlogPostSlug(post),
  }));
}

function getConteudoBlogVisivel(
  conteudo: BlogConteudoCrm | null | undefined,
): Record<string, unknown> | null {
  if (!conteudo) {
    return null;
  }

  const conteudoVisivel: Record<string, unknown> = {};

  blogContentKeys.forEach((key) => {
    if (conteudo[key] !== undefined) {
      conteudoVisivel[key] = conteudo[key];
    }
  });

  return conteudoVisivel;
}

export default async function BlogPage() {
  const pagina =
    await getPaginaPublicadaSite<BlogConteudoCrm>('blog');

  return (
    <BlogSection
      conteudo={getConteudoBlogVisivel(pagina?.conteudo)}
      posts={[
        ...getPostsPublicados(
          pagina?.conteudo.posts,
        ),
        ...blogPosts,
      ]}
    />
  );
}
