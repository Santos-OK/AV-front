import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Grid,
  Chip
} from '@mui/material';

export default function Detail() {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setCoin(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error al cargar los datos de la criptomoneda');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!coin) {
    return (
      <Alert severity="warning" sx={{ m: 2 }}>
        No se encontró la criptomoneda
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Box
                component="img"
                src={coin.image?.large}
                alt={coin.name}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid',
                  borderColor: 'primary.main',
                  boxShadow: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  }
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {coin.name}
              </Typography>
              <Chip
                label={coin.symbol?.toUpperCase()}
                color="primary"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información General
            </Typography>
            <Typography variant="body1">
              <strong>Precio actual:</strong> ${coin.market_data?.current_price?.usd?.toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Capitalización de mercado:</strong> ${coin.market_data?.market_cap?.usd?.toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Volumen 24h:</strong> ${coin.market_data?.total_volume?.usd?.toLocaleString()}
            </Typography>
          </Box>

          {coin.description?.en && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: coin.description.en }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}