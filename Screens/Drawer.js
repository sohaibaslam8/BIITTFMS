import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Entypo';

import CourseStack from './CourseStack';
import ProfileStack from './ProfileStack';
import ChangePwdStack from './ChangePwdStack';
import LogOutStack from './LogOutStack';

//  navigationOptions = {
//    // title: 'Find Your Account',
//    header:'none'
    
// }


 navigationOptions = {
    header: null,
    };
const RootDrawerNavigator = createDrawerNavigator({
    Course: {
        screen: CourseStack
    },
    Profile: {
        screen: ProfileStack
    },
    ChangePassword: {
        screen: ChangePwdStack
    },
    LogOut: {
        screen: LogOutStack
    }


});
const Stackcontainer = createStackNavigator(
    {
        defaulthome: RootDrawerNavigator
    },
    {

        defaultNavigationOptions: {
            title:"Corses",

            headerStyle: {
                backgroundColor: '#f4511e',
            },
           headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }



)



export default createAppContainer(Stackcontainer);
// const AppContainer = createAppContainer(Stackcontainer);

// export default class Drawer extends React.Component {
//     render() {
//         return <AppContainer />;
//     }
// }
