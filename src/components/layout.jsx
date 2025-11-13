import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Home from '../pages/home';
import Equipment from '../pages/equipment';
import Classrooms from '../pages/classrooms';
import Notifications from '../pages/notifications';
import Detail from '../pages/detail';
import NotFound from '../pages/notFound';
import ShoppingCart from '../pages/shoppingCart';

import { Routes, Route } from "react-router";
import { Link } from "react-router";
import { useNavigate } from "react-router";


// Colores
const tintoColor = '#8B0000';
const doradoColor = '#D4AF37';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: tintoColor,
  boxShadow: 'none',
}));

// Estilos para los botones dorados
const DoradoButton = styled(Button)(({ theme }) => ({
  backgroundColor: doradoColor,
  color: '#FFF',
  fontWeight: 'bold',
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: '#B8860B',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  transition: 'all 0.3s ease',
}));

// Estilos para el avatar de perfil
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: `2px solid ${doradoColor}`,
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  transition: 'all 0.3s ease',
}));

// Estilos para el botón circular del carrito
const CartIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: doradoColor,
  color: '#FFF',
  width: 40,
  height: 40,
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: '#B8860B',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  transition: 'all 0.3s ease',
}));

export default function Layout() {
  const [sortOrder, setSortOrder] = React.useState('ascending');
  const [limit, setLimit] = React.useState(null);

  const nav = useNavigate();

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleCartClick = () => {
    // Aquí puedes agregar la funcionalidad para el carrito
    console.log('Carrito clickeado');
    nav("/cart")
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />

      {/* Barra de navegación */}
      <AppBar position="fixed">
        <Toolbar>
          {/* Botones a la izquierda */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <DoradoButton
              component={Link}
              to="/"
            >
              Inicio
            </DoradoButton>

            <DoradoButton
              onClick={() => nav("/notifications")}
            >
              Notificaciones
            </DoradoButton>

            {/* Botón circular del carrito */}
            <CartIconButton
              onClick={handleCartClick}
              aria-label="Carrito de compras"
            >
              <ShoppingCartIcon />
            </CartIconButton>
          </Box>

          {/* Elementos a la derecha */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Botón Cambiar a Administrador */}
            <DoradoButton>
              Cambiar a Administrador
            </DoradoButton>

            {/* Círculo de foto de perfil */}
            <ProfileAvatar
              alt="Foto de perfil"
              src="/path/to/profile/image.jpg" // Cambia esta ruta por tu imagen
              onClick={() => {
                // Aquí puedes agregar la funcionalidad para el click en la foto
                console.log('Foto de perfil clickeada');
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Margen top para compensar la barra fija
          width: '100%'
        }}
      >
        <Routes>
          <Route path="/" element={<Home sortOrder={sortOrder} limit={limit} />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/classrooms" element={<Classrooms />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Box>
  );
}