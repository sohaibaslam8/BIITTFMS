import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import Header from './Header';
import Notifications from './Notifications';
import Message from './Message';
const screens={
  Notifications:{
    screen:Notifications,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='Notifications'/>,

      }
  }
},
Message:{
    screen:Message,
    navigationOptions:{
      title:'Message',
      headerTintColor: '#fff',
    },
  },
}
const NotificationStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },
    }
  });
export default NotificationStack;