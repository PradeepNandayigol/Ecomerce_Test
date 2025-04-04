import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;