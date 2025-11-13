import React from 'react';
import { useEquipment } from "../context/EquipmentContext";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Button,
    Divider,
    Grid,
    Paper,
    Chip,
    Alert,
    styled
} from '@mui/material';
import {
    Add,
    Remove,
    Delete,
    CalendarToday,
    AccessTime,
    School,
    EventAvailable
} from '@mui/icons-material';

// Colores
const tintoColor = '#8B0000';
const doradoColor = '#D4AF37';

// Styled components
const CartContainer = styled(Box)(({ theme }) => ({
    maxWidth: 1200,
    margin: '0 auto',
    padding: theme.spacing(3),
    minHeight: '80vh',
}));

const CartItemCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)',
    },
}));

const SummaryCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    border: `2px solid ${doradoColor}`,
}));

const DoradoButton = styled(Button)(({ theme }) => ({
    backgroundColor: doradoColor,
    color: '#FFF',
    fontWeight: 'bold',
    padding: theme.spacing(1.5, 3),
    borderRadius: '8px',
    '&:hover': {
        backgroundColor: '#B8860B',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    transition: 'all 0.3s ease',
}));

export default function ShoppingCart() {
    const { state, actions } = useEquipment(); // Usar el contexto global

    const updateQuantity = (id, newQuantity) => {
        // Esta funcionalidad la manejaremos en el contexto si es necesaria
        console.log('Actualizar cantidad:', id, newQuantity);
    };

    const removeItem = (id) => {
        actions.removeFromCart(id); // Usar la acción del contexto
    };

    const calculateTotalItems = () => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalDays = () => {
        return state.cart.reduce((total, item) => total + (item.rentalDays * item.quantity), 0);
    };

    const handleReservation = () => {
        actions.confirmReservation();
        alert('¡Reserva confirmada! Revisa tus notificaciones para los detalles.');
    };

    // El carrito estará vacío por defecto porque state.cart viene vacío del contexto
    if (state.cart.length === 0) {
        return (
            <CartContainer>
                <Box textAlign="center" py={10}>
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                        🛒 Tu carrito está vacío
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Explora nuestro equipo audiovisual disponible y reserva lo que necesites para tus proyectos
                    </Typography>
                    <DoradoButton 
                        variant="contained" 
                        size="large"
                        onClick={() => window.location.href = '/equipment'}
                    >
                        Explorar Equipo
                    </DoradoButton>
                </Box>
            </CartContainer>
        );
    }

    return (
        <CartContainer>
            {/* Header del carrito */}
            <Box textAlign="center" mb={4}>
                <Typography variant="h3" fontWeight="bold" gutterBottom color={tintoColor}>
                    Mis Reservas
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Gestiona tu equipo reservado para proyectos universitarios
                </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body1" fontWeight="bold">
                    🎓 Servicio exclusivo para estudiantes - Sin costo
                </Typography>
                <Typography variant="body2">
                    Este servicio es proporcionado por la universidad para apoyar tus proyectos académicos.
                </Typography>
            </Alert>

            <Grid container spacing={4}>
                {/* Lista de equipos reservados */}
                <Grid item xs={12} md={8}>
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Equipo Reservado ({calculateTotalItems()} items)
                        </Typography>
                    </Box>

                    {state.cart.map((item) => ( // Usar state.cart en lugar de cartItems
                        <CartItemCard key={item.id}>
                            <CardMedia
                                component="img"
                                sx={{ width: 140, objectFit: 'cover' }}
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {item.name}
                                        </Typography>
                                        <Chip
                                            label={item.category}
                                            size="small"
                                            sx={{ backgroundColor: doradoColor, color: 'white', mt: 0.5 }}
                                        />
                                    </Box>
                                    <IconButton
                                        onClick={() => removeItem(item.id)}
                                        color="error"
                                        size="small"
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>

                                <Box display="flex" alignItems="center" mb={1}>
                                    <CalendarToday sx={{ fontSize: 18, color: tintoColor, mr: 1 }} />
                                    <Typography variant="body2" color="textSecondary">
                                        Días de reserva: <strong>{item.rentalDays} días</strong>
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" mb={2}>
                                    <AccessTime sx={{ fontSize: 18, color: '#4CAF50', mr: 1 }} />
                                    <Typography
                                        variant="body2"
                                        color={'success.main'}
                                        fontWeight="bold"
                                    >
                                        Reservado
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="h6" mx={2}>
                                            Cantidad: {item.quantity}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        icon={<EventAvailable />}
                                        label="En carrito"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </Box>
                            </CardContent>
                        </CartItemCard>
                    ))}
                </Grid>

                {/* Resumen de la reserva */}
                <Grid item xs={12} md={4}>
                    <SummaryCard>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color={tintoColor}>
                            Resumen de Reserva
                        </Typography>

                        <Box mb={3}>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body1">Total de items:</Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {calculateTotalItems()}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="body1">Días totales:</Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {calculateTotalDays()} días
                                </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography variant="h6">Estado:</Typography>
                                <Chip label="Pendiente de confirmación" color="warning" />
                            </Box>
                        </Box>

                        {/* Información de la reserva */}
                        <Box mb={3}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                📅 Información de Entrega
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Te contactaremos para coordinar la entrega del equipo en el centro de recursos audiovisuales.
                            </Typography>
                        </Box>

                        {/* Botón de confirmación */}
                        <DoradoButton
                            fullWidth
                            size="large"
                            startIcon={<EventAvailable />}
                            onClick={handleReservation}
                            sx={{ mb: 2 }}
                        >
                            Confirmar Reserva
                        </DoradoButton>

                        {/* Beneficios para estudiantes */}
                        <Box mt={3}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <School sx={{ color: doradoColor, mr: 1 }} />
                                <Typography variant="body2">Exclusivo para proyectos académicos</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <CalendarToday sx={{ color: doradoColor, mr: 1 }} />
                                <Typography variant="body2">Máximo 7 días por reserva</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <EventAvailable sx={{ color: doradoColor, mr: 1 }} />
                                <Typography variant="body2">Renovación sujeta a disponibilidad</Typography>
                            </Box>
                        </Box>
                    </SummaryCard>

                    {/* Recordatorios importantes */}
                    <Paper sx={{ p: 2, mt: 2, backgroundColor: '#e8f5e8', border: '1px solid #4CAF50' }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="#2E7D32">
                            ✅ Políticas de Uso
                        </Typography>
                        <Typography variant="body2" color="#2E7D32">
                            • Presentar credencial estudiantil al recoger el equipo<br />
                            • Uso exclusivo para proyectos universitarios<br />
                            • Devolver el equipo en el mismo estado<br />
                            • Reportar cualquier daño o falla
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </CartContainer>
    );
}