import React,{Component} from "react";
import { View, Text, StyleSheet, Button,StatusBar,ActivityIndicator } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer,createAppContainer,} from 'react-navigation';
import LogIn from './LogIn';
import Forgotpwd from './Forgotpwd';

const AppNavigator = createStackNavigator({
    LogInPage: {screen : LogIn, navigationOptions: { headerShown:false } },
    Forgotpwd: {screen : Forgotpwd}
  });

export default createAppContainer(AppNavigator);
