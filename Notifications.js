import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import * as lib from './storeData'


class Students extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isloading: true,
            status: 'false',
            seen: 'true',
            refresh:false
        }
    }

    findTaskIndex(taskId) {

        let { data } = this.state;
        for (var i = 0; i < data.length; i++) {
            if (data[i].Id == taskId) {
                return i;
            }
        }
        return -1;
    }
    toggleCheckForTask(taskId) {


        var foundindex = this.findTaskIndex(taskId);

        var newsubtopic = this.state.data;
        if (newsubtopic[foundindex].isSeen) {
            console.log(newsubtopic[foundindex].isSeen);

        }
        else {
            newsubtopic[foundindex].isSeen = !newsubtopic[foundindex].isSeen;

            this.setState({
                data: newsubtopic
            });
            console.log("index of this task is ", foundindex);

        }

        // console.log(newsubtopic[foundindex].isSeen);


    }

    NotificationIconShowOrNot(taskId) {
        var foundindex = this.findTaskIndex(taskId);

        var newsubtopic = this.state.data;
        newsubtopic[foundindex].isSeen = !newsubtopic[foundindex].isSeen;

        this.setState({
            data: newsubtopic
        });
        console.log("index of this task is ", foundindex);
        // console.log(newsubtopic[foundindex].isSeen);

    }
    ShowNewScreen(msg, id, cname) {
        console.log("Show New Screen");
        this.toggleCheckForTask(id);
        lib.TMsg = msg;
        lib.TMsgId = id;
        lib.TMsgCName = cname;
        this.props.navigation.navigate('Message');

    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowNewScreen.bind(this, item.Message, item.Id, item.title)}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}

            >

                <Image style={{ height: 65, width: 65, borderRadius: 65 / 2, margin: 15 }}
                    source={item.Img != null ? { uri: 'data:image/jpeg;base64,' + lib.TImg } :
                        require('./img/demoprofile.jpg')
                    }
                />


                <View style={{ justifyContent: 'center', width: '65%' }}>
                    <Text>
                        <Text style={{ fontWeight: 'bold', color: 'black', }}>
                            {item.emp_firstname} {item.emp_middle} {item.emp_lastname}</Text>
                        <Text style={{ color: 'black', }}> has recommended replacing the</Text>
                        <Text style={{ fontWeight: 'bold', color: 'black' }}> {item.title}</Text><Text> paper.</Text>
                    </Text>
                    <Text>
                        {item.NDate}  {item.NTime}
                    </Text>
                </View>
                {!item.isSeen &&
                    <View style={{ marginLeft: 3, width: 12, height: 12, borderRadius: 12 / 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    </View>
                }

            </TouchableOpacity>
        )
    }

    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 95 }} >

            </View>
        )

    }


    /////////////////////// Check Notification Seen Or Not //////////////////////////////
    CheckNotificationSeenOrNot(id) {

        const url = `${lib.IpAddress}/users/CheckNotificationSeenOrNot?id=${id}&seen=${this.state.seen}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson);
                if (responsejson == 'true') {
                    this.NotificationIconShowOrNot(id);
                }
            })
            .catch((error) => {
                console.log(error)
            })


    }
    handleRefresh=()=>{
        this.setState({isloading:true});
        this.getNotifications();
        setTimeout(() => {
            this.setState({ isloading: false })
        }, 2000);
      }


    //////////////////////// Get Notifications ////////////////////////////////////////
    getNotifications() {
        this.state.data.map((data) => {
            var o = Object.assign({}, data);
            o.isSeen = false;
            return o;

        });

        const url = `${lib.IpAddress}/users/ShowAllMessages?id=${lib.TId}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        data: responsejson,
                    }
                )
                for (var i = 0; i < this.state.data.length; i++) {

                    this.CheckNotificationSeenOrNot(this.state.data[i].Id);

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    ////////////////////// Update Status //////////////////////////////////////////////

    UpdateStatus() {

        const url = `${lib.IpAddress}/users/ModifyStatus?id=${lib.TId}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
            })
            .catch((error) => {
                console.log(error)
            })
    }




    componentDidMount() {
        this.getNotifications();
        this.UpdateStatus();
        lib.TMsgCount = '0';
        setTimeout(() => {
            this.setState({ isloading: false })
        }, 2000);
    }






    render() {
        return (

            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :

                <View style={styles.container}>



                    <View style={{ backgroundColor: '#FFFFFF', }}>
                        <FlatList
                            refreshing={this.state.refresh}
                            onRefresh={this.handleRefresh}
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderseparator}
                        />
                    </View>
                    {this.state.data == '' &&
                        <View style={{ marginTop: '15%', marginBottom: '10%', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18 }}>No notification is available at the moment.</Text>

                        </View>
                    }

                </View>



        );
    }


}
export default Students;
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#e9e9e9',

        },
        gradient: {
            flex: 1,

        }

    }
);


