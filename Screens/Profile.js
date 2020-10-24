import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconsk from 'react-native-vector-icons/MaterialCommunityIcons'
import * as lib from './storeData'
class Profile extends Component {
  render() {
    return (
      


      <View style={styles.mainbody}>
        <View style={styles.imagestyle}>

          <Image style={styles.imgprofile}
            source={lib.TImg != null ? { uri: 'data:image/jpeg;base64,' + lib.TImg } :
              require('../img/demoprofile.jpg')
            }

          />
        </View>
        
<View style={styles.mainsubbody}>

        <View style={styles.itemprofile}>
          <Icon style={styles.imgitem} name={'ios-people'} size={28} color={'#1B1B1B'} />
          <Text style={styles.labelitem}>Emp_no</Text>
          <Text style={styles.sublabelitem}>{lib.TId}</Text>
        </View>
        <View style={styles.drawLine} />
        <View style={styles.itemprofile}>
          <Icon style={styles.imgitem} name={'ios-person'} size={28} color={'#1B1B1B'} />
          <Text style={styles.labelitem}>Name</Text>
          <Text style={styles.sublabelitem}>{lib.TFName + ' ' + lib.TMName + ' ' + lib.TLName}</Text>
        </View>
        <View style={styles.drawLine} />
        <View style={styles.itemprofile}>
          {/* <Icon style={styles.imgitem} name={'ios-at'} size={28} color={'rgba(255,255,255,0.7)'}/> */}
          <Icons name={'email'} size={26} color={'#1B1B1B'}
          />
          <Text style={styles.labelitem}>Email</Text>
          <Text style={styles.sublabelitem}>{lib.TEmail}</Text>
        </View>
        <View style={styles.drawLine} />
        <View style={styles.itemprofile}>
          <Icon style={styles.imgitem} name={'ios-call'} size={28} color={'#1B1B1B'} />
          <Text style={styles.labelitem}>Phone</Text>
          <Text style={styles.sublabelitem}>{lib.TPhone}</Text>
        </View>
        <View style={styles.drawLine} />
        <View style={styles.itemprofile}>
          <Iconsk style={styles.imgitem} name={'account-key'} size={28} color={'#1B1B1B'} />
          <Text style={styles.labelitem}>Password</Text>
          <Text style={styles.sublabelitem}>{lib.TPwd}</Text>
        </View>
        </View>

      </View>
      //  </ImageBackground>
    );
  }
}
export default Profile;
const styles = StyleSheet.create(
  {
    Backgroundcontainer: {
      flex: 1,

    },
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
    },
    mainbody: {
   
      flex:1,
      backgroundColor:'#e9e9e9'
    },
    mainsubbody: {
    
       marginLeft: 26,
    
      marginBottom: 70
    },
    imagestyle: {
      alignItems: 'center',
      marginTop:30,

    },
    imgprofile: {
      alignItems: "center",
     
      marginTop: 20,
      height: 150,
      width: 150,
      borderRadius: 400 / 2,
    },

    itemprofile: {
      marginTop: 30,


    },
    labelitem: {
      marginTop: -40,
      marginLeft: 40,
      fontSize: 14,
      color: '#1B1B1B'

    },
    sublabelitem: {
      marginTop: 2,
      marginLeft: 40,
      fontSize: 16,
      color: 'black'

    },
    drawLine:
    {
      borderBottomColor: '#cccccc',
      borderBottomWidth: 1.5,
      borderRadius: 10,
      marginLeft: 40,
      marginTop: 15
    }


  }
);
