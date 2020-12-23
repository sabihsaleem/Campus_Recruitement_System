import React from 'react';
import { StyleSheet, View, TextInput, Text, ImageBackground, TouchableOpacity, ScrollView, Alert,} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default class AdminHome extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name:''
        };
    }

    student(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('AdminDash')
    }

    company(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('AdminComp')
    }

    signOut(){
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!')
            this.props.navigation.navigate('Home')
        });
    }

    componentDidMount(){
        const user = auth().currentUser
        console.log('user',user)
        firebase.database().ref("student").on('value', (snapshot) => {
            // console.log("23snapshot.val()", snapshot.val())
            const getValue = snapshot.val()
            // console.log("getValue", getValue)
            let companyArray = [];
            for (let key in getValue) {
            // console.log("key", key)
            const value =  { ...getValue[key], key}
              companyArray.push(
                value
              );
            }
            console.log(companyArray,'23accc');
            const c = companyArray.filter(el=>el.email.toLowerCase()===user.email.toLowerCase())
            console.log("00000000000000000000",c[0].name)
            this.setState({
              name:c[0].name,
            });
        });
    }

    render() {
        return (
            <View
            style={styles.image}>
                {
                    
                    this.state.isLoading ?
                    
                        <View>
                            
                            <View style={styles.container}>
                                <Text style={styles.textHeader}> {this.state.name.toUpperCase()} </Text>
                            </View>

                            <View style={styles.container1}>                                        
                                
                                    <View>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=> this.student()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Students
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    
                                    <View style={{marginVertical:10}}>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=> this.company()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Companies
                                            </Text>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{marginTop:"auto"}}>
                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=> this.signOut()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Sign out
                                            </Text>
                                        </TouchableOpacity>
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
    image: {
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
        marginVertical: 50,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    //container1 View
    container1: {
        height: 490,
        marginVertical: 60,
    },
    text: {
        marginVertical: 7,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: '#f39c12',
        borderRadius: 10,
        borderWidth:2,
        width:390,
        height:60,
        marginHorizontal:10,
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