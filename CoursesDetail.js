import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
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
            exportId: lib.Id,
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
            lib.WeekNoMainFolder='Week-1'
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

                //   onPress={() => this.props.navigation.navigate('CourseObjectives')}
                //  onPress={() => this.props.navigation.navigate('QAAE')}
                // onPress={() => Alert.alert(item.key)}
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
        lib.Discipline = item.DISCIPLINE;
        lib.Section = item.SECTION;
        lib.Semc = item.SemC;
        // console.log(lib.Discipline);
        // console.log(lib.Section);
        // console.log(lib.Semc);
        // lib.CNo=cno;
        // lib.CName=cname;
        this.props.navigation.navigate('SectionFolder')
    }



    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Testj', { id: item.Id })}
                // onPress={() => Alert.alert("hello")}
                onPress={this.ShowNewScreen.bind(this, item)}

                style={{ flex: 1, flexDirection: 'row', }}
            >
                <Icon name={'file-directory'} size={55} color={'#C0C0C0'}
                    style={{ margin: 6 }}
                />

                {/* <Image
                source={require('./img/abc.png')}
                style={{ height: 70, width: 70, margin: 6 }}

            ></Image> */}
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600', }}>
                        {item.DISCIPLINE}  {item.SemC} {item.SECTION}
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

    ShowSection(){

        this.setState({ isLoading: true })
        const url = `${lib.IpAddress}/Users/AllSections?id=${lib.TIdTemp}&courseno=${lib.CNo}&semno=${lib.SemNoTemp}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
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

    ////////////////////////// Main Folder Manage ///////////////////////////////////////

    MainFolderManage()
    {
        const url = `${lib.IpAddress}/Users/MainFolderManage?tid=${lib.TId}&courseno=${lib.CNo}&semesterno=${lib.SemNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
              lib.MainFM=responsejson;
            })
            .catch((error) => {
                console.log(error)
            })
    }


    componentDidMount() {
        //    lib.CNo=this.props.navigation.getParam('cno');

    
        if(lib.TIdAF!=='null' && lib.TokenAF==='true')
        {

         
            lib.TIdTemp=lib.TIdAF;
            lib.SemNoTemp=lib.SemNoAF;
            setTimeout(() => {
                lib.TIdAF='null';
                lib.TokenAF='false'
                lib.MainFM='';
                this.ShowSection();
                }, 1000);

        }
        else 
        {
            lib.TIdTemp=lib.TId;
            lib.SemNoTemp=lib.SemNo;
            setTimeout(() => {
                this.ShowSection();
                this.MainFolderManage();
            }, 1000);
          
        }
        console.log(lib.TIdTemp);
        console.log(lib.CNo);
        console.log(lib.CName);
        console.log(lib.SemNoTemp);
        
        
        
     
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
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.CName}</Text>
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

                        <View style={{ backgroundColor:'#FFFFFF', }}>

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
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.CName}</Text>

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

                            <View style={{ flex: 1, marginTop: 0,backgroundColor:'#FFFFFF' }}>



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

