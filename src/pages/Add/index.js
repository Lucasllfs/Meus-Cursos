import React from 'react';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,TouchableWithoutFeedback} from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

export default function Add({ navigation }) {

    const [nome, setNome] = useState('');
    const [professor, setProfessor] = useState('')
    const [categoria, setCategoria] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagem, setImagem] = useState('')

    let adicionar = () => {
        console.log(nome, professor, categoria, descricao, imagem);
    
        if (!nome) {
          alert('Por favor preencha o nome !');
          return;
        }
        if (!professor) {
          alert('Por favor preencha o contato');
          return;
        }
        if (!categoria) {
          alert('Por favor preencha o endereço !');
          return;
        }
        if (!descricao) {
            alert('Por favor preencha o contato');
            return;
        }
          if (!imagem) {
            alert('Por favor preencha o endereço !');
            return;
        }
    
        db.transaction(function (tx) {
            console.log('emtro');
          tx.executeSql(
            'INSERT INTO table_course (course_name, course_teacher, course_category, course_description, course_image) VALUES (?,?,?,?,?)',
            [nome, professor, categoria, descricao, imagem],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                alert(
                  'Sucesso',
                  'Usuário Registrado com Sucesso !!!',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Home'),
                    },
                  ],
                  { cancelable: false }
                );
              } else alert('Erro ao tentar Registrar o Usuário !!!');
            }
          );
        });
      };

 return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>

      <Text>
        Cadastrar Curso
      </Text>

      <StatusBar style='light'/>

      <View style={styles.inputsCard}>

        <TextInput style={styles.Input}
          onChangeText={(texto) => setNome(texto)}
          value={nome}
          placeholder="Nome"
        />

        <TextInput style={styles.Input}
          onChangeText={(texto) => setProfessor(texto)}
          value={professor}
          placeholder="Professor resposavel"
        />

        <TextInput style={styles.Input}
          onChangeText={(texto) => setCategoria(texto)}
          value={categoria}
          placeholder="Categoria"
        />

        <TextInput style={styles.Input}
          onChangeText={(texto) => setDescricao(texto)}
          value={descricao}
          placeholder="Descricao"
        />

        <TextInput style={styles.Input}
          onChangeText={(texto) => setImagem(texto)}
          value={imagem}
          placeholder="Imagem"
        />


      </View>
        
      <TouchableOpacity onPress={() => adicionar()} style={styles.shortBtn}>
        <Text style ={{ color: '#FFF', fontWeight: '900', fontSize: 18}} > Adicionar </Text>
      </TouchableOpacity>

    </View>
  </TouchableWithoutFeedback>
  );


}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#181818',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    inputsCard:{
      width: '90%',
      paddingVertical:5,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#FFF',
      borderRadius: 20,
      zIndex: 5
    },  

    Input:{
      height: 55,
      width: '90%',
      borderRadius: 10,
      padding: 10,
      backgroundColor: "#F2F2F2",
      marginVertical: 20,
      fontSize:20,  
    },
    shortBtn:{
      flexDirection: 'row',
      backgroundColor: '#8758FF',
      borderRadius: 25,
      height: 50,
      width: '40%',
      marginTop: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
  
  });