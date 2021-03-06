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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class a extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: null,
      jKey: '',
      compKey: '',
      applied: [],
      aa: [],
    };
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
    console.log('jsonValue1', this.props.route.params.item.apply);
    console.log(
      'this.props.route.params.item.jobKey',
      this.props.route.params.item.jobKey,
    );
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
          jKey: this.props.route.params.item.jobKey,
          compKey: currentData[0].ckey,
        });
      });

    const list = [];
    let x = this.props.route.params.item.apply;
    for (const keyA in x) {
      let v = {...x[keyA], keyA};
      list.push(v);
    }
    console.log('{list}', list);
    this.setState({
      list,
    });
  };

  Delete() {
    console.log('{compKey}', this.state.compKey);
    console.log('{jKey}', this.state.jKey);
    console.log('{Akey}', this.state.list[0].keyA);
    let deleteApply =
      'company/' +
      this.state.compKey +
      '/jobs/' +
      this.state.jKey +
      '/apply/' +
      this.state.list[0].keyA;
    console.log('{deleteJob}', deleteApply);
    firebase.database().ref(deleteApply).remove();
  }

  render() {
    console.log(this.state.list, 'apply');

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
                  style={{
                    marginVertical: 5,
                    width: 40,
                    height: 40,
                    marginHorizontal: 10,
                  }}
                  source={require('./back-button-icon-png-25.jpg')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  marginHorizontal: 40,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {' '}
                Applied Students List{' '}
              </Text>
            </View>
          </View>

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
                  <View
                    style={{
                      marginVertical: 5,
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginVertical: 3,
                        marginHorizontal: 30,
                        color: 'black',
                        fontSize: 18,
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 20,
                          color: 'black',
                          fontSize: 16,
                          width: '25%',
                        }}>
                        Description:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '55%',
                          textAlign: 'left',
                        }}>
                        {item.description}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 20,
                          color: 'black',
                          fontSize: 16,
                          width: '25%',
                        }}>
                        Education:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '55%',
                        }}>
                        {item.education}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 20,
                          color: 'black',
                          fontSize: 16,
                          width: '25%',
                        }}>
                        Email
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '55%',
                        }}>
                        {item.email}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 20,
                          color: 'black',
                          fontSize: 16,
                          width: '25%',
                        }}>
                        Skills:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '55%',
                        }}>
                        {item.skills}
                      </Text>
                    </View>
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

export default a;
