import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import { Badge, Icon } from 'react-native-elements';

export default function Header({ navigation, title }) {
    OpenMenu = () => {
        // Alert.alert("hel");
        navigation.openDrawer();
    }
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={OpenMenu}>

                <Icons name={'md-menu'} size={32} color={'#fff'}
                    style={{ marginRight: 30 }}
                />


            </TouchableOpacity>




            <View>
                <Text style={styles.headerText}>
                    {title}

                </Text>
            </View>
            {/* <View style={styles.container}>
                <View style={styles.row}>
                    <Icon type="ionicon" name="ios-notifications" size={35} color='#fff' />
                    <Badge
                        value="7"
                        status="error"
                        containerStyle={styles.badgeStyle}
                    />
                </View>
            </View> */}
        </View>

    );


}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        letterSpacing: 1,
        color: '#fff'
    },
    icon: {

    },
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        
        marginLeft: 120,
        // marginRight: 100,
        
        
      },
      text: {
        fontSize: 18
      },
      row: {
        flexDirection: 'row'
      },
      badgeStyle: { 
        position: 'absolute',
        top: -6,
        right: -6 
      }


})