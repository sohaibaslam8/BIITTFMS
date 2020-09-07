import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator,ScrollView, Modal, Image, FlatList, Alert, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import { Item, Input, Label } from 'native-base';
import Modals from 'react-native-modalbox';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconsm from 'react-native-vector-icons/AntDesign';
import { Appbar } from 'react-native-paper';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import RightIcon from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'
var screen = Dimensions.get('window')

class AssignmentsSolution extends Component {
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
        dtype: 'AssignmentSolution',
        FileOriginalName: '',
        showModal: false,
        modalShow: false,
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

  //////////////////////// Select Week No. Modal //////////////////////////////////////
  HideModel(week) {
    lib.WeekNoAssignmentsSolutions = week
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


  /////////   Move Week numbers //////////////////////////////////

  MoveLeftFunction() {
    var week = lib.WeekNoAssignmentsSolutions.split('-')[0]
    var weekno = lib.WeekNoAssignmentsSolutions.split('-')[1]
    if (weekno > 1) {
      weekno--;
      lib.WeekNoAssignmentsSolutions = `${week}-${weekno}`
      this.componentDidMount();

    }
  }
  MoveRightFunction() {
    var week = lib.WeekNoAssignmentsSolutions.split('-')[0]
    var weekno = lib.WeekNoAssignmentsSolutions.split('-')[1]
    if (weekno < 16) {
      weekno++;
      lib.WeekNoAssignmentsSolutions = `${week}-${weekno}`
      this.componentDidMount();
    }
  }




  //////////////////  Show Files ///////////////////////////////////////////////////////
  ShowFiles = (name) => {
    Linking.canOpenURL(`${lib.IpAddressFileOpen}`+name).then(supported => {
      if (supported) {
        Linking.openURL(`${lib.IpAddressFileOpen}`+name);
      } else {
        console.log("Don't know how to open URI: " +`${lib.IpAddressFileOpen}`+name);
      }
    });
  };

  /////////////////////  Delete Files /////////////////////////////////////////////////////////

  // DeleteFolderDetail = (filedata) => {
  //   const url = `http://192.168.43.143/FWebAPI/api/Users/DeleteFolderDetail?id=${filedata}`
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((responsejson) => {
  //       console.log(responsejson)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
  DeleteFolderDocument = (filedata) => {
    const url = `${lib.IpAddress}/Users/DeleteFolderDocument?id=${filedata}`
    fetch(url)
      .then((response) => response.json())
      .then((responsejson) => {
        console.log(responsejson)
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error)
      })
  }




  DeleteFiles = (filedata) => {
    // console.log(filedata);
    console.log("heelooo:", filedata)
    // this.DeleteFolderDetail(filedata);
    this.DeleteFolderDocument(filedata);

  }

  CheckFilesDeleteOrNot = (filedata) => {
    Alert.alert(
      "File delete",
      "Do you want to delete this file?\nYou cannot undo this action.",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "DELETE", onPress: () => this.DeleteFiles(filedata) }
      ],
      { cancelable: false }
    );
  }


  /////////////// Show Files in Flat List ////////////////////////
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={this.ShowFiles.bind(this, item.Name)}
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
            onPress={this.CheckFilesDeleteOrNot.bind(this, item.FDoc_Id)}
          >
            <Icon name={'delete'} size={21} color={'black'}
            />
          </TouchableOpacity>
          }

        </View>

      </TouchableOpacity>
    )
  }
  renderseparator = () => {
    return (
      <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 55 }} >

      </View>
    )

  }

  //////////////// ComponentDidMount ////////////////////////////////////
  componentDidMount() {
    // this.setState({isloading:true})
    const url = `${lib.IpAddress}/users/AllDocumentShowSubFolderQuizAndAssignment?courseno=${lib.CNo}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtype}&dstatus=${lib.WeekNoAssignmentsSolutions}`
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

  ///////////// Add Files Database /////////////////////////////////////


  addFolderDocument() {
    // console.log(this.state.FileOriginalName);
    let collection = {}

    if (this.state.FileOriginalName == undefined) {
      collection.FD_Id = this.state.FDid;
      collection.Name = this.state.Dname;
      collection.Doc_Name = this.state.Dname;
    }
    else {
      collection.FD_Id = this.state.FDid;
      collection.Name = this.state.Dname;
      collection.Doc_Name = this.state.FileOriginalName;

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
        this.componentDidMount();
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  addFolderDetail() {
    let collection = {}
    collection.course_no = lib.CNo;
    collection.SECTION = lib.Section;
    collection.DISCIPLINE = lib.Discipline;
    collection.SemC = lib.Semc;
    collection.SEMESTER_NO = lib.SemNo;
    collection.EMP_NO = lib.TId;
    collection.Doc_Type = 'AssignmentSolution';
    collection.Doc_Status = lib.WeekNoAssignmentsSolutions;


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
        this.setState({ FDid: data })
        this.addFolderDocument();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  GetFolderDetailId() {
    const url = `${lib.IpAddress}/Users/GetFolderDetailIdSubFolderQuizAndAssignment?courseno=${lib.CNo}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtype}&dstatus=${lib.WeekNoAssignmentsSolutions}`
    fetch(url)
      .then((response) => response.json())
      .then((responsejson) => {
        console.log(responsejson)
        if (responsejson != 'false') {
          this.setState({ FDid: responsejson[0].FD_Id })
          this.addFolderDocument();
        }
        else {
          this.addFolderDetail();

        }

      })
      .catch((error) => {
        console.log(error)
      })
  }



  ///////// Select files //////////////////////////////////
  selectFile = async () => {
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
      this.setState({ singlefile: res, FileOriginalName: res.name, Dname: res.newURL });
      this.setState({ showModal: true })
      console.log(this.state.singlefile);
      console.log(this.state.FileOriginalName);

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

  createFormData = (fileData, body) => {

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
  UploadFiles = () => {
    this.setState({ showModal: false });
    fetch(`${lib.IpAddress}/Users/UploadFilenewcode`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: this.createFormData(this.state.singlefile, { userId: "123" })
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
    // this.addFolderDetail();
    this.GetFolderDetailId();
  };





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
          {/* <ScrollView> */}
          <Modals
            isOpen={this.state.showModal}
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
              {this.state.FileOriginalName === undefined &&
                <Input defaultValue={this.state.Dname} onChangeText={(text) => this.setState({ FileOriginalName: text })} />
              }
              {this.state.FileOriginalName != undefined &&
                <Input defaultValue={this.state.FileOriginalName} onChangeText={(text) => this.setState({ FileOriginalName: text })} />
              }

            </Item>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity
                onPress={() => this.setState({ showModal: false })}
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
                onPress={() => this.UploadFiles()}
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
            onPress={() => { this.setState({ modalShow: true }) }}
          >
            <View style={{ borderWidth: 1, borderColor: 'white', backgroundColor: 'white', height: 35, margin: 15, marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
              <Iconm name={'folder'} size={20} color={'green'}
                style={{ marginLeft: 15 }}
              />
              <Text style={{ marginLeft: 10, color: 'green', fontSize: 16 }}>
                {lib.WeekNoAssignmentsSolutions}
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
          {lib.Token!=='true' &&
          <TouchableOpacity
            onPress={this.selectFile.bind(this)}
            style={styles.inputicon}
          >
            <Icon name={'pluscircle'} size={50} color={'green'}
            />
          </TouchableOpacity>
          }
          <View style={styles.container}>
            <FlatList
              data={this.state.multipleFile}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderseparator}
            />
          </View>
          {this.state.multipleFile=='' &&
                                <View style={{marginTop:'15%',marginBottom:'15%',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            }

          <View style={{ marginLeft: '70%', flexDirection: 'row', margin: 20 }}>
            {/* {lib.WeekNoAssignmentsSolutions!='Week-1' && */}
            <TouchableOpacity onPress={() => this.MoveLeftFunction()}>
              <LeftIcon name={'leftsquare'} size={40} color={'green'}
                style={{ marginRight: 4 }}
              />
            </TouchableOpacity>
             {/* }  */}
            {/* {lib.WeekNoAssignmentsSolutions!='Week-16' && */}
            <TouchableOpacity onPress={() => this.MoveRightFunction()}>
              <RightIcon name={'rightsquare'} size={40} color={'green'} />
            </TouchableOpacity>
   {/* } */}
          </View>
          {/* </ScrollView> */}
        </View>

    );
  }



}
export default AssignmentsSolution;
const styles = StyleSheet.create(
  {
    maincontainer: {
      flex: 1,
      backgroundColor: '#e9e9e9'
    },
    container: {
      // flex:1,
      marginTop: 10,
      backgroundColor: '#FFFFFF'
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

