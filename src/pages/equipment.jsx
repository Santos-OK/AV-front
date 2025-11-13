import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    TextField,
    Button,
    InputAdornment,
    styled
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
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

const SearchContainer = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    padding: theme.spacing(3),
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: theme.spacing(3),
}));

const CategoryButton = styled(Button)(({ theme, selected }) => ({
    border: '2px solid',
    borderColor: selected ? '#D4AF37' : '#e0e0e0',
    backgroundColor: selected ? '#D4AF37' : 'transparent',
    color: selected ? 'white' : '#666666',
    fontWeight: selected ? 'bold' : 'normal',
    borderRadius: '20px',
    padding: '6px 16px',
    textTransform: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
        borderColor: '#D4AF37',
        backgroundColor: selected ? '#B8860B' : 'rgba(212, 175, 55, 0.1)',
        color: selected ? 'white' : '#D4AF37',
    },
}));

const CategoryFilter = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
}));

const ActiveFilters = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
}));

export default function Equipment() {
    const { state } = useEquipment();
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Obtener categorías únicas del equipo
    const categories = [...new Set(state.equipment.map(item => item.category))];

    // Filtrar equipo basado en búsqueda y categorías seleccionadas
    const filteredEquipment = state.equipment.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.includes(item.category);

        return matchesSearch && matchesCategory;
    });

    const handleCardClick = (equipment) => {
        setSelectedEquipment(equipment);
        setDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailsOpen(false);
        setSelectedEquipment(null);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleClearAll = () => {
        setSearchTerm('');
        setSelectedCategories([]);
    };

    const hasActiveFilters = searchTerm !== '' || selectedCategories.length > 0;

    // Estadísticas
    const totalEquipment = state.equipment.length;
    const showingCount = filteredEquipment.length;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom color="#8B0000" fontWeight="bold">
                Equipo Disponible
            </Typography>

            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                Haz clic en cualquier equipo para ver detalles y reservar
            </Typography>

            {/* Sección de Búsqueda y Filtros */}
            <SearchContainer>
                
                {/* Barra de búsqueda */}
                <TextField
                    placeholder="Buscar equipo por nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <Clear 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSearchTerm('')}
                                    color="action"
                                />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Filtros por categoría */}
                <Box sx={{ mt: 2 }}>
                    
                    <CategoryFilter>
                        {categories.map(category => (
                            <CategoryButton
                                key={category}
                                selected={selectedCategories.includes(category)}
                                onClick={() => handleCategoryToggle(category)}
                                size="small"
                            >
                                {category}
                            </CategoryButton>
                        ))}
                    </CategoryFilter>
                </Box>

                {/* Filtros activos */}
                {hasActiveFilters && (
                    <ActiveFilters>
                        <Typography variant="body2" color="textSecondary">
                            Filtros activos:
                        </Typography>
                        {searchTerm && (
                            <Chip
                                label={`Busqueda: "${searchTerm}"`}
                                onDelete={() => setSearchTerm('')}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                        {selectedCategories.map(category => (
                            <Chip
                                key={category}
                                label={category}
                                onDelete={() => handleCategoryToggle(category)}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                        <Button
                            startIcon={<Clear />}
                            onClick={handleClearAll}
                            size="small"
                            color="primary"
                            variant="text"
                        >
                            Limpiar todos los filtros
                        </Button>
                    </ActiveFilters>
                )}
                
            </SearchContainer>

            {/* Resultados de la búsqueda */}
            {filteredEquipment.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                        🔍 No se encontraron equipos
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        {hasActiveFilters 
                            ? "Intenta ajustar tus filtros de búsqueda"
                            : "No hay equipos disponibles en este momento"
                        }
                    </Typography>
                    {hasActiveFilters && (
                        <Button
                            variant="contained"
                            onClick={handleClearAll}
                            startIcon={<Clear />}
                            sx={{
                                backgroundColor: '#D4AF37',
                                '&:hover': { backgroundColor: '#B8860B' }
                            }}
                        >
                            Limpiar todos los filtros
                        </Button>
                    )}
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredEquipment.map((item) => (
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
            )}

            {/* Dialog de detalles */}
            <EquipmentDetails
                open={detailsOpen}
                onClose={handleCloseDetails}
                equipment={selectedEquipment}
            />
        </Box>
    );
}