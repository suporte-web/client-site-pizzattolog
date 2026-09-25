import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostPage } from '@/components/site/blog/BlogPostPage';
import {
  blogPosts,
  getBlogPostBySlug,
  getBlogPostSlug,
  type BlogPost,
} from '@/components/site/blog/blog-posts';
import { getPaginaPublicadaSite } from '@/services/site.service';

interface BlogPostRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: getBlogPostSlug(post) }));
}

type BlogConteudoCrm = {
  posts?: BlogPost[];
};

async function getCrmPostBySlug(
  slug: string,
) {
  const pagina =
    await getPaginaPublicadaSite<BlogConteudoCrm>('blog');

  return pagina?.conteudo.posts?.find(
    (post) =>
      post.published &&
      post.title?.trim() &&
      post.excerpt?.trim() &&
      getBlogPostSlug(post) === slug,
  );
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post =
    await getCrmPostBySlug(slug) ??
    getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Conteúdo não encontrado | Pizzattolog',
    };
  }

  return {
    title: `${post.title} | Blog Pizzattolog`,
    description: post.excerpt,
  };
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { slug } = await params;
  const post =
    await getCrmPostBySlug(slug) ??
    getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPage post={post} />;
}
