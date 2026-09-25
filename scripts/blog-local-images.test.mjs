import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const blogPostsPath = resolve(rootDir, 'src/components/site/blog/blog-posts.ts');
const blogImagesDir = resolve(rootDir, 'public/images/blog');
const source = readFileSync(blogPostsPath, 'utf8');
const match = source.match(/export const blogPosts: BlogPost\[] = ([\s\S]*?);\n\nexport const blogCategories/);

assert.ok(match, 'Could not parse blogPosts from blog-posts.ts');

const blogPosts = JSON.parse(match[1]);

for (const post of blogPosts) {
  if (!post.image) {
    continue;
  }

  assert.ok(
    post.image.startsWith('/images/blog/'),
    `Expected local blog image for "${post.title}", received "${post.image}"`,
  );

  const imagePath = resolve(rootDir, `public${post.image}`);

  assert.ok(
    imagePath.startsWith(blogImagesDir),
    `Blog image for "${post.title}" must stay inside public/images/blog`,
  );
  assert.ok(existsSync(imagePath), `Missing local file for "${post.title}": ${post.image}`);
}
