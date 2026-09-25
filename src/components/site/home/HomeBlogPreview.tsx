import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';

import { blogPosts, getBlogPostPath, type BlogPost } from '@/components/site/blog/blog-posts';

const previewPosts = blogPosts.slice(0, 3);

const tagSx = {
  height: 26,
  borderRadius: 999,
  bgcolor: '#FFB71B',
  color: 'white',
  fontSize: 13,
  fontWeight: 900,
  '& .MuiChip-label': {
    px: 1.3,
  },
};

function BlogPreviewCard({
  post,
  index,
}: {
  post: BlogPost;
  index: number;
}) {
  const tags = post.categories?.length
    ? post.categories.slice(0, 3)
    : post.category
      ? [post.category]
      : [];

  return (
    <Box
      component="article"
      sx={{
        position: 'relative',
        minHeight: { xs: 300, md: 342 },
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        borderRadius: 5,
        overflow: 'hidden',
        bgcolor: index === 2 ? '#4A4A4A' : '#858585',
        color: 'white',
        p: { xs: 2.5, md: 3 },
        backgroundImage: post.image
          ? `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.68) 100%), url("${post.image}")`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Stack spacing={2} sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {tags.length ? (
          <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={tagSx} />
            ))}
          </Stack>
        ) : null}

        <Typography
          component="h3"
          sx={{
            maxWidth: 430,
            fontSize: { xs: '1.12rem', md: '1.22rem' },
            fontWeight: 900,
            lineHeight: 1.25,
            overflowWrap: 'anywhere',
          }}
        >
          {post.title}
        </Typography>

        <Button
          component="a"
          href={getBlogPostPath(post)}
          endIcon={<ArrowOutwardRoundedIcon />}
          sx={{
            width: 'fit-content',
            minHeight: 32,
            p: 0,
            color: 'white',
            fontWeight: 900,
            '&:hover': {
              bgcolor: 'transparent',
              boxShadow: 'none',
              transform: 'none',
            },
          }}
        >
          Saiba mais
        </Button>
      </Stack>
    </Box>
  );
}

export function HomeBlogPreview() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 }, bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Stack spacing={5} sx={{ alignItems: 'center' }}>
          <Stack spacing={1.5} sx={{ textAlign: 'center', maxWidth: 920 }}>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 900,
                lineHeight: 1.08,
                color: '#292929',
              }}
            >
              Blog Pizzattolog
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>
              Conheça as últimas tendências em logística, transformação digital e gestão estratégica que impulsionam o sucesso dos nossos clientes.
            </Typography>
          </Stack>

          <Grid container spacing={{ xs: 3, md: 3.5 }} sx={{ width: '100%' }}>
            {previewPosts.map((post, index) => (
              <Grid key={post.href} size={{ xs: 12, md: 4 }}>
                <BlogPreviewCard post={post} index={index} />
              </Grid>
            ))}
          </Grid>

          <Button
            component="a"
            href="/blog"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              minWidth: 190,
              bgcolor: '#FF6319',
              '&:hover': {
                bgcolor: '#E95512',
              },
            }}
          >
            Ver todas as notícias
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
