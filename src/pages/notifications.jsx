import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  styled
} from '@mui/material';
import { Notifications as NotificationsIcon, Event, Schedule } from '@mui/icons-material';
import { useEquipment } from '../context/EquipmentContext';

const NotificationCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderLeft: `4px solid #D4AF37`,
}));

export default function Notifications() {
  const { state } = useEquipment();

  if (state.notifications.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No hay notificaciones
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tus reservas confirmadas aparecerán aquí
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="#8B0000" fontWeight="bold">
        Mis Reservas
      </Typography>

      {state.notifications.map((notification) => (
        <NotificationCard key={notification.id}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Reserva Confirmada
              </Typography>
              <Chip
                label="Activa"
                color="success"
                variant="outlined"
                size="small"
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Event sx={{ mr: 1, color: '#8B0000' }} />
                <Typography variant="body2">
                  <strong>Reservado:</strong> {notification.date}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Schedule sx={{ mr: 1, color: '#8B0000' }} />
                <Typography variant="body2">
                  <strong>Retorno:</strong> {notification.returnDate}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Equipo Reservado:
            </Typography>
            {notification.items.map((item, index) => (
              <Typography key={index} variant="body2" color="text.secondary">
                • {item.name} (x{item.quantity}) - {item.rentalDays} días
              </Typography>
            ))}

            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              Total: {notification.totalItems} items
            </Typography>
          </CardContent>
        </NotificationCard>
      ))}
    </Box>
  );
}