import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Alert 
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.email === email && password === "123456") {
                login(userData);
                navigation.replace('Products');
            } else {
                Alert.alert('Login Failed', 'Invalid email or password.');
            }
        } else {
            Alert.alert('Login Failed', 'No registered user found.');
        }
    };

    return (
        <View style={styles.gradient}>
            <View style={styles.formContainer}>
                <Text style={styles.loginText}>Login</Text>
                
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#A0A3A8"
                    style={[styles.textInput, styles.phoneInputContainer]}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A0A3A8"
                    style={[styles.textInput, styles.phoneInputContainer]}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                
                <TouchableOpacity onPress={handleLogin} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.registerTextContainer}>
                    <Text style={styles.noAccountText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',      
        paddingHorizontal: 18,
        backgroundColor: '#F5F7FA'
    },
    formContainer: {
        width: '90%', 
        backgroundColor: '#FFFFFF',
        borderRadius: 11,
        padding: 20,
        alignItems: 'center', 
        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    loginText: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
        fontSize: 29,
        color: '#111827',
        marginBottom: 15,
        textAlign: 'center'
    },
    registerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    noAccountText: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: 11,
        color: '#6C7278',
    },
    registerText: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
        fontSize: 11,
        color: '#4D81E7',
    },
    phoneInputContainer: {
        width: '100%',
        height: 57,
        borderWidth: 1,
        borderColor: '#EDF1F3',
        borderRadius: 10,
        marginBottom: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    textInput: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: '#1A1C1E',
        height: 55,
    },
    submitButton: {
        width: '100%',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1D61E7',
        paddingVertical: 17,
        marginTop: 10,
        shadowColor: '#0056b3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    submitButtonText: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: 14,
        color: '#FFFFFF',
    },
});

export default LoginScreen;
