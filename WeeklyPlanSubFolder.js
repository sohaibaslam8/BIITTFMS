import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Modal, Platform, Alert, Dimensions, ScrollView, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import Iconm from 'react-native-vector-icons/FontAwesome';
import Iconw from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconsm from 'react-native-vector-icons/AntDesign';
import { CheckBox, Item, Input, Label } from 'native-base';
import Modals from 'react-native-modalbox';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import RightIcon from 'react-native-vector-icons/AntDesign';
import * as lib from './storeData'
var screen = Dimensions.get('window');
class WeeklyPlanMainFolder extends Component {


    constructor(props) {
        super(props);
        //Initialization of the state to store the selected file related attribute
        this.state = {

            isloading: true,
            SubTopics: [],
            selectedLabel: '',
            modalShow: false,
            modalShowST: false,
            rowkey: '',
            weekno: '',
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
        lib.WeekNoSubFolder = week;

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

    SubmitCoveredSubTopic() {

        console.log(this.state.weekno);
        //  console.log(lib.WeekNoSSTSF);
        let collection = {}

        console.log(collection)

        // if (this.state.weekno == '') {
            collection.ST_Id = this.state.rowkey,
                collection.week_no = `Week-${this.state.weekno.trim()}`,
                collection.SECTION = lib.Section,
                collection.DISCIPLINE = lib.Discipline,
                collection.SemC = lib.Semc,
                collection.SEMESTER_NO = lib.SemNo,
                collection.EMP_NO = lib.TId
                console.log(collection)

        // }
        // else {
        //     collection.ST_Id = this.state.rowkey,
        //         collection.week_no = this.state.weekno,
        //         collection.SECTION = lib.Section,
        //         collection.DISCIPLINE = lib.Discipline,
        //         collection.SemC = lib.Semc,
        //         collection.SEMESTER_NO = lib.SemNo,
        //         collection.EMP_NO = lib.TId


        // }

        fetch(`${lib.IpAddress}/users/AddCoveredSubTopic`, {
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



    }


    findTaskIndex(taskId) {

        let { SubTopics } = this.state;
        for (var i = 0; i < SubTopics.length; i++) {
            if (SubTopics[i].ST_Id == taskId) {
                return i;
            }
        }
        return -1;
    }
    toggleCheckForTask(taskId) {

        if(this.state.weekno<=16)
        {
            this.SubmitCoveredSubTopic();
        this.setState({ modalShowST: false })
        var foundindex = this.findTaskIndex(taskId);

        var newsubtopic = this.state.SubTopics;
        newsubtopic[foundindex].isChecked = !newsubtopic[foundindex].isChecked;
        this.setState({
            SubTopics: newsubtopic
        });
        console.log("index of this task is ", foundindex);


        }
        else 
        {
            Alert.alert("Week Number","Please enter the valid week number.")
        }

        

    }

    OpenModalCheckWeekNumber(id)
    {

        this.setState({weekno:lib.WeekNoSubFolder.split('-')[1] ,rowkey:id, modalShowST: true })

    }


    renderItem = ({ item }) => {
        // console.log("helleoldkjfk" + item.isChecked)
        return (
            <View
                style={{ flex: 1, flexDirection: 'row', }}
            >
                <Iconw name={'calendar-week'} size={30} color={'#3a3a3a'}
                    style={{ margin: 20 }}
                />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                    <Text style={{ fontSize: 14, color: '#3a3a3a', fontWeight: '600', width: '80%' }}>
                        {item.ST_Name}
                    </Text>
                    <View style={{ right: 40, position: 'absolute', }}>

                        {lib.Token === 'true' &&
                            <CheckBox checked={item.isChecked} color="green" />

                        }
                        {lib.Token !== 'true' &&
                            <CheckBox checked={item.isChecked} color="green"
                                onPress={() => item.isChecked !== true ? this.OpenModalCheckWeekNumber(item.ST_Id) : Alert.alert("Checkbox","The checkbox is already checked.")}
                            />
                        }
                    </View>

                </View>

            </View>

        )
    }
    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '94%', backgroundColor: '#cccccc', marginLeft: 73 }} >

            </View>
        )

    }

    ///////////////////// CheckBox Checked Or Not //////////////////////////////////
    findIndex(taskId) {

        let { SubTopics } = this.state;
        for (var i = 0; i < SubTopics.length; i++) {
            if (SubTopics[i].ST_Id == taskId) {
                return i;
            }
        }
        return -1;
    }
    CheckBoxSelect(taskId) {

        var foundindex = this.findIndex(taskId);

        var newsubtopic = this.state.SubTopics;
        newsubtopic[foundindex].isChecked = !newsubtopic[foundindex].isChecked;
        this.setState({
            SubTopics: newsubtopic
        });

    }

    SubTopicCheckboxCheckOrNot(id) {

        const url = `${lib.IpAddress}/users/SubTopicCheckboxCheckOrNot?id=${id}&section=${lib.Section}&discipline=${lib.Discipline}&semc=${lib.Semc}&semester_no=${lib.SemNoTemp}&empno=${lib.TIdTemp}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson);
                if (responsejson == 'true') {
                    this.CheckBoxSelect(id);
                }
            })
            .catch((error) => {
                console.log(error)
            })


    }

    /////////   Move Week numbers //////////////////////////////////

    MoveLeftFunction() {
        var week = lib.WeekNoSubFolder.split('-')[0]
        var weekno = lib.WeekNoSubFolder.split('-')[1]
        if (weekno > 1) {
            weekno--;
            lib.WeekNoSubFolder = `${week}-${weekno}`
            this.componentDidMount();

        }
    }
    MoveRightFunction() {
        var week = lib.WeekNoSubFolder.split('-')[0]
        var weekno = lib.WeekNoSubFolder.split('-')[1]
        if (weekno < 16) {
            weekno++;
            lib.WeekNoSubFolder = `${week}-${weekno}`
            this.componentDidMount();
        }
    }

    ///////////////////////////////// ComponentDidMount() /////////////////////////////////////////
    componentDidMount() {
        this.state.SubTopics.map((data) => {
            var o = Object.assign({}, data);
            o.isChecked = false;
            return o;

        });

        //   lib.WeekNoSST='Week-1'
        //   lib.CNo='CS-686'
        const url = `${lib.IpAddress}/users/AllSubTopic?weekno=${lib.WeekNoSubFolder}&courseno=${lib.CNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        SubTopics: responsejson,
                        isloading: false
                    }
                )

                for (var i = 0; i < this.state.SubTopics.length; i++) {

                    this.SubTopicCheckboxCheckOrNot(this.state.SubTopics[i].ST_Id);

                }



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
                        //  ref={this.state.modalShowST}
                        // visible={this.state.modalShowST}
                        isOpen={this.state.modalShowST}
                        style={{
                            justifyContent: 'center',
                            borderRadius: Platform.OS === 'ios' ? 30 : 30,
                            shadowRadius: 10,
                            width: screen.width - 80,
                            height: 240,
                            // zIndex:1,
                        }}
                        position='center'
                        backdrop={true}
                        backdropPressToClose={false}
                        onClosed={() => {
                            // alert("Modal Closed");
                        }}
                    >

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                marginTop: 40
                            }}
                        >Enter Week Number</Text>

                        {/* <Item stackedLabel style={{
                            height: 40,
                            borderBottomColor: 'gray',
                            marginLeft: 30,
                            marginRight: 30,
                            marginTop: 20,
                            marginBottom: 10,
                            borderBottomWidth: 1


                        }}>
                            <Label>Week Number</Label>
                            <Input defaultValue={lib.WeekNoSubFolder} onChangeText={(text) => this.setState({ weekno: text })} />

                        </Item> */}
                         <Text
                            style={{
                                fontSize: 16,
                                marginTop: 15,
                                marginLeft: 30
                            }}
                        >Week Number</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:16,marginLeft:30}}>Week-</Text>
                        <TextInput
                            style={{fontSize:16,marginTop:3,color:'black'}}
                            // placeholder={'Enter Topic Name'}
                             defaultValue={this.state.weekno}
                            // placeholderTextColor={'black'}
                            underlineColorAndroid='transparent'
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ weekno: text })}
                        />

                        </View>
                        
                        <View style={{borderWidth:0.5,borderColor:'gray',marginLeft: 30,marginRight: 30,}}></View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => this.setState({ modalShowST: false })}
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
                                onPress={()=>this.state.weekno!==''?this.toggleCheckForTask(this.state.rowkey):Alert.alert("Week Number","Please enter week number.")}
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
                                        {lib.WeekNoSubFolder}
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
                                {/* <View style={{backgroundColor: '#000000aa', flex:1}}>  */}
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

                                {/* </View> */}
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

                            <View style={{ marginLeft: '70%', flexDirection: 'row', margin: 20, }}>
                                {/* {lib.WeekNoSubFolder!='Week-1' && */}
                                <TouchableOpacity onPress={() => this.MoveLeftFunction()}>
                                    <LeftIcon name={'leftsquare'} size={40} color={'green'}
                                        style={{ marginRight: 4 }}
                                    />
                                </TouchableOpacity>
                                {/* }  */}
                                {/* {lib.WeekNoSubFolder!='Week-16' && */}
                                <TouchableOpacity onPress={() => this.MoveRightFunction()}>
                                    <RightIcon name={'rightsquare'} size={40} color={'green'} />
                                </TouchableOpacity>
                                {/* }  */}
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
            // marginTop: 0,
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

