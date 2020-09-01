import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';


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
            exportId: lib.Id,
            id: '',
            multipleFilec: [],
            multipleFilef: [],
            tempFilef:[],
            SubTopics: [],
            CourseAllocate: [],
            SemNo:'2018SM'
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

    /////////////////////////////////////////////////////////////////////////////////////
    /////////////// Complete Topic Detail ///////////////////////////////////////////////

    /////////////// Show Files in Flat List ////////////////////////
    renderItemc = ({ item }) => {
        return (
            <View

                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >

                <Iconw name={'calendar-week'} size={30} color={'#3a3a3a'}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600', }}>
                        {item.DISCIPLINE}  {item.SemC} {item.SECTION}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#808080', width: '95%' }}>
                        {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
                    </Text>
                </View>
                <View style={{ right: 30, position: 'absolute', fontSize: 16, color: 'black', fontWeight: '600', }}>
                    <Text>{item.week_no}</Text>
                </View>


            </View>
        )
    }
    renderseparatorc = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 68 }} >

            </View>
        )

    }

    ///////////////////// Show Complete Topic Section ///////////////////////////////////////////
    ShowCompleteTopicSection() {
        const url = `http://192.168.43.143/FWebAPI/api/users/TopicDetail?id=${lib.TopicIdPS}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        multipleFilec: responsejson,
                        
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////// Uncomplete Topic Detail ////////////////////////////////////////////

      /////////////// Show Files in Flat List ////////////////////////
      renderItemuc = ({ item }) => {
        return (
            <View

                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >

                <Iconw name={'calendar-week'} size={30} color={'#3a3a3a'}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600', }}>
                        {item.DISCIPLINE}  {item.SemC} {item.SECTION}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#808080', width: '95%' }}>
                        {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
                    </Text>
                </View>
                {/* <View style={{ right: 30, position: 'absolute', fontSize: 16, color: 'black', fontWeight: '600', }}>
                    <Text>{item.week_no}</Text>
                </View> */}


            </View>
        )
    }
    renderseparatoruc = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 68 }} >

            </View>
        )

    }
    CheckUnCompleteTopic()
    {
        console.log("Course Allocate", this.state.CourseAllocate);
        console.log("Sub Topic Covered", this.state.multipleFilec);
        const filtered = this.state.CourseAllocate.filter((obj1)=>{
            return !this.state.multipleFilec.some((obj2)=>{
                return obj2.EMP_NO==obj1.EMP_NO && obj2.SECTION==obj1.SECTION && obj2.DISCIPLINE==obj1.DISCIPLINE && obj2.SemC==obj1.SemC
            }) 
        })
        console.log("filtered",filtered)
        this.setState({tempFilef:filtered,isLoading: false});
    }

    CourseAllocateDetail() {
        const url = `http://192.168.43.143/FWebAPI/api/users/AllAllocateCoursesShowPaperSettingTopicDetail?courseno=${lib.CNoPS}&semesterno=${this.state.SemNo}`
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
        
    componentDidMount() {
        this.ShowCompleteTopicSection();
        this.CourseAllocateDetail();
        setTimeout(() => {
            this.CheckUnCompleteTopic();
    
        }, 3000);
       
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
                        values={["Complete", "Uncomplete"]}
                        tabsContainerStyle={styles.tabsContainerStyle}
                        activeTabStyle={styles.activeTabStyle}
                        selectedIndex={this.state.selectedIndex}
                        onTabPress={this.handleIndexChange}
                        tabStyle={styles.tabstyle}
                    />
                     <View style={{ backgroundColor: '#FFFFFF'}}>
                            <FlatList
                                data={this.state.multipleFilec}
                                renderItem={this.renderItemc}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatorc}
                            />
                        </View>
                        {this.state.multipleFilec == '' &&
                            <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center', }}>
                                <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

                            </View>
                        }

                </View>
                :
                this.state.MainFolderstatus ?
                    <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                        <SegmentedControlTab
                            tabTextStyle={styles.tabTextStyle}
                            values={["Complete", "Uncomplete"]}
                            tabsContainerStyle={styles.tabsContainerStyle}
                            activeTabStyle={styles.activeTabStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={styles.tabstyle}
                        />
                         <View style={{ backgroundColor: '#FFFFFF'}}>
                            <FlatList
                                data={this.state.tempFilef}
                                renderItem={this.renderItemuc}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatoruc}
                            />
                        </View>
                        {this.state.tempFilef == '' &&
                            <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center', }}>
                                <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

                            </View>
                        }

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
    },
    tabstyle: {
        borderColor: 'green'
    },
    activeTabStyle: {
        backgroundColor: 'green',
    }
});

