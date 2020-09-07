import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { Header,Item, Input, Icon } from 'native-base';
import * as lib from './storeData'
import _ from 'lodash'


class Students extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isloading: true,
            routeParam: '',
            fulldata: [],
            query:'',
            


        }
    }


    renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1, flexDirection: 'row' }}
            >
                <View style={{ margin: 10, width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white',  fontSize: 18 }}>{item.St_firstname[0]}</Text>
                </View>


                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 6 }}>


                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600' }}>
                        {item.St_firstname} {item.St_middlename} {item.St_lastname}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'black' }}>
                        {item.Reg_No}
                    </Text>

                </View>

            </View>
        )
    }

    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '90%', backgroundColor: '#cccccc', marginLeft: 77 }} >

            </View>
        )

    }

    handleSearch=(text)=>{
        const formattedQuery=text.toUpperCase()  
        const data=_.filter(this.state.fulldata,photo=>{
            if(photo.St_firstname.includes(formattedQuery)){
                return true
            }
            return false
        })
        this.setState({data,query:text})

    }



    //////////////////////// Get Students ////////////////////////////////////////
    getStudents() {

        const url = `${lib.IpAddress}/users/AllStudents?empno=${lib.TIdTemp}&semesterno=${lib.SemNoTemp}&discipline=${lib.Discipline}&section=${lib.Section}&courseno=${lib.CNo}`
        fetch(url)
            .then((response) => response.json())
            .then((responsejson) => {
                // console.log(responsejson)
                this.setState(
                    {
                        data: responsejson,
                        isloading: false,
                        fulldata: responsejson

                    }
                )


            })
            .catch((error) => {
                console.log(error)
            })

    }


    componentDidMount() {
        this.getStudents();
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

                    <View searchBar rounded style={{marginLeft:10,marginRight:10,marginBottom:10}}>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search" onChangeText={this.handleSearch} />
                            <Icon name="ios-people" />
                        </Item>

                    </View>

                    <View style={{backgroundColor: '#FFFFFF'}}>
                    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }} >
                        <FlatList
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={this.renderseparator}
                        />
                    </TouchableWithoutFeedback>
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


