import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Section from '../components/Section'; 
import firestore from '@react-native-firebase/firestore';
import Banner from '../components/Banner';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState([]);
  const [otherService, setOtherService] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Service')
      .onSnapshot(
        querySnapshot => {
          if (querySnapshot && !querySnapshot.empty) {
            const services = [];
            querySnapshot.forEach(documentSnapshot => {
              services.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setService(services);
          } else {
            console.log('No services found');
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

  useEffect(() => {
    const subscriber = firestore()
      .collection('Service_other')
      .onSnapshot(
        querySnapshot => {
          if (querySnapshot && !querySnapshot.empty) {
            const otherServices = [];
            querySnapshot.forEach(documentSnapshot => {
              otherServices.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setOtherService(otherServices);
          } else {
            console.log('No other services found');
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

  const handleView = (item) => {
    console.log("Chi tiết dịch vụ:", item);
    // Điều hướng đến màn hình chi tiết
    navigation.navigate('ChiTietScreen', { service: item });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const banners = [
    { uri_img: 'https://tuarts.net/wp-content/uploads/2023/04/z4433742577127_a9da908458c1816ca936635381aa4f3b.jpg' },
    { uri_img: 'https://tuarts.net/wp-content/uploads/2020/08/Super-combo-banner-web.jpg' },
    { uri_img: 'https://dichvucuoihoi.vn/wp-content/uploads/2021/10/Banner-Trang-Tri-Gia-Tien-3200x1800-1-scaled.jpg' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name='align-justify' size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name='user' size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Section title="ƯU ĐÃI" style={{ backgroundColor: '#F5F5F5' }}>
          <Banner banners={banners} />
        </Section>

        <Section title="DỊCH VỤ CHỤP ẢNH" style={{ backgroundColor: '#F5F5F5' }}>
          {service.length > 0 ? (
            <FlatList
              data={service}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.servicePrice}>{item.price} VND</Text>
                  <TouchableOpacity style={styles.detailButton} onPress={() => handleView(item)}>
                    <Text style={styles.detailButtonText}>Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.key}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          ) : (
            <Text>No services available.</Text>
          )}
        </Section>

        <Section title="DỊCH VỤ KHÁC" style={{ backgroundColor: '#F5F5F5' }}>
          {otherService.length > 0 ? (
            <FlatList
              data={otherService}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.servicePrice}>{item.price} VND</Text>
                  <TouchableOpacity style={styles.detailButton} onPress={() => handleView(item)}>
                    <Text style={styles.detailButtonText}>Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.key}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
            />
          ) : (
            <Text>No other services available.</Text>
          )}
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#000000',
  },
  servicePrice: {
    fontSize: 14,
    color: '#FF0505',
  },
  detailButtonText: {
    color: '#5314E6',
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default HomeScreen;
