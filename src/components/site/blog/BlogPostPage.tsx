import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from '@mui/material';

import { blogPosts, getBlogPostPath, type BlogPost } from './blog-posts';

function BlogPostHeroImage({ post }: { post: BlogPost }) {
  if (!post.image) {
    return (
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          bgcolor: '#142D3B',
          color: 'white',
        }}
      >
        <ArticleRoundedIcon sx={{ fontSize: { xs: 72, md: 104 }, opacity: 0.38 }} />
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
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  );
}

function PostCategories({ post }: { post: BlogPost }) {
  const categories =
    post.categories?.length
      ? post.categories
      : post.category
        ? [post.category]
        : [];

  return (
    <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          size="small"
          sx={{
            height: 28,
            borderRadius: 999,
            bgcolor: '#FF6319',
            color: 'white',
            fontSize: 13,
            fontWeight: 900,
            '& .MuiChip-label': {
              px: 1.4,
            },
          }}
        />
      ))}
    </Stack>
  );
}

function PostDate({ post }: { post: BlogPost }) {
  if (!post.date) {
    return null;
  }

  return (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', color: 'rgba(255,255,255,0.84)' }}>
      <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
      <Typography component="span" sx={{ fontSize: 14, fontWeight: 800 }}>
        {post.date}
      </Typography>
    </Stack>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const relatedPosts = blogPosts
    .filter((item) => item.href !== post.href && item.category === post.category)
    .slice(0, 3);

  const contentHtml =
    post.contentHtml ??
    `<p>${post.excerpt}</p>`;

  return (
    <Box component="main">
      <Box
        component="section"
        sx={{
          position: 'relative',
          minHeight: { xs: 430, md: 560 },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          pt: { xs: 11, md: 13 },
          pb: { xs: 4, md: 6 },
          color: 'white',
        }}
      >
        <BlogPostHeroImage post={post} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(7, 25, 36, 0.22) 0%, rgba(7, 25, 36, 0.72) 64%, rgba(7, 25, 36, 0.9) 100%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={2.25} sx={{ maxWidth: 920, alignItems: 'flex-start' }}>
            <Button
              component="a"
              href="/blog"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                alignSelf: 'flex-start',
                px: 0,
                color: 'rgba(255,255,255,0.86)',
                '&:hover': { bgcolor: 'transparent', color: 'white', boxShadow: 'none', transform: 'none' },
              }}
            >
              Voltar para o blog
            </Button>
            <PostCategories post={post} />
            <Typography
              variant="h1"
              sx={{
                maxWidth: 980,
                fontSize: { xs: '2.15rem', sm: '2.75rem', md: '4rem' },
                lineHeight: 1.04,
                textShadow: '0 12px 30px rgba(0,0,0,0.32)',
              }}
            >
              {post.title}
            </Typography>
            <PostDate post={post} />
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: 'background.default', pt: { xs: 4, md: 5 }, pb: { xs: 7, md: 10 } }}>
        <Container maxWidth="md">
          <Box
            component="article"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            sx={{
              color: 'text.primary',
              fontSize: { xs: 17, md: 18 },
              lineHeight: 1.85,
              '& > :first-of-type': {
                mt: 0,
              },
              '& p': {
                mb: 2.4,
              },
              '& h2': {
                mt: 5,
                mb: 2,
                color: 'primary.dark',
                fontSize: { xs: '1.65rem', md: '2.15rem' },
                lineHeight: 1.16,
                fontWeight: 900,
              },
              '& h3': {
                mt: 3.5,
                mb: 1.5,
                color: 'primary.dark',
                fontSize: { xs: '1.28rem', md: '1.55rem' },
                lineHeight: 1.22,
                fontWeight: 900,
              },
              '& h4, & h5, & h6': {
                mt: 3,
                mb: 1.25,
                color: 'primary.dark',
                fontWeight: 900,
              },
              '& ul, & ol': {
                pl: { xs: 3, md: 4 },
                mb: 2.5,
              },
              '& li': {
                mb: 1,
              },
              '& a': {
                color: 'secondary.main',
                fontWeight: 800,
                textDecoration: 'none',
              },
              '& a:hover': {
                textDecoration: 'underline',
              },
              '& img': {
                display: 'block',
                maxWidth: '100%',
                height: 'auto',
                my: 3,
                borderRadius: 2,
              },
              '& blockquote': {
                m: 0,
                my: 3,
                pl: 2.5,
                borderLeft: '4px solid #FF6319',
                color: 'text.secondary',
                fontSize: { xs: 18, md: 20 },
                fontWeight: 700,
              },
              '& iframe': {
                width: '100%',
                maxWidth: '100%',
              },
            }}
          />

          {relatedPosts.length ? (
            <Box component="section" sx={{ mt: { xs: 5, md: 7 } }}>
              <Stack spacing={3}>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.85rem', md: '2.35rem' }, lineHeight: 1.1 }}>
                  Continue lendo
                </Typography>

                <Grid container spacing={2.5}>
                  {relatedPosts.map((item) => (
                    <Grid key={item.href} size={{ xs: 12, md: 4 }}>
                      <Paper
                        elevation={0}
                        sx={{
                          height: '100%',
                          p: 2.5,
                          borderRadius: 2,
                          bgcolor: 'white',
                          border: '1px solid rgba(15, 23, 42, 0.08)',
                        }}
                      >
                        <Stack spacing={1.5} sx={{ height: '100%' }}>
                          <Typography component="h3" sx={{ fontWeight: 900, lineHeight: 1.25 }}>
                            {item.title}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary', lineHeight: 1.65, flex: 1 }}>
                            {item.excerpt}
                          </Typography>
                          <Button
                            component="a"
                            href={getBlogPostPath(item)}
                            sx={{
                              alignSelf: 'flex-start',
                              px: 0,
                              color: 'secondary.main',
                              '&:hover': { bgcolor: 'transparent', boxShadow: 'none', transform: 'none' },
                            }}
                          >
                            Leia mais
                          </Button>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Box>
          ) : null}
        </Container>
      </Box>
    </Box>
  );
}
