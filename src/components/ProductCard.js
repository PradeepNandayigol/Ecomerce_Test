import React, { useContext } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <View style={{ margin: 10, borderWidth: 1, padding: 10 }}>
      <Image source={{ uri: product.image }} style={{ height: 100, width: 100 }} />
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );
};

export default ProductCard;