import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Image, SafeAreaView, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React,{useState} from 'react';
import { createAppContainer } from 'react-navigation';
import CourseStack from './CourseStack';
import PaperSettingStack from './PaperSettingStack';
import AllFolderViewStack from './AllFolderStack';
import ProfileStack from './ProfileStack';
import ChangePwdStack from './ChangePwdStack';
import LogOutStack from './LogOut';
import Iconcc from 'react-native-vector-icons/FontAwesome';
import Iconp from 'react-native-vector-icons/Fontisto';
import Iconc from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconl from 'react-native-vector-icons/AntDesign';
import Iconps from 'react-native-vector-icons/Feather';
import Iconf from 'react-native-vector-icons/FontAwesome';
import Iconpw from 'react-native-vector-icons/Foundation';
import Iconn from 'react-native-vector-icons/MaterialIcons';
import * as lib from './storeData'

import PaperWettingViewStack from './PaperWettingStack';
import NotificationsViewStack from './NotificationsStack';
import { Badge,} from 'react-native-elements';
import MainFolderManageViewStack from './MainFolderManageStack';



const functionCombined=()=> {
    props.navigation.navigate('Courses')
        // this.functionTwo();
    } 


const CustomDrawerComponent = (props) => {
    const [colorsc,setcolorsc]=useState(true);
    const [colorsps,setcolorsps]=useState(false);
    const [colorsaf,setcolorsaf]=useState(false);
    const [colorsmf,setcolorsmf]=useState(false);
    const [colorspw,setcolorspw]=useState(false);
    const [colorsp,setcolorsp]=useState(false);
    const [colorscp,setcolorscp]=useState(false);
    const [colorsl,setcolorsl]=useState(false);
    const [colorsn,setcolorsn]=useState(false);
    const functionCombinedC=()=> {
        props.navigation.navigate('Courses')

        setcolorsc(true);
        setcolorsps(false);
        setcolorsaf(false);
        setcolorsp(false);
        setcolorscp(false);
        setcolorsl(false);
        setcolorspw(false);
        setcolorsn(false);
        setcolorsmf(false);
    }
    const functionCombinedPS=()=> {
        // alert("helloo")
        props.navigation.navigate('PaperSetting')
        setcolorsps(true);
        setcolorsc(false);
        setcolorsaf(false);
        setcolorsp(false);
        setcolorscp(false);
        setcolorsl(false);
        setcolorspw(false);
        setcolorsn(false);
        setcolorsmf(false);
    }
        const functionCombinedAF=()=> {
             props.navigation.navigate('AllFolderStack')
            setcolorsaf(true);
            setcolorsps(false);
            setcolorsc(false);
            setcolorsp(false);
            setcolorscp(false);
            setcolorsl(false);
            setcolorspw(false);
            setcolorsn(false);
            setcolorsmf(false);
        } 
        const functionCombinedMF=()=> {
            props.navigation.navigate('MainFolderStack')
            setcolorsmf(true);
           setcolorsaf(false);
           setcolorsps(false);
           setcolorsc(false);
           setcolorsp(false);
           setcolorscp(false);
           setcolorsl(false);
           setcolorspw(false);
           setcolorsn(false);
       } 
        const functionCombinedPW=()=> {
            props.navigation.navigate('PaperWettingStack')
            setcolorspw(true);
           setcolorsaf(false);
           setcolorsps(false);
           setcolorsc(false);
           setcolorsp(false);
           setcolorscp(false);
           setcolorsl(false);
           setcolorsn(false);
           setcolorsmf(false);
       } 
       
            const functionCombinedP=()=> {
                props.navigation.navigate('Profile')
                setcolorsp(true);
                setcolorsps(false);
                setcolorsc(false);
                setcolorsaf(false);
                setcolorscp(false);
                setcolorsl(false);
                setcolorspw(false);
                setcolorsn(false);
                setcolorsmf(false);


                }
                const functionCombinedN=()=> {
                    props.navigation.navigate('NotificationStack')
                    setcolorsn(true);
                    setcolorsp(false);
                    setcolorsps(false);
                    setcolorsc(false);
                    setcolorsaf(false);
                    setcolorscp(false);
                    setcolorsl(false);
                    setcolorspw(false);
                    setcolorsmf(false);
    
    
                    }
                const functionCombinedCP=()=> {
                    props.navigation.navigate('ChangePassword')
                    
                    setcolorscp(true);
                    setcolorsps(false);
                    setcolorsc(false);
                    setcolorsaf(false);
                    setcolorsp(false);
                    setcolorsl(false);
                    setcolorspw(false);
                    setcolorsn(false);
                    setcolorsmf(false);
                    }
                    const functionCombinedl=()=> {
                        props.navigation.navigate('LogOut')
                        setcolorsl(true);
                        setcolorsps(false);
                        setcolorscp(false);
                        setcolorsc(false);
                        setcolorsaf(false);
                        setcolorsp(false);
                        setcolorspw(false);
                        setcolorsn(false);
                        setcolorsmf(false);
                        }
    
    // console.log("How i work :",props.navigation.getParam('status'));
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 160, backgroundColor: 'white', alignItems: 'center', jusstifyContent: 'center' }}>
                {/* <Image style={{ height: 120, width: 120, borderRadius: 60, marginTop: 25 }} source={require('./img/demoprofile.jpg')} /> */}
                <Image style={{ height: 120, width: 120, borderRadius: 60, marginTop: 25 }}
                    source={lib.TImg != null ? { uri: 'data:image/jpeg;base64,' + lib.TImg } :
                        require('./img/demoprofile.jpg')
                    }


                />



            </View>

            <ScrollView contentContainerStyle={{}}>

                {/* <DrawerItems {...props} /> */}
                <TouchableOpacity  style={
                    [colorsc?
                    {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#d9d9d9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}]}
                     onPress={() =>functionCombinedC()}>
                <Iconcc  name={'book'} size={24} style={[colorsc?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}
                />
                    <Text style={[colorsc?{margin:10,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:10,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={
                    [colorsps?
                    {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#d9d9d9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}]}
                     onPress={() =>functionCombinedPS()}>
                <Iconps  name={'settings'} size={24} style={[colorsps?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}
                />
                    <Text style={[colorsps?{margin:10,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:10,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Paper Setting</Text>
                </TouchableOpacity>
                 {lib.TStatus==='true' &&
                //  props.navigation.getParam('status') === 'DAF' && 
                    <TouchableOpacity 
                    style={
                        [colorsaf?
                            {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                        {flexDirection:'row',height:50,alignItems:'center'}
                        ]}
                    onPress={() => functionCombinedAF()}>
                        <Iconf name={'folder'} size={24} style={[colorsaf?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    <Text style={[colorsaf?{margin:10,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:10,fontSize:16,fontWeight:'bold',color:'#606060'}]}>All Folders</Text>
                    </TouchableOpacity>
                }
                 {lib.TStatus==='true' &&
                //  props.navigation.getParam('status') === 'DAF' && 
                    <TouchableOpacity 
                    style={
                        [colorsmf?
                            {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                        {flexDirection:'row',height:50,alignItems:'center'}
                        ]}
                    onPress={() => functionCombinedMF()}>
                        <Iconf name={'folder'} size={24} style={[colorsmf?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    <Text style={[colorsmf?{margin:10,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:10,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Manage Main Folder</Text>
                    </TouchableOpacity>
                }
                 {lib.TPosition==='Dir' && 
                    <TouchableOpacity 
                    style={
                        [colorspw?
                            {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                        {flexDirection:'row',height:50,alignItems:'center'}
                        ]}
                    onPress={() => functionCombinedPW()}>
                        <Iconpw name={'clipboard-notes'} size={30} style={[colorspw?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    <Text style={[colorspw?{margin:15,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:15,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Paper Wetting</Text>
                    </TouchableOpacity>
                }
                 <TouchableOpacity 
                style={
                    [colorsn?
                        {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}
                    ]}
                onPress={() => functionCombinedN()}>
                    <View style={{flexDirection: 'row'}}>
                    <Iconn name={'notifications'} size={24} style={[colorsn?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    {lib.TMsgCount!='0' &&
                    <Badge
                        value={lib.TMsgCount}
                        status="error"
                        containerStyle={{  position: 'absolute',
                        top: +12,
                        right: +14 }}
                    />
                }
                
                </View>
                     
                    <Text style={[colorsn?{margin:10,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:10,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={
                    [colorsp?
                        {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}
                    ]}
                onPress={() => functionCombinedP()}>
                     <Iconp name={'person'} size={22} style={[colorsp?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    <Text style={[colorsp?{margin:15,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:15,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity   
                style={
                    [colorscp?
                        {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}
                    ]}
                onPress={() => functionCombinedCP()}>
                     <Iconc name={'account-convert'} size={24} style={[colorscp?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    <Text style={[colorscp?{margin:10,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:10,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={
                    [colorsl?
                        {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}
                    ]}
                onPress={() => functionCombinedl()}>
                     <Iconl name={'logout'} size={24} style={[colorsl?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
                    <Text style={[colorsl?{margin:12,fontSize:16,fontWeight:'bold',color:'black'}:
                    {margin:12,fontSize:16,fontWeight:'bold',color:'#606060'}]}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const RootDrawerNavigator = createDrawerNavigator({
    Courses: {
        screen: CourseStack,
        //navigationOptions: {
        //     title: 'Courses',

        //     drawerIcon: (tabInfo) => (
        //         <Icon name={'book'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }
        //}
    },
    PaperSetting: {
        screen: PaperSettingStack,
        //navigationOptions: {
        //     title: 'Courses',

        //     drawerIcon: (tabInfo) => (
        //         <Icon name={'book'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }
        //}
    },


    AllFolderStack: {

        screen: AllFolderViewStack,
        // navigationOptions: {
        //     // title: 'All Folders',



        //      drawerLabel: lib.TStatus=='DAF'?'All Folders':()=>null,
        //     drawerIcon:lib.TStatus!='DAF'?null:(tabInfo) => (
        //         <Icon name={'book'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }
    },
    MainFolderStack: {

        screen: MainFolderManageViewStack,
        // navigationOptions: {
        //     // title: 'All Folders',



        //      drawerLabel: lib.TStatus=='DAF'?'All Folders':()=>null,
        //     drawerIcon:lib.TStatus!='DAF'?null:(tabInfo) => (
        //         <Icon name={'book'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }
    },
    PaperWettingStack:{
        screen:PaperWettingViewStack,

    },
    NotificationStack:{
        screen:NotificationsViewStack,

    },
    Profile: {
        screen: ProfileStack,
        // navigationOptions: {
        //     title: "Profile",
        //     drawerIcon: (tabInfo) => (
        //         <Iconp name={'person'} size={24} color={tabInfo.tintColor}
        //         />
        //     )

        // }
    },
    ChangePassword: {
        screen: ChangePwdStack,
        // navigationOptions: {
        //     title: 'Change Password',
        //     drawerIcon: (tabInfo) => (
        //         <Iconc name={'account-convert'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }

    },
    LogOut: {
        screen: LogOutStack,
        // navigationOptions: {
        //     title: 'Log Out',
        //     drawerIcon: (tabInfo) => (

        //         <Iconl name={'logout'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }
    }
},
    {
        contentComponent: (props) => <CustomDrawerComponent {...props} name="ahmad" />,
        drawerWidth: '70%',

        contentOptions: {
            activeTintColor: 'red',
            // activeBackgroundColor: 'rgba(0,0,0,0.2)',
            //   activeBackgroundColor: '#eee',
            // inactiveTintColor: 'white',
            // inactiveBackgroundColor: '#4F4957',

            labelStyle: {
                fontSize: 16,

            }
        }
    }
);
export default createAppContainer(RootDrawerNavigator);