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
             {/* <Image
                    source={require('./img/images.png')}
                    style={{ height: 25, width: 30,marginRight:55}}
                    
            

                ></Image> */}
                <Icon name={'md-menu'} size={32} color={'#fff'}
                 style={{ marginRight:50}}
                            />

             </TouchableOpacity>
    
    
        {/* <Ionicons name="menu" size={32} onPress={OpenMenu} style={styles.icon} /> */}
       
            <View>
                <Text style={styles.headerText}>
                    {title}

                </Text>
            </View>
        </View>

    );


}


// class Header extends Component({navigation}){
//     OpenMenu=()=>{
//         navigation.OpenMenu();
//     }   

//   render()
//   {
//     return(
//         <View style={styles.header}>
//         {/* <Ionicons name="menu" size={32} onPress={OpenMenu} style={styles.icon} /> */}
//         <Image
//                     source={require('./img/images.png')}
//                     style={{ height: 25, width: 30,marginRight:100}}
//                     onPress={OpenMenu}

//                 ></Image>
//             <View>
//                 <Text style={styles.headerText}>
//                     Courses

//                 </Text>
//             </View>
//         </View>

//     );
//   }



// }

// export default Header;

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