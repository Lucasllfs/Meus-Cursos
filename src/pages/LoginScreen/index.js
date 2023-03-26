import React, { useState } from 'react';
import { Text, View,Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { firebaseConfig } from '../../../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app'

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, passWord)
        .then( (userCredential) => {
            console.log('conta criada!!')
            const user = userCredential.user
            console.log('User: ', user)
            Alert.alert('Conta Criada!')    
        })
        .catch(error => {
            console.log('erro fora')
            Alert.alert(error.message)
        })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, passWord)
        .then( (userCredential) => {
            console.log('SignIn!!')
            const user = userCredential.user;
            console.log('User: ', user)
            GotoHome();
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    }

    const GotoHome = () => {
        navigation.navigate('Home')
    }

    return (
    
        <View style={styles.container}>

            <View style={styles.back}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1604077350837-c7f82f28653f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' }} style={styles.image} />
            </View>

            <Text style={styles.headerText}>
                Bem Vindo
            </Text>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    onChangeText={(texto) => setEmail(texto)}
                    value={email}
                    placeholder="E-mail"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(texto) => setPassWord(texto)}
                    value={passWord}
                    placeholder="Senha"
                />
            </View>

            <View style={styles.bottom}>

                <TouchableOpacity 
                    style={styles.buttomSignIn}
                    onPress={handleSignIn}>
                    <Text style={styles.EnterText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => handleCreateAccount()}>
                    <Text style={styles.createText}>
                        Criar uma conta
                    </Text>
                </TouchableOpacity>

            </View> 

        </View>
    );



}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back:{
        position: 'absolute',
        backgroundColor: '#FC2947',
        height: '50%',
        zIndex: -5,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        width: '100%',
        top: 0
    },
    image:{
        height: '100%',
        width: '100%',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    }, 
    headerText:{
        fontSize: 40,
        fontWeight: 900,
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 20,
        color: '#fff'
    },
    card:{
        height:200,
        width: '90%',
        paddingVertical:5,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
    },
    input:{
        height: 55,
        width: '90%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#F2F2F2",
        marginVertical: '5%',
        fontSize:20,  
    },
    bottom:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttomSignIn:{
        backgroundColor: '#FC2947',
        borderRadius: 25,
        height: 50,
        width: '50%',
        marginTop: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    EnterText:{
        color: '#FFF', 
        fontWeight: '900', 
        fontSize: 18
    },
    createText:{
        color: '#FC2947',
        fontWeight: '500', 
        fontSize: 16,
        padding: 16
    }
});