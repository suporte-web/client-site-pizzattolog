import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const blogPostsPath = path.join(
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

async function fetchSitemapSlugs() {
  const content = getMarkdownContent(
    await fetchText(`${officialBaseUrl}/post-sitemap.xml`),
  );

  return Array.from(
    content.matchAll(/\((https:\/\/pizzattolog\.com\.br\/[^)]+\/)\)/g),
    (match) =>
      match[1]
        .replace(officialBaseUrl, '')
        .replace(/^\/|\/$/g, ''),
  );
}

async function fetchApiPosts() {
  const content = getMarkdownContent(
    await fetchText(
      `${officialBaseUrl}/wp-json/wp/v2/posts?per_page=100&page=1&_embed=wp:featuredmedia,wp:term`,
    ),
  );

  return JSON.parse(content);
}

async function readLocalPosts() {
  const source = await fs.readFile(blogPostsPath, 'utf8');
  const match = source.match(/export const blogPosts: BlogPost\[] = ([\s\S]*?);\n\nexport const blogCategories/);

  if (!match) {
    throw new Error('Could not parse local blogPosts array.');
  }

  return JSON.parse(match[1]);
}

function normalizeHtml(value) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

const [sitemapSlugs, apiPosts, localPosts] = await Promise.all([
  fetchSitemapSlugs(),
  fetchApiPosts(),
  readLocalPosts(),
]);

const localSlugs = localPosts.map((post) => post.slug);
const duplicateSlugs = localSlugs.filter(
  (slug, index) => localSlugs.indexOf(slug) !== index,
);
const missingLocalSlugs = sitemapSlugs.filter((slug) => !localSlugs.includes(slug));
const missingApiSlugs = localSlugs.filter(
  (slug) => !apiPosts.some((post) => post.slug === slug),
);

if (duplicateSlugs.length) {
  throw new Error(`Duplicate slugs: ${duplicateSlugs.join(', ')}`);
}

if (missingLocalSlugs.length || missingApiSlugs.length) {
  throw new Error(
    [
      missingLocalSlugs.length
        ? `Missing local slugs: ${missingLocalSlugs.join(', ')}`
        : '',
      missingApiSlugs.length
        ? `Local slugs missing in API: ${missingApiSlugs.join(', ')}`
        : '',
    ]
      .filter(Boolean)
      .join('\n'),
  );
}

const samples = [
  'guia-definitivo-piso-minimo-frete-antt',
  'tipos-de-cargas',
  'operador-logistico',
  'blog-lgpd-estamos-comprometidos-com-sua-privacidade',
];

const comparedSamples = [];

for (const slug of samples) {
  const apiPost = apiPosts.find((post) => post.slug === slug);
  const localPost = localPosts.find((post) => post.slug === slug);

  if (!apiPost || !localPost) {
    throw new Error(`Sample not found: ${slug}`);
  }

  if (
    normalizeHtml(apiPost.content.rendered) !==
    normalizeHtml(localPost.contentHtml)
  ) {
    throw new Error(`Content mismatch for sample: ${slug}`);
  }

  comparedSamples.push(slug);
}

console.log(`Official sitemap posts: ${sitemapSlugs.length}`);
console.log(`Official API posts: ${apiPosts.length}`);
console.log(`Migrated local posts: ${localPosts.length}`);
console.log(`Compared full content samples: ${comparedSamples.join(', ')}`);
console.log('Migrated slugs:');
console.log(localSlugs.join('\n'));
