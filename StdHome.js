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

export default class StdHome extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name:''
        };
    }

    // componentDidMount(){
    //     const user = auth().currentUser
    //     console.log('user',user)
    //     firebase.database().ref("student").on('value', (snapshot) => {
    //         // console.log("23snapshot.val()", snapshot.val())
    //         const getValue = snapshot.val()
    //         // console.log("getValue", getValue)
    //         let companyArray = [];
    //         for (let key in getValue) {
    //         // console.log("key", key)
    //         const value =  { ...getValue[key], key}
    //           companyArray.push(
    //             value
    //           );
    //         }
    //         console.log(companyArray,'23accc');
    //         const c = companyArray.filter(el=>el.email.toLowerCase()===user.email.toLowerCase())
    //         console.log("00000000000000000000",c[0].name)
    //         this.setState({
    //           name:c[0].name,
    //         });
    //     });
    // }

    componentDidMount() {
        const user = auth().currentUser
        // console.log('user',user)
       

        firebase.database().ref("student").on('value', (snapshot) => {
        //   console.log("snapshot.val()", snapshot.val())
          const getValue = snapshot.val()
        //   console.log("getStudent", getValue)
          let array = [];
          for (let key in getValue) {
        //   console.log("studentKey", key)
          const value =  { ...getValue[key], key}
            array.push(
              value
            );
          }
          console.log(array,'studentList');
          const currentUser =  array.filter(el => el.email.toLowerCase() === user.email.toLowerCase())   
          console.log(currentUser,"CCCC")
          AsyncStorage.getItem('@User')
          .then((res) => JSON.parse(res))
          .then((resp) => {
            console.log(resp);
            console.log('aa', resp[0].name);
            this.setState({
                name:resp[0].name,
            });
          })
          .catch((err) => console.log({err}));

        let x = currentUser[0].cv
        
        const cv = []
        for(let key in x){
            // console.log("KKK",key)
            const v = {...x[key],key}
            cv.push(
                v
            )
        }
        console.log("ds23",cv[0].key)
        const cvKey = []
        for(let key in x){
            // console.log("KKK235",key)
            const v = {...x[key],key}
            cvKey.push(
                v.key
            )
        }
        console.log("ds2323",cvKey)
        
            // firebase.database().ref("student/"+currentUser[0].key+"/cv").on('value', (snapshot) => {
            //     // console.log("snapshot.val()", snapshot.val())
            //     const getValue = snapshot.val()
            //     // console.log("getCV", getValue)
            //     let array = [];
            //     for (let key in getValue) {
            //     // console.log("cVKey", key)
            //     const value =  { ...getValue[key], key}
            //     array.push(
            //         value
            //     );
            //     }
            //     console.log(array,'CV');
            //     // console.log(array[0].skills,'CV skills');
            //     // console.log(array[0].description,'CV description');
            //     // console.log(array[0].education,'CV education');
            //     this.setState({
            //         s:array[0].skills,
            //         cvDescription:array[0].description,
            //         cvEducation:array[0].education,
            //     });
            // })
          this.setState({
            email:currentUser[0].email,
            // currentUser:cu,
            cv,
            cvKey:cv[0].key,
            list: array,
            name:currentUser[0].name,
            uid:currentUser[0].key
          });
        });        
    }

    companies(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('CompDash')
    }

    updatecv(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('Jobs')
    }

    profile(){
        this.setState = {
            isLoading: false
        };
        this.props.navigation.navigate('AdminProfile')
    }

    signOut(){
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!')
            this.props.navigation.navigate('Home')
            AsyncStorage.removeItem('@User')
        });
    }

    render() {
        // console.log(this.state.cvKey,'CV');
        return (
            <View
            style={styles.image}>
                {
                    
                    this.state.isLoading ?
                    
                        <View>
                            
                            <View style={styles.container}>
                                <Text style={styles.textHeader}> {this.state.name} </Text>
                            </View>

                            <View style={styles.container1}>

                                    <View style={{marginVertical:10}}>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=> this.profile()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Profile
                                            </Text>
                                        </TouchableOpacity>

                                    </View>

                                    <View>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=> this.companies()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Companies
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    
                                  {/* {
                                    this.state.cvKey ? null : */}
                                    <View style={{marginVertical:10}}>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={()=> this.updatecv()}
                                        >
                                            <Text style={styles.buttonText}>
                                        {this.state.cvKey ? "Update Your CV" :"Add your CV"}
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                  {/* } */}

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
        width: wp('95%')
    },
    text: {
        marginVertical: 7,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: '#f39c12',
        borderRadius: 10,
        borderWidth:2,
        width: wp('95%'),
        height:60,
        borderColor: '#67bae3',
        marginHorizontal:10,
    },
    buttonText:{
        marginVertical:11,
        fontWeight:'bold',
        color:'white',
        fontSize:24,
        alignSelf:'center'
    }
});