import React from "react";
import {View, Text, StyleSheet} from 'react-native'

const Courses =(props) => {

    return(

        <View>
        <Text style={styles.textheader}>Código</Text>
        <Text style={styles.textbottom}>{props.item.course_id}</Text>
  
        <Text style={styles.textheader}>nome</Text>
        <Text style={styles.textbottom}>{props.item.course_name}</Text>
  
        <Text style={styles.textheader}>professor</Text>
        <Text style={styles.textbottom}>{props.item.course_teacher}</Text>
  
        <Text style={styles.textheader}>categoria</Text>
        <Text style={styles.textbottom}>{props.item.course_category}</Text>
  
        <Text style={styles.textheader}>descricao</Text>
        <Text style={styles.textbottom}>{props.item.course_description}</Text>
  
        <Text style={styles.textheader}>imagem</Text>
        <Text style={styles.textbottom}>{props.item.course_image}</Text>
       
        </View>
        
    )

}

const styles = StyleSheet.create({
    textheader: {
      color: '#111',
      fontSize: 20,
      fontWeight: '700',
  
    },
    textbottom: {
      color: '#111',
      fontSize: 18,
    },
  });

export default Courses