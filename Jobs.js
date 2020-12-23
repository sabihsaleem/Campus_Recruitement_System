import React from 'react';
import { StyleSheet, View, TextInput, Text, ImageBackground, TouchableOpacity, Image, ScrollView,} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { RadioButton } from 'react-native-paper';

let config = {
    appId: '1:848270836568:android:a43f0eeb080e7b6a015b2d',
    apiKey: 'AIzaSyC-R-5Xu2syeCWRsZacrwvPFc5MK_8smgs',
    authDomain:
      '848270836568-t5ps5vbj34780rko4mfovtbo3nt99vv8.apps.googleusercontent.com',
    databaseURL: 'https://crsystem-a908c.firebaseio.com/',
    projectId: 'crsystem-a908c',
    storageBucket: 'crsystem-a908c.appspot.com',
    messagingSenderId: '',
};
  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(config);
  }

  export default class Jobs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isLoading: true,
            education: '',
            skills: '',
            currentUser: [],
            email: '',
            list: [],
            name: '',
            uid:'',
            percentage:'',
        };
        console.log("props",this.props)
    }

    componentDidMount() {
        const user = auth().currentUser
        console.log('user',user)
       

        let student = firebase.database().ref("student").on('value', (snapshot) => {
        //   console.log("snapshot.val()", snapshot.val())
          const getValue = snapshot.val()
          console.log("getCompany", getValue)
          let array = [];
          for (let key in getValue) {
          console.log("companyKey", key)
          const value =  { ...getValue[key], key}
            array.push(
              value
            );
          }
          console.log(array,'companyList');
          const currentUser =  array.filter(el => el.email.toLowerCase() === user.email.toLowerCase())   
          console.log(currentUser,"CCCC")
          console.log("currentUser",user.email)

          const cu = []
          cu.push(currentUser)
          console.log("cu",currentUser[0].email)
          console.log("name",currentUser[0].name)
          console.log("uid",currentUser[0].key)
          
          let c = currentUser[0].cv
          let array1 = [];
          for (let key in c) {
          console.log("currentUser[0].cv", key)
          const value =  { ...c[key], key}
            array1.push(
              key
            );
          }
          console.log(array1,'currentUser[0].cv534534');

          this.setState({
            email:currentUser[0].email,
            // currentUser:cu,
            list: array1,
            name:currentUser[0].name,
            uid:currentUser[0].key
          });
        });

    }

    signup=(uid,name,description,education,percentage,skills)=>{
        console.log(this.state.uid,'uidaa')
        console.log(this.state.list[0],'234')
            firebase.database().ref('student/' + this.state.uid + "/cv").push({
                uid,
                name,
                description,
                education,
                percentage,
                skills,
            }).then(() => {
                this.setState({
                  uid: this.state.uid,
                  name: this.state.name,
                  description:'',
                  education:'',
                  percentage:'' ,
                  skills: '',
                })
                console.log('Data update.');
                alert('Data update.');
            })
              .catch((error) => {
                console.log('failed: ' + error.message);
              })
    }

    signin=(uid,name,description,education,percentage,skills)=>{
        console.log(this.state.list[0],'234')
            firebase.database().ref('student/' + this.state.uid + "/cv").child(this.state.list[0]).update({
                uid,
                name,
                description,
                education,
                percentage,
                skills,
            }).then(() => {
                this.setState({
                  uid: this.state.uid,
                  name: this.state.name,
                  description:'',
                  education:'',
                  percentage:'' ,
                  skills: '',
                })
                console.log('Data update.');
            })
              .catch((error) => {
                console.log('failed: ' + error.message);
              })
    }

    signOut(){
        auth()
        .signOut()
        .then(() => {
            console.log('User signed out!')
            this.props.navigation.navigate('Home')
        });
    }
    
    render() {
        return (
            <View
            style={styles.image}>
                {
                    
                    this.state.isLoading ?
                    
                        <KeyboardAwareScrollView >
                            <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>
            
                                <View style={{flexDirection: 'row',alignItems:'center'}}>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.goBack();
                                        // this.props.navigation.navigate('Login');
                                    }}>
                                        <Image style={{marginVertical:5, width:40, height:40,marginHorizontal:10}}
                                                source={require('./back-button-icon-png-25.jpg')} />   
                                    </TouchableOpacity>
                                    <Text style={styles.textHeader}> Student CV </Text>

                                </View>

                            </View>
{/* 
                            <View style={styles.container}>
                                <Text style={styles.textHeader}> Student CV </Text>
                            </View> */}

                            <View style={styles.container1}>
                                <View style={{flexDirection: 'column',marginHorizontal:5}}>

                                <View style={{paddingVertical:5}}>

                                    <Text style={styles.text}>Uid:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:5,paddingHorizontal:7}}
                                    >
                                    {this.state.uid } 
                                    </Text>

                                </View>

                                <View style={{paddingVertical:10}}>

                                    <Text style={styles.text}>Username:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:5,paddingHorizontal:5}}
                                    >
                                    {this.state.name } 
                                    </Text>

                                </View>

                                    <View>
                                    
                                        <Text style={styles.text}>Description</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:8}}
                                        value={this.state.description}
                                        onChangeText={(description) => this.setState({description: description})}
                                        />  
                                    
                                    </View>

                                    <View>

                                        <Text style={styles.text}>Education:</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:8}}
                                        value={this.state.education}
                                        onChangeText={(education) => this.setState({education: education})}
                                        /> 

                                    </View>

                                    <View>

                                        <Text style={styles.text}>Percentage:</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:8}}
                                        value={this.state.percentage}
                                        onChangeText={(percentage) => this.setState({percentage: percentage})}
                                        /> 

                                    </View>

                                    <View>

                                        <Text style={styles.text}>Skills:</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:8}}
                                        value={this.state.skills}
                                        onChangeText={(skills) => this.setState({skills: skills})}
                                        /> 

                                    </View>


                                    
                                </View>
                                    <View style={{marginVertical:20}}>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress = {() => this.signup(this.state.uid,this.state.name,this.state.description,this.state.education,this.state.percentage,this.state.skills)}
                                        >
                                            <Text style={styles.buttonText}>
                                            Registration
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.signin(this.state.uid,this.state.name,this.state.description,this.state.education,this.state.percentage,this.state.skills)}
                                        >
                                            <Text style={styles.buttonText}>
                                            UpDate
                                            </Text>
                                        </TouchableOpacity>

                                        </View>
                            </View>



                        </KeyboardAwareScrollView>

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
        // marginVertical: 50,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        marginHorizontal:60,
    },
    //container1 View
    container1: {
        height: "100%",
        // marginVertical: 60
    },
    text: {
        marginVertical: 7,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: '#f39c12',
        borderRadius: 10,
        borderWidth:2,
        borderColor: '#67bae3',
        width:400,
        height:60,
        marginHorizontal:5
    },
    buttonText:{
        marginVertical:11,
        fontWeight:'bold',
        color:'white',
        fontSize:24,
        alignSelf:'center'
    }
});