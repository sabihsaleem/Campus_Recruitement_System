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

export default class CompanyReg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      address: '',
      contactNo: '',
      isLoading: true,
      checked: '',
      job: '',
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('jobs')
      .on('value', (snapshot) => {
        console.log('snapshot.val()', snapshot.val());
        const getValue = snapshot.val();
        console.log('getValue', getValue);
        let array = [];
        for (let key in getValue) {
          console.log('key', key);
          const value = {...getValue[key], key};
          array.push(value);
        }
        console.log(array, 'accc');
      });
  }

  signup(name, email, password, address, contactNo) {
    if (this.state.email && this.state.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
          firebase
            .database()
            .ref('company')
            .push({
              name,
              email,
              password,
              address,
              contactNo,
            })
            .then(() => {
              this.setState({
                name: '',
                email: '',
                password: '',
                address: '',
                contactNo: '',
              });
              console.log('Data update.');
            })
            .catch((error) => {
              console.log('failed: ' + error.message);
            });
          this.props.navigation.navigate('Dashboard');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } else {
      alert('Enter Data Please');
    }
  }

  signin() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Login');
  }

  first() {
    this.setState({checked: 'first'});
    this.props.navigation.navigate('Signup');
  }

  second() {
    this.setState({checked: 'second'});
  }

  render() {
    return (
      <View style={styles.image}>
        {this.state.isLoading ? (
          <KeyboardAwareScrollView>
            <View>
              <TouchableOpacity
                onPress={() => {
                  // this.props.navigation.goBack();
                  this.props.navigation.navigate('Home');
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

              <View style={styles.container}>
                <Text style={styles.textHeader}> Company Registration </Text>
              </View>

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginLeft: 5,
                      marginRight: 15,
                      marginVertical: 6,
                    }}>
                    Student
                  </Text>
                  <RadioButton
                    value="first"
                    status={
                      this.state.checked === 'first' ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.first()}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginLeft: 5,
                      marginRight: 5,
                      marginVertical: 6,
                    }}>
                    Company
                  </Text>
                  <RadioButton
                    value="second"
                    status={
                      this.state.checked === 'second' ? 'checked' : 'unchecked'
                    }
                    onPress={() => this.second()}
                  />
                </View>
              </View>
            </View>

            <View style={styles.container1}>
              <View
                style={{
                  flexDirection: 'column',
                  marginVertical: 5,
                  marginHorizontal: 5,
                }}>
                <View>
                  <Text style={styles.text}>Company</Text>
                  <TextInput
                    placeholderTextColor="white"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: 400,
                      height: 35,
                    }}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name: name})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Email:</Text>
                  <TextInput
                    placeholderTextColor="white"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: 400,
                      height: 35,
                    }}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email: email})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Password:</Text>
                  <TextInput
                    placeholderTextColor="white"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: 400,
                      height: 35,
                    }}
                    value={this.state.password}
                    onChangeText={(password) =>
                      this.setState({password: password})
                    }
                  />
                </View>

                <View>
                  <Text style={styles.text}>Address:</Text>
                  <TextInput
                    placeholderTextColor="white"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: 400,
                      height: 35,
                    }}
                    value={this.state.address}
                    onChangeText={(address) =>
                      this.setState({address: address})
                    }
                  />
                </View>

                <View>
                  <Text style={styles.text}>Contact No:</Text>
                  <TextInput
                    placeholderTextColor="white"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: 400,
                      height: 35,
                    }}
                    value={this.state.contactNo}
                    onChangeText={(contactNo) =>
                      this.setState({contactNo: contactNo})
                    }
                  />
                </View>

                <View style={{marginVertical: 55}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.signup(
                        this.state.name,
                        this.state.email,
                        this.state.password,
                        this.state.address,
                        this.state.contactNo,
                      )
                    }>
                    <Text style={styles.buttonText}>Registration</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.signin()}>
                    <Text style={styles.buttonText}>Signin</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  },
  //container View
  container: {
    alignItems: 'center',
    height: 100,
  },
  textHeader: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  //container1 View
  container1: {
    height: hp('100%'),
    marginVertical: 30,
  },
  text: {
    marginVertical: 7,
    fontWeight: 'bold',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 10,
    borderWidth: 1,
    width: wp('95%'),
    height: 60,
    marginVertical: 10,
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});
