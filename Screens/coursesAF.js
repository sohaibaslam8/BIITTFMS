import React, { Component } from 'react';
import Icons from 'react-native-vector-icons/Octicons';
import { Text, View, FlatList, StyleSheet, StatusBar, Alert, ActivityIndicator, Modal, TouchableOpacity, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar } from 'react-native-paper';
import Iconsm from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'
import Iconm from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';


class courses extends Component {

    constructor() {
        super()
        this.state = {
            datasource: [],
            semesterno: [],
            isloading: true,
            routeParam: '',
            selectedLabel: '',
            modalShow: false,
            Tid: '',
           


        }
    }

    ShowNewScreen(cno, cname) {
        lib.TokenAF='true';
        lib.Token='true';
        lib.CNo = cno;
        lib.CName = cname;
       
        this.props.navigation.navigate('CoursesDetailAF')
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowNewScreen.bind(this, item.c.course_no, item.c.title)}
                style={{ flex: 1, flexDirection: 'row' }}
            >
                <Icons name={'file-directory'} size={55} color={'#C0C0C0'}
                    style={{ margin: 6 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>


                    <Text style={{ fontSize: 16, color: 'black', width: '95%' }}>
                        {item.c.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#808080' }}>
                        {item.c.course_desc}({item.c.course_no})
                    </Text>

                </View>

            </TouchableOpacity>
        )
    }

    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 66 }} >

            </View>
        )

    }
    ////////////////// Modal Functions /////////////////////////////////////////////////////
    HideModel(semno) {
        console.log(semno);
        console.log(lib.TIdAF);
        lib.SemNoAF = semno;

        this.setState({ modalShow: false });
        this.getcourses();
        

    }
    renderItemm = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.HideModel.bind(this, item)}
                style={{ flex: 1, flexDirection: 'row', }}
            >

                <Iconm name={'folder'} size={25} color={'#3a3a3a'}
                    style={{ margin: 15 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, color: '#3a3a3a', fontWeight: '600', }}>
                        {item}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    renderseparatorm = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 65 }} >

            </View>
        )

    }


    //////////////////////// Get Teachers Courses ////////////////////////////////////////
    getcourses() {
        const url = `${lib.IpAddress}/Users/AllCourses?id=${lib.TIdAF}&semno=${lib.SemNoAF}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
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
    ///////////////////////// Get Semester Number //////////////////////////////////////////
    getsemesternumber() {
        const url = `${lib.IpAddress}/Users/AllSemesterNumber`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                //  console.log(responsejson[0])
                //   lib.SemNo=responsejson[0]
                this.setState(
                    {
                        semesterno: responsejson,



                    }

                )

                // console.log(this.state.semesterno);


            })
            .catch((error) => {
                console.log(error)
            })


    }


    componentDidMount() {
        lib.SemNoAF='2018SM';


        setTimeout(()=>{
            this.getsemesternumber();
            this.getcourses();

        },1000)
       
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
                    <View 
                   
                    style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                        <Image style={{ height: 60, width: 60, borderRadius: 30, margin: 15 }}
                            source={lib.TImgAF != null ? { uri: 'data:image/jpeg;base64,' + lib.TImgAF } :
                                require('../img/demoprofile.jpg')
                            }


                        />
                        <View>
                            <Text style={{ fontSize: 16, }}>

                                {lib.TFNameAF + ' ' + lib.TMNameAF + ' ' + lib.TLNameAF}
                            </Text>
                            <Text style={{ fontSize: 14, borderWidth: 0, width: '90%', color: '#808080' }}>
                                Barani Institute of Information Technology
                </Text>
                        </View>
                    </View>

                    <View>

                        <TouchableOpacity
                            onPress={() => { this.setState({ modalShow: true }) }}
                        >
                            <StatusBar backgroundColor="#028504" barStyle="default" />
                            <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, marginTop: 15, marginLeft: 25, marginRight: 25, marginBottom: 15, flexDirection: 'row', alignItems: 'center' }}>
                                {/* <Iconm name={'folder'} size={20} color={'green'}
                                style={{ marginLeft: 15 }}
                            /> */}
                                <Text style={{ marginLeft: 20, color: 'green', fontSize: 16 }}>
                                    {lib.SemNoAF}
                                    {/* Week Numbers */}
                                </Text>
                                <View
                                    style={{
                                        right: 15,
                                        position: "absolute",
                                    }}
                                >
                                    <Iconsm name={'caretdown'} size={14} color={'green'}


                                    />
                                </View>


                            </View>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            visible={this.state.modalShow}>
                            {/* <View style={{backgroundColor: '#000000aa', flex:1}}>  */}
                            <View style={{ backgroundColor: '#ffffff', flex: 1, }}>

                                <Appbar.Header
                                    style={{ backgroundColor: "green" }}
                                >

                                    <Appbar.Content
                                        title="Select Semester"


                                    />

                                    <Appbar.Action icon="close" onPress={() => { this.setState({ modalShow: false }) }} />
                                </Appbar.Header>

                                <FlatList
                                    data={this.state.semesterno}
                                    renderItem={this.renderItemm}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatorm}
                                />
                            </View>

                            {/* </View> */}
                        </Modal>
                    </View>

                    <View style={{ backgroundColor: '#FFFFFF' }}>
                        <FlatList
                            data={this.state.datasource}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderseparator}
                        />
                    </View>
                    {this.state.datasource == '' &&
                        <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

                        </View>
                    }


                </View>



        );
    }


}
export default courses;
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


