import React, { useState, useEffect} from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

export default function ViewCourse( { route, navigation } ) {

    const { itemId } = route.params;
    console.log('ITEMID:', itemId)


 return (
    <SafeAreaView style={{ flex: 1 }}>

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
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
          <Text>Endereço : {itemId.course_image}</Text>
        </View>
      </View>
    </View>
  </SafeAreaView>
  );
}