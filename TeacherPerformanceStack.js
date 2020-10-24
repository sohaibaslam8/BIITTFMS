import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import Profile from './TeacherPerformance';
import Header from './Header';
import TeacherPerformance from "./TeacherPerformance";
const screens={
  TeacherPerformance:{
    screen:TeacherPerformance,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='Teacher Performance'/>,

      }
  }
}
}
const ProfileStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },
    }
  });
export default ProfileStack;