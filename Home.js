import React from 'react';
import { StyleSheet, View, TextInput, Text, ImageBackground, TouchableOpacity, ScrollView, Alert,} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

let config = {
    appId: '1:848270836568:android:a43f0eeb080e7b6a015b2d',
    apiKey: 'AIzaSyC-R-5Xu2syeCWRsZacrwvPFc5MK_8smgs',
    authDomain:
    '848270836568-aib8a198vgfjopl16g4erdm7h8n45f9u.apps.googleusercontent.com',
    databaseURL: 'https://crsystem-a908c.firebaseio.com/',
    projectId: 'crsystem-a908c',
    storageBucket: 'crsystem-a908c.appspot.com',
    messagingSenderId: '',
  };
  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(config);
  }

export default class Home extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    signup(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('Signup')
    }

    signin(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View
            style={styles.main}>
                {
                    
                    this.state.isLoading ?
                    
                        <View>
                            
                            <View style={styles.container}>
                                <Text style={styles.textHeader}> Welcome </Text>
                            </View>

                            <View style={styles.container1}>                                        

                                    <View style={styles.items}
                                    >
                                        <View
                                            style={styles.touchableOpacity}
                                        >
                                            <TouchableOpacity
                                            style={styles.button}
                                            onPress={()=> this.signup()}
                                            >
                                                <Text style={styles.buttonText}
                                                >
                                                Registration
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={styles.touchableOpacity}
                                        >
                                            <TouchableOpacity
                                            style={styles.button}
                                            onPress={()=> this.signin()}
                                            >
                                                <Text style={styles.buttonText}
                                                >
                                                Signin
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    
                            </View>



                        </View>

                    :

                        <View>
                            <Text>Welcome</Text>
                        </View>

                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        backgroundColor:'#f98b34'
    },
    //container View
    container: {
        alignItems: 'center',
        height: 100,
    },
    textHeader: {
        marginVertical: 100,
        fontWeight: 'bold',
        fontSize: 40,
        color: 'black',
    },
    //container1 View
    container1: {
        height: "100%",
        marginVertical: 110,
        alignSelf:'center'
    },
    items:{
        marginHorizontal:25,
        marginVertical:20,
    },
    touchableOpacity:{
        marginHorizontal:20,
        marginVertical:30,
    },
    button:{
        backgroundColor: '#e06100',
        borderRadius: 10,
        borderWidth:2,
        width:400,
        height:60,
        borderColor: '#67bae3',
    },
    buttonText:{
        marginVertical:11,
        fontWeight:'bold',
        color:'white',
        fontSize:24,
        alignSelf:'center'
    }
});