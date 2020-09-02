import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import Header from './Header'
import CoursesMFM from './CoursesMFM';
import SelectTeacherMFM from './SelectTeacherMFM';

const screens={
  CoursesMFM:{
    screen:CoursesMFM,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='All Courses'/>,

      }
    }
  },
  SelectTeacherMFM:{
    screen:SelectTeacherMFM,
    navigationOptions:{
      title:'Manage Main Folder',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
}


const MainFolderManageStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },


    }
  });
export default MainFolderManageStack;