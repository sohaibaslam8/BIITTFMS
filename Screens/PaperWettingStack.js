import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import Header from './Header'
import CoursesPW from './CoursesPW';
import EASStackPW from './ExamsPW';
import OpenFilePW from './OpenFilePW';

const screens={
  CoursesPW:{
    screen:CoursesPW,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='All Courses'/>,

      }
    }
  },
  EASStackPW:{
    screen:EASStackPW,
    navigationOptions:{
      title:'Exams',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
  OpenFilePW:{
    screen:OpenFilePW,
    navigationOptions:{
      title:'Paper',
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