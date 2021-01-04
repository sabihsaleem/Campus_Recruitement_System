import React from 'react';
import { StyleSheet, View, TextInput, Text, ImageBackground, TouchableOpacity, ScrollView, Alert,} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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

export default class Home extends React.Component{


    
    componentDidMount(){
        console.log("NAVVV", this.props)
        AsyncStorage.getItem('@User').then((
          value => {
          console.log(JSON.parse(value))
          let d = JSON.parse(value)
          let data=[] 
          for (const element in d) {
              // console.log(element);
              value={...d[element],element}
              data.push(
                  value
              )
          }
          console.log("data",data)
        //   console.log("data[0]",data[0][0].isCompany)
        //   let dataValue = data[0].isAdmin
          if(value === null){
            // this.props
            console.log("null")
            this.props.navigation.navigate('Home')
            
          }else {
            // console.log("value",dataValue)
            
    
            if(data[0].isAdmin===true){
              //redirect to admin
              console.log("AdminHome")
              this.props.navigation.navigate('AdminHome')
            }
            else if(data[0].isAdmin ==false) {
              //redirect to student
              console.log("StdHome")
              this.props.navigation.navigate('StdHome')
            }else{
                if(data[0][0].isCompany===true ){
              //redirect to companyn
              console.log("CompHome")
              this.props.navigation.navigate('CompHome')
            }
            }
            
          }
        }))
    
      }
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
                                            onPress={()=> this.signin()}
                                            >
                                                <Text style={styles.buttonText}
                                                >
                                                Login
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={styles.touchableOpacity}
                                        >
                                            <TouchableOpacity
                                            style={styles.button}
                                            onPress={()=> this.signup()}
                                            >
                                                <Text style={styles.buttonText}
                                                >
                                                Register
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
        // flex:0.5,
        // backgroundColor:"red",
        marginVertical: 110,
        // alignSelf:'center',
        // justifyContent:"center",
        // alignItems:"center",
        // width:"50%",
        width: wp('95%')
    },
    items:{
        marginHorizontal:10,
        marginVertical:20,
        // width:"98%",
    },
    touchableOpacity:{
        // marginHorizontal:20,
        marginVertical:30,
    },
    button:{
        backgroundColor: '#f39c12',
        borderRadius: 10,
        borderWidth:2,
        // width:"100%",
        height:60,
        borderColor: '#67bae3',
        width: wp('95%')
    },
    buttonText:{
        marginVertical:11,
        fontWeight:'bold',
        color:'white',
        fontSize:24,
        alignSelf:'center'
    }
});