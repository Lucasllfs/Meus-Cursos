import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native'


const Courses =(props) => {

  return(
    
    <View style={styles.container}>
      <View style={styles.Card}>
        <Image source={{ uri: props.item.course_image}} style={styles.image} />
  
        <Text numberOfLines={1} style={styles.textName}>{props.item.course_name}</Text>

        <Text numberOfLines={1} style={styles.textTeacher}>{props.item.course_teacher}</Text> 
      </View>           
    </View>
      
  )

}

const styles = StyleSheet.create({
  
  container:{
    flex:1
  },
  Card:{
    backgroundColor: 'white',
    height: 245,
    width: '100%',
    marginVertical: 16,
    alignSelf: 'center',
    borderRadius: 30,

  },

  image:{
    alignSelf: 'center',
    width: '100%', 
    height: 150,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  textName: {
    marginHorizontal: 16,
    marginTop: 16,
    color: '#212121',
    fontSize: 24,
    fontWeight: '700',
  },
  textTeacher: {
    color: '#616161',
    fontSize: 18,
    marginTop: 4,
    marginHorizontal: 18
  },
  });

export default Courses