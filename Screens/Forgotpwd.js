import React,{Component} from 'react';
import {Text,View,StyleSheet,StatusBar,ImageBackground,Image,TextInput,Dimensions,Alert,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as lib from './storeData'

const {width:WIDTH}=Dimensions.get('window');
class Forgotpwd extends Component{

    state = {
        id: "",
        email: "",
        pwd:""
      }


    static navigationOptions = {
        title: 'Find Your Account',
        headerMode:"true",
        headerStyle: {
            backgroundColor: '#028504',
          },
          headerTintColor: '#fff',
        }

    FindpwdFunction()
    {
        if(this.state.id=="" && this.state.email=="")
        {
            Alert.alert('Warning','Please Enter Username and Email.');
        }
        else if(this.state.id=="")
        {
            Alert.alert('Warning','Please Enter Username.');
        }
        else if(this.state.email=="")
        {
            Alert.alert('Warning','Please Enter Email.');
        }
        else
        {
            fetch(`${lib.IpAddress}/Users/ForgotPwd?empno=${this.state.id}&email=${this.state.email}`)
                .then(data=>data.json())
                .then(data2=>{
                  //console.log(data2)
                  if(data2=='false')
                  {
                     Alert.alert('Warning','Account Not Exist.');
                  }
                  else
                  {
                      this.setState(
                            {
                               pwd:data2[0].pwd
                            }
                          )
                          Alert.alert('Password',this.state.pwd)
                  }
                }) 
        }
}
   
  render()
  {
    return(
        
        <TouchableWithoutFeedback
         onPress={()=>{Keyboard.dismiss()}}
        >
            <View style={styles.Backgroundcontainer}> 
        {/* <ImageBackground 
        source={require('./img/download.jpg')}
        style={styles.Backgroundcontainer} > */}
        <View style={styles.maincontainer}> 
        <StatusBar backgroundColor="#028504" barStyle="default" />

           <View style={styles.inputcontainer}>
               <Icon name={'ios-person'} size={28} color={'#1B1B1B'}
               style={styles.inputicon} ></Icon>
               {/* <Image source={require('./img/usern.png')}  style={styles.inputicon}/> */}
               <TextInput
               style={styles.input}
               placeholder={'Username'}
               placeholderTextColor={'black'}
               underlineColorAndroid='transparent'
               onChangeText={(text) => this.setState({ id: text })}
               />
            </View>
            <View style={styles.inputcontainer}>
               <Icons name={'email'} size={26} color={'#1B1B1B'}
               style={styles.emailinputicon} />
              {/* <Image source={require('./img/usern.png')}  style={styles.inputicon}/> */}
               <TextInput 
               style={styles.input}
               placeholder={'Email'}
               placeholderTextColor={'black'}
               underlineColorAndroid='transparent'
               onChangeText={(text) => this.setState({ email: text })}
               />
               </View>
            <TouchableOpacity style={styles.btnLogin} 
            onPress={this.FindpwdFunction.bind(this)} >
                <Text style={styles.text}>FIND YOUR ACCOUNT</Text>
            </TouchableOpacity>
            </View>
            </View>
               
        </TouchableWithoutFeedback>
    );
}
}
export default Forgotpwd;
const styles=StyleSheet.create(
    {
        Backgroundcontainer:{
            flex:1,
            width:null,
            height:null,
            alignItems:'center',
            backgroundColor:'#e9e9e9'
        },
        maincontainer:{
            marginTop:30,
        },
        inputcontainer:{
            marginTop:10,
        },
        input:{
            width:WIDTH - 55,
            height:45,
            borderRadius:25,
            fontSize:16,
            paddingLeft:45,
            backgroundColor:'rgba(0,0,0,0.2)',
            color:'black',
            marginHorizontal:25
        },
        inputicon:{
            position:'absolute',
            top:5,
            left:37,
        },
        emailinputicon:{
            position:'absolute',
            top:8,
            left:37,
        },
        btnLogin:{
            width:WIDTH - 55,
            height:45,
            borderRadius:25,
            backgroundColor:'green',
            justifyContent:'center',
            marginTop:20,
            marginLeft:30
        },
        text:{
            color:'white',
            fontSize:18,
            textAlign:'center',

        },
    }
  );
  
  
