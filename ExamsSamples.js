import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, Alert, ActivityIndicator, Modal, TouchableOpacity, Image, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";
import DocumentPicker from 'react-native-document-picker';
import { Item, Input, Label } from 'native-base';
import Modals from 'react-native-modalbox';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconsm from 'react-native-vector-icons/AntDesign';
var screen = Dimensions.get('window')



export default class ExamsSamples extends React.Component {

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
                dtypeme: 'MidExamSamples',
                FileOriginalNameme: '',
                showModalme: false,
                modalShowme: false,
                dstatusme: 'Best',

                singleFilefe: '',
                multipleFilefe: [],
                isloadingfe: true,
                FDidfe: '',
                Dnamefe: '',
                dtypefe: 'FinalExamSamples',
                FileOriginalNamefe: '',
                showModalfe: false,
                modalShowfe: false,
                dstatusfe: 'Best',

                selectedIndex: 0,
                status: true,
                finalstatus: false,
                datasourceme: [
                    { name: 'Best', key: '1' },
                    { name: 'Average', key: '2' },
                    { name: 'Worst', key: '3' },
                ],
                datasourcefe: [
                    { name: 'Best', key: '1' },
                    { name: 'Average', key: '2' },
                    { name: 'Worst', key: '3' },
                ],
            };
    }

    ////////////////////////////////////////////////////////////////////////////
    ////////////////  Mid Exams ////////////////////////////////////////////////


    //////////////////////// Select Type Modal //////////////////////////////////////
    HideModelme(week) {
        this.state.dstatusme = week
        this.setState({ modalShowme: false });
        this.DisplayMidExamsFiles();


    }
    renderItemmme = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.HideModelme.bind(this, item.name)}
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

    renderseparatormme = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 65 }} >

            </View>
        )

    }




    /////////       Show Files ////////////
    ShowFilesme = (name) => {
        Linking.canOpenURL('http://192.168.43.143/FWebAPI/File/' + name).then(supported => {
            if (supported) {
                Linking.openURL('http://192.168.43.143/FWebAPI/File/' + name);
            } else {
                console.log("Don't know how to open URI: " + 'http://192.168.43.143/FWebAPI/File/' + name);
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
        const url = `http://192.168.43.143/FWebAPI/api/Users/DeleteFolderDocument?id=${filedata}`
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
        console.log("heelooo:", filedata)
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
                    source={require('./img/pdf3.jpg')}
                    style={{ height: 38, width: 38, margin: 8 }}

                ></Image>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', width: '80%', }}>
                        {item.Doc_Name}
                    </Text>
                    {lib.Token!=='true' &&
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
        console.log(this.state.FileOriginalName);
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


        fetch('http://192.168.43.143/FWebAPI/api/users/AddFolderDocument', {
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
        collection.SECTION = lib.Section;
        collection.DISCIPLINE = lib.Discipline;
        collection.SemC = lib.Semc;
        collection.SEMESTER_NO = lib.SemNo;
        collection.EMP_NO = lib.TId;
        collection.Doc_Type = 'MidExamSamples';
        collection.Doc_Status = this.state.dstatusme;

        fetch('http://192.168.43.143/FWebAPI/api/users/AddFolderDetail', {
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
        const url = `http://192.168.43.143/FWebAPI/api/Users/GetFolderDetailIdSubFolderQuizAndAssignment?courseno=${lib.CNo}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtypeme}&dstatus=${this.state.dstatusme}`
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


            console.log('res : ' + JSON.stringify(res));
            this.setState({ singleFileme: res, FileOriginalNameme: res.name, Dnameme: res.newURL });
            this.setState({ showModalme: true })
            console.log(this.state.singleFileme);
            console.log(this.state.FileOriginalNameme);

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
        fetch("http://192.168.43.143/FWebAPI/api/Users/UploadFilenewcode", {
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

    DisplayMidExamsFiles() {
        const url = `http://192.168.43.143/FWebAPI/api/users/AllDocumentShowSubFolderQuizAndAssignment?courseno=${lib.CNo}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtypeme}&dstatus=${this.state.dstatusme}`
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

     //////////////////////// Select Type Modal //////////////////////////////////////
     HideModelfe(week) {
        this.state.dstatusfe = week
        this.setState({ modalShowfe: false });
        this.DisplayFinalExamsFiles();


    }
    renderItemmfe = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.HideModelfe.bind(this, item.name)}
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

    renderseparatormfe = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 65 }} >

            </View>
        )

    }

    /////////       Show Files ////////////
    ShowFilesfe = (name) => {
        Linking.canOpenURL('http://192.168.43.143/FWebAPI/File/' + name).then(supported => {
            if (supported) {
                Linking.openURL('http://192.168.43.143/FWebAPI/File/' + name);
            } else {
                console.log("Don't know how to open URI: " + 'http://192.168.43.143/FWebAPI/File/' + name);
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
        const url = `http://192.168.43.143/FWebAPI/api/Users/DeleteFolderDocument?id=${filedata}`
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
                    source={require('./img/pdf3.jpg')}
                    style={{ height: 38, width: 38, margin: 8 }}

                ></Image>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>


                    <Text style={{ fontSize: 14, color: 'black', fontWeight: '600', width: '80%', }}>
                        {item.Doc_Name}
                    </Text>
                    {lib.Token!=='true' &&
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


        fetch('http://192.168.43.143/FWebAPI/api/users/AddFolderDocument', {
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
        collection.SECTION = lib.Section;
        collection.DISCIPLINE = lib.Discipline;
        collection.SemC = lib.Semc;
        collection.SEMESTER_NO = lib.SemNo;
        collection.EMP_NO = lib.TId;
        collection.Doc_Type = 'FinalExamSamples';
        collection.Doc_Status = this.state.dstatusfe;
        fetch('http://192.168.43.143/FWebAPI/api/users/AddFolderDetail', {
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
        const url = `http://192.168.43.143/FWebAPI/api/Users/GetFolderDetailIdSubFolderQuizAndAssignment?courseno=${lib.CNo}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtypefe}&dstatus=${this.state.dstatusfe}`
        fetch(url)
          .then((response) => response.json())
          .then((responsejson) => {
            console.log(responsejson)
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


            console.log('res : ' + JSON.stringify(res));
            this.setState({ singleFilefe: res, FileOriginalNamefe: res.name, Dnamefe: res.newURL });
            this.setState({ showModalfe: true })
            console.log(this.state.singleFilefe);
            console.log(this.state.FileOriginalNamefe);

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
        fetch("http://192.168.43.143/FWebAPI/api/Users/UploadFilenewcode", {
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

    DisplayFinalExamsFiles() {
        const url = `http://192.168.43.143/FWebAPI/api/users/AllDocumentShowSubFolderQuizAndAssignment?courseno=${lib.CNo}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtypefe}&dstatus=${this.state.dstatusfe}`
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
                                    onPress={() => this.UploadFilesme()}
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
                        <TouchableOpacity
                            onPress={() => { this.setState({ modalShowme: true }) }}
                        >
                            <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, margin: 15, marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                                <Iconm name={'folder'} size={20} color={'green'}
                                    style={{ marginLeft: 15 }}
                                />
                                <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>
                                    {this.state.dstatusme}
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
                            visible={this.state.modalShowme}>
                            <View style={{ backgroundColor: '#ffffff', marginTop: 165, marginLeft: 15, marginRight: 15 }}>


                                <FlatList
                                    data={this.state.datasourceme}
                                    renderItem={this.renderItemmme}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatormme}
                                />
                            </View>
                        </Modal>
                        {lib.Token!=='true' &&
                        <TouchableOpacity
                            onPress={this.selectFileme.bind(this)}
                            style={styles.inputicon}
                        >
                            <Icon name={'pluscircle'} size={50} color={'green'}
                            />
                        </TouchableOpacity>
                        }
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.multipleFileme}
                                renderItem={this.renderItemme}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatorme}
                            />
                        </View>
                        {/* {this.state.multipleFileme=='' &&
                                <View style={{marginTop:'15%',marginBottom:'15%',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            } */}

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
                                    onPress={() => this.UploadFilesfe()}
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
                        <TouchableOpacity
                            onPress={() => { this.setState({ modalShowfe: true }) }}
                        >
                            <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, margin: 15, marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                                <Iconm name={'folder'} size={20} color={'green'}
                                    style={{ marginLeft: 15 }}
                                />
                                <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>
                                    {this.state.dstatusfe}
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
                            visible={this.state.modalShowfe}>
                            <View style={{ backgroundColor: '#ffffff', marginTop: 165, marginLeft: 15, marginRight: 15 }}>


                                <FlatList
                                    data={this.state.datasourcefe}
                                    renderItem={this.renderItemmfe}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparatormfe}
                                />
                            </View>
                        </Modal>
                        {lib.Token!=='true' &&
                            <TouchableOpacity
                            onPress={this.selectFilefe.bind(this)}
                            style={styles.inputicon}
                        >
                            <Icon name={'pluscircle'} size={50} color={'green'}
                            />
                        </TouchableOpacity>
                        }
                        <View style={styles.container}>
                            <FlatList
                                data={this.state.multipleFilefe}
                                renderItem={this.renderItemfe}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={this.renderseparatorfe}
                            />
                        </View>
                        {/* {this.state.multipleFilefe=='' &&
                                <View style={{marginTop:'15%',marginBottom:'15%',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            } */}

                        </View>
                        :
                        null
        );
    }
}
const styles = StyleSheet.create({
    tabTextStyle: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: 'black',


    },
    container: {
        // flex:1,
        marginTop: 10,
        backgroundColor: '#FFFFFF'
      },
  
    tabsContainerStyle: {
        // margin: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
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
});

