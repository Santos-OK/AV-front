import React, { useState, useEffect } from 'react';
import {
    Box,
    Dialog,
    DialogContent,
    CardMedia,
    Typography,
    Button,
    Chip,
    Divider,
    IconButton,
    Grid,
    Alert,
    styled
} from '@mui/material';
import { Close, AddShoppingCart, Add, Remove } from '@mui/icons-material';
import { useEquipment } from "../context/EquipmentContext";

const DoradoButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#D4AF37',
    color: '#FFF',
    fontWeight: 'bold',
    padding: theme.spacing(1.5, 3),
    '&:hover': {
        backgroundColor: '#B8860B',
    },
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,1)',
    },
}));

const QuantitySelector = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    padding: theme.spacing(0.5),
    width: 'fit-content',
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
    '&:disabled': {
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
    },
}));

const SummaryBox = styled(Box)(({ theme }) => ({
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: theme.spacing(2),
    border: `2px solid #D4AF37`,
}));

export default function EquipmentDetails({ open, onClose, equipment }) {
    const { actions, state } = useEquipment();
    const [addedToCart, setAddedToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Reset quantity cuando se abre un equipo diferente
    useEffect(() => {
        setQuantity(1);
        setAddedToCart(false);
    }, [equipment]);

    if (!equipment) return null;

    const handleAddToCart = () => {
        console.log('Añadiendo al carrito:', equipment.id, quantity);
        actions.addToCart(equipment.id, quantity);
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
            setQuantity(1);
            onClose();
        }, 2000);
    };

    const getRentalDays = () => {
        return equipment.quantity === 1 ? 1 : 7;
    };

    const handleIncrease = () => {
        if (quantity < equipment.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const maxQuantityReached = quantity >= equipment.quantity;
    const rentalDays = getRentalDays();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    overflow: 'hidden',
                    maxHeight: '90vh' // Limitar altura máxima para que sea scrollable
                }
            }}
        >
            <DetailsContainer>
                <CloseButton onClick={onClose}>
                    <Close />
                </CloseButton>

                {/* DialogContent con scroll */}
                <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
                    <Box sx={{ p: 3, maxHeight: '70vh', overflow: 'auto' }}>
                        <Grid container spacing={4}>
                            {/* Columna de imagen */}
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    image={equipment.image}
                                    alt={equipment.name}
                                    sx={{
                                        width: '100%',
                                        height: 300,
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                                    }}
                                />
                            </Grid>

                            {/* Columna de información */}
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 3 }}>
                                    <Chip
                                        label={equipment.category}
                                        sx={{
                                            backgroundColor: '#D4AF37',
                                            color: 'white',
                                            mb: 2,
                                            fontSize: '0.9rem',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Typography variant="h4" fontWeight="bold" gutterBottom color="#8B0000">
                                        {equipment.name}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" paragraph sx={{ lineHeight: 1.6 }}>
                                        {equipment.description}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {/* Información de disponibilidad */}
                                {/* Selector de cantidad */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        🔢 Cantidad a Reservar
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                                        <QuantitySelector>
                                            <QuantityButton
                                                onClick={handleDecrease}
                                                disabled={quantity <= 1 || equipment.quantity === 0}
                                                size="small"
                                            >
                                                <Remove />
                                            </QuantityButton>
                                            <Typography
                                                variant="h5"
                                                sx={{
                                                    minWidth: '50px',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold',
                                                    color: equipment.quantity === 0 ? 'text.disabled' : '#8B0000'
                                                }}
                                            >
                                                {quantity}
                                            </Typography>
                                            <QuantityButton
                                                onClick={handleIncrease}
                                                disabled={maxQuantityReached || equipment.quantity === 0}
                                                size="small"
                                            >
                                                <Add />
                                            </QuantityButton>
                                        </QuantitySelector>

                                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.9rem' }}>
                                            de <strong>{equipment.quantity}</strong> disponible{equipment.quantity !== 1 ? 's' : ''}
                                        </Typography>
                                    </Box>

                                    {equipment.quantity === 0 ? (
                                        <Alert severity="error" sx={{ mt: 1 }}>
                                            <Typography variant="body2" fontWeight="bold">
                                                ❌ No hay unidades disponibles
                                            </Typography>
                                        </Alert>
                                    ) : (
                                        maxQuantityReached && (
                                            <Alert severity="info" sx={{ mt: 1 }}>
                                                <Typography variant="body2">
                                                    ✅ Has seleccionado todas las unidades disponibles
                                                </Typography>
                                            </Alert>
                                        )
                                    )}
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {/* Resumen de la reserva */}
                                <SummaryBox sx={{ mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom color="#8B0000">
                                        📋 Resumen de tu Reserva
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="body2" fontWeight="medium">Cantidad:</Typography>
                                        <Typography variant="body2" fontWeight="bold" color="#8B0000">
                                            {quantity} unidad{quantity !== 1 ? 'es' : ''}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="body2" fontWeight="medium">Días de préstamo:</Typography>
                                        <Typography variant="body2" fontWeight="bold" color="#8B0000">
                                            {rentalDays} día{rentalDays !== 1 ? 's' : ''}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                        <Typography variant="body2" fontWeight="medium">Disponibilidad después:</Typography>
                                        <Typography variant="body2" fontWeight="bold" color={equipment.quantity - quantity > 0 ? 'success.main' : 'warning.main'}>
                                            {equipment.quantity - quantity} disponible{equipment.quantity - quantity !== 1 ? 's' : ''}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" fontWeight="medium">Estado:</Typography>
                                        <Chip
                                            label="Listo para reservar"
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Box>
                                </SummaryBox>

                                {/* Política de préstamo */}
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        📝 Política de Préstamo
                                    </Typography>
                                    <Box sx={{ pl: 1 }}>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            • 🎓 Servicio exclusivo para estudiantes universitarios
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            • 📅 Equipo con múltiples unidades: <strong>7 días</strong> de préstamo
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                            • ⏰ Última unidad disponible: <strong>1 día</strong> de préstamo
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            • 🆔 Presentar credencial al recoger el equipo
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Botón fijo en la parte inferior */}
                    <Box sx={{
                        p: 3,
                        borderTop: '1px solid #e0e0e0',
                        backgroundColor: 'white',
                        position: 'sticky',
                        bottom: 0
                    }}>
                        <DoradoButton
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<AddShoppingCart />}
                            onClick={handleAddToCart}
                            disabled={equipment.quantity === 0 || addedToCart}
                            sx={{
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            {addedToCart ? '✓ Añadido al Carrito' : `Añadir ${quantity} al Carrito`}
                        </DoradoButton>

                        {addedToCart && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                <Typography variant="body2" fontWeight="bold">
                                    {quantity} unidad{quantity !== 1 ? 'es' : ''} añadida{quantity !== 1 ? 's' : ''} al carrito.
                                    Redirigiendo...
                                </Typography>
                            </Alert>
                        )}

                        {equipment.quantity === 0 && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                <Typography variant="body2" fontWeight="bold">
                                    ❌ Este equipo no está disponible actualmente
                                </Typography>
                            </Alert>
                        )}
                    </Box>
                </DialogContent>
            </DetailsContainer>
        </Dialog>
    );
}