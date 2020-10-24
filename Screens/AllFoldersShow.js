import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Header, Item, Input, Icon } from 'native-base';
import * as lib from './storeData'
import _ from 'lodash'
import a from 'lodash'


export default class CoursesDetail extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            selectedIndex: 0,
            status: true,
            Coursesstatus: false,
            routeParam: '',
            ///// Teachers ///////
            Tdata: [],
            Tfulldata: [],
            Tquery: '',
            ///// Courses ////////
            Cdata: [],
            Cfulldata: [],
            Cquery: '',

        }
    }



    ////////////// SegmentedControlTab //////////////////////////////////////////
    handleIndexChange = index => {
        this.setState({
            selectedIndex: index

        })

        if (this.state.selectedIndex == 0) {
            if (this.state.status == true && this.state.Coursesstatus == false) {
                this.setState({ status: false, Coursesstatus: true })
            }
        }
        if (this.state.selectedIndex == 1) {
            if (this.state.status == false && this.state.Coursesstatus == true) {
                this.setState({ status: true, Coursesstatus: false })
            }
        }
    };



    /////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Display All Teachers //////////////////////////////////////////////////


    ShowNewScreenT(empno,empfn,empmn,empln,empImg) {

        lib.TIdAF = empno;
        lib.TFNameAF=empfn;
        lib.TMNameAF=empmn;
        lib.TLNameAF=empln;
        lib.TImgAF=empImg;
        this.props.navigation.navigate('coursesAF')
    }


    renderItemT = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={this.ShowNewScreenT.bind(this, item.emp_no,item.emp_firstname,item.emp_middle,item.emp_lastname,item.Img)}
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

    renderseparatorT = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 77 }} >

            </View>
        )

    }

    handleSearchT = (text) => {
        const formattedQuery = text.toUpperCase()
        const Tdata = _.filter(this.state.Tfulldata, photo => {
            if (photo.emp_firstname.includes(formattedQuery)) {
                return true
            }
            return false
        })
        this.setState({ Tdata, Tquery: text })

    }



    //////////////////////// Get Teachers ////////////////////////////////////////
    getTeachers() {

        const url = `${lib.IpAddress}/users/AllTeachers`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                //  console.log(responsejson)
                this.setState(
                    {
                        Tdata: responsejson,
                        isLoading: false,
                        Tfulldata: responsejson

                    }
                )


            })
            .catch((error) => {
                console.log(error)
            })

    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// Display All Courses //////////////////////////////////////////////////////


    ShowNewScreenC(cno,cname) {
        lib.SemNoCAF='2018SM';
        lib.CNo=cno;
        lib.CName=cname;
        this.props.navigation.navigate('CoursesDetailCAF');



    }


    renderItemC = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={this.ShowNewScreenC.bind(this,item.course_no,item.title)}
            >
                <View style={{ margin: 10, width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 14, }}>{item.course_desc}</Text>
                </View>


                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>


                    <Text style={{ fontSize: 16, color: 'black', width: '95%' }}>
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#808080' }}>
                        {item.course_desc}({item.course_no})
</Text>

                </View>


            </TouchableOpacity>
        )
    }

    renderseparatorC = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 85 }} >

            </View>
        )

    }

    handleSearchC = (text) => {
        const formattedQueryC = text.toUpperCase()
        const Cdata = a.filter(this.state.Cfulldata, photo => {
            if (photo.title.includes(formattedQueryC)) {
                return true
            }
            return false
        })
        this.setState({ Cdata, Cquery: text })

    }



    //////////////////////// Get Courses ////////////////////////////////////////
    getCourses() {

        const url = `${lib.IpAddress}/users/AllCourses`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                this.setState(
                    {
                        Cdata: responsejson,
                        isLoading: false,
                        Cfulldata: responsejson

                    }
                )


            })
            .catch((error) => {
                console.log(error)
            })

    }









    componentDidMount() {
        this.getTeachers();
        this.getCourses();

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

                        <SegmentedControlTab
                            tabTextStyle={styles.tabTextStyle}
                            values={["Teachers", "Courses"]}
                            tabsContainerStyle={styles.tabsContainerStyle}
                            activeTabStyle={styles.activeTabStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={styles.tabstyle}
                        />

                        <View style={{flex:1}}>

                            <View searchBar rounded style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                                <Item>
                                    <Icon name="ios-search" />
                                    <Input placeholder="Search" onChangeText={this.handleSearchT} />
                                    <Icon name="ios-people" />
                                </Item>

                            </View>


                            <TouchableWithoutFeedback
                                onPress={() => { Keyboard.dismiss() }}>
                                <View style={{ backgroundColor: '#FFFFFF',flex:1 }}>
                                    <FlatList
                                        data={this.state.Tdata}
                                        renderItem={this.renderItemT}
                                        keyExtractor={(item, index) => index.toString()}
                                        ItemSeparatorComponent={this.renderseparatorT}
                                    />
                                </View>
                            </TouchableWithoutFeedback>

                        </View>


                    </View>
                    :
                    this.state.Coursesstatus ?
                        <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>

                            <SegmentedControlTab
                                tabTextStyle={styles.tabTextStyle}
                                values={["Teachers", "Courses"]}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                activeTabStyle={styles.activeTabStyle}
                                selectedIndex={this.state.selectedIndex}
                                onTabPress={this.handleIndexChange}
                                tabStyle={styles.tabstyle}
                            />
                            <View style={{flex:1}}>

                                <View searchBar rounded style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                                    <Item>
                                        <Icon name="ios-search" />
                                        <Input placeholder="Search" onChangeText={this.handleSearchC} />
                                        <Icon name="book" />
                                    </Item>

                                </View>


                                <TouchableWithoutFeedback
                                    onPress={() => { Keyboard.dismiss() }}>
                                    <View style={{ backgroundColor: '#FFFFFF',flex:1 }}>
                                        <FlatList
                                            data={this.state.Cdata}
                                            renderItem={this.renderItemC}
                                            keyExtractor={(item, index) => index.toString()}
                                            ItemSeparatorComponent={this.renderseparatorC}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>

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
        marginBottom: 0
    },
    tabstyle: {
        borderColor: 'green'

    },
    activeTabStyle: {
        backgroundColor: 'green',

    }
});

