import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
        p: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          textAlign: 'center',
          borderRadius: 3,
          maxWidth: 600,
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="50" fill="#f44336" fillOpacity="0.2" />
            <path
              d="M60 20C36.8 20 18 38.8 18 60s18.8 40 42 40 42-18.8 42-40S83.2 20 60 20zm0 72c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
              fill="#f44336"
            />
            <path
              d="M65 75h-10v-5h10v5zm0-15h-10v-20h10v20z"
              fill="#fff"
            />
          </svg>
        </Box>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '5rem', md: '7rem' },
            fontWeight: 900,
            color: 'primary.main',
            mb: 2,
            background: 'linear-gradient(45deg, #3b82f6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'bounce 2s ease-in-out infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 2,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Trang Không Tìm Thấy
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: 'text.secondary',
            maxWidth: 400,
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.1rem' },
          }}
        >
          Có vẻ như bạn đã lạc đường! Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          sx={{
            borderRadius: 10,
            textTransform: 'none',
            px: 4,
            py: 1.5,
            bgcolor: 'primary.main',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              bgcolor: 'primary.dark',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Về Trang Chủ
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;