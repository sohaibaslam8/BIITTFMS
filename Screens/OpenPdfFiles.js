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
        };
    }

  
    componentDidMount()
    {
        setTimeout(() => {
            this.setState({isloading:false});
        }, 1000);
    }
    render() {
        const source = { uri: `${lib.IpAddressFileOpen}${lib.OpenPdfFileG}`, cache: true };
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