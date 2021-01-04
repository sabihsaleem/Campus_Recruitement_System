import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {SearchBar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends React.Component {
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
      currentUser: [],
      list: [],
      search: '',
      arrayHolder: [],
      isLoading: true,
      ckey: '',
    };
  }

  componentDidMount = () => {
    const user = auth().currentUser;
    // console.log("currentUser",user)

    firebase
      .database()
      .ref('company')
      .on('value', (snapshot) => {
        // console.log("23snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        // console.log("getValue", getValue)
        let array = [];
        for (let ckey in getValue) {
          // console.log("key", key)
          const value = {...getValue[ckey], ckey};
          array.push(value);
        }
        //   console.log(array,'23accc');
        const currentData = array.filter((el) => el.email === user.email);
        console.log('currentData', currentData);
        this.setState({
          list: currentData,
          email: currentData[0].email,
          ckey: currentData[0].ckey,
          name: currentData[0].name,
          address: currentData[0].address,
          contactNo: currentData[0].contactNo,
          password: currentData[0].password,
        });
      });
  };

  search = (text) => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    console.log('text:', text);
    const newData = this.state.arrayHolder.filter((item) => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log('newData:', newData);
    this.setState({list: newData, search: text});
  }

  emptyComponent = () => {
    // if(this.state.list.length===null){
    //   this.props.navigation.goBack();

    // }
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('100%'),
          height: hp('100%'),
        }}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <View>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 26,
                marginBottom: 100,
              }}>
              oops! There's no data here!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  edit = () => {
    this.setState({
      isLoading: false,
    });
  };

  back = () => {
    this.setState({
      isLoading: true,
    });
  };

  updatebtn = (name, email, password, address, contactNo) => {
    console.log('company/' + this.state.ckey, 'companyKey');
    firebase
      .database()
      .ref('company/' + this.state.ckey)
      .update({
        name,
        email,
        password,
        address,
        contactNo,
      })
      .then(() => {
        this.setState({
          name: '',
          email: this.state.email,
          password: this.state.password,
          address: '',
          contactNo: '',
          isLoading: true,
        });
        console.log('Data update.');
        alert('Data update.');
      })
      .catch((error) => {
        console.log('failed: ' + error.message);
      });
  };

  // ShowMaxAlert = (contactNo) =>{

  //   var length = contactNo.length.toString() ;

  //   if(length == 11){

  //     Alert.alert("Sorry, You have reached the maximum input limit.")
  //     // Put your code here which you want to execute when TextInput entered text reached to 10.
  //     this.setState({contactNo: contactNo})
  //   }

  //  }

  render() {
    const {name, email, password, address, contactNo, list} = this.state;
    console.log(list, 'a');
    // console.log(this.state.arrayHolder,"arrayHolder")
    // const { search } = this.state;
    return (
      <View
        style={{
          flex: 1,
          resizeMode: 'cover',
          width: wp('100%'),
          height: hp('100%'),
          backgroundColor: '#f98b34',
        }}>
        {this.state.isLoading ? (
          <ScrollView>
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
                    style={{marginVertical: 5, width: 40, height: 40}}
                    source={require('./back-button-icon-png-25.jpg')}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginHorizontal: 100,
                    marginVertical: 5,
                  }}>
                  User Profile
                </Text>
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
        </View> */}

            {/* <View style={{alignItems:'center',height:50,borderColor:'black',borderWidth:1}}>
          
          <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Student's Record </Text>

        </View> */}
            <View style={{marginVertical: 5}} />

            <View style={styles.box}>
              <FlatList
                style={styles.list}
                data={this.state.list}
                ListEmptyComponent={() => this.emptyComponent()}
                renderItem={({item, index}) => (
                  <View
                    style={{
                      borderRadius: 15,
                      marginVertical: 5,
                      borderWidth: 2,
                      width: '95%',
                      alignSelf: 'center',
                      backgroundColor: '#e06100',
                      borderColor: '#67bae3',
                    }}>
                    <View style={{marginVertical: 5}}>
                      <View style={{justifyContent: 'space-between'}}>
                        <Text
                          style={{
                            paddingHorizontal: 20,
                            color: 'black',
                            fontSize: 22,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                          }}>
                          {item.name.toUpperCase()}
                        </Text>
                        <View
                          style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginVertical: 5,
                          }}>
                          <View>
                            <Text
                              style={{
                                paddingHorizontal: 20,
                                color: 'black',
                                fontSize: 18,
                              }}>
                              {item.email}
                            </Text>
                          </View>
                          <View>
                            <Text
                              style={{
                                paddingHorizontal: 20,
                                color: 'black',
                                fontSize: 18,
                              }}>
                              {item.contactNo}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            paddingHorizontal: 20,
                            color: 'black',
                            fontSize: 18,
                          }}>
                          {item.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => `${index}`}
              />
            </View>

            <View style={{marginTop: 'auto'}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.edit()}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <KeyboardAwareScrollView>
            <View style={{flexDirection: 'row', borderWidth: 1}}>
              <TouchableOpacity
                onPress={() => {
                  this.back();
                  // this.props.navigation.navigate('Home');
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
                <Text style={styles.textHeader}> Edit Profile </Text>
              </View>
            </View>

            <View style={styles.container1}>
              <View
                style={{
                  flexDirection: 'column',
                  marginVertical: 10,
                  marginHorizontal: 5,
                }}>
                <View>
                  <Text style={styles.text}>Company Name</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={this.state.name}
                    style={{
                      borderColor: '#67bae3',
                      color: 'black',
                      borderWidth: 2,
                      width: wp('95%'),
                      height: 35,
                      paddingVertical: 7,
                      marginHorizontal: 5,
                      paddingHorizontal: 5,
                    }}
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name: name})}
                  />
                </View>

                <View>
                  <Text style={styles.text}>Email:</Text>
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
                    {this.state.email}
                  </Text>
                </View>

                <View>
                  <Text style={styles.text}>Address:</Text>
                  <TextInput
                    placeholderTextColor="black"
                    placeholder={this.state.address}
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
                    placeholder={this.state.contactNo}
                    maxLength={11}
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
                <View style={{marginTop: 'auto', marginVertical: 30}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.updatebtn(name, email, password, address, contactNo)
                    }>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
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
    height: hp('100%'),
    marginVertical: 10,
    width: wp('95%'),
  },
  text: {
    marginVertical: 7,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 5,
  },
  box: {
    height: hp('75%'),
  },
  list: {
    width: wp('100%'),
  },
  button: {
    backgroundColor: '#f39c12',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#67bae3',
    width: wp('95%'),
    height: 60,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});

export default Profile;
