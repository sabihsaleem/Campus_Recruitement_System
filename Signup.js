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
  Alert,
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

export default class Signup extends React.Component {
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

  signup = (name, email, password, address, contactNo) => {
    if (
      this.state.email &&
      this.state.password &&
      this.state.address &&
      this.state.name &&
      this.state.contactNo
    ) {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
          firebase
            .database()
            .ref('student')
            .push({
              name,
              email,
              password,
              address,
              contactNo,
              isAdmin: false,
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
              alert('Data update.');
            })
            .catch((error) => {
              console.log('failed: ' + error.message);
            });
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('Error!', 'That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('Error!', 'That email address is invalid!');
          }

          console.error(error);
        });
    } else {
      alert('Enter Data Please');
    }
  };

  signin() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Login');
  }

  first() {
    this.setState({checked: 'first'});
    {
      this.state.isLoading = true;
    }
  }

  second() {
    this.setState({checked: 'second'});
    {
      this.state.isLoading = false;
    }
    // this.props.navigation.navigate('CompanyReg');
  }

  csignup(name, email, password, address, contactNo) {
    if (
      this.state.email &&
      this.state.password &&
      this.state.address &&
      this.state.name &&
      this.state.contactNo
    ) {
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
              isCompany: true,
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
              alert('Data update.');
            })
            .catch((error) => {
              console.log('failed: ' + error.message);
            });
          this.props.navigation.navigate('Login');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('Error!', 'That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('Error!', 'That email address is invalid!');
          }

          console.error(error);
        });
    } else {
      alert('Enter Data Please');
    }
  }

  render() {
      const {name, email, password, address, contactNo} = this.state
    return (
      <View style={styles.image}>
        {this.state.isLoading ? (
          <KeyboardAwareScrollView>
            <View style={{flexDirection: 'row', borderWidth: 1}}>
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
                    marginHorizontal: 5,
                  }}
                  source={require('./back-button-icon-png-25.jpg')}
                />
              </TouchableOpacity>

              <View style={styles.container}>
                <Text style={styles.textHeader}> Registration </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
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
                  color="#67bae3"
                  uncheckedColor="#67bae3"
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
                  color="#67bae3"
                  uncheckedColor="#67bae3"
                  status={
                    this.state.checked === 'second' ? 'checked' : 'unchecked'
                  }
                  onPress={() => this.second()}
                />
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
                  <Text style={styles.text}>Student Name</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name: name})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Email:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email: email})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Password:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
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
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
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
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.contactNo}
                    onChangeText={(contactNo) =>
                      this.setState({contactNo: contactNo})
                    }
                  />
                </View>
              </View>

              <View>
                <View style={{marginVertical: 5, marginHorizontal: 5}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.signup(
                        name,
                        email,
                        password,
                        address,
                        contactNo,
                      )
                    }>
                    <Text style={styles.buttonText}>Registration</Text>
                  </TouchableOpacity>

                  {/* <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.signin()}
                                        >
                                            <Text style={styles.buttonText}>
                                            Signin
                                            </Text>
                                        </TouchableOpacity> */}
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        ) : (
          <KeyboardAwareScrollView>
            <View style={{flexDirection: 'row', borderWidth: 1}}>
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
                    marginHorizontal: 5,
                  }}
                  source={require('./back-button-icon-png-25.jpg')}
                />
              </TouchableOpacity>

              <View style={styles.container}>
                <Text style={styles.textHeader}> Registration </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
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
                  color="#67bae3"
                  uncheckedColor="#67bae3"
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
                  color="#67bae3"
                  uncheckedColor="#67bae3"
                  status={
                    this.state.checked === 'second' ? 'checked' : 'unchecked'
                  }
                  onPress={() => this.second()}
                />
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
                  <Text style={styles.text}>Company Name</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name: name})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Email:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email: email})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Password:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
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
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
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
                    placeholderTextColor="black"
                    placeholder="Enter here"
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 10,
                    }}
                    onChangeText={(contactNo) =>
                      this.setState({contactNo: contactNo})
                    }
                  />
                </View>
              </View>

              <View style={{marginVertical: 5, marginHorizontal: 5}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.csignup(
                      this.state.name,
                      this.state.email,
                      this.state.password,
                      this.state.address,
                      this.state.contactNo,
                    )
                  }>
                  <Text style={styles.buttonText}>Registration</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.signin()}
                                    >
                                        <Text style={styles.buttonText}>
                                        Signin
                                        </Text>
                                    </TouchableOpacity> */}
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: '#f98b34',
  },
  //container View
  container: {
    alignItems: 'center',
    // height: 100,
  },
  textHeader: {
    marginVertical: 5,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginHorizontal: 70,
  },
  //container1 View
  container1: {
    height: '100%',
    // marginVertical: 10
    width: wp('95%'),
  },
  text: {
    marginVertical: 10,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 10,
    borderWidth: 2,
    width: wp('95%'),
    height: 60,
    marginVertical: 5,
    borderColor: '#67bae3',
    marginHorizontal: 5,
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});
