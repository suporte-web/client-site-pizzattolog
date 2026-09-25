'use client';

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

import { blogCategories, blogPosts, getBlogPostPath, type BlogPost } from './blog-posts';
import {
  getContentString,
  type SiteContent,
} from '@/utils/site-content';

const allCategoriesLabel = 'Todos';
const postsPerPage = 9;
const tagChipSx = {
  height: 26,
  borderRadius: 999,
  bgcolor: '#FF6319',
  color: 'white',
  fontSize: 13,
  fontWeight: 900,
  '& .MuiChip-label': {
    px: 1.35,
  },
};

const filterChipSx = {
  ...tagChipSx,
  bgcolor: '#F6A800',
  '&:hover': {
    bgcolor: '#FF6319',
  },
};

const selectedFilterChipSx = {
  ...tagChipSx,
  bgcolor: '#FF6319',
  '&:hover': {
    bgcolor: '#E95512',
  },
};

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function BlogImage({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (!post.image) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: featured ? { xs: 260, md: 430 } : 220,
          display: 'grid',
          placeItems: 'center',
          bgcolor: 'primary.dark',
          color: 'white',
        }}
      >
        <ArticleRoundedIcon sx={{ fontSize: featured ? 74 : 54, opacity: 0.82 }} />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={post.image}
      alt={post.alt ?? post.title}
      sx={{
        display: 'block',
        width: '100%',
        height: '100%',
        minHeight: featured ? { xs: 260, md: 430 } : 220,
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
      }}
    />
  );
}

function PostMeta({ post, light = false }: { post: BlogPost; light?: boolean }) {
  const textColor = light ? 'rgba(255,255,255,0.82)' : 'text.secondary';

  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', alignItems: 'center', color: textColor }}>
      {post.category ? (
        <Chip label={post.category} size="small" sx={tagChipSx} />
      ) : null}

      {post.date ? (
        <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
          <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
          <Typography component="span" sx={{ fontSize: 14, fontWeight: 700 }}>
            {post.date}
          </Typography>
        </Stack>
      ) : null}
    </Stack>
  );
}

function FeaturedPost({
  post,
  featuredLabel,
  readMoreLabel,
}: {
  post: BlogPost;
  featuredLabel: string;
  readMoreLabel: string;
}) {
  return (
    <Paper
      component="article"
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: 2,
        bgcolor: '#221C18',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 22px 48px rgba(9, 43, 67, 0.22)',
      }}
    >
      <Grid container sx={{ minHeight: { md: 430 } }}>
        <Grid size={{ xs: 12, md: 6.6 }}>
          <Box
            sx={{
              height: '100%',
              overflow: 'hidden',
              '&:hover img': {
                transform: 'scale(1.035)',
              },
            }}
          >
            <BlogImage post={post} featured />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 5.4 }}>
          <Stack spacing={2.5} sx={{ height: '100%', justifyContent: 'center', p: { xs: 3, md: 5 } }}>
            <Chip
              label={featuredLabel}
              size="small"
              sx={{
                ...tagChipSx,
                width: 'fit-content',
              }}
            />
            <PostMeta post={post} light />
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '3.05rem' }, lineHeight: 1.08, overflowWrap: 'anywhere' }}
            >
              {post.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.76)', fontSize: { xs: 16, md: 18 }, lineHeight: 1.75 }}>
              {post.excerpt}
            </Typography>
            <Button
              component="a"
              href={getBlogPostPath(post)}
              variant="contained"
              color="secondary"
              endIcon={<ArrowOutwardRoundedIcon />}
              sx={{ width: 'fit-content', mt: 1 }}
            >
              {readMoreLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

function BlogCard({
  post,
  readMoreLabel,
}: {
  post: BlogPost;
  readMoreLabel: string;
}) {
  return (
    <Paper
      component="article"
      elevation={0}
      sx={{
        height: '100%',
        overflow: 'hidden',
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid rgba(15, 23, 42, 0.08)',
        boxShadow: '0 16px 34px rgba(19, 39, 57, 0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: { md: 'translateY(-4px)' },
          boxShadow: '0 22px 42px rgba(19, 39, 57, 0.13)',
        },
        '&:hover img': {
          transform: 'scale(1.035)',
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Box sx={{ height: 238, overflow: 'hidden', bgcolor: '#EBF0F2' }}>
          <BlogImage post={post} />
        </Box>

        <Stack spacing={1.75} sx={{ flex: 1, p: 2.5 }}>
          <PostMeta post={post} />
          <Typography component="h3" variant="h5" sx={{ fontWeight: 900, lineHeight: 1.18, overflowWrap: 'anywhere' }}>
            {post.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, flex: 1 }}>{post.excerpt}</Typography>
          <Button
            component="a"
            href={getBlogPostPath(post)}
            endIcon={<ArrowOutwardRoundedIcon />}
            sx={{
              width: 'fit-content',
              px: 0,
              color: 'secondary.main',
              '&:hover': { bgcolor: 'transparent', boxShadow: 'none', transform: 'none' },
            }}
          >
            {readMoreLabel}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

interface BlogSectionProps {
  posts?: BlogPost[];
  conteudo?: SiteContent;
}

export function BlogSection({
  posts,
  conteudo,
}: BlogSectionProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(allCategoriesLabel);
  const [page, setPage] = useState(1);

  const publicPosts = posts ?? blogPosts;
  const featuredPost = publicPosts[0];
  const otherPosts = publicPosts.slice(1);
  const categories = useMemo(
    () =>
      Array.from(
        new Set([
          ...blogCategories,
          ...publicPosts
            .map((post) => post.category)
            .filter((category): category is string =>
              Boolean(category),
            ),
        ]),
      ).sort((a, b) =>
        a.localeCompare(
          b,
          'pt-BR',
        ),
      ),
    [publicPosts],
  );
  const featuredLabel =
    getContentString(conteudo, 'destaque.etiqueta', 'Mais recente');
  const readMoreLabel =
    getContentString(conteudo, 'acoes.leiaMais', 'Leia mais');

  const filteredPosts = useMemo(() => {
    const term = normalize(search);

    return otherPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === allCategoriesLabel || normalize(post.category ?? '') === normalize(selectedCategory);
      const matchesSearch =
        !term ||
        normalize(post.title).includes(term) ||
        normalize(post.excerpt).includes(term) ||
        normalize(post.category ?? '').includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [otherPosts, search, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <Box component="main">
      {featuredPost ? (
        <Box
          component="section"
          sx={{
            pt: { xs: 14, md: 16 },
            pb: { xs: 5, md: 6 },
            bgcolor: 'background.default',
          }}
        >
          <Container maxWidth="xl">
            <FeaturedPost
              post={featuredPost}
              featuredLabel={featuredLabel}
              readMoreLabel={readMoreLabel}
            />
          </Container>
        </Box>
      ) : null}

      <Box component="section" sx={{ pt: { xs: 5, md: 6 }, pb: { xs: 7, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={{ xs: 4, lg: 5 }} sx={{ alignItems: 'flex-start' }}>
            <Grid size={{ xs: 12, lg: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  position: { lg: 'sticky' },
                  top: { lg: 112 },
                  p: 2.5,
                  borderRadius: 2,
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  bgcolor: '#F4F7F7',
                }}
              >
                <Stack spacing={2.5}>
                  <TextField
                    label={getContentString(conteudo, 'busca.label', 'Pesquisar')}
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchRoundedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                  />

                  <Stack spacing={1.25}>
                    <Typography sx={{ fontWeight: 900, color: 'text.primary' }}>
                      {getContentString(conteudo, 'categorias.titulo', 'Categorias')}
                    </Typography>
                    <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1 }}>
                      {[allCategoriesLabel, ...categories].map((category) => {
                        const selected = selectedCategory === category;

                        return (
                          <Chip
                            key={category}
                            label={category}
                            size="small"
                            clickable
                            variant="filled"
                            onClick={() => {
                              setSelectedCategory(category);
                              setPage(1);
                            }}
                            sx={{
                              ...(selected ? selectedFilterChipSx : filterChipSx),
                              maxWidth: '100%',
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, lg: 9 }}>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' } }}
                >
                  <Typography
                    variant="h2"
                    sx={{ fontSize: { xs: '2rem', md: '2.7rem' }, lineHeight: 1.1, overflowWrap: 'anywhere' }}
                  >
                    {getContentString(conteudo, 'lista.titulo', 'Últimas publicações')}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontWeight: 700 }}>
                    {filteredPosts.length} conteúdo{filteredPosts.length === 1 ? '' : 's'}
                  </Typography>
                </Stack>

                {filteredPosts.length ? (
                  <Grid container spacing={3}>
                    {paginatedPosts.map((post) => (
                      <Grid key={post.href} size={{ xs: 12, md: 6, xl: 4 }}>
                        <BlogCard
                          post={post}
                          readMoreLabel={readMoreLabel}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 3, md: 5 },
                      borderRadius: 2,
                      textAlign: 'center',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      bgcolor: '#F4F7F7',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 900 }}>
                      {getContentString(conteudo, 'vazio.titulo', 'Nenhum conteúdo encontrado')}
                    </Typography>
                    <Typography sx={{ mt: 1, color: 'text.secondary' }}>
                      {getContentString(conteudo, 'vazio.texto', 'Ajuste a busca ou escolha outra categoria.')}
                    </Typography>
                  </Paper>
                )}

                {filteredPosts.length > postsPerPage ? (
                  <Stack spacing={1.5} sx={{ alignItems: 'center', pt: 1 }}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={(_, value) => setPage(value)}
                      color="secondary"
                      shape="rounded"
                      size="large"
                      siblingCount={1}
                      boundaryCount={1}
                    />
                    <Typography sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 700 }}>
                      Página {currentPage} de {totalPages}
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
