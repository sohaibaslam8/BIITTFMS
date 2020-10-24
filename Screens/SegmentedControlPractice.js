import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import * as lib from './storeData'
import SegmentedControlTab from "react-native-segmented-control-tab";


export default class CoursesDetail extends React.Component {

    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            selectedIndex: 0,
            status: true,
            MainFolderstatus: false,
            routeParam: '',
            exportId: lib.Id,
            id: '',
           
        }
    }


   
    ////////////// SegmentedControlTab //////////////////////////////////////////
    handleIndexChange = index => {
        this.setState({
            selectedIndex: index

        })

        if (this.state.selectedIndex == 0) {
            if (this.state.status == true && this.state.MainFolderstatus == false) {
                this.setState({ status: false, MainFolderstatus: true })
            }
        }
        if (this.state.selectedIndex == 1) {
            if (this.state.status == false && this.state.MainFolderstatus == true) {
                this.setState({ status: true, MainFolderstatus: false })
            }
        }
    };


   



   
    componentDidMount() {
        //    lib.CNo=this.props.navigation.getParam('cno');

     
    }





    render() {

        return (


            this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                this.state.status ?

                    <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                        <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.CName}</Text>

                        </View>
                        <SegmentedControlTab
                            tabTextStyle={styles.tabTextStyle}
                            values={["Section", "Main Folder"]}
                            tabsContainerStyle={styles.tabsContainerStyle}
                            activeTabStyle={styles.activeTabStyle}
                            selectedIndex={this.state.selectedIndex}
                            onTabPress={this.handleIndexChange}
                            tabStyle={styles.tabstyle}
                        />

   
                    </View>
                    :
                    this.state.MainFolderstatus ?
                        <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                              <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.CName}</Text>

                        </View>
                            <SegmentedControlTab
                                tabTextStyle={styles.tabTextStyle}
                                values={["Section", "Main Folder"]}
                                tabsContainerStyle={styles.tabsContainerStyle}
                                activeTabStyle={styles.activeTabStyle}
                                selectedIndex={this.state.selectedIndex}
                                onTabPress={this.handleIndexChange}
                                tabStyle={styles.tabstyle}
                            />

   
                        </View>
                        :
                        null
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
        // marginLeft: 10,
        // marginRight: 10,
        // marginTop: 10,

    },
    tabstyle: {
        borderColor: 'green'

    },
    activeTabStyle: {
        backgroundColor: 'green',

    }
});

