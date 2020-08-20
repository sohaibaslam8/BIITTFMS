import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, StatusBar, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { Appbar } from 'react-native-paper';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconsm from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";


export default class CoursesDetail extends React.Component {

    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            selectedIndex: 0,
            status: true,
            MainFolderstatus: false,
            routeParam: '',
            modalShow: false,
            exportId: lib.Id,
            semesterno: [],
            id: '',
            datasourcemf: [
                { name: 'Course Objective', url: require('./img/goal.png'), key: '1' },
                { name: 'Contents Reference Material', url: require('./img/content.png'), key: '2' },
                { name: 'Marks Distribution_Grading Policy', url: require('./img/marks.png'), key: '3' },
                { name: 'Weekly Plan', url: require('./img/calendar.png'), key: '4' },
                { name: 'Notes and LabManuals', url: require('./img/paper.png'), key: '5' },
                { name: 'Exams and Solutions', url: require('./img/exam.png'), key: '6' },

            ],
        }
    }


    /////////////// Main Folder //////////////////////////////////////
    ShowNextScreenmf(key) {
        lib.Token = 'true';
        lib.SemNoTemp=lib.SemNoCAF;
        lib.MainFM = '';
        if (key == 1) {
            this.props.navigation.navigate('CourseObjectives')

        }
        if (key == 2) {
            this.props.navigation.navigate('ContentsRM')
        }
        if (key == 3) {
            this.props.navigation.navigate('MarksDistributionGP')
        }
        if (key == 4) {
            this.props.navigation.navigate('WeeklPlanMainFolder')
        }
        if (key == 5) {
            this.props.navigation.navigate('NALM')
        }
        if (key == 6) {
            this.props.navigation.navigate('EASStack')
        }


    }
    renderItemmf = ({ item }) => {
        return (

            <TouchableOpacity

                onPress={this.ShowNextScreenmf.bind(this, item.key)}

                style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}
            >

                <Image
                    source={item.url}
                    style={{ height: 60, width: 60, margin: 15 }}

                ></Image>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600', }}>
                        {item.name}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    renderseparatormf = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 92 }} >

            </View>
        )

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


    /////////////   Sections //////////////////////////////////////////////////
    ShowNewScreen(item) {
        // console.log(item)
        lib.TIdTemp = item.EMP_NO;
        lib.SemNoTemp=lib.SemNoCAF;
        lib.Token = 'true';
        lib.MainFM = '';
        lib.Discipline = item.DISCIPLINE;
        lib.Section = item.SECTION;
        lib.Semc = item.SemC;

        this.props.navigation.navigate('SectionFolder')
    }



    renderItem = ({ item }) => {
        return (
            <TouchableOpacity

                onPress={this.ShowNewScreen.bind(this, item)}

                style={{ flex: 1, flexDirection: 'row', }}
            >
                <Icon name={'file-directory'} size={55} color={'#C0C0C0'}
                    style={{ margin: 6 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600', }}>
                        {item.DISCIPLINE}  {item.SemC} {item.SECTION}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#808080', width: '95%' }}>
                        {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
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

    ////////////////////////// Show All Section ///////////////////////////////////

    ShowCourseDetail() {

        this.setState({ isLoading: true })
        const url = `http://192.168.43.143/FWebAPI/api/Users/CourseDetail?courseno=${lib.CNo}&semno=${lib.SemNoCAF}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson);
                this.setState(
                    {
                        datasource: responsejson,
                        isLoading: false

                    }
                )

            })
            .catch((error) => {
                console.log(error)
            })

    }

     ////////////////// Modal Functions /////////////////////////////////////////////////////
     HideModel(semno) {
        lib.SemNoCAF = semno;
        // lib.SemNoTemp=semno;

        this.setState({ modalShow: false });
         this.ShowCourseDetail();


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
     ///////////////////////// Get Semester Number //////////////////////////////////////////
     getsemesternumber() {
        const url = `http://192.168.43.143/FWebAPI/api/Users/AllSemesterNumber`
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
        //    lib.CNo=this.props.navigation.getParam('cno');


        this.ShowCourseDetail();
        this.getsemesternumber();





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
                        <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                            <Text style={{ fontSize: 20, width: '95%', textAlign: 'center' }}>{lib.CName}</Text>

                        </View>
                        <View>

                            <TouchableOpacity
                                onPress={() => { this.setState({ modalShow: true }) }}
                            >
                                <StatusBar backgroundColor="#028504" barStyle="default" />
                                <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, marginTop: 15, marginLeft: 25, marginRight: 25, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                                    <Iconm name={'folder'} size={20} color={'green'}
        style={{ marginLeft: 15 }}
    />
                                    <Text style={{ marginLeft: 20, color: 'green', fontSize: 16 }}>
                                        {lib.SemNoCAF}
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

                        <SegmentedControlTab
                            tabTextStyle={styles.tabTextStyle}
                            values={["Section", "Main Folder"]}
                            tabsContainerStyle={styles.tabsContainerStyle}
                            activeTabStyle={styles.activeTabStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={styles.tabstyle}
                        />

                        <View style={{ backgroundColor: '#FFFFFF' }}>

                            <FlatList
                                data={this.state.datasource}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparator}
                            />


                        </View>
                    </View>
                    :
                    this.state.MainFolderstatus ?
                        <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                            <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                                <Text style={{ fontSize: 20, width: '95%', textAlign: 'center' }}>{lib.CName}</Text>

                            </View>
                            <View>

                                <TouchableOpacity
                                    onPress={() => { this.setState({ modalShow: true }) }}
                                >
                                    <StatusBar backgroundColor="#028504" barStyle="default" />
                                    <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, marginTop: 15, marginLeft: 25, marginRight: 25,marginBottom:5,  flexDirection: 'row', alignItems: 'center' }}>
                                        <Iconm name={'folder'} size={20} color={'green'}
        style={{ marginLeft: 15 }}
    />
                                        <Text style={{ marginLeft: 20, color: 'green', fontSize: 16 }}>
                                            {lib.SemNoCAF}
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

                            <SegmentedControlTab
                                tabTextStyle={styles.tabTextStyle}
                                values={["Section", "Main Folder"]}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                activeTabStyle={styles.activeTabStyle}
                                selectedIndex={this.state.selectedIndex}
                                onTabPress={this.handleIndexChange}
                                tabStyle={styles.tabstyle}
                            />

                            <View style={{ flex: 1, marginTop: 10,backgroundColor: '#FFFFFF' }}>



                                <FlatList


                                    data={this.state.datasourcemf}
                                    renderItem={this.renderItemmf}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatormf}
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
    tabsContainerStyle: {
        margin: 10,
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 10,

    },
    tabstyle: {
        borderColor: 'green'

    },
    activeTabStyle: {
        backgroundColor: 'green',

    }
});

