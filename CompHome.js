import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
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

export default class CompHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: '',
    };
  }

  JobsList() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Dashboard');
  }

  CreateJobs() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Lists');
  }

  Profile() {
    this.setState = {
      isLoading: false,
    };
    this.props.navigation.navigate('Profile');
  }

  signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        this.props.navigation.navigate('Home');
        AsyncStorage.removeItem('@User');
      });
  }

  componentDidMount = async () => {
    // const jsonValue = await AsyncStorage.getItem('@currentUser')
    // console.log("jsonValue1",jsonValue)

    await AsyncStorage.getItem('@User')
      .then((res) => JSON.parse(res))
      .then((resp) => {
        console.log(resp, 'sss');
        let data = [];
        for (const element in resp) {
          console.log(element);
          let value = {...resp[element], element};
          data.push(value);
        }

        console.log('Jobdata', data[0][0].name);
        this.setState({
          name: data[0][0].name,
        });
      })
      .catch((err) => console.log({err}));
  };

  render() {
    return (
      <View style={styles.image}>
        {this.state.isLoading ? (
          <View>
            <View style={styles.container}>
              <Text style={styles.textHeader}> {this.state.name} </Text>
            </View>

            <View style={styles.container1}>
              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.Profile()}>
                  <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginVertical: 20}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.CreateJobs()}>
                  <Text style={styles.buttonText}>Create Jobs</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.JobsList()}>
                  <Text style={styles.buttonText}>Jobs List</Text>
                </TouchableOpacity>
              </View>

              <View style={{marginTop: 'auto'}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.signOut()}>
                  <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    marginVertical: 50,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
  },
  //container1 View
  container1: {
    height: 490,
    marginVertical: 60,
    width: wp('95%'),
  },
  text: {
    marginVertical: 7,
    fontWeight: 'bold',
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
