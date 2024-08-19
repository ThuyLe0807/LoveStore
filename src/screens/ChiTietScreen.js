import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ChiTietScreen = ({ route }) => {
    const { service } = route.params;  // Nhận dữ liệu service từ route
    const navigation = useNavigation();  // Lấy navigation để điều hướng

    const handleBack = () => {
        navigation.goBack();  // Quay lại màn hình trước đó
    };

    const handleConfirmRental = () => {
        // Chuyển sang màn hình AddBillScreen và truyền dữ liệu service
        navigation.navigate('AddBillScreen', { service });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={{ uri: service.image }} style={styles.detailImage} />

                <View style={styles.item}>
                    <Text style={styles.detailName}>{service.name}</Text>
                    <Text style={styles.infoHeader}>Thông tin</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.priceLabel}>Giá</Text>
                        <Text style={styles.detailPrice}>{service.price} VND</Text>
                    </View>
                    <Text style={styles.detailStatus}>{service.status}</Text>
                </View>
                <View>
                    <Text style={styles.descriptionHeader}>Mô tả:</Text>
                    <Text style={styles.detailDescription}>{service.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
                    <Icon name='chevron-left' size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleConfirmRental}>
                <Text style={styles.buttonText}>Xác nhận thuê</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        padding: 20,
    },
    detailImage: {
        width: '100%',
        height: 800,
        borderRadius: 10,
        marginBottom: 10,
    },
    item: {
        marginTop: -130,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 10,
    },
    detailName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#000',
    },
    infoHeader: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceLabel: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 5,
    },
    detailPrice: {
        fontSize: 18,
        color: '#FF0505',
        marginBottom: 10,
    },
    detailStatus: {
        fontSize: 18,
        color: '#467DCF',
        marginBottom: 10,
    },
    descriptionHeader: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    detailDescription: {
        fontSize: 16,
        color: '#333',
    },
    header: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    iconButton: {
        padding: 10,
    },
    button: {
        backgroundColor: '#F98686',
        borderRadius: 10,
        padding: 15,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChiTietScreen;
