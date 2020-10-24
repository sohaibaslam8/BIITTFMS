import React from "react";
import { createStackNavigator } from 'react-navigation-stack';

import Header from './Header'
import courses from './courses'
import CourseDetail from './CoursesDetail';
import profile from './Profile';
import CourseObjective from './CourseObjective';
import ContentsRM from './ContentsRM';
import MarksDistributionGP from './MarksDistributionGP';
import WeeklPlanMainFolder from './WeeklPlanMainFolder';
import NALM from './NALMStack'
import EASStack from './EASStack';

import SectionFolder from './SectionFolder';
import Students from './Students';
import WeeklyPlanSubFolder from './WeeklyPlanSubFolder';
import ARStack from './ARStack';
import QASStack from './QASStack';
import Quizzes from './Quizzes';
import AASStack from './AASStack';
import SamplesStack from './SamplesStack';
import FinalResult from './FinalResult';
import FCR from './FCR';
import OpenPdfFile from './OpenPdfFiles'

import Notification from './Notifications';


const screens={
  courses:{
    screen:courses,
    navigationOptions:({navigation}) => {
      return{
        headerTitle:()=> <Header navigation={navigation} title='Courses'/>,

      }
    }

  },
  Notification:{
    screen:Notification,
    navigationOptions:{
      title:'Notifications',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },

  

   coursedetail:{
    screen:CourseDetail,
    navigationOptions:{
      title:'Course Detail',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },
  profile:{
    screen:profile,
    navigationOptions:{
      title:'Profile',
      headerTintColor: '#fff',
      //  headerStyle:{backgroundColor:'#eee'}
    },
  },

  SectionFolder:{
    screen:SectionFolder,
    navigationOptions:{
      title:'Folder',
      headerTintColor: '#fff',
    }
  },
  CourseObjectives:{
    screen:CourseObjective,
    navigationOptions:{
      title:'Objective',
      headerTintColor: '#fff',
    }
  },
  ContentsRM:{
    screen:ContentsRM,
    navigationOptions:{
      title:'Contents',
      headerTintColor: '#fff',
    }
  },
  MarksDistributionGP:{
    screen:MarksDistributionGP,
    navigationOptions:{
      title:'Marks Distribution',
      headerTintColor: '#fff',
    }
  },
  Students:{
    screen:Students,
    navigationOptions:{
      title:'Students',
      headerTintColor: '#fff',
    }
  },
  // Weekly Plan Main Folder.
  WeeklPlanMainFolder:{
    screen:WeeklPlanMainFolder,
    navigationOptions:{
      title:'Weekly Plan',
      headerTintColor: '#fff',
    }
  },
  // Weekly Plan Sub Folder.
  WeeklyPlanSubFolder:{
    screen:WeeklyPlanSubFolder,
    navigationOptions:{
      title:'Weekly Plan',
      headerTintColor: '#fff',
    }
  },



  // Notes And Lab Manuals.
  NALM:{
    screen:NALM,
    navigationOptions:{
      title:'Notes and Manuals',
      headerTintColor: '#fff',
  },
},
EASStack:{
  screen:EASStack,
  navigationOptions:{
    title:'Exams and Solutions',
    headerTintColor: '#fff',
},
},
ARStack:{
  screen:ARStack,
  navigationOptions:{
    title:'Attendance',
    headerTintColor: '#fff',
},
},
QASStack:{
  screen:QASStack,
  navigationOptions:{
    title:'Quizzes and Solutions',
    headerTintColor: '#fff',
},
},
Quizzes:{
  screen:Quizzes,
  navigationOptions:{
    title:'Add Quizzes',
    headerTintColor: '#fff',
},
},

AASStack:{
  screen:AASStack,
  navigationOptions:{
    title:'Assignments and Solutions',
    headerTintColor: '#fff',
},
},
SamplesStack:{
  screen:SamplesStack,
  navigationOptions:{
    title:'Samples',
    headerTintColor: '#fff',
},
},
FinalResult:{
  screen:FinalResult,
  navigationOptions:{
    title:'Final Result',
    headerTintColor: '#fff',
},
},
FCR:{
  screen:FCR,
  navigationOptions:{
    title:'FCR',
    headerTintColor: '#fff',
},
},
OpenPdfFile:{
  screen:OpenPdfFile,
  navigationOptions:{
    title:'File',
    headerTintColor: '#fff',
},
},


}


const HomeStack = createStackNavigator(screens,
  {
    defaultNavigationOptions:{
      headerStyle:{backgroundColor:'#028504',height:65},
      headerTitleStyle: {
        fontWeight: '900',
      },


    }
  });
export default HomeStack;