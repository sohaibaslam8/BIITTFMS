import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';
import * as lib from './storeData';
export default class CoursesPW extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: true,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000);
    }
    render() {
        return (
            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                    <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.CNamePR}</Text>
                    </View>
                    <WebView
                        style={{ flex: 1,}}
                        originWhitelist={['*']}
                        source={{ uri: `http://192.168.10.4/FWebAPI/`+`${lib.FileNamePR}` }}
                        style={{ marginTop: 10 }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />


                </View>
        );
    }
}
const styles = StyleSheet.create({
    tabTextStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',

    },
    tabsContainerStyle: {
        margin: 10,
        marginBottom: 0
    },
    tabstyle: {
        borderColor: 'green'

    },
    activeTabStyle: {
        backgroundColor: 'green',

    }
});