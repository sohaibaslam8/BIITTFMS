import React, { Component } from 'react';
import Icons from 'react-native-vector-icons/Octicons';
import { Text, View, FlatList, StyleSheet, StatusBar, Alert, ActivityIndicator, Modal, TouchableOpacity, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar } from 'react-native-paper';
import Iconsm from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'
import Iconm from 'react-native-vector-icons/FontAwesome';


class TeacherCoursesPs extends Component {

    constructor() {
        super()
        this.state = {
            datasource: [],
            semesterno: [],
            isloading: true,
            routeParam: '',
            selectedLabel: '',
            modalShow: false,


        }
    }
  

    ShowNewScreen(cno,cname) {

        //  alert(cno +cname)
        lib.CNoPS = cno;
        lib.CNamePS=cname;
        this.props.navigation.navigate('PaperSetting')
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowNewScreen.bind(this,item.c.course_no,item.c.title)}
                // onPress={() => Alert.alert("hello")}
                style={{ flex: 1, flexDirection: 'row' }}
            >
                {/* <Icons name={'file-directory'} size={55} color={'#C0C0C0'}
                    style={{ margin: 6 }}
                /> */}
                 <View style={{ margin: 10, width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{item.c.course_desc}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>


                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600' }}>
                        {item.c.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'green' }}>
                        {item.c.course_desc}({item.c.course_no})
                    </Text>

                </View>

            </TouchableOpacity>
        )
    }

    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 76 }} >

            </View>
        )

    }
  

    //////////////////////// Get Teachers Courses ////////////////////////////////////////
    getcourses() {
        const url = `http://192.168.10.8/FWebAPI/api/Users/AllCourses?id=${lib.TId}&semno=${lib.SemNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                this.setState(
                    {
                        datasource: responsejson,
                        isloading: false

                    }
                )


            })
            .catch((error) => {
                console.log(error)
            })

    }
  

    componentDidMount() {


        this.getcourses();

    }






    render() {
        return (

            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :

                <View style={styles.container}>
                    <View style={{backgroundColor:'#FFFFFF'}}>
                        <FlatList
                            data={this.state.datasource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderseparator}
                        />
                    </View>
                    {this.state.datasource=='' &&
                                <View style={{marginTop:'20%',marginBottom:'10%',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            }


                </View>



        );
    }


}
export default TeacherCoursesPs;
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#e9e9e9',

        },
        gradient: {
            flex: 1,

        }

    }
);


