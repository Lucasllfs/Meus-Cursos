import React from 'react';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,KeyboardAvoidingView, Keyboard,TouchableWithoutFeedback, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

export default function Add({ navigation }) {

  const [nome, setNome] = useState('');
  const [professor, setProfessor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [imagem, setImagem] = useState(null)

  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });
  
    setImagem(result.assets[0].uri);
    console.log('IMG:', imagem)

  };



let adicionar = () => {

    if (!nome) {
      alert('Por favor preencha o campo: Nome');
      return;
    }
    if (!professor) {
      alert('Por favor preencha o campo: Professor');
      return;
    }
    if (!categoria) {
      alert('Por favor preencha o campo: Categoria');
      return;
    }
    if (!descricao) {
      alert('Por favor preencha o campo: Descrição');
      return;
    }

    db.transaction(function (tx) {
      
      tx.executeSql(
        'INSERT INTO table_course (course_name, course_teacher, course_category, course_description, course_image) VALUES (?,?,?,?,?)',
        [nome, professor, categoria, descricao, imagem],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            console.log('curso adicionado')
            GoToHome();
          } else alert('Erro ao tentar Registrar o Usuário !!!');
        }
      );
    });
  };


  const GoToHome = () => {
    navigation.navigate('Home')
  }

 return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Novo Curso
          </Text>

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

            <TouchableOpacity 
              style={styles.addImage}
              onPress={() => pickImage()}>
              <MaterialIcons name="add-photo-alternate" size={34} {... {color: imagem == null? '#9E9E9E' : '#212121' }} />
            </TouchableOpacity>

          </View>
          
          <TouchableOpacity onPress={() => adicionar()} style={styles.Buttom}>
            <Text style ={{ color: '#FFF', fontWeight: '900', fontSize: 18}} > Adicionar </Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    paddingVertical: 10

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
    marginVertical: '5%',
    fontSize:20,  
  },
  addImage:{
    backgroundColor: '#F2F2F2',
    height: 55,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    marginTop: 20,
    marginBottom: 20
  },
  Buttom:{
    flexDirection: 'row',
    backgroundColor: '#FC2947',
    borderRadius: 25,
    height: 50,
    width: '40%',
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
});