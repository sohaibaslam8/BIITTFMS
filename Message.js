import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import * as lib from './storeData'


class Students extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isloading: true,
            status: 'true'
        }
    }

    UpdateStatus()
    {
        let collection = {}
        collection.Id=lib.TMsgId,
        collection.Status = this.state.status,
        fetch(`${lib.IpAddress}/users/ModifyStatus`, {
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

    componentDidMount()
    {
        this.UpdateStatus();
    }
    render() {
        return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#FFFFFF',margin:10 }}>
                <Text style={{fontSize:16,padding:10}}>{lib.TMsg}</Text>
            </View>
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


