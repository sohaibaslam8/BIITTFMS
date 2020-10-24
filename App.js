import React,{Component} from "react";
import { View, Text, StyleSheet, Button,StatusBar,ActivityIndicator } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer,createAppContainer,createSwitchNavigator } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import Drawer from './Screens/DrawerNavigation'
import LogIn from './Screens/LogInStack';

const AppNavigator = createStackNavigator({
  // LogIN: LogIn,
 
  Drawer:{
    screen:Drawer,
    navigationOptions:{
      headerShown:false
    }
  },
}


);
const AuthStack=createStackNavigator({LogIn:{screen:LogIn,navigationOptions:{headerShown:false}}});
class AuthLoadingScreen extends Component{
  constructor(props)
  {
    super(props);
    this._loadData();
  }
  render(){
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
        <StatusBar barStyle='default' />

      </View>

    );
  }
  _loadData=async()=>{
    const isLoggedIn=await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn!=='1'?'Auth':'App');


  }
}



export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading:AuthLoadingScreen,
    App:AppNavigator,
    Auth:AuthStack
  },
  {
    initialRouteName:'AuthLoading'
  }
));
