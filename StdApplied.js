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

class StdApplied extends React.Component {
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

  componentDidMount = async () => {
    console.log('this.props.route', this.props.route);
    // console.log("apply",this.props.route.params.item.apply)
    // console.log("this.props.route.params.companykey",this.props.route.params.companykey)
    // console.log("this.props.route.params.jobkey",this.props.route.params.jobkey)
    const jKey = this.props.route.params.jobkey;
    const c = this.props.route.params.item.apply;
    const compKey = this.props.route.params.companykey;
    let a = [];
    for (let i in c) {
      console.log('i', i);
      const z = {...c[i], appliedKey: i};
      a.push(z);
    }

    await AsyncStorage.getItem('@User')
      .then((res) => JSON.parse(res))
      .then((resp) => {
        console.log(resp);
        // console.log("aa"
        // this.setState({
        //     applied:data1,
        // })
      })
      .catch((err) => console.log({err}));
    this.setState({
      list: a,
      jKey,
      compKey,
    });
  };

  Delete(index, item) {
    const {aa, list} = this.state;
    console.log('this.state.compKey', this.state.compKey);
    console.log('this.state.jKey', this.state.jKey);
    console.log({aa, list, item});
    const selectedKey = item.uid;
    let deleted = this.state.compKey;
    let x =
      'company/' +
      this.state.compKey +
      '/jobs/' +
      this.state.jKey +
      '/apply/' +
      item.appliedKey;
    console.log({x});
    // let del = x+this.state.jKey+"/apply"
    // console.log("del12",del)
    firebase.database().ref(x).remove();
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
    console.log(this.state.list, 'a');

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
                        backgroundColor:'#f39c12',
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

export default StdApplied;
