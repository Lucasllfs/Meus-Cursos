import React from 'react';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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

        goToViewCourse(itemId);
      };


      const goToViewCourse = (itemId) => {
        navigation.navigate('ViewCourse', {
            itemId: itemId,
            otherParam: '',
          })
      }

    return (
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
        <View style={styles.container}>
    
          <Text>
            Editar Curso
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

        <Image source={{ uri: imagem}} style={{ width: 350, height: 175 }} />


          <TouchableOpacity onPress={() => pickImage()}>
            <Text>Trocar Imagem</Text>
          </TouchableOpacity>

           
    
          </View>
            
          <TouchableOpacity onPress={() => updateUser()} style={styles.shortBtn}>
            <Text style ={{ color: '#FFF', fontWeight: '900', fontSize: 18}} > Atualizar </Text>
          </TouchableOpacity>
    
        </View>
        </ScrollView>
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