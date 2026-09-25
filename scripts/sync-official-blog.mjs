import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const outputPath = path.join(
  root,
  'src',
  'components',
  'site',
  'blog',
  'blog-posts.ts',
);

const officialBaseUrl = 'https://pizzattolog.com.br';
const readerBaseUrl = 'https://r.jina.ai';

function readerUrl(url) {
  return `${readerBaseUrl}/${url}`;
}

async function fetchText(url) {
  const response = await fetch(readerUrl(url), {
    headers: {
      'x-cache-tolerance': '0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

function getMarkdownContent(text) {
  const marker = 'Markdown Content:';
  const index = text.indexOf(marker);

  if (index === -1) {
    return text.trim();
  }

  return text.slice(index + marker.length).trim();
}

async function fetchSitemapUrls() {
  const content = getMarkdownContent(
    await fetchText(`${officialBaseUrl}/post-sitemap.xml`),
  );

  return Array.from(
    content.matchAll(/\((https:\/\/pizzattolog\.com\.br\/[^)]+\/)\)/g),
    (match) => match[1],
  );
}

async function fetchPosts() {
  const content = getMarkdownContent(
    await fetchText(
      `${officialBaseUrl}/wp-json/wp/v2/posts?per_page=100&page=1&_embed=wp:featuredmedia,wp:term`,
    ),
  );

  return JSON.parse(content);
}

function stripHtml(value) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));
}

function pickFeaturedImage(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const sizes = media?.media_details?.sizes;

  return (
    sizes?.full?.source_url ??
    media?.source_url ??
    ''
  );
}

function pickAlt(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    media?.alt_text?.trim() ||
    stripHtml(media?.title?.rendered ?? '') ||
    stripHtml(post.title.rendered)
  );
}

function pickCategories(post) {
  return (
    post._embedded?.['wp:term']?.[0]
      ?.filter((term) => term.taxonomy === 'category')
      .map((term) => term.name)
      .filter(Boolean) ?? []
  );
}

function toBlogPost(post) {
  const categories = pickCategories(post);
  const title = stripHtml(post.title.rendered);
  const excerpt = stripHtml(post.excerpt.rendered).replace(/\s*\[\.\.\.\]\s*$/, '...');

  return {
    title,
    slug: post.slug,
    href: post.link,
    sourceUrl: post.link,
    category: categories[0] ?? 'Sem categoria',
    categories,
    date: formatDate(post.date),
    publishedAt: post.date,
    excerpt,
    image: pickFeaturedImage(post),
    alt: pickAlt(post),
    contentHtml: post.content.rendered.trim(),
    published: true,
  };
}

function renderFile(posts) {
  return `export interface BlogPost {
  title: string;
  slug?: string;
  href: string;
  sourceUrl?: string;
  category?: string;
  categories?: string[];
  date?: string;
  publishedAt?: string;
  excerpt: string;
  image?: string;
  alt?: string;
  contentHtml?: string;
  published?: boolean;
}

const blogBasePath = '/blog';

function slugifyTitle(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getBlogPostSlug(
  post: Pick<BlogPost, 'href'> &
    Partial<Pick<BlogPost, 'title' | 'slug'>>,
) {
  if (post.slug?.trim()) {
    return post.slug.trim();
  }

  const href = post.href?.trim();

  if (href) {
    return href
      .replace(/^https?:\\/\\/[^/]+\\/?/, '')
      .replace(/^blog\\//, '')
      .replace(/\\/$/, '');
  }

  return slugifyTitle(post.title ?? '');
}

export function getBlogPostPath(
  post: Pick<BlogPost, 'href'> &
    Partial<Pick<BlogPost, 'title' | 'slug'>>,
) {
  const slug = getBlogPostSlug(post);

  return slug
    ? \`\${blogBasePath}/\${slug}\`
    : blogBasePath;
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => getBlogPostSlug(post) === slug);
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export const blogCategories = Array.from(
  new Set(
    blogPosts.flatMap((post) =>
      post.categories?.length
        ? post.categories
        : post.category
          ? [post.category]
          : [],
    ),
  ),
).sort((a, b) => a.localeCompare(b, 'pt-BR'));
`;
}

const [sitemapUrls, apiPosts] = await Promise.all([
  fetchSitemapUrls(),
  fetchPosts(),
]);

const sitemapSlugs = sitemapUrls.map((url) =>
  url.replace(officialBaseUrl, '').replace(/^\/|\/$/g, ''),
);
const posts = apiPosts.map(toBlogPost);
const postSlugs = posts.map((post) => post.slug);
const missing = sitemapSlugs.filter((slug) => !postSlugs.includes(slug));

if (missing.length) {
  throw new Error(`Missing API posts for sitemap slugs: ${missing.join(', ')}`);
}

await fs.writeFile(outputPath, renderFile(posts), 'utf8');

console.log(`Official sitemap posts: ${sitemapUrls.length}`);
console.log(`Migrated posts: ${posts.length}`);
console.log(posts.map((post) => post.slug).join('\n'));
