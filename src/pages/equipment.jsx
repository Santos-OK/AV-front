import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    styled
} from '@mui/material';
import { useEquipment } from "../context/EquipmentContext";
import EquipmentDetails from './EquipmentDetails';

const EquipmentCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
    },
}));

const AvailabilityChip = styled(Chip)(({ theme, available }) => ({
    backgroundColor: available ? '#4CAF50' : '#f44336',
    color: 'white',
    fontWeight: 'bold',
}));

export default function Equipment() {
    const { state } = useEquipment();
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleCardClick = (equipment) => {
        console.log('Card clickeada:', equipment);
        setSelectedEquipment(equipment);
        setDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailsOpen(false);
        setSelectedEquipment(null);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom color="#8B0000" fontWeight="bold">
                Equipo Disponible
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                Haz clic en cualquier equipo para ver detalles y reservar
            </Typography>

            <Grid container spacing={3}>
                {state.equipment.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <EquipmentCard onClick={() => handleCardClick(item)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={item.image}
                                alt={item.name}
                                sx={{
                                    objectFit: 'cover',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        filter: 'brightness(1.1)',
                                    }
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                <Chip
                                    label={item.category}
                                    size="small"
                                    sx={{
                                        backgroundColor: '#D4AF37',
                                        color: 'white',
                                        mb: 1,
                                        fontSize: '0.75rem'
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        lineHeight: 1.2,
                                        height: '2.4em',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    {item.name}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                    <AvailabilityChip
                                        available={item.quantity > 0}
                                        label={item.quantity > 0 ? `${item.quantity} disponible${item.quantity !== 1 ? 's' : ''}` : 'Agotado'}
                                        size="small"
                                    />
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ fontSize: '0.75rem' }}
                                    >
                                        {item.quantity === 1 ? '1 día' : '7 días'}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </EquipmentCard>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog de detalles */}
            <EquipmentDetails
                open={detailsOpen}
                onClose={handleCloseDetails}
                equipment={selectedEquipment}
            />
        </Box>
    );
}