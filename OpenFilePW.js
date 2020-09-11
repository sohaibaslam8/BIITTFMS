import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, TextInput, TouchableOpacity, Alert,ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Pdf from 'react-native-pdf';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconpw from 'react-native-vector-icons/FontAwesome';
import * as lib from './storeData'
import moment from 'moment';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isloading: true,
            Message: '',
            date: '',
            time: '',



        };
    }

    SendMessage() {
   

     if (this.state.Message !== '') {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var am_pm = 'AM';
        if (hours > 11) {
            am_pm = 'PM';
            if (hours > 12) {
                hours = hours - 12;
            }
        }
        if (hours == 0) {
            hours = 12;
        }
        this.setState({
            //Setting the value of the date time
            date: date + '/' + month + '/' + year,
            time: hours + ':' + min +' '+am_pm

        });
        setTimeout(() => {
            // console.log(this.state.date+" "+this.state.time);
            let collection = {}
            collection.FDoc_Id = lib.FDocIdPW;
            collection.Sender_Id = lib.TId;
            collection.Receiver_Id = lib.ReceiverIdPW;
            collection.Message = this.state.Message;
            collection.Status = 'false';
            collection.Course_no = lib.CNoPW;
            collection.NDate=this.state.date;
            collection.NTime=this.state.time;
            collection.Seen='false';

            // console.log(collection);


            fetch(`${lib.IpAddress}/users/SaveMessage`, {
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

            setTimeout(() => {
                this.setState({ Message: '',date:'',time:'' });
            }, 100);
            Keyboard.dismiss();

            
        }, 100);
        
            }
            else {
                Alert.alert("Please Enter Message.");
            }

    }
    componentDidMount()
    {
        setTimeout(() => {
            this.setState({isloading:false});
        }, 1000);
    }
    render() {
        const source = { uri: `${lib.IpAddressFileOpen}${lib.PdfFilePW}`, cache: true };
        return (
            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <View
                style={{ flex: 1, backgroundColor: '#e9e9e9'}}
                > 
                    <View style={styles.container}>
                        <Pdf
                            source={source}
                            onLoadComplete={(numberOfPages, filePath) => {
                                console.log(`number of pages: ${numberOfPages}`);
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                console.log(`current page: ${page}`);
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            onPressLink={(uri) => {
                                console.log(`Link presse: ${uri}`)
                            }}
                            style={styles.pdf} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ borderWidth: 0, width: '85%' }}>
                            <TextInput
                                style={styles.input}
                                value={this.state.Message}
                                placeholder="RECOMMEND CHANGING..."
                                // placeholderTextColor="#A9A9A9"
                                onChangeText={text => this.setState({ Message: text })}
                                multiline={true}
                                // numberOfLines={2}

                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <TouchableOpacity style={{ borderWidth: 0, marginLeft: 5 }}
                            onPress={() => this.SendMessage()}
                        >
                            <Icons name={'md-send'} size={40} color={'green'} />
                        </TouchableOpacity>

                    </View>


                </View>
             
        );
    }
}
export default App;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //   justifyContent: 'flex-start',
        //   alignItems: 'center',
        // marginTop: 5,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    input: {
        paddingRight: 10,
        paddingLeft: 15,
        // lineHeight: 23,
        borderRadius: 45,
        textAlignVertical: 'top',
        borderWidth: 1,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#FFFFFF',
        color: 'black',
        height: 65,
        borderColor: 'green'

        // marginBottom:0,
    },
});