import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import * as lib from './storeData'


class Students extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isloading: true,
            status: 'false'
        }
    }

    ShowNewScreen(msg,id) {
        lib.TMsg = msg;
        lib.TMsgId=id;
        this.props.navigation.navigate('Message');

    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={this.ShowNewScreen.bind(this, item.Message,item.Id)}
                style={{ flex: 1, flexDirection: 'row' }}

            >

                <Image style={{ height: 60, width: 60, borderRadius: 30, margin: 15 }}
                    source={item.Img != null ? { uri: 'data:image/jpeg;base64,' + lib.TImg } :
                        require('./img/demoprofile.jpg')
                    }


                />


                <View style={{ justifyContent: 'center', }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', }}>
                        {item.emp_firstname} {item.emp_middle} {item.emp_lastname}

                    </Text>
                    <Text>sent you in a message.</Text>
                </View>

            </TouchableOpacity>
        )
    }

    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 89 }} >

            </View>
        )

    }



    //////////////////////// Get Notifications ////////////////////////////////////////
    getNotifications() {

        const url = `http://192.168.43.143/FWebAPI/api/users/ShowAllMessages?id=${lib.TId}&status=${this.state.status}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                console.log(responsejson)
                this.setState(
                    {
                        data: responsejson,
                        isloading: false,


                    }
                )


            })
            .catch((error) => {
                console.log(error)
            })

    }


    componentDidMount() {
        this.getNotifications();
        lib.TMsgCount='0';
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


