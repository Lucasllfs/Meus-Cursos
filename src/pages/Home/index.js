import React, { useEffect} from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import ViewAllCourses from '../ViewAllCourses/ViewAllCourses';
const db = DatabaseConnection.getConnection();

const Home = ({ navigation }) =>{

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_course'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
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
  }, []);


  

  

  const GoToNext = () => {
    navigation.navigate('Next')
  }

  return (

    <SafeAreaView>

      <View style = {styles.container}>
      <TouchableOpacity onPress={() => GoToNext()}>

        <View style = {styles.next}>
          <Text style = { styles.addText}>next</Text>
        </View>

      </TouchableOpacity>

      
      


    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },

  add:{
    width: 60,
    height: 60,
    backgroundColor: '#181818',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center', 
    margin: 70,
    
  },

  next:{
    width: 60,
    height: 60,
    backgroundColor: 'red',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center', 
    margin: 20,
    
  },

  addText:{
    fontSize: 30,
    color:"#F9F9F9",
  }
});


export default Home;
