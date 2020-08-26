import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image, FlatList, Alert, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
import { Item, Input, Label } from 'native-base';
import Modals from 'react-native-modalbox';
import * as lib from './storeData'
var screen = Dimensions.get('window')
class CourseObjective extends Component {
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
        dtype: 'Contents',
        FileOriginalName: '',
        showModal: false
      };
  }
  
  /////////       Show Files ////////////
  ShowFiles = (name) => {
    Linking.canOpenURL('http://192.168.43.143/FWebAPI/File/' + name).then(supported => {
      if (supported) {
        Linking.openURL('http://192.168.43.143/FWebAPI/File/' + name);
      } else {
        console.log("Don't know how to open URI: " + 'http://192.168.43.143/FWebAPI/File/' + name);
      }
    });
  };

  /////////  Delete Files ///////////////////////////

 
  DeleteFolderDocument = (filedata) => {
    const url = `http://192.168.43.143/FWebAPI/api/Users/DeleteFolderDocument?id=${filedata}`
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
          {lib.MainFM==='true' &&
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
    const url = `http://192.168.43.143/FWebAPI/api/users/AllDocumentShowMainFolder?courseno=${lib.CNo}&semno=${lib.SemNoTemp}&dtype=${this.state.dtype}`
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

  /////////////  Add Files Database /////////////////////////////////////


  addFolderDocument() {
    console.log(this.state.FileOriginalName);
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


    fetch('http://192.168.43.143/FWebAPI/api/users/AddFolderDocument', {
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
    collection.EMP_NO = lib.TId;
    collection.Doc_Type = 'Contents';
    collection.SEMESTER_NO = lib.SemNo;

    fetch('http://192.168.43.143/FWebAPI/api/users/AddFolderDetail', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        this.setState({ FDid: data })
        this.addFolderDocument();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  GetFolderDetailId()
  {
    const url = `http://192.168.43.143/FWebAPI/api/Users/GetFolderDetailIdMainFolder?courseno=${lib.CNo}&semno=${lib.SemNoTemp}&empno=${lib.TIdTemp}&dtype=${this.state.dtype}`
    fetch(url)
        .then((response) => response.json())
        .then((responsejson) => {
            console.log(responsejson)
           if(responsejson != 'false')
           {
             this.setState({FDid: responsejson[0].FD_Id})
             this.addFolderDocument();
           }
           else
           {
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
    fetch("http://192.168.43.143/FWebAPI/api/Users/UploadFilenewcode", {
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
          {lib.MainFM==='true' &&
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
                                <View style={{marginTop:'15%',marginBottom:'10%',alignItems:'center'}}>
                                    <Text style={{fontSize:20}}>No content available at the moment.</Text>

                                </View>
                            }
        </View>

    );
  }



}
export default CourseObjective;
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

