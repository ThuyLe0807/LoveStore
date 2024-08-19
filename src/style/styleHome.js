import { StyleSheet } from 'react-native';

const styleHome = StyleSheet.create({
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
  export default styleHome;
