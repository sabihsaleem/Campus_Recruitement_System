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

class StdCV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: null,
      jobIDs: [],
    };
  }

  componentDidMount() {
    console.log('propsCV', this.props);
    console.log('data', this.props.route.params.item.cv);
    const c = this.props.route.params.item.cv;
    let a = [];
    for (let i in c) {
      // console.log("i",i)
      const z = {...c[i]};
      a.push(z);
    }
    console.log('5', a);
    let aa = [];
    for (let j in c) {
      // console.log("8",j)
      const zz = {...c[j], j};
      aa.push(zz.j);
    }
    console.log('56', aa[0]);
    this.setState({
      list: a,
      jobIDs: aa[0],
    });
  }

  Delete(index, item) {
    let s = this.props.route.params.stdKey;
    console.log(s);
    let deleted = this.state.jobIDs;
    let x = 'student/' + s + '/cv';
    console.log('del12', x);
    // firebase.database().ref(del).remove().child(deleted)
  }

  render() {
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
                  marginHorizontal: 80,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {' '}
                Student CV List{' '}
              </Text>
            </View>
          </View>

          <View style={styles.box}>
            <FlatList
              style={styles.list}
              data={this.state.list}
              renderItem={({item, index, a, b}) => (
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
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 30,
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
                          width: '50%',
                        }}>
                        {item.description}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 30,
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
                          width: '50%',
                        }}>
                        {item.education}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 30,
                          color: 'black',
                          fontSize: 16,
                          width: '25%',
                        }}>
                        Percentage:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '50%',
                        }}>
                        {item.percentage}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 30,
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
                          width: '50%',
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
    height: '100%',
  },
  list: {
    width: '100%',
  },
});

export default StdCV;
