import React,{Component} from 'react';
import {createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Notes from './Notes';
import LabManuals from './LabManuals';
const Mytabs= createMaterialTopTabNavigator({
    Notes:{screen:Notes,
    navigationOptions:{
        tabBarLabel:'Notes',
        tabBarIcon:({tintColor})=>(
            <Icon name="ios-musical-notes" color={tintColor} size={20} />


        )
    }
},
    LabManuals:{screen:LabManuals,
        navigationOptions:{
            tabBarLabel:'Lab Manuals',
            tabBarIcon:({tintColor})=>(
                <Icon name="ios-musical-notes" color={tintColor} size={20} />
    
    
            )
        }
    }
},
{
    initialRouteName:'Notes',
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
