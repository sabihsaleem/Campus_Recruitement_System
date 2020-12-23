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

  export default class Lists extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            isLoading: true,
            startDate: '',
            skills: '',
            currentUser: [],
            email: '',
            list: [],
            name: '',
            uid:'',
            endDate:''
        };
        console.log("props",props)
    }

    componentDidMount() {
        const user = auth().currentUser
        console.log('user',user)
       

        let student = firebase.database().ref("company").on('value', (snapshot) => {
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

          let c = currentUser[0].jobs
          let array1 = [];
          for (let key in c) {
          console.log("currentUser[0].jobs", key)
          const value =  { ...c[key], key}
            array1.push(
              key
            );
          }
          console.log(array1,'currentUser[0].534534');

          this.setState({
            email:currentUser[0].email,
            // currentUser:cu,
            list: array1,
            name:currentUser[0].name,
            uid:currentUser[0].key
          });
        });

    }

    signup(uid,name,description,startDate,endDate,skills){
        console.log(this.state.uid,'uidaa')
        console.log("propsCV",this.props)

            firebase.database().ref('company/' + this.state.uid + "/jobs").push({
                uid,
                name,
                description,
                startDate,
                endDate,
                skills,
            }).then(() => {
                this.setState({
                  uid: this.state.uid,
                  name: this.state.name,
                  description:'',
                  startDate:'',
                  endDate: "",
                  skills: '',
                })
                console.log('Data update.');
            }).catch((error) => {
                console.log('failed: ' + error.message);
            })
    }

    signin(){
        console.log(this.state.list[0],"234")
        firebase.database().ref('company/' + this.state.uid + "/jobs").child(this.state.list[0]).remove()
    }

    render() {
        console.log('em',this.state.email)
        return (
            <View
            style={styles.image}>
                {
                    
                    this.state.isLoading ?
                    
                        <KeyboardAwareScrollView >
                            
                            <View style={{borderWidth:1,flexDirection:'row'}}>
                                <View>
                                    <TouchableOpacity onPress={() => {
                                        this.props.navigation.goBack();
                                        // this.props.navigation.navigate('Login');
                                    }}>
                                        <Image style={{marginVertical:5, width:40, height:40,marginHorizontal:10}}
                                                source={require('./back-button-icon-png-25.jpg')} />   
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.container}>
                                    <Text style={styles.textHeader}> Add Jobs </Text>
                                </View>
                            </View>

                            <View style={styles.container1}>
                                <View style={{flexDirection: 'column',marginVertical:15,marginHorizontal:5}}>

                                <View style={{paddingVertical:10}}>

                                    <Text style={styles.text}>Uid:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:7,paddingHorizontal:7}}
                                    >
                                    {this.state.uid } 
                                    </Text>

                                </View>

                                <View style={{paddingVertical:10}}>

                                    <Text style={styles.text}>Name:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:7,paddingHorizontal:5}}
                                    >
                                    {this.state.name } 
                                    </Text>

                                </View>

                                    <View>
                                    
                                        <Text style={styles.text}>Description</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:7}}
                                        value={this.state.description}
                                        onChangeText={(description) => this.setState({description: description})}
                                        />  
                                    
                                    </View>

                                    <View style={{paddingVertical:10}}>

                                        <Text style={styles.text}>Starting Date:</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:7}}
                                        value={this.state.startDate}
                                        onChangeText={(startDate) => this.setState({startDate: startDate})}
                                        /> 

                                    </View>

                                    <View style={{paddingVertical:10}}>

                                        <Text style={styles.text}>Ending Date:</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:7}}
                                        value={this.state.endDate}
                                        onChangeText={(endDate) => this.setState({endDate: endDate})}
                                        /> 

                                    </View>

                                    <View>

                                        <Text style={styles.text}> Required Skills:</Text>
                                        <TextInput
                                        placeholderTextColor="black"
                                        placeholder="Enter here"
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,paddingVertical:7}}
                                        value={this.state.skills}
                                        onChangeText={(skills) => this.setState({skills: skills})}
                                        /> 

                                    </View>


                                    
                                </View>
                                    <View style={{marginVertical:20}}>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress = {() => this.signup(this.state.uid,this.state.name,this.state.description,this.state.startDate,this.state.endDate,this.state.skills)}
                                        >
                                            <Text style={styles.buttonText}>
                                            Registration
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    <View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.signin()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Remove
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
        // height: 100,
    },
    textHeader: {
        marginHorizontal: 60,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    //container1 View
    container1: {
        height: "100%",
        // marginVertical: 10
    },
    text: {
        marginVertical: 7,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: '#f39c12',
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