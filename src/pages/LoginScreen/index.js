import React, { useState, useEffect } from 'react';
import { FlatList,Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

import bcrypt from 'bcryptjs';
import { firebaseConfig } from '../../../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail} from 'firebase/auth';
import { initializeApp } from 'firebase/app'



export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const handleCreateAccount = () => {

        
        

        createUserWithEmailAndPassword(auth, email, passWord)
        
        .then( (userCredential) => {
            userCredential.sendSignInLinkToEmail({
                handleCodeInApp: true,
                uri: 'https://meus-cursos-52eca.firebaseapp.com'
            })
            .then (() => {
                Alert.alert('email enviado')
            })
            .catch(error => {
                console.log('Erro send email:')
                Alert.alert(error.message)
            })
            console.log('conta criada!!')
            const user = userCredential.user
            console.log('User: ', user)
                    
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
                onChangeText={(texto) => setPassWord(texto)}
                value={passWord}
                placeholder="Senha"
            />
            </View>

            <View style={styles.bottom}> 
                <TouchableOpacity 
                    style={styles.buttomSignIn}
                    onPress={handleSignIn}>
                    <Text style={styles.EnterText}>
                    Entrar
                    </Text>
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
    headerText:{
        fontSize: 34,
        fontWeight: 800,
        alignSelf: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 20
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