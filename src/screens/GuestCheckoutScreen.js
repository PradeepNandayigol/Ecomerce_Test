import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

const GuestCheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guest Checkout</Text>
      <Text style={styles.total}>Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</Text>

      <TouchableOpacity 
        style={styles.completePurchaseButton} 
        onPress={() => { 
          clearCart(); 
          navigation.navigate('Products'); 
        }}
      >
        <Text style={styles.completePurchaseText}>Complete Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  total: {
    fontSize: 18,
    marginBottom: 20,
    color: '#1D61E7',
  },
  completePurchaseButton: {
    backgroundColor: '#FF9900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  completePurchaseText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GuestCheckoutScreen;
