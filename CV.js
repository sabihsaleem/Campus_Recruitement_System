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

  export default class CV extends React.Component{

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
            jKey:'',
            cv:'',
            cvKey:'',
            s:'',
            cvDescription:'',
            cvEducation:'',
        };
    }

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
        //   console.log("currentUser",user.email)

        //   const cu = []
        //   cu.push(currentUser)
          console.log("cu",currentUser[0].cv)
        //   console.log("name",currentUser[0].name)
        //   console.log("uid",currentUser[0].key)
        let x = currentUser[0].cv
        const cv = []
        for(let key in x){
            console.log("KKK",key)
            const v = {...x[key],key}
            cv.push(
                v
            )
        }
        console.log("ds23",cv)
        const cvKey = []
        for(let key in x){
            console.log("KKK235",key)
            const v = {...x[key],key}
            cvKey.push(
                v.key
            )
        }
        console.log("ds2323",cvKey)
            firebase.database().ref("student/"+currentUser[0].key+"/cv").on('value', (snapshot) => {
                console.log("snapshot.val()", snapshot.val())
                const getValue = snapshot.val()
                console.log("getCV", getValue)
                let array = [];
                for (let key in getValue) {
                console.log("cVKey", key)
                const value =  { ...getValue[key], key}
                array.push(
                    value
                );
                }
                console.log(array[0].skills,'CV skills');
                console.log(array[0].description,'CV description');
                console.log(array[0].education,'CV education');
                this.setState({
                    s:array[0].skills,
                    cvDescription:array[0].description,
                    cvEducation:array[0].education,
                });
            })
          this.setState({
            email:currentUser[0].email,
            // currentUser:cu,
            cv,
            cvKey,
            list: array,
            name:currentUser[0].name,
            uid:currentUser[0].key
          });
        });
        // console.log("prop122",this.props.route.params)
        // console.log("76",this.props.route.params.jobId)
        
    }

    signup(uid,name,description,education,email,skills){
        console.log("propsCV",this.state.s)
        console.log("data",this.props.route.params.item.uid)
        console.log("Job Id",this.props.route.params.jobId)
        let z = this.props.route.params.item.uid
        let zz = "company/"+z+"/jobs/"
        let jobKeys = this.props.route.params.jobId
            firebase.database().ref(zz + jobKeys + "/apply").push({
                uid,
                name,
                description,
                education,
                email,
                skills,
            }).then(() => {
                this.setState({
                  uid: this.state.uid,
                  name: this.state.name,
                  description:this.state.cvDescription,
                  education:this.state.cvEducation,
                  email: this.state.email,
                  skills: this.state.s,
                })
                console.log('Data update.');
                alert('Data update.');
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
        console.log('Cv3425',this.state.s)
        console.log('Cv Key',this.state.cvKey[0])
        return (
            <View
            style={styles.image}>
                {
                    
                    this.state.isLoading ?
                    
                        <KeyboardAwareScrollView >
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => {
                                    // this.props.navigation.goBack();
                                    this.props.navigation.navigate('CompDash');
                                }}>
                                    <Image style={{marginVertical:5, width:40, height:40,marginHorizontal:10}}
                                            source={require('./back-button-icon-png-25.jpg')} />   
                                </TouchableOpacity>
                                <Text style={styles.textHeader}> CV Application </Text>

                            </View>

                            {/* <View style={styles.container}>
                                <Text style={styles.textHeader}> CV Application </Text>
                            </View> */}

                            <View style={styles.container1}>
                                <View style={{flexDirection: 'column',marginHorizontal:5}}>

                                <View style={{paddingVertical:5}}>

                                    <Text style={styles.text}>Uid:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,padding:7}}
                                    >
                                    {this.state.uid } 
                                    </Text>

                                </View>

                                <View style={{paddingVertical:10}}>

                                    <Text style={styles.text}>Username:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,padding:5}}
                                    >
                                    {this.state.name } 
                                    </Text>

                                </View>

                                    <View>
                                    
                                        <Text style={styles.text}>Description</Text>
                                        <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,padding:5}}
                                        >
                                        {this.state.cvDescription } 
                                        </Text> 
                                    
                                    </View>

                                    <View style={{paddingVertical:10}}>

                                        <Text style={styles.text}>Education:</Text>
                                        <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,padding:5}}
                                        >
                                        {this.state.cvEducation } 
                                        </Text>

                                    </View>

                                    <View style={{paddingVertical:10}}>

                                        <Text style={styles.text}>Email:</Text>
                                        <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,padding:5}}
                                        >
                                         {this.state.email } 
                                        </Text>

                                    </View>

                                    <View>

                                        <Text style={styles.text}>Skills:</Text>
                                        <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: 400,height: 35,padding:5}}
                                        >
                                         {this.state.s } 
                                        </Text>

                                    </View>


                                    <View style={{flexDirection: 'row',marginHorizontal:25,marginVertical:20,alignSelf:'center'}}>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress = {() => this.signup(this.state.uid,this.state.name,this.state.description,this.state.education,this.state.email,this.state.skills)}
                                        >
                                            <Text style={styles.buttonText}>
                                            Submit
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    
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
        marginHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    //container1 View
    container1: {
        height: 590,
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
        width:392,
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