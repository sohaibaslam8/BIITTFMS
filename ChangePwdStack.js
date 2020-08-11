import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';


import ChangePassword from './ChangePassword';
import Header from './HeaderCpwd'

const screens={
  ChangePassword:{
    screen:ChangePassword,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='Change Password'/>,

      }
    }
  }
}


const ChangePwdStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },


    }
  });
export default ChangePwdStack;