import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Item, Input, Icon } from 'native-base';
import * as lib from './storeData'
import a from 'lodash'


export default class CoursesPW extends React.Component {

    constructor() {
        super()
        this.state = {
            isLoading: true,
            ///// Courses ////////
            Cdata: [],
            Cfulldata: [],
            Cquery: '',

        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////// Display All Courses //////////////////////////////////////////////////////


    ShowNewScreenC(cno, cname) {
        lib.CNoMFM = cno;
        lib.CNameMFM = cname;
        lib.TIdMFM='';
        lib.TFNameMFM = '';
        lib.TMNameMFM = '';
        lib.TLNameMFM = '';
        this.props.navigation.navigate('SelectTeacherMFM');
    }
    renderItemC = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row' }}
                onPress={this.ShowNewScreenC.bind(this, item.course_no, item.title)}
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
                <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                    <View searchBar rounded style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" onChangeText={this.handleSearchC} />
                            <Icon name="book" />
                        </Item>

                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => { Keyboard.dismiss() }}>
                        <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                            <FlatList
                                data={this.state.Cdata}
                                renderItem={this.renderItemC}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatorC}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
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

