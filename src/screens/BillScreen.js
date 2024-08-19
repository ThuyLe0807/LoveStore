import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Section from '../components/Section';
import { useAuth } from '../context/AuthContext';

const BillScreen = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Bill')
      .onSnapshot(
        querySnapshot => {
          if (querySnapshot && !querySnapshot.empty) {
            const fetchedBills = [];
            querySnapshot.forEach(documentSnapshot => {
              fetchedBills.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setBills(fetchedBills);
          } else {
            console.log('No bills found');
          }
          setLoading(false);
        },
        error => {
          console.log('Error fetching data: ', error);
          setLoading(false);
        }
      );

    return () => subscriber();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleBack} accessibilityLabel="Quay lại">
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hóa Đơn</Text>
      </View>
      <View style={styles.content}>
        {bills.map((item, index) => (
          <View key={item.key} style={styles.billItem}>
            <Text style={styles.fullname}>Tên nhân viên: {item.fullname}</Text>
            <Text style={styles.fullnameCustomer}>Tên khách hàng: {item.fullnameCustomer}</Text>
            <Text style={styles.phoneCustomer}>Số điện thoại: {item.phoneCustomer}</Text>
            <Text style={styles.addressCustomer}>Địa chỉ: {item.addressCustomer}</Text>
            <Text style={styles.status}>Trạng thái: {item.status}</Text>
            <Text style={styles.servicePrice}>Giá dịch vụ: {item.servicePrice}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  billItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fullname: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullnameCustomer: {
    fontSize: 16,
    marginTop: 5,
  },
  phoneCustomer: {
    fontSize: 16,
    marginTop: 5,
  },
  addressCustomer: {
    fontSize: 16,
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 16,
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
