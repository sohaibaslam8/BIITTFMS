import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator,TouchableWithoutFeedback, FlatList, Modal, Platform, Alert, Dimensions, ScrollView, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsm from 'react-native-vector-icons/AntDesign';
import { CheckBox, Item, Input, Label } from 'native-base';

import * as lib from './storeData'
class WeeklyPlanMainFolder extends Component {


    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {

            isloading: true,


            modalShow: false,
            modalShowSno:false,


            SemNo: '2018SM',
            CourseAllocate: [],
            SearchMainFolderRecord: [],
            semesterno:[],
        };
    }

    SubmitMainFolderManageDetail() {
        let collection = {}

        console.log(collection)


                collection.TId = lib.TIdMFM,
                collection.Course_no = lib.CNoMFM,
                collection.Semester_no = lib.SemNoMFM,
                
        fetch(`${lib.IpAddress}/users/AddMainFolderManageRecord`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((data) => {

                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });



    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Show Semester no //////////////////////////////////////////////////////////
    HideModelSno(semno) {
        lib.SemNoMFM = semno;
        lib.TFNameMFM='';
        lib.TMNameMFM='';
        lib.TLNameMFM='';
        lib.TIdMFM='';

        this.setState({ modalShowSno: false });
        this.CoursesAllocateTeachers();
        this.SearchMainFolderManageRecord();


    }
    renderItemSno = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.HideModelSno.bind(this, item)}
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

    renderseparatorSno = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 65 }} >

            </View>
        )

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Show Teachers ///////////////////////////////////////////////////////////

    HideModel(empno,fn, mn, ln) {
        lib.TIdMFM=empno
        lib.TFNameMFM = fn;
        lib.TMNameMFM = mn;
        lib.TLNameMFM = ln;

        this.setState({ modalShow: false });
        this.SubmitMainFolderManageDetail();

    }
    renderItemm = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.HideModel.bind(this,item.emp_no ,item.emp_firstname, item.emp_middle, item.emp_lastname)}
                style={{ flex: 1, flexDirection: 'row', }}
            >

                <Iconm name={'folder'} size={25} color={'#3a3a3a'}
                    style={{ margin: 15 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600', }}>
                        {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#808080' }}>
                        {item.emp_no}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    renderseparatorm = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 62 }} >

            </View>
        )

    }






    SearchMainFolderManageRecord() {
        const url = `${lib.IpAddress}/users/SearchMainFolderManageRecord?courseno=${lib.CNoMFM}&semesterno=${lib.SemNoMFM}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log("Main Folder Manage", responsejson)
                this.setState(
                    {
                        SearchMainFolderRecord: responsejson,

                    }
                )
                if (this.state.SearchMainFolderRecord != '') {
                    lib.TIdMFM=this.state.SearchMainFolderRecord[0].emp_no;
                    lib.TFNameMFM = this.state.SearchMainFolderRecord[0].emp_firstname;
                    lib.TMNameMFM = this.state.SearchMainFolderRecord[0].emp_middle;
                    lib.TLNameMFM = this.state.SearchMainFolderRecord[0].emp_lastname;

                }

                this.setState({ isloading: false })
            })
            .catch((error) => {
                console.log(error)
            })




    }


    CoursesAllocateTeachers() {
        const url = `${lib.IpAddress}/users/AllAllocateCoursesShowMainFolderManage?courseno=${lib.CNoMFM}&semesterno=${lib.SemNoMFM}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log("Course Allocate", responsejson)
                this.setState(
                    {
                        CourseAllocate: responsejson,
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
                this.setState(
                    {
                        semesterno: responsejson,
                    }
                    )
                })
            .catch((error) => {
                console.log(error)
            })
        }



    ///////////////////////////////// ComponentDidMount() /////////////////////////////////////////
    componentDidMount() {
        lib.SemNoMFM='2018SM'
        this.CoursesAllocateTeachers();
        this.SearchMainFolderManageRecord();
        this.getsemesternumber();
    }
  
    render() {
        console.disableYellowBox = true;
        return (
            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
               

                <View style={styles.maincontainer}>
                    <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>

                        <Text style={{ fontSize: 20, width: '95%', textAlign: 'center' }}>{lib.CNameMFM}</Text>


                    </View>
                    <View style={styles.container}>
                    <TouchableOpacity
                            onPress={() => { this.setState({ modalShowSno: true }) }}
                        >
                           
                            <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, margin: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <Iconm name={'folder'} size={20} color={'green'}
                                style={{ marginLeft: 15 }}
                            />
                                <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>
                                    {lib.SemNoMFM}
                                   
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
                            visible={this.state.modalShowSno}>
                            {/* <View style={{backgroundColor: '#000000aa', flex:1}}>  */}
                            <View style={{ backgroundColor: '#ffffff', flex: 1, }}>

                                <Appbar.Header
                                    style={{ backgroundColor: "green" }}
                                >

                                    <Appbar.Content
                                        title="Select Semester"


                                    />

                                    <Appbar.Action icon="close" onPress={() => { this.setState({ modalShowSno: false }) }} />
                                </Appbar.Header>

                                <FlatList
                                    data={this.state.semesterno}
                                    renderItem={this.renderItemSno}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatorSno}
                                />
                            </View>

                            {/* </View> */}
                        </Modal>

                        <TouchableOpacity
                            onPress={() => { this.setState({ modalShow: true }) }}
                        >
                            <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, margin: 15, flexDirection: 'row', alignItems: 'center' }}>
                                <Iconm name={'folder'} size={20} color={'green'}
                                    style={{ marginLeft: 15 }}
                                />
                                <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>
                                    {lib.TFNameMFM} {lib.TMNameMFM} {lib.TLNameMFM}
                                </Text>
                                {(this.state.SearchMainFolderRecord == '' && lib.TFNameMFM=='') &&
                                    <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>Select Teacher</Text>
                                }
                                <View
                                    style={{
                                        right: 15,
                                        position: "absolute",
                                    }}
                                >
                                    
                                    <Iconsm name={'caretdown'} size={14} color={'green'} />
                                    
                                     </View>


                            </View>
                        </TouchableOpacity>
                        <Modal
                            transparent={true}
                            visible={this.state.modalShow}>
                            <View style={{ backgroundColor: '#FFFFFF', flex: 1, }}>
                            {/* transparent={true}
                            // visible={this.state.modalShow}>
                            // <View style={{ backgroundColor: '#ffffff', marginTop: 250, marginLeft: 15, marginRight: 15 }}>
                 */}

                                <Appbar.Header
                                    style={{ backgroundColor: "green" }}
                                >

                                    <Appbar.Content
                                        title="Select Teacher"


                                    />

                                    <Appbar.Action icon="close" onPress={() => { this.setState({ modalShow: false }) }} />
                                </Appbar.Header>
                                
                                    <FlatList
                                    data={this.state.CourseAllocate}
                                    renderItem={this.renderItemm}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatorm}
                                />
                                 
                                
                            </View>
                            {this.state.CourseAllocate=='' &&
                                <View style={{alignItems:'center',flex:1,backgroundColor: '#FFFFFF'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            } 

                            {/* </View> */}
                        </Modal>
                        {/* <View style={{ backgroundColor: '#FFFFFF' }}>
                                <FlatList
                                    data={this.state.SubTopics}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparator}

                                />
                            </View>
                            {this.state.SubTopics=='' &&
                                <View style={{marginTop:'10%',marginBottom:'10%',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            } */}




                    </View>

                </View>
               

        );
    }



}
export default WeeklyPlanMainFolder;
const styles = StyleSheet.create(
    {
        maincontainer: {
            flex: 1,
            backgroundColor: '#e9e9e9',
        },
        container: {
            // flex: 1,
            marginTop: 40,
        },

        header: {
            //  backgroundColor:'blue',
            height: 50,

        },
        inputicon: {
            // position: 'absolute',
            bottom: 55,
            right: 35,
            position: "absolute",
            zIndex: 1
        },


    }
);

