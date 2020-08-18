import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { Appbar } from 'react-native-paper';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsm from 'react-native-vector-icons/AntDesign';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import RightIcon from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'

class WeeklyPlanMainFolder extends Component {
    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {

            SubTopics: [],
            selectedLabel: '',
            modalShow: false,
            checked: false,
            isloading: true,
            datasource: [
                { name: 'Week-1', key: '1' },
                { name: 'Week-2', key: '2' },
                { name: 'Week-3', key: '3' },
                { name: 'Week-4', key: '4' },
                { name: 'Week-5', key: '5' },
                { name: 'Week-6', key: '6' },
                { name: 'Week-7', key: '7' },
                { name: 'Week-8', key: '8' },
                { name: 'Week-9', key: '9' },
                { name: 'Week-10', key: '10' },
                { name: 'Week-11', key: '11' },
                { name: 'Week-12', key: '12' },
                { name: 'Week-13', key: '13' },
                { name: 'Week-14', key: '14' },
                { name: 'Week-15', key: '15' },
                { name: 'Week-16', key: '16' },

            ],

        };
    }
    HideModel(week) {
        lib.WeekNoMainFolder = week;

        this.setState({ modalShow: false });
        this.componentDidMount();

    }
    renderItemm = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.HideModel.bind(this, item.name)}
                style={{ flex: 1, flexDirection: 'row', }}
            >
                <Iconm name={'folder'} size={25} color={'#3a3a3a'}
                    style={{ margin: 15 }}
                />
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, color: '#3a3a3a', fontWeight: '600', }}>
                        {item.name}
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


    renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
                <Iconw name={'calendar-week'} size={35} color={'#3a3a3a'}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1, }}>
                    <Text style={{ fontSize: 14, color: '#3a3a3a', fontWeight: '600', width: '90%' }}>
                        {item.ST_Name}
                    </Text>
                </View>
            </View>
        )
    }
    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 79 }} ></View>
        )
    }


    /////////   Move Week numbers //////////////////////////////////

    MoveLeftFunction() {
        var week = lib.WeekNoMainFolder.split('-')[0]
        var weekno = lib.WeekNoMainFolder.split('-')[1]
        if (weekno > 1) {
            weekno--;
            lib.WeekNoMainFolder = `${week}-${weekno}`
            this.componentDidMount();

        }
    }
    MoveRightFunction() {
        var week = lib.WeekNoMainFolder.split('-')[0]
        var weekno = lib.WeekNoMainFolder.split('-')[1]
        if (weekno < 16) {
            weekno++;
            lib.WeekNoMainFolder = `${week}-${weekno}`
            this.componentDidMount();
        }
    }



    componentDidMount() {
        const url = `http://192.168.43.143/FWebAPI/api/users/AllSubTopic?weekno=${lib.WeekNoMainFolder}&courseno=${lib.CNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                this.setState(
                    {
                        SubTopics: responsejson,
                        isloading: false
                    })
                console.log(this.state.SubTopics);
            })
            .catch((error) => {
                console.log(error)
            })
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
                    <ScrollView>
                        <View style={styles.container}>
                            <TouchableOpacity
                                onPress={() => { this.setState({ modalShow: true }) }}
                            >
                                <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, margin: 15, flexDirection: 'row', alignItems: 'center' }}>
                                    <Iconm name={'folder'} size={20} color={'green'}
                                        style={{ marginLeft: 15 }}
                                    />
                                    <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>
                                        {lib.WeekNoMainFolder}
                                    </Text>
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
                                <View style={{ backgroundColor: '#ffffff', flex: 1, }}>

                                    <Appbar.Header
                                        style={{ backgroundColor: "green" }}
                                    >

                                        <Appbar.Content
                                            title="Select Week"
                                        />
                                        <Appbar.Action icon="close" onPress={() => { this.setState({ modalShow: false }) }} />
                                    </Appbar.Header>

                                    <FlatList
                                        data={this.state.datasource}
                                        renderItem={this.renderItemm}
                                        keyExtractor={(item, index) => index.toString()}
                                        ItemSeparatorComponent={this.renderseparatorm}
                                    />
                                </View>
                            </Modal>
                            <View style={{ backgroundColor: '#FFFFFF' }}>
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
                            }

                            <View style={{ marginLeft: '70%', flexDirection: 'row', margin: 20 }}>
                                {/* {lib.WeekNoMainFolder!='Week-1' && */}
                                <TouchableOpacity onPress={() => this.MoveLeftFunction()}>
                                    <LeftIcon name={'leftsquare'} size={40} color={'green'}
                                        style={{ marginRight: 4 }}
                                    />
                                </TouchableOpacity>
                                {/* } */}
                                {/* {lib.WeekNoMainFolder!='Week-16' && */}
                                <TouchableOpacity onPress={() => this.MoveRightFunction()}>
                                    <RightIcon name={'rightsquare'} size={40} color={'green'} />
                                </TouchableOpacity>
                                {/* } */}
                            </View>

                        </View>
                    </ScrollView>
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
            flex: 1,
        },
        header: {
            height: 50,
        },
        inputicon: {
            bottom: 55,
            right: 35,
            position: "absolute",
            zIndex: 1
        },
    }
);

