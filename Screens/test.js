import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, ImageBackground,ActivityIndicator, Image, TextInput, Dimensions, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Bottom from 'react-native-vector-icons/Ionicons';
import * as lib from './storeData'
import AsyncStorage from '@react-native-community/async-storage';
const { width: WIDTH } = Dimensions.get('window');
class LogIn extends Component {
    constructor() {
        super()
        this.state = {
            showpwd: true,
            press: false,
            isloading: false,
            id: '',
            name: "",
            email: "",
            password: ""
        }
    }
    showpwd = () => {
        if (this.state.press == false) {
            this.setState
                (
                    {
                        showpwd: false,
                        press: true
                    }
                )

        }
        else {
            this.setState
                (
                    {
                        showpwd: true,
                        press: false
                    }
                )
        }
    }
    loginfunction() {
       fetch(`http://192.168.43.143/FWebAPI/api/Users/LoginTeacher?id=${this.state.email}&password=${this.state.password}`)
            .then(data => data.json())
            .then(data2 => {
                // this.setState({isloading:false});
                 console.log(data2)
                if (data2 != 'false') {
                    this.props.navigation.navigate('Drawer')
                }
        })
    }


    forgotfunction() {
         this.props.navigation.navigate('Forgotpwd')
    }

    static navigationOptions = {
        title: 'WelCome',
        headerShown: false
    }



    render() {
        return (
            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
            <TouchableWithoutFeedback
                onPress={() => { Keyboard.dismiss() }}
            >
                <View style={styles.Backgroundcontainer}>


                    {/* <ImageBackground source={require('./img/download.jpg')} style={styles.Backgroundcontainer} > */}
                    <View style={styles.logocontainer}>
                        <Image source={require('./img/withoutback.png')} style={styles.logo} />
                        <Text style={styles.logotext}>Teacher's Folder</Text>
                    </View>

                    <StatusBar backgroundColor="#028504" barStyle="default" />
                    <View style={styles.inputcontainer}>
                        <Icon name={'ios-person'} size={28} color={'#1B1B1B'}
                            style={styles.inputicon} ></Icon>
                        <TextInput
                            style={styles.input}
                            placeholder={'Username or email'}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ email: text })}
                        />
                    </View>
                    <View style={styles.inputcontainer}>
                        <Icon name={'ios-unlock'} size={26} color={'#1B1B1B'}
                            style={styles.inputicon} />
                        <TextInput
                            style={styles.input}
                            placeholder={'Password'}
                            secureTextEntry={this.state.showpwd}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ password: text })}
                        />
                        <TouchableOpacity style={styles.btnEye}
                            onPress={this.showpwd.bind(this)}
                        >
                            <Icon name={this.state.press == false ? 'md-eye-off' : 'md-eye'}
                                size={30} color={'#1B1B1B'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnLogin}
                        onPress={this.loginfunction.bind(this)}
                    >
                        <Text style={styles.text}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.forgotfunction.bind(this)}
                    >
                        <Text
                            style={styles.forgottext} >
                            Forgot Password?
                         </Text>
                    </TouchableOpacity>

                    {/* </ImageBackground> */}
                </View>
            </TouchableWithoutFeedback>

        );
    }



}
export default LogIn;
const styles = StyleSheet.create(
    {
        Backgroundcontainer: {
            flex: 1,
            width: null,
            height: null,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#e9e9e9'




        },
        logocontainer: {
            alignItems: 'center',
            marginBottom: 50,



        },
        logo: {
            width: 125,
            height: 125
        },
        logotext: {
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
        },
        inputcontainer: {
            marginTop: 10,

        },
        input: {
            width: WIDTH - 55,
            height: 45,
            borderRadius: 25,
            fontSize: 16,
            paddingLeft: 45,
             backgroundColor: 'rgba(0,0,0,0.2)',
            //  borderColor:'black',
            //  borderWidth:1,
         //   backgroundColor:'silver',
            color: 'black',
            marginHorizontal: 25
        },
        inputicon: {
            position: 'absolute',
            top: 6,
            left: 37,
        },
        btnEye: {
            position: 'absolute',
            top: 5,
            right: 37,
        },
        btnLogin: {
            width: WIDTH - 55,
            height: 45,
            borderRadius: 25,
            backgroundColor: 'green',
            justifyContent: 'center',
            marginTop: 20

        },
        text: {
            color: 'white',
            fontSize: 18,
            textAlign: 'center',

        },
        forgotcontainer: {

        },
        forgottext: {
            color: 'green',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 10
        }


    }
);


