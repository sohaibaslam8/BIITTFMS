import React from "react";
import { createStackNavigator } from 'react-navigation-stack';


import TeacherCoursesPS from './TeacherCoursesPS';
import PaperSetting from './PaperSetting';
import PaperSettingTopicDetail from './PaperSettingFullTopicDetail';
import Header from './Header'

const screens={
  TeacherCoursesPS:{
    screen:TeacherCoursesPS,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='Paper Setting'/>,

      }
    }
  },
  PaperSetting:{
    screen:PaperSetting,
    navigationOptions:{
      title:'Paper Setting',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
  TopicDetail:{
    screen:PaperSettingTopicDetail,
    navigationOptions:{
      title:'Topic Detail',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
}


const PaperSettingStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },


    }
  });
export default PaperSettingStack;