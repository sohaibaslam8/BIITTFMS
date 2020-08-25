import React, { Component } from 'react';

import { Text, View, FlatList, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as lib from './storeData'


class section extends Component {

    constructor() {
        super()
        this.state = {
            datasource: [
                { name: 'Students', url: require('./img/studenta.png'), key: '0' },
                { name: 'Weekly Plan', url: require('./img/calendar.png'), key: '1' },
                { name: 'Attendance Record', url: require('./img/register.png'), key: '2' },
                { name: 'Quizzes and Solutions', url: require('./img/quiz.png'), key: '3' },
                { name: 'Assignments and Solutions', url: require('./img/assignment.png'), key: '4' },
                { name: 'Samples', url: require('./img/documents.png'), key: '5' },
                { name: 'Final Result', url: require('./img/result1.png'), key: '6' },
                { name: 'Assessment Analysis and FCR', url: require('./img/research.png'), key: '7' },
            ],
        }
    }

    ShowNextScreen(key){
        if(key==0)
        {
             this.props.navigation.navigate('Students')

        }
        if(key==1)
        {
             this.props.navigation.navigate('WeeklyPlanSubFolder')

        }
        if(key==2)
        {
            this.props.navigation.navigate('ARStack')

        }
        if(key==3)
        {
            this.props.navigation.navigate('QASStack')

        }
        if(key==4)
        {
             this.props.navigation.navigate('AASStack')

        }
        if(key==5)
        {
            this.props.navigation.navigate('SamplesStack')

        }
        if(key==6)
        {
            this.props.navigation.navigate('FinalResult')

        }
        if(key==7)
        {
            this.props.navigation.navigate('FCR')

        }


        
    }




    renderItem = ({ item }) => {
        return (

            <TouchableOpacity
                onPress={this.ShowNextScreen.bind(this,item.key)}

                style={{ flex: 1, flexDirection: 'row', }}
            >
                
                <Image
                    source={item.url}
                    style={{margin: 15,width:60,height:60 }}

                ></Image>

                



               
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: 'black',fontWeight: '600', }}>
                        {item.name}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    renderseparator = () => {
        return (
            <View  style={{height: 1, width: '90%', backgroundColor: '#cccccc',marginLeft:92}} >

            </View>
        )

    }
    render() {
        return (
            
               
                <View style={styles.container}>
                       <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', }}>
                            <Text style={{fontSize:20,width:'95%',textAlign:'center'}}>{lib.Discipline} {lib.Semc}-{lib.Section}</Text>

                        </View>
                        <View style={{flex: 1, marginTop: 10,backgroundColor:'#FFFFFF'}}>
                    <FlatList

                        data={this.state.datasource}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderseparator}
                    />
                    </View>

                </View>
            
        );
    }


}
export default section;
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#e9e9e9',
        },
        header: {
            alignItems: 'center',
            backgroundColor: '#557B90'

        },
        textheader: {
            fontSize: 28,
            fontWeight: '500',
            color: 'white'
        },
       

    }
);


