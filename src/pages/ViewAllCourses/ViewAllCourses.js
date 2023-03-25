import React, { useState, useEffect } from 'react';
import { FlatList,Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
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
     
      >
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
     
      <View style={styles.header}>

        <TextInput
          style={styles.input}
          onChangeText={(text) => setInputCourseName(text)}
          placeholder="Digite o nome do curso"
        />

        <TouchableOpacity
        style={styles.searchButton}
        onPress={() => searchUser()}>
          <Octicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>


      
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
        
      

      <View style={styles.addButtom}>
      <TouchableOpacity onPress={() => GoToAdd()}>

        <View style = {styles.add}>
        <Ionicons name="add-sharp" size={34} color="white" />
        </View>

      </TouchableOpacity>
      </View>
    
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input:{
    backgroundColor: '#ECECEC',
    height: 45,
    width: '85%',
    padding: 16,
    borderRadius: 28
  }, 
  searchButton:{
    backgroundColor: '#2DCDDF',
    height: 45,
    width: 45,
    borderRadius: 28,
    alignItems:'center',
    justifyContent: 'center'
  },

  listView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'blue'
  },  

  addButtom:{
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    padding: 12,
  
  },  

  add:{
    width: 80,
    height: 80,
    backgroundColor: '#6C00FF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center', 
  
  },
  addText:{
    fontSize: 30,
    color:"#F9F9F9",
    
  }
});

export default ViewAllCourses;