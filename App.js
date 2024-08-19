import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPassScreen from './src/screens/ForgotPassScreen';
import BottomTab from './src/navigation/BottomTab';
import ChiTietScreen from './src/screens/ChiTietScreen';
import AddBillScreen from './src/screens/AddBillScreen';
import { AuthProvider } from './src/context/AuthContext'; // Đảm bảo đường dẫn chính xác
import BillScreen from './src/screens/BillScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='ForgotPassScreen' component={ForgotPassScreen} />
          <Stack.Screen name='HomeScreen' component={BottomTab} />
          <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
          <Stack.Screen name='BillScreen' component={BillScreen} />

          <Stack.Screen name='AddBillScreen' component={AddBillScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
