import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import Header from './Header'
import CoursesPR from './CoursesPR';
import ShowFilePR from './ShowFilePR';


const screens={
  CoursesPR:{
    screen:CoursesPR,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='All Courses'/>,

      }
    }
  },
  ShowFilePR:{
    screen:ShowFilePR,
    navigationOptions:{
      title:'Course Report',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
}


const PaperWettingStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },


    }
  });
export default PaperWettingStack;