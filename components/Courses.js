import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native'




const Courses =(props) => {

    console.log('URI:', props.item.course_image)
    return(
      
        <View>
        
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
    
            
            <Image source={{ uri: props.item.course_image}} style={{ width: 350, height: 175 }} />
            </View>

            
            

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