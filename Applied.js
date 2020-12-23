import React from 'react';
import { StyleSheet, View, TextInput, Text, ImageBackground, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from 'react-native-elements';

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

  export default class Applied extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            email: '',
            contactNo: '',
            name: '',
            password: '',
            address: '',
            isAdmin: '',
            currentUser:[],
            list: [],
            studentList:[],
            companyList:[],
            search: '',
            arrayHolder: [],
            applied:[],
        };
        // console.log("props",props)
    }

    componentDidMount = async () =>{
        // const jsonValue = await AsyncStorage.getItem('@currentUser')
        // console.log("jsonValue1",jsonValue)

        await AsyncStorage.getItem('@User').then(
            res => JSON.parse(res))
            .then(resp =>{
                console.log(resp)
                console.log("aa",resp[0].jobs)
                let d = resp[0].jobs
                let data=[] 
                for (const element in d) {
                    console.log(element);
                    value={...d[element],element}
                    data.push(
                        value
                    )
                }
                console.log("Jobdata",data)
                console.log("apply",data[0].apply)
                let d1 = data[0].apply
                let data1=[] 
                for (const element in d1) {
                    console.log(element);
                    value={...d1[element],element}
                    data1.push(
                        value
                    )
                }
                console.log("Applydata",data1)
                this.setState({
                    applied:data1,
                })

            })
            .catch(err => console.log({err}) )
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

     
    
    // search = (text) => {
    //     console.log(text);
    // };

    // clear = () => {
    //     this.search.clear();
    // };

    // SearchFilterFunction(text) {
    //     console.log('text:',text)
    //     const newData = this.state.arrayHolder.filter( (item) => {
    //     const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    //     const textData = text.toUpperCase();
    //     return itemData.indexOf(textData) > -1;
    //     });
    //     console.log('newData:',newData)
    //     this.setState({list: newData, search: text});
    // }

    render() {
        console.log('em',this.state.applied)
        return (
        <View
            style={{flex: 1,resizeMode: 'cover',width: '100%',height: '100%',backgroundColor:'#f98b34'}}>
              
            <ScrollView>
      
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
              
              {/* <View style={{marginVertical:10}}>
                  <SearchBar
                    round
                    searchIcon={{size: 25}}
                    onChangeText={(text) => this.SearchFilterFunction(text)}
                    onClear={(text) => this.SearchFilterFunction('')}
                    placeholder="Type Here to Search..."
                    value={this.state.search}
                  />
              </View>
       */}
              {/* <View style={{alignItems:'center',height:50,borderColor:'black',borderWidth:1}}>
                
                <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Student's Applied </Text>
      
              </View>       */}
      
                  <View style={styles.box}>
                  
                    <FlatList
                      style={styles.list}
                      // data={ isStudnet === true ?this.state.studentList : this.state.companyList}
                      data={ this.state.applied }
                      renderItem={({item, index}) =>
                          <View style={{
                            borderRadius:15,
                            marginVertical:10,
                            borderWidth:2,
                            width:"95%",
                            alignSelf:'center',
                            backgroundColor:'#e06100',
                            // backgroundColor:'red',
                            borderColor: '#67bae3',
                          }}>
                              <View style={{marginVertical:5,justifyContent:'space-between'}}>
                                <Text style={{marginVertical:3,paddingHorizontal:10,color:'black',fontSize:22,fontWeight:'bold',alignSelf:'center'}}>{item.name}</Text>
                                <View style={{flexDirection:'row'  }}>
                                    <Text style={{marginVertical:3,paddingHorizontal:10, width:'25%', color:'black',fontSize:14,fontWeight:'bold'}}>Email:</Text>
                                    <Text style={{marginVertical:3,color:'black',fontSize:14 ,width:'60%',textAlign:"justify"}}>{item.email}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{marginVertical:3,paddingHorizontal:10,color:'black',fontSize:14,fontWeight:'bold', width:'25%'}}>Education:</Text>
                                    <Text style={{marginVertical:3,color:'black',fontSize:14,width:'75%',textAlign:"justify"}}>{item.education}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{marginVertical:3,paddingHorizontal:10,color:'black',fontSize:14,fontWeight:'bold',width:'25%'}}>Description:</Text>
                                    <Text style={{marginVertical:3,color:'black',fontSize:14,width:'75%',textAlign:"justify"}}>{item.description}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{marginVertical:3,paddingHorizontal:10,color:'black',fontSize:14,fontWeight:'bold',width:'25%'}}>Skills:</Text>
                                    <Text style={{marginVertical:3,color:'black',fontSize:14,width:'75%',textAlign:"justify"}}>{item.skills}</Text>
                                </View>
                              </View>
                          </View>
                      }
                    />
                  </View>
      
                </ScrollView>
      
            </View>   
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
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
        marginHorizontal: 60,
    },
    //container1 View
    container1: {
        height: "100%",
        marginVertical: 60
    },
    text: {
        marginVertical: 7,
        fontWeight: 'bold'
    },
});