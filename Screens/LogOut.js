import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as lib from './storeData'

class LogOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timePassed: false
    };
  }
  async LogoutApplication() {
    lib.TMsgCount='0';
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }
  componentDidMount() {
    setTimeout(()=> {
      this.LogoutApplication();
    }, 2000);

  }
  
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#330066" animating />
        <Text>Logging out...</Text>

      </View>



    );
  }



}
export default LogOut;
