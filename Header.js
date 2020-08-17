import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Alert,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

 
export default function Header({navigation,title})
{
    OpenMenu=()=>{
       // Alert.alert("hel");
        navigation.openDrawer();
    }
    return(
        <View style={styles.header}>
             <TouchableOpacity onPress={OpenMenu}>
            
            <Icon name={'md-menu'} size={32} color={'#fff'}
            style={{ marginRight:30}}
            />


             </TouchableOpacity>
    
    
     
       
            <View>
                <Text style={styles.headerText}>
                    {title}

                </Text>
            </View>
        </View>

    );


}


const styles=StyleSheet.create({
    header:{
         width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },
    headerText:{
        fontWeight:'bold',
        fontSize:25,
        letterSpacing:1,
        color:'#fff'
    },
    icon:{
        
    }


})