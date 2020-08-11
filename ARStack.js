import React,{Component} from 'react';
import {Text,View} from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import FullAttendance from './FullAttendance';
import SummaryAttendance from './SummaryAttendance';
const Mytabs= createMaterialTopTabNavigator({
    FullAttendance:{screen:FullAttendance,
    navigationOptions:{
        tabBarLabel:'Full Attendance',
        tabBarIcon:({tintColor})=>(
            <Icon name="ios-musical-notes" color={tintColor} size={20} />


        )
    }
},
    SummaryAttendance:{screen:SummaryAttendance,
        navigationOptions:{
            tabBarLabel:'Summary',
            tabBarIcon:({tintColor})=>(
                <Icon name="ios-musical-notes" color={tintColor} size={20} />
    
    
            )
        }
    }
},
{
    initialRouteName:'FullAttendance',
    //tabBarPosition:'bottom',
    tabBarOptions:{
        activeTintColor:'green',
        inactiveTintColor:'black',
        labelStyle:{
            fontSize:14,
        },
        style:{
            backgroundColor:'#f2f2f2',
          //  height:60,
          //  borderBottomWidth:3,
          //  borderBottomColor:'blue'

            
        },
        indicatorStyle:{
            //color:'green'
            //height:0
            backgroundColor:'green'
        },
       // showIcon:true
    }
    
}

)

const AppContainer = createAppContainer(Mytabs);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
