import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {SearchBar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Dashboard extends React.Component {
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
      dataSource: [],
      selectedIndex: null,
      search: '',
      arrayHolder: [],
      companyKeys: [],
      companyID: [],
      companyList: [],
      compList: [],
    };
  }

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

  // componentDidMount() {
  //   const user = auth().currentUser

  //   firebase.database().ref("student").on('value', (snapshot) => {
  //     // console.log("snapshot.val()", snapshot.val())
  //     const getValue = snapshot.val()
  //     // console.log("getValue", getValue)
  //     let array = [];
  //     for (let key in getValue) {
  //     // console.log("key", key)
  //     const value =  { ...getValue[key], key}
  //       array.push(
  //         value
  //       );
  //     }
  //     // console.log(array,'accc');
  //     // const currentUser =  array.find(el => el.email === user.email )
  //     // console.log({currentUser})
  //     // const cu = []
  //     // cu.push(currentUser)
  //     const list = array.filter(el=> el.isAdmin === false)
  //     console.log("000000000",list)
  //     this.setState({
  //       // phone:currentUser.contactNo,
  //       // currentUser:cu,
  //       list,
  //       dataSource: array,
  //       arrayHolder: array,
  //     });
  //   });

  //   firebase.database().ref("company").on('value', (snapshot) => {
  //     console.log("23snapshot.val()", snapshot.val())
  //     const getValue = snapshot.val()
  //     // console.log("getValue", getValue)
  //     let array = [];
  //     for (let key in getValue) {
  //     // console.log("key", key)
  //     const value =  { ...getValue[key], key}
  //       array.push(
  //         value
  //       );
  //     }
  //     console.log(array,'23accc');
  //     let array1 = [];
  //     for (let key in getValue) {
  //       // console.log("key", key)
  //       const value =  { ...getValue[key], key}
  //         array1.push(
  //           key
  //         );
  //       }
  //       console.log(array1,'23key');
  //     this.setState({
  //       companyKeys:array1,
  //       companyList:array,
  //     });
  //   });

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

  componentDidMount = async () => {
    const user = auth().currentUser;
    console.log('currentUser', user);

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
        console.log(array, '23accc');
        const currentData = array.filter((el) => el.email === user.email);
        console.log('currentData', currentData);
        console.log('currentData[0].ckey', currentData[0].ckey);
        console.log('currentData[0].jobs', currentData[0].jobs);
        const data = [];
        let c = currentData[0].jobs;
        for (const key in c) {
          let v = {...c[key], key};
          data.push(v);
        }
        console.log('{data}', data);
        // let deleteJob = "companay/"+currentData[0].ckey+"/jobs/"+item.jobKey
        // console.log("{deleteJob}",deleteJob)
        this.setState({
          companyKeys: currentData[0].ckey,
        });
      });
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

        console.log('Jobdata', data[0][0]);
        const jj = [];
        let x = data[0][0].jobs;
        for (const j in x) {
          let v = {...x[j], jobKey: j};
          jj.push(v);
        }
        console.log('{j}', jj);
        this.setState({
          list: jj,
        });
      })
      .catch((err) => console.log({err}));
  };

  Delete(index, item) {
    // const user = auth().currentUser
    // console.log("currentUser",user,{item})

    // firebase.database().ref("company").on('value', (snapshot) => {
    //   // console.log("23snapshot.val()", snapshot.val())
    //   const getValue = snapshot.val()
    //   // console.log("getValue", getValue)
    //   let array = [];
    //   for (let ckey in getValue) {
    //   // console.log("key", key)
    //   const value =  { ...getValue[ckey], ckey}
    //     array.push(
    //       value
    //     );
    //   }
    //   console.log(array,'23accc');
    //   const currentData=array.filter(el=>el.email===user.email)
    //   console.log("currentData",currentData)
    //   console.log("currentData[0].ckey",currentData[0].ckey)
    //   console.log("currentData[0].jobs",currentData[0].jobs)
    //   const data = []
    //   let c= currentData[0].jobs
    //   for(const key in c){
    //     let v = {...c[key],key}
    //     data.push(v)
    //   }
    //   console.log("{data}",data)
    //   let deleteJob = "companay/"+currentData[0].ckey+"/jobs/"+item.jobKey
    //   console.log("{deleteJob}",deleteJob)
    //   this.setState({
    //     companyKeys:currentData[0].ckey,
    //   })
    // });
    console.log('{key}', this.state.companyKeys);
    let deleteJob =
      'company/' + this.state.companyKeys + '/jobs/' + item.jobKey;
    console.log('{deleteJob}', deleteJob);
    firebase.database().ref(deleteJob).remove();
  }

  Applied(index, item) {
    this.props.navigation.navigate('a', {
      item,
    });
    console.log('s', item.apply);
  }

  render() {
    console.log(this.state.list, 'a');
    // console.log(this.state.arrayHolder,"arrayHolder")
    // const { search } = this.state;
    return (
      <View
        style={{
          flex: 1,
          resizeMode: 'cover',
          width: '100%',
          height: '100%',
          backgroundColor: '#f98b34',
        }}>
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
                Job's Record
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            paddingHorizontal: 20,
                            color: 'black',
                            fontSize: 20,
                            fontWeight: 'bold',
                          }}>
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            paddingHorizontal: 20,
                            color: 'black',
                            fontSize: 16,
                          }}>
                          {item.description}
                        </Text>
                      </View>

                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            color: 'black',
                            fontSize: 16,
                          }}>
                          {item.startDate}
                        </Text>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            color: 'black',
                            fontSize: 16,
                          }}>
                          {item.endDate}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        paddingHorizontal: 20,
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.skills}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.state.selectedIndex === true ? 'red' : '#f39c12',
                        borderRadius: 10,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        width: wp('85%'),
                        height: 40,
                        justifyContent: 'center',
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      onPress={() => this.Applied(index, item)}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: 20,
                        }}>
                        Applied List
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.state.selectedIndex === true ? 'red' : '#f39c12',
                        borderRadius: 10,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        width: wp('85%'),
                        height: 40,
                        justifyContent: 'center',
                        borderColor: 'white',
                        borderWidth: 2,
                      }}
                      onPress={() => this.Delete(index, item)}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: 20,
                        }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: hp('100%'),
  },
  list: {
    width: wp('100%'),
  },
});

export default Dashboard;
