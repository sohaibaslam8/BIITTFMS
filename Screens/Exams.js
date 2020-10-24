import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, Alert, ActivityIndicator, TextInput, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconpw from 'react-native-vector-icons/FontAwesome';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";
import DocumentPicker from 'react-native-document-picker';
import { Item, Input, Label } from 'native-base';
import Modals from 'react-native-modalbox';
import ModalPW from 'react-native-modalbox';
var screen = Dimensions.get('window')



export default class Exams extends React.Component {

    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.arrayme = [],
            this.arrayfe = [],
            this.state = {
                singleFileme: '',
                multipleFileme: [],
                isloadingme: true,
                FDidme: '',
                Dnameme: '',
                dtypeme: 'MidExam',
                FileOriginalNameme: '',
                showModalme: false,
                showModalPWme: false,
                dateme: '',
                timeme:'',
                refreshme:false,

                singleFilefe: '',
                multipleFilefe: [],
                isloadingfe: true,
                FDidfe: '',
                Dnamefe: '',
                dtypefe: 'FinalExam',
                FileOriginalNamefe: '',
                showModalfe: false,
                selectedIndex: 0,
                status: true,
                finalstatus: false,
                datefe: '',
                timefe:'',
                refreshfe:false,

                ///////// Notification ///////////////

                FDoc_IdN: '',
                Sender_IdN: '',
                Receiver_IdN: '',
                MessageNme: '',
                StatusN: '',
                course_noN: '',

            };
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////  Mid Exams ////////////////////////////////////////////////


    /////////       Show Files ////////////
    ShowFilesme = (name) => {
        Linking.canOpenURL(`${lib.IpAddressFileOpen}`+name).then(supported => {
            if (supported) {
                Linking.openURL(`${lib.IpAddressFileOpen}`+name);
            } else {
                console.log("Don't know how to open URI: " + `${lib.IpAddressFileOpen}`+name);
            }
        });
    };
    /////////  Delete Files ///////////////////////////

    // DeleteFolderDetailme = (filedata) => {
    //     const url = `http://192.168.43.143/FWebAPI/api/Users/DeleteFolderDetail?id=${filedata}`
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((responsejson) => {
    //             console.log(responsejson)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    DeleteFolderDocumentme = (filedata) => {
        const url = `${lib.IpAddress}/Users/DeleteFolderDocument?id=${filedata}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.DisplayMidExamsFiles();
            })
            .catch((error) => {
                console.log(error)
            })
    }




    DeleteFilesme = (filedata) => {
        // console.log(filedata);
        // console.log("heelooo:", filedata)
        // this.DeleteFolderDetailme(filedata);
        this.DeleteFolderDocumentme(filedata);

    }

    CheckFilesDeleteOrNotme = (filedata) => {
        Alert.alert(
            "File delete",
            "Do you want to delete this file?\nYou cannot undo this action.",
            [
                {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "DELETE", onPress: () => this.DeleteFilesme(filedata) }
            ],
            { cancelable: false }
        );
    }
    renderItemme = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowFilesme.bind(this, item.Name)}
                style={{ flex: 1, flexDirection: 'row', marginBottom: 3, }}
            >

                <Image
                    source={require('../img/pdf3.jpg')}
                    style={{ height: 38, width: 38, margin: 8 }}

                ></Image>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', width: '80%', }}>
                        {item.Doc_Name}
                    </Text>
                    {lib.MainFM === 'true' &&
                        <TouchableOpacity
                            style={{ right: 30, position: 'absolute', padding: 4 }}
                            onPress={this.CheckFilesDeleteOrNotme.bind(this, item.FDoc_Id)}
                        >
                            <Icon name={'delete'} size={21} color={'black'}
                            />
                        </TouchableOpacity>
                    }

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

    ///////////// Add Files Database /////////////////////////////////////


    addFolderDocumentme() {
        // console.log("File Original Name",this.state.FileOriginalNameme);
        let collection = {}

        if (this.state.FileOriginalNameme == undefined) {
            collection.FD_Id = this.state.FDidme;
            collection.Name = this.state.Dnameme;
            collection.Doc_Name = this.state.Dnameme;

        }
        else {
            collection.FD_Id = this.state.FDidme;
            collection.Name = this.state.Dnameme;
            collection.Doc_Name = this.state.FileOriginalNameme;


        }


        fetch(`${lib.IpAddress}/users/AddFolderDocument`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((data) => {
                this.DisplayMidExamsFiles();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    addFolderDetailme() {
        let collection = {}
        collection.course_no = lib.CNo;
        collection.EMP_NO = lib.TId;
        collection.Doc_Type = 'MidExam';
        collection.SEMESTER_NO = lib.SemNo;
        collection.Doc_Date = this.state.dateme;
        collection.Doc_Time=this.state.timeme;

        fetch(`${lib.IpAddress}/users/AddFolderDetail`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((data) => {

                // console.log('Success:', data);
                this.setState({ FDidme: data })
                this.addFolderDocumentme();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    GetFolderDetailIdme() {
        const url = `${lib.IpAddress}/Users/GetFolderDetailIdMainFolderPaper?courseno=${lib.CNo}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtypeme}&ddate=${this.state.dateme}&dtime=${this.state.timeme}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                if (responsejson != 'false') {
                    this.setState({ FDidme: responsejson[0].FD_Id })
                    this.addFolderDocumentme();
                }
                else {
                    this.addFolderDetailme();

                }

            })
            .catch((error) => {
                console.log(error)
            })
    }


    ///////////////////////// Previous File Delete /////////////////////////////////////////


    PreviousFileDeleteme() {
        // console.log("Delete Paper Id: ", this.state.multipleFileme[0].FDoc_Id);
        this.DeleteFolderDocumentme(this.state.multipleFileme[0].FDoc_Id);
        this.setState({ showModalme: true })

    }


    CheckPreviousFileDeleteme() {

        Alert.alert(
            "Previos file delete",
            "Do you want to delete previous file?\nYou cannot undo this action.",
            [
                {
                    text: "CANCEL",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "DELETE", onPress: () => this.PreviousFileDeleteme() }
            ],
            { cancelable: false }
        );
    }

    ///////// Select files //////////////////////////////////
    selectFileme = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            var d = new Date();
            const fileName = d.getTime()
            const fileType = res.type.split('/')[1]
            // const fileType = res.name.split(".")[1];
            res.newURL = `${fileName}.${fileType}`;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            var am_pm = 'AM';
            if (hours > 11) {
                am_pm = 'PM';
                if (hours > 12) {
                    hours = hours - 12;
                }
            }
            if (hours == 0) {
                hours = 12;
            }

            this.setState({
                //Setting the value of the date time
                dateme: date + '/' + month + '/' + year,
                timeme: hours + ':' + min +' '+am_pm
            });
            // console.log("data ", this.state.dateme);



            console.log('res : ' + JSON.stringify(res));
            this.setState({ singleFileme: res, FileOriginalNameme: res.name, Dnameme: res.newURL });

            // console.log("Length ",this.state.multipleFileme.length);
            if (this.state.multipleFileme.length === 0) {
                this.setState({ showModalme: true })
                
            }
            else {
                this.CheckPreviousFileDeleteme();
            }

            // console.log(this.state.singleFileme);
            // console.log(this.state.FileOriginalNameme);

        } catch (err) {
            setSingleFile(null);
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    //////// Upload Files in Server Web API ///////////////////////

    createFormDatame = (fileData, body) => {

        const data = new FormData();

        data.append("file", {
            name: fileData.newURL,
            type: fileData.type,
            uri:
                Platform.OS === "android" ? fileData.uri : fileData.uri.replace("file://", "")
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };
    UploadFilesme = () => {
        this.setState({ showModalme: false });
        fetch(`${lib.IpAddress}/Users/UploadFilenewcode`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: this.createFormDatame(this.state.singleFileme, { userId: "123" })
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
        // this.addFolderDetailme();
        this.GetFolderDetailIdme();
    };


    handleRefreshme=()=>{
        this.DisplayMidExamsFiles();
      }

    DisplayMidExamsFiles() {
        const url = `${lib.IpAddress}/users/AllDocumentShowMainFolder?courseno=${lib.CNo}&semno=${lib.SemNoTemp}&dtype=${this.state.dtypeme}`
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

    /////////       Show Files ////////////
    ShowFilesfe = (name) => {
        Linking.canOpenURL(`${lib.IpAddressFileOpen}`+name).then(supported => {
            if (supported) {
                Linking.openURL(`${lib.IpAddressFileOpen}`+name);
            } else {
                console.log("Don't know how to open URI: " +`${lib.IpAddressFileOpen}`+name);
            }
        });
    };
    /////////  Delete Files ///////////////////////////

    // DeleteFolderDetailfe = (filedata) => {
    //     const url = `http://192.168.43.143/FWebAPI/api/Users/DeleteFolderDetail?id=${filedata}`
    //     fetch(url)
    //         .then((response) => response.json())
    //         .then((responsejson) => {
    //             console.log(responsejson)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }
    DeleteFolderDocumentfe = (filedata) => {
        const url = `${lib.IpAddress}/Users/DeleteFolderDocument?id=${filedata}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.DisplayFinalExamsFiles();
            })
            .catch((error) => {
                console.log(error)
            })
    }




    DeleteFilesfe = (filedata) => {
        // console.log(filedata);
        // console.log("heelooo:", filedata)
        // this.DeleteFolderDetailfe(filedata);
        this.DeleteFolderDocumentfe(filedata);

    }

    CheckFilesDeleteOrNotfe = (filedata) => {
        Alert.alert(
            "File delete",
            "Do you want to delete this file?\nYou cannot undo this action.",
            [
                {
                    text: "CANCEL",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "DELETE", onPress: () => this.DeleteFilesfe(filedata) }
            ],
            { cancelable: false }
        );
    }
    renderItemfe = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowFilesfe.bind(this, item.Name)}
                style={{ flex: 1, flexDirection: 'row', marginBottom: 3, }}
            >

                <Image
                    source={require('../img/pdf3.jpg')}
                    style={{ height: 38, width: 38, margin: 8 }}

                ></Image>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', width: '80%', }}>
                        {item.Doc_Name}
                    </Text>
                    {lib.MainFM === 'true' &&
                        <TouchableOpacity
                            style={{ right: 30, position: 'absolute', padding: 4 }}
                            onPress={this.CheckFilesDeleteOrNotfe.bind(this, item.FDoc_Id)}
                        >
                            <Icon name={'delete'} size={21} color={'black'}
                            />
                        </TouchableOpacity>
                    }

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

    ///////////// Add Files Database /////////////////////////////////////


    addFolderDocumentfe() {
        console.log(this.state.FileOriginalName);
        console.log(this.state.FDidfe);
        let collection = {}

        if (this.state.FileOriginalNamefe == undefined) {
            collection.FD_Id = this.state.FDidfe;
            collection.Name = this.state.Dnamefe;
            collection.Doc_Name = this.state.Dnamefe;

        }
        else {
            collection.FD_Id = this.state.FDidfe;
            collection.Name = this.state.Dnamefe;
            collection.Doc_Name = this.state.FileOriginalNamefe;


        }


        fetch(`${lib.IpAddress}/users/AddFolderDocument`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((data) => {
                this.DisplayFinalExamsFiles();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    addFolderDetailfe() {
        let collection = {}
        collection.course_no = lib.CNo;
        collection.EMP_NO = lib.TId;
        collection.Doc_Type = 'FinalExam';
        collection.SEMESTER_NO = lib.SemNo;
        collection.Doc_Date = this.state.datefe;
        collection.Doc_Time=this.state.timefe;
        fetch(`${lib.IpAddress}/users/AddFolderDetail`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        })
            .then((response) => response.json())
            .then((data) => {

                // console.log('Success:', data);
                this.setState({ FDidfe: data })
                this.addFolderDocumentfe();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    GetFolderDetailIdfe() {
        const url = `${lib.IpAddress}/Users/GetFolderDetailIdMainFolderPaper?courseno=${lib.CNo}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtypefe}&ddate=${this.state.datefe}&dtime=${this.state.timefe}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                if (responsejson != 'false') {
                    this.setState({ FDidfe: responsejson[0].FD_Id })
                    this.addFolderDocumentfe();
                }
                else {
                    this.addFolderDetailfe();

                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

    ///////////////////////// Previous File Delete. /////////////////////////////////////

    PreviousFileDeletefe() {
        // console.log("Delete Paper Id: ", this.state.multipleFileme[0].FDoc_Id);
        this.DeleteFolderDocumentfe(this.state.multipleFilefe[0].FDoc_Id);
        this.setState({ showModalfe: true })

    }


    CheckPreviousFileDeletefe() {

        Alert.alert(
            "Previos file delete",
            "Do you want to delete previous file?\nYou cannot undo this action.",
            [
                {
                    text: "CANCEL",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "DELETE", onPress: () => this.PreviousFileDeletefe() }
            ],
            { cancelable: false }
        );
    }




    ///////// Select files ///////////////////////////////////////////
    selectFilefe = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            var d = new Date();
            const fileName = d.getTime()
            const fileType = res.type.split('/')[1]
            // const fileType = res.name.split(".")[1];
            res.newURL = `${fileName}.${fileType}`;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            var am_pm = 'AM';
            if (hours > 11) {
                am_pm = 'PM';
                if (hours > 12) {
                    hours = hours - 12;
                }
            }
            if (hours == 0) {
                hours = 12;
            }

            this.setState({
                //Setting the value of the date time
                datefe: date + '/' + month + '/' + year,
                timefe: hours + ':' + min +' '+am_pm
            });
            // console.log("data ", this.state.datefe);

            console.log('res : ' + JSON.stringify(res));
            this.setState({ singleFilefe: res, FileOriginalNamefe: res.name, Dnamefe: res.newURL });

            if (this.state.multipleFilefe.length === 0) {
                this.setState({ showModalfe: true })
                
            }
            else {
                this.CheckPreviousFileDeletefe();
            }
            // this.setState({ showModalfe: true })
            // console.log(this.state.singleFilefe);
            // console.log(this.state.FileOriginalNamefe);

        } catch (err) {
            setSingleFile(null);
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    //////// Upload Files in Server Web API //////////////////////////////////

    createFormDatafe = (fileData, body) => {

        const data = new FormData();

        data.append("file", {
            name: fileData.newURL,
            type: fileData.type,
            uri:
                Platform.OS === "android" ? fileData.uri : fileData.uri.replace("file://", "")
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };
    UploadFilesfe = () => {
        this.setState({ showModalfe: false });
        fetch(`${lib.IpAddress}/Users/UploadFilenewcode`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: this.createFormDatafe(this.state.singleFilefe, { userId: "123" })
        })
            .then(response => response.json())
            .then(response => {
                console.log("upload succes", response);
            })
            .catch(error => {
                console.log("upload error", error);
                alert("Upload failed!");
            });
        // this.addFolderDetailfe();
        this.GetFolderDetailIdfe();
    };


    handleRefreshfe=()=>{
        this.DisplayFinalExamsFiles();
      }
    DisplayFinalExamsFiles() {
        const url = `${lib.IpAddress}/users/AllDocumentShowMainFolder?courseno=${lib.CNo}&semno=${lib.SemNoTemp}&dtype=${this.state.dtypefe}`
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
                        <Modals
                            isOpen={this.state.showModalme}
                            style={{
                                justifyContent: 'center',
                                borderRadius: Platform.OS === 'ios' ? 30 : 30,
                                shadowRadius: 10,
                                width: screen.width - 80,
                                height: 240,
                            }}
                            position='center'
                            backdrop={true}
                            backdropPressToClose={false}
                            onClosed={() => {
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 10
                                }}
                            >File Upload</Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    marginTop: 15,
                                    marginLeft: 30
                                }}
                            >Do you want to upload this file?</Text>

                            <Item stackedLabel style={{
                                height: 40,
                                borderBottomColor: 'gray',
                                marginLeft: 30,
                                marginRight: 30,
                                marginBottom: 10,
                                borderBottomWidth: 1


                            }}>
                                <Label>File Name</Label>
                                {this.state.FileOriginalNameme === undefined &&
                                    <Input defaultValue={this.state.Dnameme} onChangeText={(text) => this.setState({ FileOriginalNameme: text })} />
                                }
                                {this.state.FileOriginalNameme != undefined &&
                                    <Input defaultValue={this.state.FileOriginalNameme} onChangeText={(text) => this.setState({ FileOriginalNameme: text })} />
                                }

                            </Item>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ showModalme: false })}
                                    style={{
                                        borderWidth: 1,
                                        padding: 10,
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
                                    onPress={()=>this.state.FileOriginalNameme!==''?this.UploadFilesme():Alert.alert("File Name","Please enter file name.")}
                                    style={{
                                        borderWidth: 1,
                                        padding: 10,
                                        alignItems: 'center',
                                        borderColor: 'green',
                                        backgroundColor: 'green',
                                        width: '40%',
                                        borderRadius: 35,
                                        marginLeft: 20
                                    }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        OK
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </Modals>
                        {lib.MainFM === 'true' &&
                            <TouchableOpacity
                                onPress={this.selectFileme.bind(this)}
                                style={styles.inputicon}
                            >
                                <Icon name={'pluscircle'} size={50} color={'green'}
                                />
                            </TouchableOpacity>
                        }
                        <View style={{ marginTop: 10, backgroundColor: '#FFFFFF' }}>
                            <FlatList
                             refreshing={this.state.refreshme}
                             onRefresh={this.handleRefreshme}
                                data={this.state.multipleFileme}
                                renderItem={this.renderItemme}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatorme}
                            />
                        </View>
                        {this.state.multipleFileme == '' &&
                            <View style={{ marginTop: '15%', marginBottom: '10%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

                            </View>
                        }

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
                            <Modals
                                isOpen={this.state.showModalfe}
                                style={{
                                    justifyContent: 'center',
                                    borderRadius: Platform.OS === 'ios' ? 30 : 30,
                                    shadowRadius: 10,
                                    width: screen.width - 80,
                                    height: 240,
                                }}
                                position='center'
                                backdrop={true}
                                backdropPressToClose={false}
                                onClosed={() => {
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        marginTop: 10
                                    }}
                                >File Upload</Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        marginTop: 15,
                                        marginLeft: 30
                                    }}
                                >Do you want to upload this file?</Text>

                                <Item stackedLabel style={{
                                    height: 40,
                                    borderBottomColor: 'gray',
                                    marginLeft: 30,
                                    marginRight: 30,
                                    marginBottom: 10,
                                    borderBottomWidth: 1


                                }}>
                                    <Label>File Name</Label>
                                    {this.state.FileOriginalNamefe === undefined &&
                                        <Input defaultValue={this.state.Dnamefe} onChangeText={(text) => this.setState({ FileOriginalNamefe: text })} />
                                    }
                                    {this.state.FileOriginalNamefe != undefined &&
                                        <Input defaultValue={this.state.FileOriginalNamefe} onChangeText={(text) => this.setState({ FileOriginalNamefe: text })} />
                                    }

                                </Item>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ showModalfe: false })}
                                        style={{
                                            borderWidth: 1,
                                            padding: 10,
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
                                        onPress={()=>this.state.FileOriginalNamefe!==''?this.UploadFilesfe():Alert.alert("File Name","Please enter file name.")}
                                        style={{
                                            borderWidth: 1,
                                            padding: 10,
                                            alignItems: 'center',
                                            borderColor: 'green',
                                            backgroundColor: 'green',
                                            width: '40%',
                                            borderRadius: 35,
                                            marginLeft: 20
                                        }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>
                                            OK
                                </Text>
                                    </TouchableOpacity>
                                </View>
                            </Modals>
                            {lib.MainFM === 'true' &&
                                <TouchableOpacity
                                    onPress={this.selectFilefe.bind(this)}
                                    style={styles.inputicon}
                                >
                                    <Icon name={'pluscircle'} size={50} color={'green'}
                                    />
                                </TouchableOpacity>
                            }
                            <View style={{ marginTop: 10, backgroundColor: '#FFFFFF' }}>
                                <FlatList
                                 refreshing={this.state.refreshfe}
                                 onRefresh={this.handleRefreshfe}
                                    data={this.state.multipleFilefe}
                                    renderItem={this.renderItemfe}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatorfe}
                                />
                            </View>
                            {this.state.multipleFilefe == '' &&
                                <View style={{ marginTop: '15%', marginBottom: '10%', alignItems: 'center' }}>
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

