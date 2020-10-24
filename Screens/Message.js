import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';

import * as lib from './storeData'


class Students extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isloading: true,
            seen: 'true'
        }
    }

    UpdateSeen()
    {
        let collection = {}
        collection.Id=lib.TMsgId,
        collection.Seen = this.state.seen,
        fetch(`${lib.IpAddress}/users/ModifySeen`, {
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
        this.UpdateSeen();
    }
    render() {
        return (
        <View style={styles.container}>
              <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.TMsgCName}</Text>
              </View>
            <View style={{ backgroundColor: '#FFFFFF',margin:10 }}>
                <Text style={{fontSize:16,padding:15}}>{lib.TMsg}</Text>
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


