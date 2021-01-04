import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {RadioButton} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default class Jobs extends React.Component {
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
      uid: '',
      TextInputDisableStatus: true,
      percentage: '',
      cv: [],
      cvKey: '',
    };
    // console.log("props",this.props)
  }

  componentDidMount() {
    const user = auth().currentUser;
    // console.log('user',user)

    let student = firebase
      .database()
      .ref('student')
      .on('value', (snapshot) => {
        //   console.log("snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        //   console.log("getCompany", getValue)
        let array = [];
        for (let key in getValue) {
          //   console.log("companyKey", key)
          const value = {...getValue[key], key};
          array.push(value);
        }
        console.log(array, 'companyList');
        const currentUser = array.filter(
          (el) => el.email.toLowerCase() === user.email.toLowerCase(),
        );
        console.log(currentUser, 'CCCC');
        //   console.log("currentUser",user.email)

        const cu = [];
        cu.push(currentUser);
        //   console.log("cu",currentUser[0].email)
        //   console.log("name",currentUser[0].name)
        //   console.log("uid",currentUser[0].key)
        console.log('cv', currentUser[0].cv);

        let c = currentUser[0].cv;
        let array1 = [];
        for (let key in c) {
          //   console.log("currentUser[0].cv", key)
          const value = {...c[key], key};
          array1.push(key);
        }
        console.log(array1[0], 'currentUser[0].cv534534');
        this.setState({
          email: currentUser[0].email,
          currentUser,
          list: array1,
          name: currentUser[0].name,
          uid: currentUser[0].key,
          cv: currentUser[0].cv,
          cvKey: array1[0],
        });
      });
  }

  AddCv = (uid, name, description, education, percentage, skills) => {
    if (this.state.cvKey) {
      console.log(this.state.cvKey, 'cvKey');
      console.log(this.state.list[0], '234');
      firebase
        .database()
        .ref('student/' + this.state.uid + '/cv')
        .child(this.state.list[0])
        .update({
          uid,
          name,
          description,
          education,
          percentage,
          skills,
        })
        .then(() => {
          this.setState({
            uid: this.state.uid,
            name: this.state.name,
            description: '',
            education: '',
            percentage: '',
            skills: '',
            TextInputDisableStatus: false,
          });
          console.log('Data update.');
        })
        .catch((error) => {
          console.log('failed: ' + error.message);
        });
    } else {
      console.log(this.state.uid, 'uidaa');
      console.log(this.state.list[0], '234');
      firebase
        .database()
        .ref('student/' + this.state.uid + '/cv')
        .push({
          uid,
          name,
          description,
          education,
          percentage,
          skills,
        })
        .then(() => {
          this.setState({
            uid: this.state.uid,
            name: this.state.name,
            description: '',
            education: '',
            percentage: '',
            skills: '',
            TextInputDisableStatus: false,
          });
          console.log('Data update.');
          alert('Data update.');
        })
        this.props.navigation.navigate('StdHome')
        .catch((error) => {
          console.log('failed: ' + error.message);
        });
    }
  };

  // signin=(uid,name,description,education,percentage,skills)=>{
  //     console.log(this.state.list[0],'234')
  //         firebase.database().ref('student/' + this.state.uid + "/cv").child(this.state.list[0]).update({
  //             uid,
  //             name,
  //             description,
  //             education,
  //             percentage,
  //             skills,
  //         }).then(() => {
  //             this.setState({
  //               uid: this.state.uid,
  //               name: this.state.name,
  //               description:'',
  //               education:'',
  //               percentage:'' ,
  //               skills: '',
  //               TextInputDisableStatus: false
  //             })
  //             console.log('Data update.');
  //         })
  //           .catch((error) => {
  //             console.log('failed: ' + error.message);
  //           })
  // }

  signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        this.props.navigation.navigate('Home');
        AsyncStorage.removeItem('@User');
      });
  }

  render() {
    console.log('uidaa', this.state.cvKey);
    const {uid, name, description, education, percentage, skills} = this.state;
    return (
      <View style={styles.image}>
        {this.state.isLoading ? (
          <KeyboardAwareScrollView>
            <View
              style={{
                alignItems: 'stretch',
                height: 50,
                borderColor: 'black',
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                    // this.props.navigation.navigate('Login');
                  }}>
                  <Image
                    style={{
                      marginVertical: 5,
                      width: 40,
                      height: 40,
                      marginHorizontal: 10,
                    }}
                    source={require('./back-button-icon-png-25.jpg')}
                  />
                </TouchableOpacity>
                <Text style={styles.textHeader}> Student CV </Text>
              </View>
            </View>
            {/* 
                            <View style={styles.container}>
                                <Text style={styles.textHeader}> Student CV </Text>
                            </View> */}

            <View style={styles.container1}>
              <View style={{flexDirection: 'column', marginHorizontal: 5}}>
                {/* <View style={{paddingVertical:5}}>

                                    <Text style={styles.text}>Uid:</Text>
                                    <Text
                                        style={{borderColor: '#67bae3',color:"black",borderWidth: 2,width: wp('95%'),height: 35,paddingVertical:7,marginHorizontal:5,paddingHorizontal:5}}
                                    >
                                    {this.state.uid } 
                                    </Text>

                                </View> */}

                <View style={{paddingVertical: 10}}>
                  <Text style={styles.text}>Username:</Text>
                  <Text
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}>
                    {this.state.name}
                  </Text>
                </View>

                <View>
                  <Text style={styles.text}>Description</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    value={this.state.description}
                    onChangeText={(description) =>
                      this.setState({description: description})
                    }
                    // editable={true}
                    maxLength={100}
                    numberOfLines={4}
                    multiline={true}
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: hp('20%'),
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                  />
                </View>

                <View style={{marginVertical: 7}}>
                  <Text style={styles.text}>Education:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: hp('5%'),
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.education}
                    // editable={true}
                    onChangeText={(education) =>
                      this.setState({education: education})
                    }
                  />
                </View>

                <View style={{marginVertical: 3}}>
                  <Text style={styles.text}>Percentage:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: hp('5%'),
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.percentage}
                    // editable={false}
                    onChangeText={(percentage) =>
                      this.setState({percentage: percentage})
                    }
                  />
                </View>

                <View style={{marginVertical: 7}}>
                  <Text style={styles.text}>Skills:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: hp('5%'),
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.skills}
                    // editable={this.state.TextInputDisableStatus}
                    onChangeText={(skills) => this.setState({skills: skills})}
                  />
                </View>
              </View>
              <View style={{marginVertical: 40}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.AddCv(
                      uid,
                      name,
                      description,
                      education,
                      percentage,
                      skills,
                    )
                  }>
                  <Text style={styles.buttonText}>Add Cv</Text>
                </TouchableOpacity>
              </View>
              {/* <View>

                                        <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.signin(this.state.uid,this.state.name,this.state.description,this.state.education,this.state.percentage,this.state.skills)}
                                        >
                                            <Text style={styles.buttonText}>
                                            UpDate
                                            </Text>
                                        </TouchableOpacity>

                                    </View> */}
            </View>
          </KeyboardAwareScrollView>
        ) : (
          <View>
            <Text>Welcome</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#f98b34',
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
    height: hp('100%'),
    // marginVertical: 60
  },
  text: {
    marginVertical: 7,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#67bae3',
    width: wp('95%'),
    height: 60,
    marginHorizontal: 10,
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});
