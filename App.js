import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import Add from './src/pages/Add';
import LoginScreen from './src/pages/LoginScreen';
import EditCourse from './src/pages/EditCourse';
import Details from './src/pages/Details/index';

const Stack = createNativeStackNavigator();

export default class App extends Component {

  render() {

    return (
      <NavigationContainer>
        
        <Stack.Navigator  initialRouteName="LoginScreen">

          <Stack.Screen name="LoginScreen" component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="Home" component={Home} 
            options={{
              headerShown: false,
              unmountOnBlur: true
            }}
          /> 

          <Stack.Screen name="Add" component={Add}
            options={{
              headerShown: false,
            }}
          /> 

          <Stack.Screen name="Details" component={Details}
            options={{
              unmountOnBlur: true,
              title: '',
              headerStyle: {
                backgroundColor: '#212121',
              },
              headerTintColor: '#fff',
            }}
          />

          <Stack.Screen name="EditCourse" component={EditCourse}
             options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
        
      </NavigationContainer>
      
    )
  }
}

