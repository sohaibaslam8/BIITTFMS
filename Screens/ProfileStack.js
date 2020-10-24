import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import Profile from './Profile';
import Header from './Header';
const screens={
  Profile:{
    screen:Profile,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='Profile'/>,

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