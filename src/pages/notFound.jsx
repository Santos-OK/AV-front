import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NotFound() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: isMobile ? 4 : 6,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          maxWidth: 600,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -50,
            right: -50,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: theme.palette.primary.light,
            opacity: 0.1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: theme.palette.secondary.light,
            opacity: 0.1,
          }
        }}
      >
        {/* Icono principal */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              mb: 2,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -5,
                left: -5,
                right: -5,
                bottom: -5,
                borderRadius: '50%',
                border: `2px dashed ${theme.palette.primary.light}`,
                opacity: 0.3,
                animation: 'spin 20s linear infinite',
              }
            }}
          >
            <SearchOffIcon sx={{ fontSize: 60 }} />
          </Box>
        </Box>

        {/* Número 404 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: isMobile ? '4rem' : '6rem',
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 1,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          404
        </Typography>

        {/* Título */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: theme.palette.text.primary
          }}
        >
          ¡Página No Encontrada!
        </Typography>

        {/* Descripción */}
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            lineHeight: 1.6,
            maxWidth: 400,
            mx: 'auto'
          }}
        >
          Lo sentimos, la página que estás buscando no existe o ha sido movida. 
          Puede que hayas seguido un enlace incorrecto o la página haya sido eliminada.
        </Typography>

        {/* Botones de acción */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Volver al Inicio
          </Button>

          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/about"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Conoce Más
          </Button>
        </Box>

        {/* Mensaje adicional */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.disabled,
            mt: 4,
            fontStyle: 'italic'
          }}
        >
          Si crees que esto es un error, contacta al administrador del sitio.
        </Typography>
      </Paper>

      {/* Estilos para la animación */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
}