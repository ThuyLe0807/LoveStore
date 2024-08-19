import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Section from '../components/Section';
import { useAuth } from '../context/AuthContext';

const AddBillScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { loggedInUserId } = useAuth();

    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [loggedInStaff, setLoggedInStaff] = useState(null);
    const [fullnameCustomer, setFullnameCustomer] = useState('');
    const [phoneCustomer, setPhoneCustomer] = useState('');
    const [addressCustomer, setAddressCustomer] = useState('');
    const [loading, setLoading] = useState(true);

    const { service } = route.params;

    // Fetch logged-in staff
    useEffect(() => {
        const fetchLoggedInStaff = async () => {
            try {
                const staffDoc = await firestore().collection('Staff').doc(loggedInUserId).get();
                if (staffDoc.exists) {
                    setLoggedInStaff({ ...staffDoc.data(), id: staffDoc.id });
                }
            } catch (error) {
                console.log('Error fetching logged-in staff: ', error);
            }
        };

        if (loggedInUserId) {
            fetchLoggedInStaff();
        }
    }, [loggedInUserId]);

    // Fetch all staff
    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffSnapshot = await firestore().collection('Staff').get();
                const staffList = staffSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setStaffs(staffList);
            } catch (error) {
                console.log('Error fetching staffs: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleConfirm = async () => {
        if (!selectedStaff || !fullnameCustomer || !phoneCustomer || !addressCustomer) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (selectedStaff.fullname !== loggedInStaff?.fullname) {
            Alert.alert('Lỗi', 'Tên nhân viên không trùng khớp với tên đăng nhập.');
            return;
        }

        try {
            await firestore().collection('Bill').add({
                customerName: fullnameCustomer,
                customerPhone: phoneCustomer,
                customerAddress: addressCustomer,
                staff: selectedStaff.fullname,
                serviceName: service.name,
                servicePrice: service.price,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert('Thành công', 'Hóa đơn đã được lưu.');
            navigation.goBack();
        } catch (error) {
            console.log('Error adding bill: ', error);
            Alert.alert('Lỗi', 'Không thể lưu hóa đơn. Vui lòng thử lại.');
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={handleBack} accessibilityLabel="Quay lại">
                    <Icon name="chevron-left" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Xác Nhận Hóa Đơn</Text>
            </View>
            <View style={styles.content}>
                <Section title="Nhân Viên">
                    {staffs.map((staff) => (
                        <TouchableOpacity
                            key={staff.fullname}
                            onPress={() => setSelectedStaff(staff)}
                            accessibilityLabel={`Chọn nhân viên ${staff.fullname}`}
                        >
                            <Text
                                style={[
                                    styles.itemName,
                                    { backgroundColor: selectedStaff?.fullname === staff.fullname ? '#e0f7fa' : '#fff' }
                                ]}
                            >
                                {staff.fullname}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Section>
                <Section title="Khách Hàng">
                    <TextInput
                        style={styles.input}
                        value={fullnameCustomer}
                        onChangeText={setFullnameCustomer}
                        placeholder="Nhập tên khách hàng"
                        accessibilityLabel="Tên khách hàng"
                    />
                    <TextInput
                        style={styles.input}
                        value={phoneCustomer}
                        onChangeText={setPhoneCustomer}
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                        accessibilityLabel="Số điện thoại khách hàng"
                    />
                    <TextInput
                        style={styles.input}
                        value={addressCustomer}
                        onChangeText={setAddressCustomer}
                        placeholder="Nhập địa chỉ"
                        accessibilityLabel="Địa chỉ khách hàng"
                    />
                </Section>
                <Section title="Dịch Vụ">
                    <TextInput
                        style={styles.input}
                        value={service.name}
                        editable={false}
                        accessibilityLabel="Tên dịch vụ"
                    />
                    <TextInput
                        style={styles.input}
                        value={`${service.price} VND`}
                        editable={false}
                        accessibilityLabel="Giá dịch vụ"
                    />
                </Section>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} accessibilityLabel="Xác nhận hóa đơn">
                    <Text style={styles.confirmButtonText}>Xác Nhận</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    iconButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 15,
    },
    content: {
        flex: 1,
        padding: 15,
    },
    input: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 10,
        width: '100%',
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#f8f8f8',
    },
    confirmButton: {
        backgroundColor: '#F98686',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    itemName: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: '#000',
    },
});

export default AddBillScreen;
