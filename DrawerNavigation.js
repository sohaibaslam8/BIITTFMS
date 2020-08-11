import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Image, SafeAreaView, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React,{useState} from 'react';
import { createAppContainer } from 'react-navigation';
import CourseStack from './CourseStack';
import PaperSettingStack from './PaperSettingStack';
import AllFolderStack from './AllFolderStack';
import ProfileStack from './ProfileStack';
import ChangePwdStack from './ChangePwdStack';
import LogOutStack from './LogOut';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconp from 'react-native-vector-icons/Fontisto';
import Iconc from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconl from 'react-native-vector-icons/AntDesign';
import Iconps from 'react-native-vector-icons/Feather';
import Iconf from 'react-native-vector-icons/FontAwesome';
import * as lib from './storeData'



const functionCombined=()=> {
    props.navigation.navigate('Courses')
        // this.functionTwo();
    } 

const CustomDrawerComponent = (props) => {
    const [colorsc,setcolorsc]=useState(true);
    const [colorsps,setcolorsps]=useState(false);
    const [colorsaf,setcolorsaf]=useState(false);
    const [colorsp,setcolorsp]=useState(false);
    const [colorscp,setcolorscp]=useState(false);
    const [colorsl,setcolorsl]=useState(false);
    const functionCombinedC=()=> {
        props.navigation.navigate('Courses')
        setcolorsc(true);
        setcolorsps(false);
        setcolorsaf(false);
        setcolorsp(false);
        setcolorscp(false);
        setcolorsl(false);
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
    }
        const functionCombinedAF=()=> {
             props.navigation.navigate('AllFolderStack')
            setcolorsaf(true);
            setcolorsps(false);
            setcolorsc(false);
            setcolorsp(false);
            setcolorscp(false);
            setcolorsl(false);
        } 
            const functionCombinedP=()=> {
                props.navigation.navigate('Profile')
                setcolorsp(true);
                setcolorsps(false);
                setcolorsc(false);
                setcolorsaf(false);
                setcolorscp(false);
                setcolorsl(false);


                }
                const functionCombinedCP=()=> {
                    props.navigation.navigate('ChangePassword')
                    
                    setcolorscp(true);
                    setcolorsps(false);
                    setcolorsc(false);
                    setcolorsaf(false);
                    setcolorsp(false);
                    setcolorsl(false);
                    }
                    const functionCombinedl=()=> {
                        props.navigation.navigate('LogOut')
                        setcolorsl(true);
                        setcolorsps(false);
                        setcolorscp(false);
                        setcolorsc(false);
                        setcolorsaf(false);
                        setcolorsp(false);
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
                <Icon  name={'book'} size={24} style={[colorsc?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}
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
                 {lib.TStatus==='DAF' &&
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
                <TouchableOpacity 
                style={
                    [colorsp?
                        {flexDirection:'row',height:50,alignItems:'center',backgroundColor:'#e9e9e9'}:
                    {flexDirection:'row',height:50,alignItems:'center'}
                    ]}
                onPress={() => functionCombinedP()}>
                     <Iconp name={'person'} size={24} style={[colorsp?{margin:20,color:'black'}:{margin:20,color:'#606060'}]}/>
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

        screen: AllFolderStack,
        // navigationOptions: {
        //     // title: 'All Folders',



        //      drawerLabel: lib.TStatus=='DAF'?'All Folders':()=>null,
        //     drawerIcon:lib.TStatus!='DAF'?null:(tabInfo) => (
        //         <Icon name={'book'} size={24} color={tabInfo.tintColor}
        //         />
        //     )
        // }
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