import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet,Alert } from 'react-native';
import { Button } from 'react-native-paper';

class ForgotpwdScreen extends Component {

    state = {
        id: "",
        email: "",
        pwd:""
      }



    static navigationOptions = {
        title: 'Find Your Account',
        headerMode:"true"
        
    }

    Findpwdfunction()
    {

        fetch(`${lib.IpAddress}/users/Forgotuser?Id=${this.state.id}&Email=${this.state.email}`)
    .then(data=>data.json())
    .then(data2=>{
      console.log(data2)
      if(data2=='false')
      {
        Alert.alert('Account Not exist')
      }
      else
      {
          
        this.setState(
                {
                   pwd:data2[0].Password
                }
              )
              Alert.alert('Your Password : ',this.state.pwd)

      }
    })

        

    }
    
    render() {
        return (
            <View style={styles.mainv}>

                <TextInput
                    style={{ fontSize: 25, marginLeft: 60, marginTop: 60 }}
                    placeholder="Enter ID"
                    placeholderTextColor='black'
                    onChangeText={(text) => this.setState({ id: text })}
                />
                <View style={styles.drawLine} />
                <TextInput
                    style={{ fontSize: 25, marginLeft: 60, marginTop: 15 }}
                    placeholder="Enter Email"
                    placeholderTextColor='black'
                    onChangeText={(text) => this.setState({ email: text })}
                />
                <View style={styles.drawLine} />
                <Button
                    mode="contained"
                    onPress={this.Findpwdfunction.bind(this)}
                    style={styles.loginbtn}
                >
                    FIND YOUR ACCOUNT
             </Button>
            </View>

        );
    }



}
const styles = StyleSheet.create(
    {
        mainv: {
            flex: 1,
            backgroundColor: 'white'
        },
        drawLine:
        {
            borderBottomColor: 'blue',
            borderBottomWidth: 2,
            borderRadius: 10,
            marginLeft: 60,
            marginRight: 40
        },
        loginbtn:
        {
          borderRadius: 25,
          marginTop: 40,
          marginLeft: 75,
          marginRight: 50,
          justifyContent: 'center',
    
        }


    }
);

export default ForgotpwdScreen;
