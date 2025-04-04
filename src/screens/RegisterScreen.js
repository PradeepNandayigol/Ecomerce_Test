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

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleRegister = async () => {
        if (name && email && password) {
            const userData = { id: 1, name, email, token: "mock_token_12345" };
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            login(userData);
            navigation.replace('Products');
        } else {
            Alert.alert('Registration Error', 'Please fill out all fields.');
        }
    };

    return (
        <View style={styles.gradient}>
            <View style={styles.formContainer}>
                <Text style={styles.registerText}>Register</Text>

                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#A0A3A8"
                    style={[styles.textInput, styles.input]}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#A0A3A8"
                    style={[styles.textInput, styles.input]}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A0A3A8"
                    style={[styles.textInput, styles.input]}
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <TouchableOpacity onPress={handleRegister} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLinkContainer}>
                    <Text style={styles.alreadyText}>Already have an account? </Text>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
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
    registerText: {
        fontFamily: 'Inter-Bold',
        fontWeight: '700',
        fontSize: 29,
        color: '#111827',
        marginBottom: 15,
        textAlign: 'center'
    },
    input: {
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
    loginLinkContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    alreadyText: {
        fontFamily: 'Inter-Medium',
        fontWeight: '500',
        fontSize: 11,
        color: '#6C7278',
    },
    loginText: {
        fontFamily: 'Inter-SemiBold',
        fontWeight: '600',
        fontSize: 11,
        color: '#4D81E7',
    },
});

export default RegisterScreen;
