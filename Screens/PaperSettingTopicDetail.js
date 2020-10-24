import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image, FlatList, Alert, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import { Item, Input, Label } from 'native-base';
import Modals from 'react-native-modalbox';
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';
import * as lib from './storeData'
var screen = Dimensions.get('window')

class TopicDetail extends Component {
    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.array = [],
            this.state = {
                singleFile: '',
                multipleFile: [],
                isloading: true,
                FDid: '',
                Dname: '',
                dtype: 'CourseObjective',
                FileOriginalName: '',
                showModal: false
            };
    }





    /////////////// Show Files in Flat List ////////////////////////
    renderItem = ({ item }) => {
        return (
            <View
               
            style={{ flex: 1, flexDirection: 'row', alignItems:'center'}}
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
                <View style={{ right: 30, position: 'absolute',fontSize: 16, color: 'black', fontWeight: '600', }}>
                        <Text>{item.week_no}</Text>
                    </View>
            

            </View>
        )
    }
    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 68 }} >

            </View>
        )

    }

    //////////////// ComponentDidMount ////////////////////////////////////
    componentDidMount() {
        // this.setState({isloading:true})
        const url = `${lib.IpAddress}/users/TopicDetail?id=${lib.TopicIdPS}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        multipleFile: responsejson,
                        isloading: false
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }





    ///////////////// Render ////////////////////////////////////////

    render() {
        return (
            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <View style={styles.maincontainer}>
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.multipleFile}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderseparator}
                        />
                    </View>
                    {this.state.multipleFile == '' &&
                                <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

                                </View>
                            }
                </View>

        );
    }



}
export default TopicDetail;
const styles = StyleSheet.create(
    {
        maincontainer: {
            flex: 1,
            backgroundColor: '#e9e9e9'
        },
        container: {
            // flex:1,
            // marginTop: 10,
            backgroundColor: '#FFFFFF'
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

