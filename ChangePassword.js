import React,{Component} from 'react';
import {Text,View,StyleSheet,ImageBackground,Image,TextInput,Dimensions,Alert,TouchableOpacity,TouchableWithoutFeedback,Keyboard} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import * as lib from './storeData'

const {width:WIDTH}=Dimensions.get('window');
class ChangePassword extends Component{

    state = {
        cpwd: "",
        npwd: "",
        rtnpwd:""
      }


      UpdatePassword()
      {
        let collection = {}
        collection.emp_no=lib.TId,
        collection.pwd = this.state.npwd,
        fetch('http://192.168.43.143/FWebAPI/api/users/ModifyTeachersPassword', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.setState({
                    cpwd:"",npwd:"",rtnpwd:""
                })
                Alert.alert('Success',"Your password has been changed.")
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            Keyboard.dismiss();
            this.currentpwd.clear();
            this.newpwd.clear();
            this.retypenewpwd.clear();


      }
      CheckUpdatePassword()
      {
          if(this.state.cpwd=='' && this.state.npwd=='' && this.state.rtnpwd=='')
          {
            Alert.alert('Warning','Please enter current and new password.');
          }
         else if(this.state.cpwd=='')
          {
              Alert.alert('Warning',"Please enter current password.");
          }
          else if(this.state.npwd=='')
          {
            Alert.alert('Warning',"Please enter new password.");

          }
          else if(this.state.rtnpwd=='')
          {
            Alert.alert('Warning',"Please Re-type new password.");
          }
          else 
          {
              if(this.state.cpwd===lib.TPwd)
              {
                  if(this.state.npwd===this.state.rtnpwd)
                  {

                    this.UpdatePassword();

                  }
                  else
                  {
                    Alert.alert('Warning',"New and Re-type Passwords don't match.");
                  }
                  
              }
              else 
              {
                Alert.alert('Warning',"Invalid current password.");
              }
              
          }

      }


   
  render()
  {
    return(
        
        <TouchableWithoutFeedback
         onPress={()=>{Keyboard.dismiss()}}
        >
        <View style={styles.Backgroundcontainer}>
        <View style={styles.maincontainer}> 
           <View style={styles.inputcontainer}>
               <Icon name={'ios-unlock'} size={26} color={'#1B1B1B'}
               style={styles.inputicon} ></Icon>
               {/* <Image source={require('./img/usern.png')}  style={styles.inputicon}/> */}
               <TextInput
               style={styles.input}
               ref={input => { this.currentpwd = input }}
               placeholder={'Current Password'}
               placeholderTextColor={'black'}
               underlineColorAndroid='transparent'
               secureTextEntry={true}
               onChangeText={(text) => this.setState({ cpwd: text })}
               />
            </View>
            <View style={styles.inputcontainer}>
               <Icon name={'ios-unlock'} size={26} color={'#1B1B1B'}
               style={styles.inputicon} />
              {/* <Image source={require('./img/usern.png')}  style={styles.inputicon}/> */}
               <TextInput 
               style={styles.input}
               ref={input => { this.newpwd = input }}
               placeholder={'New Password'}
               placeholderTextColor={'black'}
               underlineColorAndroid='transparent'
               secureTextEntry={true}

               onChangeText={(text) => this.setState({ npwd: text })}
               />
               </View>
               <View style={styles.inputcontainer}>
               <Icon name={'ios-unlock'} size={26} color={'#1B1B1B'}
               style={styles.inputicon} />
              {/* <Image source={require('./img/usern.png')}  style={styles.inputicon}/> */}
               <TextInput 
               style={styles.input}
               ref={input => { this.retypenewpwd = input }}
               placeholder={'Re-type new Password'}
               placeholderTextColor={'black'}
               underlineColorAndroid='transparent'
               secureTextEntry={true}

               onChangeText={(text) => this.setState({ rtnpwd: text })}
               />
               </View>
            <TouchableOpacity style={styles.btnLogin} 
            onPress={this.CheckUpdatePassword.bind(this)}
             >
                <Text style={styles.text}>Save Changes</Text>
            </TouchableOpacity>
            </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
}
export default ChangePassword;
const styles=StyleSheet.create(
    {
        Backgroundcontainer:{
            flex:1,
            width:null,
            height:null,
            backgroundColor:'#e9e9e9',
            alignItems:'center'
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
  
  
