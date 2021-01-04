import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  Image,
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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
      checked: '',
      studentList: '',
      companyList: '',
      companyKeys: '',
      dataEmail: '',
      dataPassword: '',
      studentKeys: [],
    };
    console.log('props', props);
  }
  componentDidMount() {
    firebase
      .database()
      .ref()
      .on('value', (snapshot) => {
        // console.log("snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        // console.log("getValue", getValue)
        let getStudent = getValue['student'];

        const student = [];
        for (let key in getValue) {
          // console.log("key", key)
          student.push({
            ...getStudent[key],
            id: key,
          });
        }
        // console.log("ckey", student)
        // console.log("cc", getStudent)
        const a = [];
        for (let i in getStudent) {
          // console.log(getStudent[i].isAdmin,'l');
          a.push({
            ...getStudent[i],
          });
        }
        // console.log("asd", a)
        const data = a.filter((el) => el.isAdmin === true);
        // console.log("isadminTrue",data)
        const data1 = a.filter((el) => el.isAdmin === false);
        // console.log("isadminFalse",data1)
        this.setState({
          studentList: a,
          dataEmail: data,
          dataPassword: data1,
        });
      });
    firebase
      .database()
      .ref('student')
      .on('value', (snapshot) => {
        // console.log("snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        // console.log("getValue", getValue)
        let studentArray = [];
        for (let key in getValue) {
          // console.log("key", key)
          const value = {...getValue[key], key};
          studentArray.push(value);
        }
        // console.log(studentArray,'accc');
        let studentArray1 = [];
        for (let key in getValue) {
          // console.log("key", key)
          const value = {...getValue[key], key};
          studentArray1.push(key);
        }
        // console.log(studentArray1,'key');
        this.setState({
          studentKeys: studentArray1,
          studentList: studentArray,
        });
      });
  }
  // a() {
  //   auth()
  //     .signInAnonymously()
  //     .then((e) => {
  //       console.log('User signed in anonymously', e);
  //     })
  //     .catch((error) => {
  //       if (error.code === 'auth/operation-not-allowed') {
  //         console.log('Enable anonymous in your firebase console.');
  //       }

  //       console.error(error);
  //     });
  // }

  signup() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Signup');
  }

  phoneb() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Phone');
  }

  onLogin() {
    if (this.state.email.toLowerCase() && this.state.password) {
      let x = this.state.studentList.filter(
        (el) => el.email.toLowerCase() === this.state.email.toLowerCase(),
      );
      console.log('x', x);
      if (x[0]) {
        if (x[0].isAdmin === true) {
          console.log('x');
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (err) => {
              console.log(err.user.email, 'Welcome!');

              let Data = this.state.studentList.filter(
                (el) => el.email === err.user.email,
              );
              console.log('data:', Data);
              try {
                var currentUser = {...Data};
                await AsyncStorage.setItem(
                  '@User',
                  JSON.stringify(currentUser),
                );
              } catch (err) {
                console.log('err', err);
              }
              this.props.navigation.navigate('AdminHome');
            })
            .catch((error) => {
              console.log('error', error);
              Alert.alert('Error!', 'Incorrect Data');
            });
        } else {
          console.log('xx');
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (err) => {
              console.log(err.user.email, 'Welcome!');
              let Data = this.state.studentList.filter(
                (el) =>
                  el.email.toLowerCase() === err.user.email.toLocaleLowerCase(),
              );
              console.log('data:', Data);
              try {
                var currentUser = {...Data};
                await AsyncStorage.setItem(
                  '@User',
                  JSON.stringify(currentUser),
                );
              } catch (err) {
                console.log('err', err);
              }
              this.props.navigation.navigate('StdHome');
            })
            .catch((error) => {
              console.log('error', error);
              Alert.alert('Error!', 'Incorrect Email');
            });
        }
      } else {
        Alert.alert('Error!', 'Incorrect Data Enter');
      }
    } else {
      alert('Enter Data Please');
    }

    console.log('LOGIN');
  }

  onCompLogin = () => {
    console.log('comp');
    firebase
      .database()
      .ref('company')
      .on('value', (snapshot) => {
        // console.log("23snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        // console.log("getValue", getValue)
        let companyArray = [];
        for (let key in getValue) {
          // console.log("key", key)
          const value = {...getValue[key], key};
          companyArray.push(value);
        }
        // console.log(companyArray,'23accc');
        let companyArray1 = [];
        for (let key in getValue) {
          // console.log("key", key)
          const value = {...getValue[key], key};
          companyArray1.push(key);
        }
        // console.log(companyArray1,'23key');
        this.setState({
          companyKeys: companyArray1,
          companyList: companyArray,
        });
      });
    const {email, password} = this.state;
    if (this.state.email && this.state.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          console.log(res.user.email, 'Welcome!');
          // alert(res.user.email,'Welcome!')
          let Data = this.state.companyList.filter(
            (el) => el.email === res.user.email,
          );
          // console.log('data:',)

          try {
            var currentUser = {...Data};
            await AsyncStorage.setItem('@User', JSON.stringify({currentUser}));
          } catch (err) {
            console.log('err', err);
          }
          this.props.navigation.navigate('CompHome');
        })
        .catch((error) => {
          console.log('error', error);
          Alert.alert('Error!', 'Incorrect Data');
        });
    } else {
      alert('Enter Data Please');
    }
  };

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
    // this.props.navigation.navigate('CompLogin');
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
            </View>

            <View style={styles.container}>
              <Text style={styles.textHeader}> Login </Text>
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
                  marginVertical: 15,
                  marginHorizontal: 5,
                }}>
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
                      height: 40,
                      marginHorizontal: 5,
                      paddingHorizontal: 5,
                    }}
                    value={this.state.email}
                    onChangeText={(email) => {
                      this.setState({email: email});
                    }}
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
                      height: 40,
                      marginHorizontal: 5,
                      paddingHorizontal: 5,
                    }}
                    value={this.state.password}
                    onChangeText={(password) =>
                      this.setState({password: password})
                    }
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>

            <View style={styles.container2}>
              <View
                style={{
                  marginVertical: 20,
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onLogin()}>
                  <Text style={styles.buttonText}>Signin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.signup()}>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  borderRadius: 60,
                  marginHorizontal: 20,
                  marginVertical: 30,
                  borderWidth: 1,
                  width: 70,
                  height: 30,
                }}
                onPress={() => this.phoneb()}
              >
                <Text
                  style={{
                    marginVertical: 3,
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                      Phone
                </Text>
              </TouchableOpacity> */}
            </View>
          </KeyboardAwareScrollView>
        ) : (
          <View style={styles.image}>
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
              </View>

              <View style={styles.container}>
                <Text style={styles.textHeader}> Login </Text>
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
                    marginVertical: 15,
                    marginHorizontal: 5,
                  }}>
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
                        height: 40,
                        marginHorizontal: 5,
                        paddingHorizontal: 5,
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
                        marginHorizontal: 5,
                        paddingHorizontal: 5,
                        height: 40,
                      }}
                      value={this.state.password}
                      onChangeText={(password) =>
                        this.setState({password: password})
                      }
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.container2}>
                <View
                  style={{
                    marginHorizontal: 25,
                    marginVertical: 20,
                  }}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onCompLogin()}>
                    <Text style={styles.buttonText}>Signin</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.signup()}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </View>
                {/* <TouchableOpacity
                    style={{
                      backgroundColor: 'black',
                      borderRadius: 60,
                      marginHorizontal: 20,
                      marginVertical: 30,
                      borderWidth: 1,
                      width: 70,
                      height: 30,
                    }}
                    onPress={() => this.phoneb()}
                  >
                    <Text
                      style={{
                        marginVertical: 3,
                        marginHorizontal: 10,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                          Phone
                    </Text>
                  </TouchableOpacity> */}
              </View>
            </KeyboardAwareScrollView>
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
    width: '100%',
    height: '100%',
    backgroundColor: '#f98b34',
  },
  //container View
  container: {
    alignItems: 'center',
    height: 100,
  },
  textHeader: {
    marginVertical: 20,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  //container1 View
  container1: {
    height: 100,
    marginVertical: 10,
  },
  text: {
    marginVertical: 10,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
  //container2 View
  container2: {
    height: 260,
    marginVertical: 60,
    width: wp('95%'),
    // borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#67bae3',
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
