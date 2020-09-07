import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, Alert, ActivityIndicator, TextInput, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import Iconpw from 'react-native-vector-icons/FontAwesome';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";
import ModalPW from 'react-native-modalbox';
var screen = Dimensions.get('window')



export default class ExamsPW extends React.Component {

    constructor(props) {
        super(props);
            this.state = {
              
                isloadingme: true,
                dtypeme: 'MidExam',
                showModalPWme: false,

                
                isloadingfe: true,
                dtypefe: 'FinalExam',
                showModalPWfe:false,
                selectedIndex: 0,
                status: true,
                finalstatus: false,

                ///////// Notification ///////////////

                FDoc_IdN: '',
                Sender_IdN: '',
                Receiver_IdN: '',
                MessageNme: '',
                MessageNfe:'',
                StatusN: '',
                course_noN: '',
                firstname:'',
                middlename:'',
                lastname:''

            };
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////  Mid Exams ////////////////////////////////////////////////

    ///////////// Send Message /////////////////////////////////////////////////


    SendMessageme() {
        console.log(this.state.MessageNme)
        if (this.state.MessageNme !== '') {
            this.setState({ showModalPWme: false });

            let collection = {}
            collection.FDoc_Id = this.state.FDoc_IdN;
            collection.Sender_Id = this.state.Sender_IdN;
            collection.Receiver_Id = this.state.Receiver_IdN;
            collection.Message = this.state.MessageNme;
            collection.Status = 'false';
            collection.Course_no = this.state.course_noN;

            fetch('http://192.168.43.143/FWebAPI/api/users/SaveMessage', {
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

            setTimeout(() => {
                this.setState({ MessageNme: '' });
            }, 1000);

        }
        else {
            Alert.alert("Please Enter Message.");
        }

    }

    /////////       Show Files ////////////
    ShowFilesme = (name) => {
        Linking.canOpenURL(`${lib.IpAddressFileOpen}`+name).then(supported => {
            if (supported) {
                Linking.openURL(`${lib.IpAddressFileOpen}`+name);
            } else {
                console.log("Don't know how to open URI: " +`${lib.IpAddressFileOpen}`+name);
            }
        });
    };

    renderItemme = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowFilesme.bind(this, item.Name)}
                style={{ flex: 1, flexDirection: 'row', marginBottom: 3, }}
            >

                <Image
                    source={require('./img/pdf3.jpg')}
                    style={{ height: 40, width: 40, margin: 8 }}

                ></Image>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flexDirection:'column',flex:1}}>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', width: '80%', }}>
                        {item.Doc_Name}
                    </Text>
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: '600', width: '80%', }}>
                            {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ right: 30, position: 'absolute', padding: 4 }}
                        onPress={() => this.setState({ showModalPWme: true,firstname:item.emp_firstname,middlename:item.emp_middle,lastname:item.emp_lastname, FDoc_IdN: item.FDoc_Id, Sender_IdN: lib.TId, Receiver_IdN: item.EMP_NO, course_noN: item.course_no })}
                    >
                        <Iconpw name={'comment'} size={21} color={'black'}
                        />
                    </TouchableOpacity>


                </View>

            </TouchableOpacity>
        )
    }
    renderseparatorme = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 55 }} >

            </View>
        )

    }


    DisplayMidExamsFiles() {
        const url = `${lib.IpAddress}/users/PaperShowPaperWetting?courseno=${lib.CNoPW}&semno=${lib.SemNoPW}&dtype=${this.state.dtypeme}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        multipleFileme: responsejson,
                        isloadingme: false
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }




    //////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////// Final Exams ////////////////////////////////////////////

     ///////////// Send Message /////////////////////////////////////////////////


     SendMessagefe() {
        // console.log(this.state.MessageNme)
        if (this.state.MessageNfe !== '') {
            this.setState({ showModalPWfe: false });

            let collection = {}
            collection.FDoc_Id = this.state.FDoc_IdN;
            collection.Sender_Id = this.state.Sender_IdN;
            collection.Receiver_Id = this.state.Receiver_IdN;
            collection.Message = this.state.MessageNfe;
            collection.Status = 'false';
            collection.Course_no = this.state.course_noN;

            fetch(`${lib.IpAddress}/users/SaveMessage`, {
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

            setTimeout(() => {
                this.setState({ MessageNfe: '' });
            }, 1000);

        }
        else {
            Alert.alert("Please Enter Message.");
        }

    }

    /////////       Show Files ////////////
    ShowFilesfe = (name) => {
        Linking.canOpenURL(`${lib.IpAddressFileOpen}`+name).then(supported => {
            if (supported) {
                Linking.openURL(`${lib.IpAddressFileOpen}`+name);
            } else {
                console.log("Don't know how to open URI: " +`${lib.IpAddressFileOpen}`+ name);
            }
        });
    };
    renderItemfe = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowFilesfe.bind(this, item.Name)}
                style={{ flex: 1, flexDirection: 'row', marginBottom: 3, }}
            >

<Image
                    source={require('./img/pdf3.jpg')}
                    style={{ height: 40, width: 40, margin: 8 }}

                ></Image>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flexDirection:'column',flex:1}}>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', width: '80%', }}>
                        {item.Doc_Name}
                    </Text>
                        <Text style={{ fontSize: 12, color: 'black', fontWeight: '600', width: '80%', }}>
                            {item.emp_firstname} {item.emp_middle} {item.emp_lastname}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ right: 30, position: 'absolute', padding: 4 }}
                        onPress={() => this.setState({ showModalPWfe: true,firstname:item.emp_firstname,middlename:item.emp_middle,lastname:item.emp_lastname, FDoc_IdN: item.FDoc_Id, Sender_IdN: lib.TId, Receiver_IdN: item.EMP_NO, course_noN: item.course_no })}
                    >
                        <Iconpw name={'comment'} size={21} color={'black'}
                        />
                    </TouchableOpacity>


                </View>

            </TouchableOpacity>
        )
    }
    renderseparatorfe = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 55 }} >

            </View>
        )

    }


    DisplayFinalExamsFiles() {
        const url = `${lib.IpAddress}/users/PaperShowPaperWetting?courseno=${lib.CNoPW}&semno=${lib.SemNoPW}&dtype=${this.state.dtypefe}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        multipleFilefe: responsejson,
                        isloadingfe: false
                    }
                )
            })
            .catch((error) => {
                console.log(error)
            })
    }








    /////////////////////////////////////////////////////////////////////////////
    ////////////// SegmentedControlTab //////////////////////////////////////////
    handleIndexChange = index => {
        this.setState({
            selectedIndex: index

        })

        if (this.state.selectedIndex == 0) {
            if (this.state.status == true && this.state.finalstatus == false) {
                this.setState({ status: false, finalstatus: true })
            }
        }
        if (this.state.selectedIndex == 1) {
            if (this.state.status == false && this.state.finalstatus == true) {
                this.setState({ status: true, finalstatus: false })
            }
        }
    };


    ////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// ComponentDidMount() //////////////////////////////////
    componentDidMount() {
        this.DisplayMidExamsFiles();
        this.DisplayFinalExamsFiles();


    }







    render() {

        return (


            this.state.isloadingme
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                this.state.status ?
                    <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                        <SegmentedControlTab
                            tabTextStyle={styles.tabTextStyle}
                            values={["Mid Exams", "Final Exams"]}
                            tabsContainerStyle={styles.tabsContainerStyle}
                            activeTabStyle={styles.activeTabStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={styles.tabstyle}
                        />
                        <ModalPW
                            isOpen={this.state.showModalPWme}
                            style={{
                                // justifyContent: 'center',
                                borderRadius: Platform.OS === 'ios' ? 30 : 30,
                                shadowRadius: 10,
                                width: screen.width - 80,
                                height: 290,
                            }}
                            position='center'
                            backdrop={true}
                            backdropPressToClose={false}
                            onClosed={() => {
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 3
                                }}
                            >RECOMMEND CHANGING TO</Text>
                            <Text
                             style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width:'99%',
                                // marginTop: 3
                            }}>{this.state.firstname} {this.state.middlename} {this.state.lastname}</Text>

                            <TextInput
                                style={styles.input}
                                value={this.state.MessageNme}
                                placeholder="Description..."
                                onChangeText={text => this.setState({ MessageNme: text })}
                                multiline={true}
                                underlineColorAndroid='transparent'
                            />







                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showModalPWme: false })}
                                    style={{
                                        borderWidth: 1,
                                        padding: 8,
                                        alignItems: 'center',
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        width: '40%',
                                        borderRadius: 35,
                                        marginLeft: 20
                                    }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        Cancel
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.SendMessageme()}
                                    style={{
                                        borderWidth: 1,
                                        padding: 8,
                                        alignItems: 'center',
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        width: '40%',
                                        borderRadius: 35,
                                        marginLeft: 20
                                    }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        Send
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </ModalPW>

                        <View style={{ marginTop: 10, backgroundColor: '#FFFFFF' }}>
                            <FlatList
                                data={this.state.multipleFileme}
                                renderItem={this.renderItemme}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatorme}
                            />
                        </View>

                    </View>
                    :
                    this.state.finalstatus ?
                        <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                            <SegmentedControlTab
                                tabTextStyle={styles.tabTextStyle}
                                values={["Mid Exams", "Final Exams"]}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                activeTabStyle={styles.activeTabStyle}
                                selectedIndex={this.state.selectedIndex}
                                onTabPress={this.handleIndexChange}
                                tabStyle={styles.tabstyle}
                            />
                            <ModalPW
                            isOpen={this.state.showModalPWfe}
                            style={{
                                // justifyContent: 'center',
                                borderRadius: Platform.OS === 'ios' ? 30 : 30,
                                shadowRadius: 10,
                                width: screen.width - 80,
                                height: 290,
                            }}
                            position='center'
                            backdrop={true}
                            backdropPressToClose={false}
                            onClosed={() => {
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 3
                                }}
                            >RECOMMEND CHANGING TO</Text>
                            <Text
                             style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width:'99%',
                                // marginTop: 3
                            }}>{this.state.firstname} {this.state.middlename} {this.state.lastname}</Text>

                            <TextInput
                                style={styles.input}
                                value={this.state.MessageNfe}
                                placeholder="Description..."
                                onChangeText={text => this.setState({ MessageNfe: text })}
                                multiline={true}
                                underlineColorAndroid='transparent'
                            />







                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showModalPWfe: false })}
                                    style={{
                                        borderWidth: 1,
                                        padding: 8,
                                        alignItems: 'center',
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        width: '40%',
                                        borderRadius: 35,
                                        marginLeft: 20
                                    }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        Cancel
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.SendMessagefe()}
                                    style={{
                                        borderWidth: 1,
                                        padding: 8,
                                        alignItems: 'center',
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        width: '40%',
                                        borderRadius: 35,
                                        marginLeft: 20
                                    }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        Send
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </ModalPW>

                            <View style={{ marginTop: 10, backgroundColor: '#FFFFFF' }}>
                                <FlatList
                                    data={this.state.multipleFilefe}
                                    renderItem={this.renderItemfe}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatorfe}
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
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'black',


    },
    tabsContainerStyle: {
        // margin: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        // marginBottom:0,
        // borderColor:'green'




    },
    activeTabStyle: {
        backgroundColor: 'green',
        borderColor: 'green'

    },
    tabstyle: {
        borderColor: 'green'

    },
    inputicon: {
        // position: 'absolute',
        bottom: 55,
        right: 35,
        position: "absolute",
        zIndex: 1
    },
    input: {
        paddingRight: 10,
        lineHeight: 23,
        flex: 2,
        textAlignVertical: 'top',
        borderWidth: 1,
        margin: 5,
        // marginBottom:0,
    },
});

