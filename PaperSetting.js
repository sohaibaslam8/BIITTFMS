import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'native-base';
import { Appbar } from 'react-native-paper';
import Iconm from 'react-native-vector-icons/FontAwesome';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Item, Input, Icon } from 'native-base';
import _ from 'lodash'

export default class CoursesDetail extends React.Component {

    constructor() {
        super()
        this.state = {

            fulldata: [],
            data: [],
            isLoading: true,
            selectedIndex: 0,
            SubTopics: [],
            selectedLabel: '',
            rowkey: '',
            status: true,
            MainFolderstatus: false,
            SemNo: '2018SM',
            Teachers: [],
            Sections: [],
            CourseAllocate: [],
            modalShow: false,
            query: '',


        }
    }




    ////////////// SegmentedControlTab //////////////////////////////////////////
    handleIndexChange = index => {
        this.setState({
            selectedIndex: index

        })

        if (this.state.selectedIndex == 0) {
            if (this.state.status == true && this.state.MainFolderstatus == false) {
                this.setState({ status: false, MainFolderstatus: true })
            }
        }
        if (this.state.selectedIndex == 1) {
            if (this.state.status == false && this.state.MainFolderstatus == true) {
                this.setState({ status: true, MainFolderstatus: false })
            }
        }
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////   Topics /////////////////////////////////////////////////////////////
    findTaskIndex(taskId) {

        let { SubTopics } = this.state;
        for (var i = 0; i < SubTopics.length; i++) {
            if (SubTopics[i].ST_Id == taskId) {
                return i;
            }
        }
        return -1;
    }
    toggleCheckForTask(taskId) {

        this.SubmitCoveredSubTopic();
        this.setState({ modalShowST: false })
        var foundindex = this.findTaskIndex(taskId);

        var newsubtopic = this.state.SubTopics;
        newsubtopic[foundindex].isChecked = !newsubtopic[foundindex].isChecked;
        this.setState({
            SubTopics: newsubtopic
        });
        console.log("index of this task is ", foundindex);


    }



    renderItem = ({ item }) => {
        // console.log("helleoldkjfk" + item.isChecked)
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', }}
            >
                <Iconw name={'calendar-week'} size={30} color={'#3a3a3a'}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontSize: 14, color: '#3a3a3a', fontWeight: '600', width: '80%' }}>
                        {item.ST_Name}
                    </Text>
                    <View style={{ right: 40, position: 'absolute', }}>
                        <CheckBox checked={item.isChecked} color="green"

                        //    onPress={() =>item.isChecked!==true?this.setState({ rowkey: item.ST_Id, modalShowST: true }):Alert.alert("The checkbox is already checked.")}

                        />
                    </View>

                </View>

            </View>

        )
    }
    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 73 }} >

            </View>
        )

    }

    ///////////////////// CheckBox Checked Or Not //////////////////////////////////
    findIndex(taskId) {

        let { SubTopics } = this.state;
        for (var i = 0; i < SubTopics.length; i++) {
            if (SubTopics[i].ST_Id == taskId) {
                return i;
            }
        }
        return -1;
    }
    CheckBoxSelect(taskId) {

        var foundindex = this.findIndex(taskId);

        var newsubtopic = this.state.SubTopics;
        newsubtopic[foundindex].isChecked = !newsubtopic[foundindex].isChecked;
        this.setState({
            SubTopics: newsubtopic
        });

    }

    SubTopicCheckboxCheckOrNot(id) {

        var c = 0;
        for (var i = 0; i < lib.countPS; i++) {
            const url = `http://192.168.43.143/FWebAPI/api/users/SubTopicCheckboxCheckOrNot?id=${id}&section=${this.state.CourseAllocate[i].SECTION}&discipline=${this.state.CourseAllocate[i].DISCIPLINE}&semc=${this.state.CourseAllocate[i].SemC}&semester_no=${this.state.CourseAllocate[i].SEMESTER_NO}&empno=${this.state.CourseAllocate[i].EMP_NO}`
            fetch(url)
                .then((response) => response.json())
                .then((responsejson) => {
                    // console.log(responsejson);
                    if (responsejson == 'true') {

                        c++;
                        if (c == lib.countPS) {


                            this.CheckBoxSelect(id);
                        }


                    }

                })
                .catch((error) => {
                    console.log(error)
                })


        }


    }

    ShowTopics() {
        lib.countPS = this.state.CourseAllocate.length;
        console.log("Course Count" + lib.countPS);

        this.state.SubTopics.map((data) => {
            var o = Object.assign({}, data);
            o.isChecked = false;
            return o;

        });

        //   lib.WeekNoSST='Week-1'
        //   lib.CNo='CS-686'
        const url = `http://192.168.43.143/FWebAPI/api/users/AllSubTopicPaperSetting?courseno=${lib.CNoPS}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                this.setState(
                    {
                        SubTopics: responsejson,
                        isLoading: false,

                        fulldata: responsejson
                    }
                )

                for (var i = 0; i < this.state.SubTopics.length; i++) {

                    this.SubTopicCheckboxCheckOrNot(this.state.SubTopics[i].ST_Id);

                }



            })
            .catch((error) => {
                console.log(error)
            })
        
    }
    handleSearch = (text) => {
        const formattedQuery = text.toUpperCase()
        const SubTopics = _.filter(this.state.fulldata, photo => {
            if (photo.ST_Name.includes(formattedQuery)) {
                return true
            }
            return false
        })
        this.setState({ SubTopics, query: text })

    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////// Course Detail /////////////////////////////////////////////////////////

    ShowNewScreenCD(empno) {

        // this.setState({TId:empno})
        this.setState({ modalShow: true })
        this.getSections(empno);
    }


    renderItemCD = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={this.ShowNewScreenCD.bind(this, item.emp_no)}
            >
                <View style={{ margin: 10, width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>{item.emp_firstname[0]}</Text>
                </View>


                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>


                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600' }}>
                        {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'black' }}>
                        {item.emp_no}
                    </Text>

                </View>

            </TouchableOpacity>
        )
    }

    renderseparatorCD = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 77 }} >

            </View>
        )

    }


    //////////////////////// Get Teachers ////////////////////////////////////////
    getTeachers() {
        console.log(this.state.CourseAllocate[0].DISCIPLINE);

        const url = `http://192.168.43.143/FWebAPI/api/users/AllTeachersShowPaperSetting?courseno=${lib.CNoPS}&semesterno=${this.state.SemNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                //  console.log(responsejson)
                this.setState(
                    {
                        Teachers: responsejson,



                    }
                )


            })
            .catch((error) => {
                console.log(error)
            })

    }


    ////////////////////////////// Teachers Section /////////////////////////////////////////////
    renderItemS = ({ item }) => {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', }}
            >

                <Iconm name={'folder'} size={25} color={'#3a3a3a'}
                    style={{ margin: 15 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, color: '#3a3a3a', fontWeight: '600', }}>
                        {item.DISCIPLINE}  {item.SemC} {item.SECTION}
                    </Text>
                </View>

            </View>
        )
    }

    renderseparatorS = () => {

        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 63 }} >

            </View>
        )

    }



    getSections(Tid) {
        // this.setState({isLoading:true})

        // console.log(lib.CNo);
        this.setState({ modalShow: true })
        console.log(lib.CName);
        const url = `http://192.168.43.143/FWebAPI/api/Users/AllSections?id=${Tid}&courseno=${lib.CNoPS}&semno=${this.state.SemNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson);
                this.setState(
                    {
                        Sections: responsejson,

                    }
                )

            })
            .catch((error) => {
                console.log(error)
            })


    }

    CourseAllocateDetail() {
        const url = `http://192.168.43.143/FWebAPI/api/users/AllAllocateCoursesShowPaperSetting?courseno=${lib.CNoPS}&semesterno=${this.state.SemNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                  console.log("Course Allocate Detail",responsejson)
                this.setState(
                    {
                        CourseAllocate: responsejson,




                    }
                )
                this.ShowTopics();
                this.getTeachers();
            })
            .catch((error) => {
                console.log(error)
            })


    }




    componentDidMount() {


        this.CourseAllocateDetail();
    }





    render() {

        return (


            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :

                this.state.status ?


                    <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                        <View style={{ alignItems: "center", backgroundColor: '#FFFFFF' }}>
                            <Text style={{ fontSize: 20, color: 'black' }}>{lib.CNamePS}</Text>
                        </View>

                        <SegmentedControlTab
                            tabTextStyle={styles.tabTextStyle}
                            values={["Topics", "Course Detail"]}
                            tabsContainerStyle={styles.tabsContainerStyle}
                            activeTabStyle={styles.activeTabStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={styles.tabstyle}
                        />
                        <View style={styles.container}>
                            <View searchBar rounded style={{ marginLeft: 10, marginRight: 10, }}>
                                <Item>
                                    <Icon name="ios-search" />
                                    <Input placeholder="Search" onChangeText={this.handleSearch} />
                                    <Icon name="book" />
                                </Item>

                            </View>

                            {this.state.SubTopics != '' &&
                                <View style={{ backgroundColor: '#FFFFFF', flex: 1, marginTop: 4 }}>
                                    <FlatList
                                        data={this.state.SubTopics}
                                        renderItem={this.renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        ItemSeparatorComponent={this.renderseparator}

                                    />
                                </View>
                            }
                            {this.state.SubTopics == '' &&
                                <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

                                </View>
                            }


                        </View>


                    </View>
                    :
                    this.state.MainFolderstatus ?
                        <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                            {/* <View style={{alignItems:"center",backgroundColor:'#006400'}}>
                            <Text style={{fontSize:20,color:'white'}}>{lib.CNamePS}</Text>
                        </View> */}
                            <View style={{ alignItems: "center", backgroundColor: '#FFFFFF' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>{lib.CNamePS}</Text>
                            </View>


                            <SegmentedControlTab
                                tabTextStyle={styles.tabTextStyle}
                                values={["Topics", "Course Detail"]}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                activeTabStyle={styles.activeTabStyle}
                                selectedIndex={this.state.selectedIndex}
                                onTabPress={this.handleIndexChange}
                                tabStyle={styles.tabstyle}
                            />
                            <Modal
                                transparent={true}
                                visible={this.state.modalShow}>
                                {/* <View style={{backgroundColor: '#000000aa', flex:1}}>  */}
                                <View style={{ backgroundColor: '#e9e9e9', flex: 1, }}>

                                    <Appbar.Header
                                        style={{ backgroundColor: "green" }}
                                    >

                                        <Appbar.Content
                                            title="Sections"


                                        />

                                        <Appbar.Action icon="close" onPress={() => { this.setState({ modalShow: false }) }} />
                                    </Appbar.Header>
                                    <View style={{ backgroundColor: '#FFFFFF', }}>
                                        <FlatList

                                            data={this.state.Sections}
                                            renderItem={this.renderItemS}
                                            keyExtractor={(item, index) => index.toString()}
                                            ItemSeparatorComponent={this.renderseparatorS}
                                        />
                                    </View>
                                </View>

                                {/* </View> */}
                            </Modal>

                            <View style={{ backgroundColor: '#FFFFFF', marginTop: 10 }}>
                                <FlatList
                                    data={this.state.Teachers}
                                    renderItem={this.renderItemCD}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatorCD}
                                />



                            </View>
                        </View>
                        :
                        null
        );
    }
}
const styles = StyleSheet.create({
    tabTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',

    },
    container: {
        flex: 1,
    },
    tabsContainerStyle: {
        // margin: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,

    },
    tabstyle: {
        borderColor: 'green'

    },
    activeTabStyle: {
        backgroundColor: 'green',

    }
});

