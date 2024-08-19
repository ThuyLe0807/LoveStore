// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import ThongkeScreen from '../screens/ThongkeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import BillScreen from '../screens/BillScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Trang chủ':
              iconName = 'home';
              break;
            case 'Nhiệm vụ':
              iconName = 'tasks';
              break;
            case 'Hóa đơn':
              iconName = 'file';
              break;
            case 'Thống kê':
              iconName = 'bar-chart';
              break;
            default:
              iconName = 'question';  // Icon mặc định nếu không khớp với tên nào
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Đặt headerShown: false cho toàn bộ TabNavigator
        tabBarStyle: {
          backgroundColor: '#F5ACAC', // Màu nền của BottomTab
        },
        tabBarActiveTintColor: '#3b5998', // Màu của icon khi tab được chọn
        tabBarInactiveTintColor: '#8e8e8e', // Màu của icon khi tab không được chọn
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Nhiệm vụ" component={TaskScreen} />
      <Tab.Screen name="Hóa đơn" component={BillScreen} />
      <Tab.Screen name="Thống kê" component={ThongkeScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
