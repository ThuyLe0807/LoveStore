import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/img/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>WELCOME</Text>
      <Text style={styles.sloganText}>LOVE STORE CÂU CHUYỆN CỦA TÌNH YÊU</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#333',
  },
  sloganText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#FD0B0B',
    margin: 40,
  },
});
