import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { Header,Item, Input, Icon } from 'native-base';
import * as lib from './storeData'
import _ from 'lodash'


class TeacherPerformance extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            isloading: true,
            routeParam: '',
            fulldata: [],
            query:'',
            refresh:false,
            data1:[]


        }
    }


    renderItem = ({ item }) => {
        return (
            <View
                style={{ flex: 1,  }}
            >
                {/* <View style={{ margin: 10, width: 50, height: 50, borderRadius: 50 / 2, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white',  fontSize: 18 }}>{item.St_firstname[0]}</Text>
                </View> */}


                <View style={{ flex: 1, marginLeft: 6,flexDirection:'row' }}>
                <Text style={{ fontSize: 16, color: 'black', fontWeight: '600',width:'30%',borderWidth:0 }}>
                        {item.teacher_firstName} {item.teacher_MiddleName} {item.teacher_LastName}
                    </Text>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600',width:'25%',borderWidth:0 }}>
            {`\t\t`}{item.course_Desc}
                    </Text>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600',width:'25%',borderWidth:0 }}>
            {`\t`}{item.DISCIPLINE} {item.SemC}-{item.SECTION}
                    </Text>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '600',borderWidth:0 }}>
                    {`\t\t`}{item.Count}
                    </Text>
                    {/* <Text style={{ fontSize: 14, color: 'black' }}>
                        {item.Reg_No}
                    </Text> */}

                </View>

            </View>
        )
    }

    renderseparator = () => {
        return (
            <View style={{ height: 1, width: '100%', backgroundColor: '#cccccc' }} >

            </View>
        )

    }

    handleSearch=(text)=>{
        const formattedQuery=text.toUpperCase()  
        const data=_.filter(this.state.fulldata,photo=>{
            if(photo.teacher_firstName.includes(formattedQuery)){
                return true
            }
            return false
        })
        this.setState({data,query:text})

    }


    handleRefresh=()=>{
         this.getTeachers();
      }



    //////////////////////// Get Students ////////////////////////////////////////
    getTeachers() {

        const url = `${lib.IpAddress}/users/CheckTeacherPerformance`
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
        this.getTeachers();
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
                    <TouchableWithoutFeedback style={{flex:1}} onPress={() => { Keyboard.dismiss() }} >
                        <FlatList
                         refreshing={this.state.refresh}
                         onRefresh={this.handleRefresh}
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
export default TeacherPerformance;
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


