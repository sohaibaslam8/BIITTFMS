import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList,TextInput, Modal, ScrollView, ActivityIndicator, Alert, Dimensions, Linking } from 'react-native';
import { Appbar } from 'react-native-paper';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsm from 'react-native-vector-icons/AntDesign';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import RightIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconedit from 'react-native-vector-icons/AntDesign';
import { Item, Input, Label } from 'native-base';
import * as lib from './storeData'
import Modals from 'react-native-modalbox';
var screen = Dimensions.get('window')
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
            showModalAddTopic: false,
            TopicId:'',
            TopicName:'',
            MTopicName:'',
            UpdateTopicId:'',
            UpdateTopicName:'',
            OriginalTopicName:'',
            UpdateTNModel:false,
            refresh:false,
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


    EditTopicName()
    {
        if(this.state.UpdateTopicName!==this.state.OriginalTopicName)
        {
            console.log(this.state.UpdateTopicId);
            console.log(this.state.UpdateTopicName);
             let collection = {}
             collection.ST_Id=this.state.UpdateTopicId,
             collection.ST_Name = this.state.UpdateTopicName,
             fetch(`${lib.IpAddress}/users/ModifyTopicName`, {
                 method: 'POST', // or 'PUT'
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(collection),
             })
                 .then((response) => response.json())
                 .then((data) => {
                     console.log('Success:', data);
                     this.setState({
                         UpdateTopicName:'',
                         UpdateTNModel:false
                     })
                     this.componentDidMount();
                 })
                 .catch((error) => {
                     console.error('Error:', error);
                 });
            }
            else
            {
                alert("Please change the topic name.")
            }
      
    }

    renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
                <Iconw name={'calendar-week'} size={35} color={'#3a3a3a'}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1,flexDirection: 'row', alignItems: 'center',  }}>
                    <Text style={{ fontSize: 14, color: '#3a3a3a', fontWeight: '600', width: '80%' }}>
                        {item.ST_Name}
                    </Text>
                    {lib.MainFM === 'true' &&
                    <TouchableOpacity style={{ right: 30, position: 'absolute', padding: 4}}
                     onPress={()=>this.setState({UpdateTNModel:true,UpdateTopicId:item.ST_Id,UpdateTopicName:item.ST_Name,OriginalTopicName:item.ST_Name})}
                    >
                    <Iconedit name={'edit'} size={21} color={'black'} />
                    </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 76 }} ></View>
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

    //////////////////////////// SubTopic ////////////////////////////////////////////////////

    AddSubTopic()
    {
        let collection = {}
        collection.ST_Name = this.state.TopicName;
        collection.TId = this.state.TopicId;
        fetch(`${lib.IpAddress}/users/AddSubTopic`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collection),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            this.setState({showModalAddTopic:false,TopicName:''})
            this.componentDidMount();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    /////////////////////////////// Add Topic //////////////////////////////////////////////
    AddTopic()
    {
        let collection = {}
        collection.TName=this.state.MTopicName;
        collection.course_no = lib.CNo;
        collection.week_no = lib.WeekNoMainFolder;
        fetch(`${lib.IpAddress}/users/AddTopic`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collection),
        })
          .then((response) => response.json())
          .then((data) => {
    
    
            console.log('Success:', data);
            this.setState({ TopicId: data })
            this.AddSubTopic();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    getTopicName()
    {
        const url = `${lib.IpAddress}/users/GetTopic?cno=${lib.CNo}&weekno=${lib.WeekNoMainFolder}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                if(responsejson!='false')
                {
                    this.setState(
                        {
                          
                          MTopicName:responsejson,
                          showModalAddTopic: true
                        })

                }
                else 
                {
                    
                    this.setState({MTopicName:'',showModalAddTopic: true})
                }
               
            })
            .catch((error) => {
                console.log(error)
            })
        // this.setState({ showModalAddTopic: true }) ;

    }


      
    handleRefresh=()=>{
        this.componentDidMount();
      }
    componentDidMount() {
        const url = `${lib.IpAddress}/users/AllSubTopic?weekno=${lib.WeekNoMainFolder}&courseno=${lib.CNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                this.setState(
                    {
                        SubTopics: responsejson,
                        isloading: false
                    })
                // console.log(this.state.SubTopics);
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
                     <Modals
                        isOpen={this.state.UpdateTNModel}
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
                        >Update Topic Name</Text>
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 15,
                                marginLeft: 30
                            }}
                        >Do you want to Update this Topic?</Text>
                        <TextInput
                            style={{marginLeft:30}}
                            // placeholder={'Enter Topic Name'}
                            value={this.state.UpdateTopicName}
                            // placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ UpdateTopicName: text })}
                        />
                        <View style={{borderWidth:0.5,borderColor:'gray',marginLeft: 30,marginRight: 30,}}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({UpdateTNModel: false })}
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
                                onPress={()=>this.state.UpdateTopicName!==''?this.EditTopicName():Alert.alert("Topic Name","Please enter topic name.")}
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


                    <Modals
                        isOpen={this.state.showModalAddTopic}
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
                        >Add Topic</Text>
                        <Text
                            style={{
                                fontSize: 14,
                                marginTop: 15,
                                marginLeft: 30
                            }}
                        >Do you want to Add this Topic?</Text>
                       {this.state.MTopicName=='' &&
                         <TextInput
                            style={{marginLeft:30}}
                            placeholder={'Enter Topic Name'}
                            // defaultValue={this.state.MTopicName!='false'?this.state.MTopicName:'Enter Topic Name'}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ MTopicName: text })}
                        />
                    }
                    {this.state.MTopicName!='' &&
                        <TextInput
                        style={{marginLeft:30}}
                        // placeholder={'Enter Topic Name'}
                         defaultValue={this.state.MTopicName}
                        placeholderTextColor={'black'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ MTopicName: text })}
                    />

                    }
                        <View style={{borderWidth:0.5,borderColor:'gray',marginLeft: 30,marginRight: 30,}}></View>
                        <TextInput
                            style={{marginLeft:30}}
                            placeholder={'Enter SubTopic Name'}
                            placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ TopicName: text })}
                        />

                        <View style={{borderWidth:0.5,borderColor:'gray',marginLeft: 30,marginRight: 30,}}></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ showModalAddTopic: false })}
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
                                onPress={()=>this.state.TopicName!=''?this.AddTopic():Alert.alert("Topic Name","Please Enter Topic Name.")}
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
                                 refreshing={this.state.refresh}
                                 onRefresh={this.handleRefresh}
                                    data={this.state.SubTopics}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    ItemSeparatorComponent={this.renderseparator}

                                />
                            </View>
                            {this.state.SubTopics == '' &&
                                <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>No content available at the moment.</Text>

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
                            {lib.MainFM === 'true' &&
                                <TouchableOpacity
                                 onPress={() =>this.getTopicName()}
                                    style={{ marginLeft: '75%' }}
                                >
                                    <Icon name={'pluscircle'} size={50} color={'green'}
                                    />
                                </TouchableOpacity>
                            }
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

