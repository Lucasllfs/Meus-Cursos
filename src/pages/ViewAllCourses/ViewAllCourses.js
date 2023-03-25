import React, { useState, useEffect } from 'react';
import { FlatList,Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import Courses from '../../../components/Courses';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewAllCourses = ({ navigation }) => {
  let [flatListItems, setFlatListItems] = useState([]);

  const [inputCourseName, setInputCourseName] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_course',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);


  let searchUser = () => {
    console.log(inputCourseName);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_course where course_name = ?',
        [inputCourseName],
        (tx, results) => {
          var len = results.rows.length;
          console.log('LEN:',len)
          if (len > 0) {
            let res = results.rows.item(0);
            console.log('RES:',res)
            goToViewCourse(res)
            console.log('rescouseid:', res)
          } else {
            alert('Usuário não encontrado!');
            
          }
        }
      );
    });
  };



  let listItemView = (item) => {
    console.log('entrou');

    return (
      <TouchableOpacity
      key={item.course_id}
      onPress={() => goToViewCourse(item)}
      style={{ backgroundColor: 'red', marginTop: 20, padding: 30, borderRadius: 10 }}>
      <Courses item = {item}/>
      </TouchableOpacity>
    );
  };

  const GoToAdd = () => {
    navigation.navigate('Add')
  }

  const goToViewCourse = (itemId) => {
    navigation.navigate('ViewCourse', {
      itemId: itemId,
      otherParam: '',
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => setInputCourseName(text)}
          placeholder="Digite aqui para pesquisar"
        />
        <TouchableOpacity
        onPress={() => searchUser()}
        >
          <Text>Buscar</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => GoToAdd()}>

        <View style = {styles.add}>
        <Text style = { styles.addText}>+</Text>
        </View>

      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  add:{
    width: 60,
    height: 60,
    backgroundColor: '#181818',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center', 
    margin: 10,
  },

  addText:{
    fontSize: 30,
    color:"#F9F9F9",
  }
});

export default ViewAllCourses;