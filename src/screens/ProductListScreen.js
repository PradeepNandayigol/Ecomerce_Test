import React, { useEffect, useState, useContext } from 'react';
import { 
    View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, StatusBar 
} from 'react-native';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductListScreen = ({ navigation }) => {
    const { addToCart } = useContext(CartContext); 
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                const uniqueCategories = [...new Set(response.data.map(p => p.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.log(error));
    }, []);

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        setFilteredProducts(category ? products.filter(item => item.category === category) : products);
    };

    const sortProducts = (order) => {
        setSortOrder(order);
        setFilteredProducts([...filteredProducts].sort((a, b) => 
            order === 'asc' ? a.price - b.price : b.price - a.price
        ));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredProducts(products.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        ));
    };

    return (
        <View style={{ flex: 1, marginTop: 50 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
            <TextInput
                style={styles.searchBar}
                placeholder="Search products..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <View style={styles.container}>
                <View style={styles.sidebar}>
                    <ScrollView contentContainerStyle={styles.sidebarContent}>
                        <Text style={styles.sidebarTitle}>Categories</Text>
                        <TouchableOpacity onPress={() => filterByCategory(null)}>
                            <Text style={[styles.categoryItem, !selectedCategory && styles.activeCategory]}>All</Text>
                        </TouchableOpacity>
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index} onPress={() => filterByCategory(category)}>
                                <Text style={[styles.categoryItem, selectedCategory === category && styles.activeCategory]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <Text style={styles.sidebarTitle}>Sort/Price</Text>
                        <TouchableOpacity onPress={() => sortProducts('asc')}>
                            <Text style={[styles.categoryItem, sortOrder === 'asc' && styles.activeCategory]}>Low to High</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sortProducts('desc')}>
                            <Text style={[styles.categoryItem, sortOrder === 'desc' && styles.activeCategory]}>High to Low</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.productListContainer}>
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.productCard}>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate('ProductDetails', { product: item })}
                                >
                                    <Image source={{ uri: item.image }} style={styles.productImage} />
                                    <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.addToCartButton} 
                                    onPress={() => addToCart(item)}
                                >
                                    <Text style={styles.addToCartText}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F5F7FA',
        padding: 10,
        
    },
    sidebar: {
        width: 85,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginRight: 10,
    },
    sidebarContent: {
        alignItems: 'flex-start',
    },
    sidebarTitle: {
        marginTop:10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    categoryItem: {
        fontSize: 14,
        paddingVertical: 6,
        paddingHorizontal: 5,
        color: '#666',
    },
    activeCategory: {
        fontWeight: 'bold',
        color: '#1D61E7',
    },
    productListContainer: {
        flex: 1,
        paddingRight: 3,
    },
    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '47%',
        alignItems: 'center',
        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#111827',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1D61E7',
        marginTop: 5,
    },
    addToCartButton: {
        marginTop: 8,
        backgroundColor: '#1D61E7',
        paddingVertical: 4, 
        paddingHorizontal: 8, 
        borderRadius: 3,
    },
    addToCartText: {
        fontSize: 12, 
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProductListScreen;
