import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewAllCourses from './src/pages/ViewAllCourses/ViewAllCourses';
import Home from './src/pages/Home'
import Add from './src/pages/Add'
import EditCourse from './src/pages/EditCourse'

import ViewCourse from './src/pages/ViewCourse'

const Stack = createNativeStackNavigator();

export default class App extends Component {

  render() {

    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Home">

          <Stack.Screen name="Home" component={Home}
            options={{
              title: 'Home',
              headerStyle: {
                backgroundColor: '#181818',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
                fontSize: 30
              }
            }}
          />

           <Stack.Screen name="Add" component={Add}
            options={{
              title: 'Add',
              headerStyle: {
                backgroundColor: '#181818',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          /> 

          <Stack.Screen name="Next" component={ViewAllCourses}
            options={{
              title: 'next',
              headerStyle: {
                backgroundColor: '#181818',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          /> 

          <Stack.Screen name="ViewCourse" component={ViewCourse}
            options={{
              title: 'ViewCourse',
              headerStyle: {
                backgroundColor: '#181818',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          />

          <Stack.Screen name="EditCourse" component={EditCourse}
            options={{
              title: 'EditCourse',
              headerStyle: {
                backgroundColor: '#181818',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              }
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
}

