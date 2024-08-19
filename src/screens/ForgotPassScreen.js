// ForgotPassScreen.js
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ForgotPassScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const back = () => {
    navigation.navigate('LoginScreen'); // Navigate to LoginScreen
  };

  return (
    <View style={styles.container}>
      {/* Nút "Trở về" với icon */}
      <TouchableOpacity 
        onPress={back} 
        style={styles.backButton}
      >
        <Icon name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
        placeholder='Họ và tên'
        style={styles.textInput}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder='Tên đăng nhập'
        style={styles.textInput}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder='Mã nhân viên'
        style={styles.textInput}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder='Số điện thoại'
        style={styles.textInput}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#D9D9D9',
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#F98686',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
