import React, { useState, useEffect } from 'react';
import { FlatList,Text, View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, StatusBar, Image } from 'react-native';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import Courses from '../../../components/Courses';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const Home = ({ navigation }) => {

  let [flatListItems, setFlatListItems] = useState([]);
  const [inputCourseName, setInputCourseName] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_course'",
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_course', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_course(course_id INTEGER PRIMARY KEY AUTOINCREMENT, course_name VARCHAR(50), course_teacher VARCHAR(20), course_category VARCHAR(15), course_description VARCHAR(250), course_image VARCHAR(100), course_enable VARCHAR(6) DEFAULT "true")',
              []
            );
          }
        }
      );
    });
  });

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
  }, [isFocused]);


  let searchUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_course where course_name = ?',
        [inputCourseName],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            goToDetails(res)
          } else {
            alert('Usuário não encontrado!');
          }
        }
      );
    });
  };



  let listItemView = (item) => {
    return (
      <TouchableOpacity
      key={item.course_id}
      onPress={() => goToDetails(item)}
      >
        <Courses item = {item}/>
      </TouchableOpacity>
    );
  };

  const GoToAdd = () => {
    navigation.navigate('Add')
  }

  const goToDetails = (itemId) => {
    navigation.navigate('Details', {
      itemId: itemId,
      otherParam: '',
    })
  }
  

  return (

    <View style={styles.container}>

      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.back}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1604077350837-c7f82f28653f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' }} style={styles.image} />
        </View>

        <View>
          <Text style={styles.headerText}>Meus Cursos</Text>
        </View>

        <View style={styles.header}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setInputCourseName(text)}
            placeholder="Digite o nome do curso"
          />

          <TouchableOpacity
          style={styles.searchButton}
          onPress={() => searchUser()}
          >
            <Octicons name="search" size={24} color="white" />
          </TouchableOpacity>

        </View>

        <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
          <View style={{ flex: 1 }}>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={flatListItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => listItemView(item)}
            />
          </View>
        </View>
        
      </ScrollView>

      <View style={styles.addButtom}>
        <TouchableOpacity onPress={() => GoToAdd()}>
          <View style = {styles.add}>
            <Ionicons name="add-sharp" size={34} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  back:{
    position: 'absolute',
    backgroundColor: '#FC2947',
    height: 255,
    zIndex: -5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: '100%'
  },
  headerText:{
    fontSize: 55,
    color:'#fff',
    fontWeight: '900',
    padding: 16,
    paddingRight: 100,
    lineHeight: 55,
    paddingTop: 90
  },
  image:{
    height: 255,
    width: '100%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },  
  header:{   
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5.46,
    elevation: 9,
  },
  input:{
    backgroundColor: '#FFF',
    height: 45,
    width: '85%',
    padding: 16,
    borderRadius: 28,
  }, 
  searchButton:{
    backgroundColor: '#9E9E9E',
    height: 40,
    width: 40,
    borderRadius: 28,
    alignItems:'center',
    justifyContent: 'center'
  },
  listView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'blue',
  },  
  addButtom:{
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0,
    padding: 12,
  },  
  add:{
    width: 65,
    height: 65,
    backgroundColor: '#FC2947',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  addText:{
    fontSize: 30,
    color:"#F9F9F9", 
  }
});

export default Home;