import React, { useEffect } from 'react';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

export default function EditCourse({ route, navigation }) {

    const { itemId } = route.params;

    const [inputCourseId, setInputCourseId] = useState(itemId.course_id);
    const [nome, setNome] = useState(itemId.course_name);
    const [professor, setProfessor] = useState(itemId.course_teacher)
    const [categoria, setCategoria] = useState(itemId.course_category)
    const [descricao, setDescricao] = useState(itemId.course_description)
    const [imagem, setImagem] = useState(itemId.course_image)

    const pickImage = async () => {
      console.log("pickimage")
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 2],
        quality: 1,
      });
    
      
        setImagem(result.assets[0].uri);
        console.log('IMG:', imagem)
      
    };


  
      let updateUser = () => {
        console.log('ID:', inputCourseId);

        if (!inputCourseId) {
          alert('Por Favor informe o Código!');
          return;
        }
        if (!nome) {
          alert('Por favor informe o Nome !');
          return;
        }
        if (!professor) {
          alert('Por Favor informe o pro !');
          return;
        }
        if (!categoria) {
          alert('Por Favor informe o cat !');
          return;
        }
        if (!descricao) {
            alert('Por Favor informe o des !');
            return;
        }
        if (!imagem) {
            alert('Por Favor informe o img !');
            return;
        }
    
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE table_course set course_name=?, course_teacher=? , course_category=?, course_description=?, course_image=?  where course_id=?',
            [nome, professor, categoria, descricao, imagem, inputCourseId],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                
              } else alert('Erro ao atualizar o usuário');
            }
          );
        });

        goToHome(itemId);
      };


      const goToHome = () => {
        navigation.navigate('Home')
      }

    return (
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         
        <View style={styles.container}>
        <Image source={{ uri: imagem}} style={styles.image} />
          <Text style={styles.headerText}>
            Editar Curso
          </Text>
    
          <View style={styles.inputsCard}>

            <Text style={styles.inputText}>Nome</Text>
            <TextInput style={styles.Input}
              onChangeText={(texto) => setNome(texto)}
              value={nome}
              placeholder="Nome"
            />

            <Text style={styles.inputText}>Professor responsável</Text>
            <TextInput style={styles.Input}
              onChangeText={(texto) => setProfessor(texto)}
              value={professor}
              placeholder="Professor resposável"
            />

            <Text style={styles.inputText}>Categoria</Text>
            <TextInput style={styles.Input}
              onChangeText={(texto) => setCategoria(texto)}
              value={categoria}
              placeholder="Categoria"
            />
    
    <Text style={styles.inputText}>Descrição</Text>

            <TextInput style={styles.Input}
              onChangeText={(texto) => setDescricao(texto)}
              value={descricao}
              placeholder="Descrição"
            />

        <Image source={{ uri: imagem}} style={styles.image} />


          <TouchableOpacity 
          style={styles.changeImageButtom}
          onPress={() => pickImage()}>
            <MaterialCommunityIcons name="image-edit" size={30} color="#9E9E9E" />
          </TouchableOpacity>

           
    
          </View>
            
          <TouchableOpacity onPress={() => updateUser()} style={styles.shortBtn}>
            <Text style ={{ color: '#FFF', fontWeight: '900', fontSize: 18}} > Atualizar </Text>
          </TouchableOpacity>
    
        </View>
        
      </TouchableWithoutFeedback>
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
          paddingTop: '10%',
          paddingBottom: 10
        },

        inputsCard:{
          width: '90%',
          height: '72%',
          paddingVertical:5,
          alignItems: 'center',
          justifyContent:'center',
          backgroundColor: '#FFF',
          borderRadius: 20,
          
        },  
        inputText:{
          alignSelf: 'flex-start',
          paddingHorizontal: 20,
          paddingVertical: 8,
          color: '#9E9E9E'
        },
        Input:{
          height: '8%',
          width: '90%',
          borderRadius: 10,
          padding: 10,
          backgroundColor: "#F2F2F2",
          marginBottom: '3%',
          fontSize:20,  
        },
        image:{
          width: '90%', 
          height: '20%',
          borderRadius: 10,
          
        },
        changeImageButtom:{
          backgroundColor: '#F2F2F2',
          height: '7%',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 28,
          marginTop: '2%',
          marginBottom: '3%'
        },
        shortBtn:{
          flexDirection: 'row',
          backgroundColor: '#FC2947',
          borderRadius: 50,
          height: '6%',
          width: '40%',
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5%'
        },
      
      
      });