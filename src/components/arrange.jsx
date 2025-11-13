import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const drawerWidth = 240;

export default function Arrange({ onSortChange, onLimitChange, sortOrder, limit }) {
  const handleSortClick = (order) => {
    if (onSortChange) {
      onSortChange(order);
    }
  };

  const handleLimitInputChange = (event) => {
    const value = event.target.value;
    const numericValue = value ? parseInt(value) : null;
    if (onLimitChange) {
      onLimitChange(numericValue);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'fixed',
            right: 0,
            top: 64, // Debajo del AppBar
            height: 'calc(100% - 64px)',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <List>
          {/* Ascending */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => handleSortClick('ascending')}
              selected={sortOrder === 'ascending'}
            >
              <ListItemIcon>
                <ArrowUpwardIcon />
              </ListItemIcon>
              <ListItemText primary="Ascending" />
            </ListItemButton>
          </ListItem>

          {/* Descending */}
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => handleSortClick('descending')}
              selected={sortOrder === 'descending'}
            >
              <ListItemIcon>
                <ArrowDownwardIcon />
              </ListItemIcon>
              <ListItemText primary="Descending" />
            </ListItemButton>
          </ListItem>
        </List>
        
        <Divider />
        
        {/* Limit to section */}
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Limit to
          </Typography>
          <TextField
            type="number"
            value={limit || ''}
            onChange={handleLimitInputChange}
            placeholder="Enter number"
            size="small"
            fullWidth
            inputProps={{ 
              min: 1,
              style: { textAlign: 'center' }
            }}
          />
        </Box>
        <Divider />
      </Drawer>
    </Box>
  );
}