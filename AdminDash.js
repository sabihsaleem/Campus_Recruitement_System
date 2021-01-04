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

export default class AdminDash extends React.Component {
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
      studentList: [],
      companyList: [],
      search: '',
      arrayHolder: [],
      stdKey: [],
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

  componentDidMount = async () => {
    const user = auth().currentUser;

    firebase
      .database()
      .ref('student')
      .on('value', (snapshot) => {
        // console.log("snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        let array = [];
        for (let key in getValue) {
          // console.log("key", key)
          const value = {...getValue[key], key};
          array.push(value);
        }
        // console.log("111111111",array)
        let array1 = [];
        for (let key in getValue) {
          // console.log("key", key)
          const value = {key};
          array1.push(key);
        }
        // console.log("111111111",array)
        const list = array.filter((el) => el.isAdmin === false);
        // console.log("000000000",list)
        this.setState({
          list,
          dataSource: array,
          arrayHolder: array,
          stdKey: array1,
        });
      });

    await AsyncStorage.getItem('@User')
      .then((res) => JSON.parse(res))
      .then((resp) => {
        // console.log(resp)
        const c = [];
        c.push(resp);
        // console.log("DKDKL",c)
        let v = [];
        for (let x in resp) {
          // console.log('8778',resp[x])
          v.push(resp[x].key);
        }
        // console.log("000",v)
      })
      .catch((err) => console.log({err}));
  };

  delete(i) {
    // this.state.list[i];
    firebase
      .database()
      .ref('company')
      .on('value', (snapshot) => {
        console.log('snapshot.val()', snapshot.val());
        const getValue = snapshot.val();
        console.log('getCV', getValue);
        let array = [];
        for (let key in getValue) {
          console.log('cVKey', key);
          const value = {...getValue[key], key};
          array.push(value);
        }
        console.log(array, 'key');
        console.log('this.state.list[i]', this.state.list[i]);
        for (let company of array) {
          // console.log(company,'company')
          if (company.jobs) {
            // console.log(company.jobs,'company.jobs')
            for (let job in company.jobs) {
              // console.log(company.jobs[job],'job')
              if (company.jobs[job].apply) {
                // console.log(company.jobs[job].apply,'company.jobs[job].apply')
                for (let apply in company.jobs[job].apply) {
                  // console.log(company.jobs[job],'job')
                  if (
                    company.jobs[job].apply[apply] &&
                    company.jobs[job].apply[apply].uid ===
                      this.state.list[i].key
                  ) {
                    // company.jobs[job].apply[apply].uid STUDENT_ID
                    // apply

                    console.log('apply', apply);
                    console.log('job', job);
                    console.log('company', company.key);
                    let keys = '/company/' + company.key + '/jobs';
                    let keys2 = keys + job + '/apply';
                    console.log('1', keys2 + apply);
                    firebase
                      .database()
                      .ref(keys2 + apply)
                      .remove();
                  }
                }
              }
            }
          }
        }
      });
    let deleted = this.state.list[i].key;
    console.log('listname', deleted);
    firebase
      .database()
      .ref('/student/' + deleted)
      .remove();
  }

  Cv(index, item, a) {
    this.setState({
      selectedIndex: index + 1,
    });
    console.log(item.cv, 'this.state.list[i].cv');
    this.props.navigation.navigate('StdCV', {
      item,
      stdKey: a,
    });
    console.log('CV', this.state.stdKey);
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

  render() {
    console.log(this.state.stdKey, 'a');
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
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
              <View
                style={{
                  alignItems: 'center',
                  height: 50,
                  marginHorizontal: 70,
                }}>
                <Text
                  style={{
                    marginVertical: 10,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  Student's Record{' '}
                </Text>
              </View>
            </View>
          </View>

          {/* <View style={{backgroundColor:'#f98b34'}}>
            <SearchBar
              round
              searchIcon={{size: 25}}
              style={{backgroundColor:'#f39c12'}}
              onChangeText={(text) => this.SearchFilterFunction(text)}
              onClear={(text) => this.SearchFilterFunction('')}
              placeholder="Type Here to Search..."
              value={this.state.search}
            />
        </View> */}

          <View style={styles.box}>
            <FlatList
              style={styles.list}
              // data={ isStudnet === true ?this.state.studentList : this.state.companyList}
              data={this.state.list}
              ListEmptyComponent={() => this.emptyComponent()}
              renderItem={({item, index}) => (
                <View
                  style={{
                    borderRadius: 15,
                    marginVertical: 5,
                    borderWidth: 2,
                    // paddingVertical:10,
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
                          {item.email}
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
                          {item.contactNo}
                        </Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        paddingHorizontal: 20,
                        color: 'black',
                        fontSize: 16,
                      }}>
                      {item.address}
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
                        backgroundColor:'#f39c12',
                        borderRadius: 10,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        width: wp('85%'),
                        height: 40,
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: 'white',
                      }}
                      onPress={() =>
                        this.Cv( item, this.state.stdKey[index])
                      }>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: 20,
                        }}>
                        Cv
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor:'#f39c12',
                        borderRadius: 10,
                        marginVertical: 5,
                        marginHorizontal: 10,
                        alignItems: 'center',
                        width: wp('85%'),
                        height: 40,
                        justifyContent: 'center',
                        borderWidth: 2,
                        borderColor: 'white',
                      }}
                      onPress={() => this.delete(index)}>
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
