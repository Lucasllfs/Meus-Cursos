import React, { useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

export default function ViewCourse( { route, navigation } ) {

    const { itemId } = route.params;
    console.log('ITEMID:', itemId)

    const [courseId, setCourseId] = useState(itemId.course_id)
    const [disable, setDisable] = useState('false')

    let enableUser = () => {
  
      db.transaction((tx) => {
        console.log('entrou e courseid:', courseId)
        tx.executeSql(
          'UPDATE table_course set course_enable=? where course_id=?',
          [disable, courseId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              alert(
                'Sucesso',
                'Usuário atualizado com sucesso !!',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('HomeScreen'),
                  },
                ],
                { cancelable: false }
              );
            } else alert('Erro ao atualizar o usuário');
          }
        );
      });
    };


  const GoToEdit = () => {
    navigation.navigate('EditCourse', {
      itemId: itemId
    })
  }

    

 return (
    <SafeAreaView style={{ flex: 1 }}>

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10
          }}>
          <Text>Código : {itemId.course_id}</Text>
          <Text>Nome : {itemId.course_name}</Text>
          <Text>Telefone : {itemId.course_teacher}</Text>
          <Text>Endereço : {itemId.course_category}</Text>
          <Text>Endereço : {itemId.course_description}</Text>
          <Image source={{ uri: itemId.course_image}} style={{ width: 350, height: 175 }} />

        </View>

        <TouchableOpacity style={styles.editButton} onPress ={() => GoToEdit()}>
          <Text>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress ={() => enableUser()}>
          <Text>Desativar</Text>
        </TouchableOpacity>
    
    </View>
  </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: "red",
    width: 50,
    heightL: 20,
    fontSize: 20,
    fontWeight: '700',
    margin: 10
  },
});