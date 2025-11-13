import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  equipment: [
    {
      id: 1,
      name: 'Cámara Profesional Sony A7III',
      quantity: 5,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Cámaras',
      description: 'Cámara mirrorless full-frame profesional'
    },
    {
      id: 2,
      name: 'Micrófono Rode NT1',
      quantity: 8,
      image: 'https://images.unsplash.com/photo-1531651008558-ed1740375b39?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWljcm9waG9uZXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'Audio',
      description: 'Micrófono de condensador profesional'
    },
    {
      id: 3,
      name: 'Trípode Manfrotto Profesional',
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1551818250-8e0eea8b44d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Accesorios',
      description: 'Trípode profesional para video'
    },
    {
      id: 4,
      name: 'Luz LED Profesional',
      quantity: 6,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Iluminación',
      description: 'Kit de iluminación LED continua'
    },
    {
      id: 5,
      name: 'Grabadora de Audio Zoom H6',
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1601142754139-8872a6cffd2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Audio',
      description: 'Grabadora de audio portátil multipista'
    },
    {
      id: 6,
      name: 'Monitor de Video 7"',
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      category: 'Monitores',
      description: 'Monitor field para monitoreo de video'
    }
  ],
  cart: [], // Carrito vacío por defecto
  notifications: [] // Notificaciones vacías por defecto
};

// Actions
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CONFIRM_RESERVATION: 'CONFIRM_RESERVATION',
  CLEAR_CART: 'CLEAR_CART'
};

// Reducer
const equipmentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      const equipmentItem = state.equipment.find(item => item.id === action.payload);

      if (equipmentItem && equipmentItem.quantity > 0) {
        const existingCartItem = state.cart.find(item => item.id === action.payload);

        // Determinar días automáticamente
        const rentalDays = equipmentItem.quantity === 1 ? 1 : 7;

        // Actualizar equipment (reducir cantidad)
        const updatedEquipment = state.equipment.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        // Actualizar cart
        let updatedCart;
        if (existingCartItem) {
          updatedCart = state.cart.map(item =>
            item.id === action.payload
              ? {
                ...item,
                quantity: item.quantity + 1,
                // Si ya existe, mantener los días originales o actualizar si es necesario
                rentalDays: Math.max(item.rentalDays, rentalDays)
              }
              : item
          );
        } else {
          updatedCart = [...state.cart, {
            ...equipmentItem,
            quantity: 1,
            rentalDays: rentalDays // Días automáticos
          }];
        }

        return {
          ...state,
          equipment: updatedEquipment,
          cart: updatedCart
        };
      }
      return state;

    case ACTIONS.REMOVE_FROM_CART:
      const cartItem = state.cart.find(item => item.id === action.payload);

      if (cartItem) {
        // Devolver la cantidad al equipment
        const updatedEquipment = state.equipment.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        );

        return {
          ...state,
          equipment: updatedEquipment,
          cart: state.cart.filter(item => item.id !== action.payload)
        };
      }
      return state;

    case ACTIONS.UPDATE_QUANTITY:
      // Para actualizar cantidad específica en el carrito
      const { itemId, newQuantity } = action.payload;
      if (newQuantity < 1) return state;

      const cartItemToUpdate = state.cart.find(item => item.id === itemId);
      if (!cartItemToUpdate) return state;

      const quantityDifference = newQuantity - cartItemToUpdate.quantity;

      // Actualizar equipment
      const updatedEquipmentForQuantity = state.equipment.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity - quantityDifference }
          : item
      );

      // Actualizar cart
      const updatedCartForQuantity = state.cart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      );

      return {
        ...state,
        equipment: updatedEquipmentForQuantity,
        cart: updatedCartForQuantity
      };

    case ACTIONS.CONFIRM_RESERVATION:
      if (state.cart.length === 0) return state;

      const reservationDetails = {
        id: Date.now(),
        date: new Date().toLocaleString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        returnDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        items: [...state.cart],
        totalItems: state.cart.reduce((sum, item) => sum + item.quantity, 0),
        status: 'active'
      };

      return {
        ...state,
        cart: [], // Limpiar carrito
        notifications: [reservationDetails, ...state.notifications]
      };

    case ACTIONS.CLEAR_CART:
      // Devolver todo el equipo al inventario
      const restoredEquipment = state.equipment.map(equipItem => {
        const cartItem = state.cart.find(cart => cart.id === equipItem.id);
        if (cartItem) {
          return { ...equipItem, quantity: equipItem.quantity + cartItem.quantity };
        }
        return equipItem;
      });

      return {
        ...state,
        equipment: restoredEquipment,
        cart: []
      };

    default:
      return state;
  }
};

// Crear contexto
const EquipmentContext = createContext();

// Provider
export const EquipmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(equipmentReducer, initialState);

  const actions = {
    addToCart: (id) => dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: id
    }),
    removeFromCart: (id) => dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: id
    }),
    updateQuantity: (itemId, newQuantity) => dispatch({
      type: ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, newQuantity }
    }),
    confirmReservation: () => dispatch({
      type: ACTIONS.CONFIRM_RESERVATION
    }),
    clearCart: () => dispatch({
      type: ACTIONS.CLEAR_CART
    })
  };

  return (
    <EquipmentContext.Provider value={{ state, actions }}>
      {children}
    </EquipmentContext.Provider>
  );
};

// Hook personalizado
export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipment debe usarse dentro de EquipmentProvider');
  }
  return context;
};