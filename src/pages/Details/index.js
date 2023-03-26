import React, { useState, useEffect} from 'react';
import { View, Text, SafeAreaView, Image,StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

export default function Details( { route, navigation } ) {
  const isFocused = useIsFocused();
    const { itemId } = route.params;
    console.log('ITEMID:', itemId)

    const [courseId, setCourseId] = useState(itemId.course_id)
    const [disable, setDisable] = useState(itemId.course_enable)
    const [enableText, setEnableText] = useState('Ativado')

   

    let enableCourse = () => {
        enableText == 'Ativado'? setEnableText('Desativado') : setEnableText('Ativado')
        disable == 'true'? setDisable('false') : setDisable('true')
      db.transaction((tx) => {
        console.log('entrandoenable: ', disable)
        tx.executeSql(
          'UPDATE table_course set course_enable=? where course_id=?',
          [disable, courseId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('ENABLE',itemId.course_enable)
            } else alert('Erro ao atualizar o usuário');
          }
        );
      });
    };

    let deleteCourse = () => {
      
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  table_course where course_id=?',
          [courseId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('excluido')
            } else {
              alert('Por favor entre com um código de usuário válido !');
            }
          }
        );
        GoToHome()
      });
    };


    const GoToHome = () => {
      navigation.navigate('Home')
    }
  const GoToEdit = () => {
    navigation.navigate('EditCourse', {
      itemId: itemId
    })
  }

    

 return (
    <SafeAreaView style={{ flex: 1 }}>

    <StatusBar barStyle="light-content" />
    
    <View style={{ flex: 1, backgroundColor: 'white' }}>

    <TouchableOpacity 
    onPress ={() => GoToEdit()}
    style={styles.editIcon}>
      <Feather name="edit" size={30} color="white" />
    </TouchableOpacity>

          <Image source={{ uri: itemId.course_image}} style={styles.image} />

          <View style={styles.text} >
            <Text numberOfLines={1} style={styles.title}>{itemId.course_name}</Text>

            <View style={styles.teacherAndCategory}>
              <Text numberOfLines={1} style={styles.teacherName}>{itemId.course_teacher.length > 20 ? `${itemId.course_teacher.slice(0, 20)}...` : itemId.course_teacher}</Text>

              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>Categoria :  {itemId.course_category.length > 10 ? `${itemId.course_category.slice(0, 10)}...` : itemId.course_category}</Text>
              </View>
            </View>

            <View style={styles.desciptionBox}>
              
              <Text style={styles.desciptionText}>{itemId.course_description}</Text>
            </View>
          </View>

        <View style={styles.bottomTools}>

          <TouchableOpacity style={styles.enableButton} onPress ={() => enableCourse()}>
            <Text style={styles.enableText}>{enableText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.delete} onPress ={() => deleteCourse()}>
            <Feather name="trash" size={30} color="black" />
          </TouchableOpacity>
        </View>
    </View>
  </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  page:{
    flex: 1,
  
    
  },
  editIcon:{
    position: 'absolute',
    top: 135,
    right: 8,
    zIndex: 1,
    shadowOpacity: 1.0,
    shadowColor: 'black',
    shadowRadius: 10
  },  
  image:{
  
    width: '100%', 
    height: 175 
  },  
  text:{
    marginHorizontal: 20,
    marginVertical: 24
  },
  title:{
    fontSize: 34,
    fontWeight: 800
  },
  teacherAndCategory:{
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  teacherName:{
    fontSize: 20,
    marginVertical: 5,
    color: '#616161'
  },
  categoryBox:{
    backgroundColor: '#212121',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 16,
    height: 24,
    
  },
  categoryText:{
    color: '#FFF'
  },
  desciptionBox:{
    marginVertical: 40,
    backgroundColor: '#EEEEEE',
    padding: 12,
    borderRadius: 12
  },
  desciptionText:{
    fontSize: 18,
  },
  bottomTools:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  delete:{
    alignItems: 'flex-end',
    backgroundColor: '#EEEEEE',
    padding:10,
    margin: 20,
    borderRadius: 25
  },
  enableButton: {
    backgroundColor: "#EEEEEE",
    width: '70%',
    height: 50,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  enableText:{
    fontWeight: 700
  }
});