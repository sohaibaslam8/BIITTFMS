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
    loginfunction=async()=> {
        // this.setState({isloading:true});
        lib.Id=10023;
        // lib.name='sohaib';
      //  this.props.navigation.navigate('Drawer')







        

        // if(this.state.email=="" && this.state.password=="")
        // {
        //     Alert.alert('Warning','Please Enter Email and Password.');
        // }
        // else if(this.state.email=="")
        // {
        //     Alert.alert('Warning','Please Enter Email.');
        // }
        // else if(this.state.password=="")
        // {
        //     Alert.alert('Warning','Please Enter Password.');
        // }
        // else
        // {
            fetch(`http://192.168.43.143/FWebAPI/api/Users/LoginTeacher?id=${this.state.email}&password=${this.state.password}`)
            .then(data => data.json())
            .then(data2 => {
                // this.setState({isloading:false});
                 console.log(data2)
                if (data2 != 'false') {
                    if(data2[0].email==null)
                    {
                    //     lib.TId=data2[0].emp_no;
                    // lib.TFName=data2[0].emp_firstname;
                    // lib.TMName=data2[0].emp_middle;
                    // lib.TLName=data2[0].emp_lastname;
                    // lib.TEmail='***********';
                    // lib.TPhone='***********';
                    // lib.TPwd=data2[0].pwd;
                    // lib.TImg=data2[0].Img;
                    // lib.TStatus=data2[0].status;
               
                    AsyncStorage.setItem('TId',data2[0].emp_no);
                    AsyncStorage.setItem('TFName',data2[0].emp_firstname);
                    AsyncStorage.setItem('TMName',data2[0].emp_middle);
                    AsyncStorage.setItem('TLName',data2[0].emp_lastname);
                    AsyncStorage.setItem('TEmail','**********');
                    AsyncStorage.setItem('TPhone','**********');
                    AsyncStorage.setItem('TPwd',data2[0].pwd);
                    if(data2[0].Img!=null)
                    {
                        AsyncStorage.setItem('TImg',data2[0].Img);
                    }
                    if(data2[0].status!=null)
                    {
                        AsyncStorage.setItem('TStatus',data2[0].status);
                    }

                    if(data2[0].Position!=null)
                    {
                        AsyncStorage.setItem('TPosition',data2[0].Position);
                    }
                    
                

                    }
                    else
                    {
                    //     lib.TId=data2[0].emp_no;
                    // lib.TFName=data2[0].emp_firstname;
                    // lib.TMName=data2[0].emp_middle;
                    // lib.TLName=data2[0].emp_lastname;
                    // lib.TEmail=data2[0].email;
                    // lib.TPhone=data2[0].PhoneNo;
                    // lib.TPwd=data2[0].pwd;
                    // lib.TImg=data2[0].Img;
                    // lib.TStatus=data2[0].status;
                    AsyncStorage.setItem('TId',data2[0].emp_no);
                    AsyncStorage.setItem('TFName',data2[0].emp_firstname);
                    AsyncStorage.setItem('TMName',data2[0].emp_middle);
                    AsyncStorage.setItem('TLName',data2[0].emp_lastname);
                    AsyncStorage.setItem('TEmail',data2[0].email);
                    AsyncStorage.setItem('TPhone',data2[0].PhoneNo);
                    AsyncStorage.setItem('TPwd',data2[0].pwd);
                    
                    if(data2[0].Img!=null)
                    {
                        AsyncStorage.setItem('TImg',data2[0].Img);
                    }
                    if(data2[0].status!=null)
                    {
                        AsyncStorage.setItem('TStatus',data2[0].status);
                    }
                    if(data2[0].Position!=null)
                    {
                        AsyncStorage.setItem('TPosition',data2[0].Position);
                    }
                    
                    }
                    AsyncStorage.setItem('isLoggedIn','1');
                    this.props.navigation.navigate({routeName:'Drawer',params:{status:data2[0].status}})
                }
                else {
                    Alert.alert('Warning','Account Not Exist.');
                }
            })
        // }
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


