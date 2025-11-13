import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Alert,
    styled
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { useEquipment } from "../context/EquipmentContext";

const DoradoButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#D4AF37',
    color: '#FFF',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#B8860B',
    },
}));

const EquipmentCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    },
}));

export default function Equipment() {
    const { state, actions } = useEquipment();

    const handleAddToCart = (equipment) => {
        actions.addToCart(equipment.id);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom color="#8B0000" fontWeight="bold">
                Equipo Disponible
            </Typography>

            {/* Alert informativo sobre la política de días */}
            <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body1" fontWeight="bold">
                    📋 Política de Préstamo
                </Typography>
                <Typography variant="body2">
                    • Equipo con múltiples unidades: <strong>7 días</strong> de préstamo<br />
                    • Última unidad disponible: <strong>1 día</strong> de préstamo
                </Typography>
            </Alert>

            <Grid container spacing={3}>
                {state.equipment.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <EquipmentCard>
                            <CardMedia
                                component="img"
                                height="200"
                                image={item.image}
                                alt={item.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    {item.name}
                                </Typography>
                                <Chip
                                    label={item.category}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#D4AF37',
                                        color: 'white',
                                        mb: 1
                                    }}
                                />
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {item.description}
                                </Typography>

                                {/* Información de días de préstamo */}
                                <Box sx={{ mb: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {item.quantity === 1 ? (
                                            <>⏳ <span style={{ color: '#f57c00' }}>Última unidad - Préstamo por 1 día</span></>
                                        ) : (
                                            <>📅 <span style={{ color: '#2e7d32' }}>Préstamo por 7 días</span></>
                                        )}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color={item.quantity > 0 ? 'success.main' : 'error.main'}
                                    >
                                        {item.quantity > 0 ? `${item.quantity} disponibles` : 'Agotado'}
                                    </Typography>
                                    <DoradoButton
                                        variant="contained"
                                        startIcon={<AddShoppingCart />}
                                        onClick={() => handleAddToCart(item)}
                                        disabled={item.quantity === 0}
                                        size="small"
                                    >
                                        Reservar
                                    </DoradoButton>
                                </Box>
                            </CardContent>
                        </EquipmentCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}