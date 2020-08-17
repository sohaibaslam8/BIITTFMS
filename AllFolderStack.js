import React from "react";
import { createStackNavigator } from 'react-navigation-stack';

import Header from './Header'
import AllFolders from './AllFoldersShow';
import CoursesAF from './coursesAF';
import CourseDetailAF from './CoursesDetail';

const screens={
  courses:{
    screen:AllFolders,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='All Folders'/>,

      }
    }

  },
  coursesAF:{
    screen:CoursesAF,
    navigationOptions:{
      title:'Courses',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
  CoursesDetailAF:{
    screen:CourseDetailAF,
    navigationOptions:{
      title:'Courses',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },



}


const AllFolderStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },


    }
  });
export default AllFolderStack;