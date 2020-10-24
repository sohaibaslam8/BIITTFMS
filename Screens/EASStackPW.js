import React,{Component} from 'react';
import {Text,View} from 'react-native';
import {createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Exams from './ExamsPW';
import ExamsSolution from './ExamsSolutionPW';
const Mytabs= createMaterialTopTabNavigator({
    Exams:{screen:Exams,
    navigationOptions:{
        tabBarLabel:'Exams',
        tabBarIcon:({tintColor})=>(
            <Icon name="ios-musical-notes" color={tintColor} size={20} />


        )
    }
},
    ExamsSolution:{screen:ExamsSolution,
        navigationOptions:{
            tabBarLabel:'Solutions',
            tabBarIcon:({tintColor})=>(
                <Icon name="ios-musical-notes" color={tintColor} size={20} />
    
    
            )
        }
    }
},
{
    initialRouteName:'Exams',
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
