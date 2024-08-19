// styles.js
import { StyleSheet } from 'react-native';

const styleLogin = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    text: {
        fontSize: 25,
        color: '#000',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        alignItems: 'flex-start',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
    },
    textInputPassword: {
        flex: 1,
        padding: 10,
        color: '#333',
    },
    iconContainer: {
        padding: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: 'blue',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    button: {
        backgroundColor: '#F98686',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
        borderColor: '#fff',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styleLogin;
