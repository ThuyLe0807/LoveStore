import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../style/styleLogin';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        // Optional: Perform any setup if needed
        setLoading(false);
    }, []);

    const toggleSecureText = () => {
        setSecureText(!secureText);
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const goToForgotPassword = () => {
        navigation.navigate('ForgotPassScreen');
    };

    const handleLogin = async () => {
        try {
            // Đăng nhập với Firebase Authentication
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            console.log('User signed in:', userCredential.user);

            // Kiểm tra thông tin nhân viên trong Firestore
            const currentUserEmail = userCredential.user.email;
            const staffQuery = await firestore()
                .collection('Staff')
                .where('email', '==', currentUserEmail)
                .get();

            if (!staffQuery.empty) {
                // Nếu có nhân viên với email này
                const staffMember = staffQuery.docs[0].data();
                console.log('Staff details:', staffMember);

                // Điều hướng đến màn hình chính
                navigation.navigate('HomeScreen');
            } else {
                // Nhân viên không được tìm thấy
                console.log('Staff not found');
                alert('Nhân viên không được tìm thấy trong hệ thống.');
            }
        } catch (error) {
            // Xử lý lỗi đăng nhập
            console.error('Error signing in:', error.message);
            alert('Đăng nhập không thành công. Vui lòng kiểm tra email và mật khẩu.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../assets/img/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.text}>Đăng nhập để tiếp tục</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder='Email'
                        style={styles.textInput}
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                    <Text style={styles.label}>Mật khẩu</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Mật khẩu'
                            style={styles.textInputPassword}
                            secureTextEntry={secureText}
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassWord}
                        />
                        <TouchableOpacity onPress={toggleSecureText} style={styles.iconContainer}>
                            <Icon name={secureText ? 'eye-slash' : 'eye'} size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.optionsContainer}>
                    <CheckBox
                        checked={isChecked}
                        onPress={toggleCheckbox}
                        iconType="material-community"
                        checkedIcon="checkbox-outline"
                        uncheckedIcon="checkbox-blank-outline"
                        title="Lưu mật khẩu"
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0, padding: 0 }}
                        textStyle={{ color: '#333', fontSize: 14 }} />
                    <TouchableOpacity onPress={goToForgotPassword}>
                        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
