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

class JobsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: null,
      jobIDs: [],
      k: '',
    };
  }

  componentDidMount() {
    console.log('propsCV', this.props);
    console.log('data', this.props.route.params.item.jobs);
    const k = this.props.route.params.jobId;
    console.log(k);
    const c = this.props.route.params.item.jobs;
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
      k,
    });
  }

  Applied(index, item) {
    const {k, jobIDs} = this.state
    this.state.k[index], this.state.jobIDs[index];
    console.log('props', this.props);
    this.setState({
      selectedIndex: index + 1,
    });
    this.props.navigation.navigate('StdApplied', {
      item,
      companykey: k,
      jobkey: jobIDs,
    });
    console.log('s', item.apply);
  }

  Delete(index, item) {
    // console.log("{job key}",this.state.jobIDs[0])
    const k = this.props.route.params.jobId;
    // console.log(k)
    let deleted = this.state.jobIDs;
    let x = 'company/' + k + '/jobs/';
    let del = x + deleted;
    console.log('del12', del);
    firebase.database().ref(del).remove();
    this.setState({
      selectedIndex: index + 1,
    });
    //   this.props.navigation.navigate('CV',
    //   {
    //     item,
    //   })
    console.log('s', item);
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
    const {k, jobIDs} = this.state
    console.log(k, 'this.state.k');
    console.log(jobIDs, '{Jobs IDS}');
    return (
      <View
        style={styles.mainView}>
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
                  marginHorizontal: 100,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {' '}
                Jobs List{' '}
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
                  style={styles.flatlistView}>
                  <View
                    style={styles.flatlistViewInner}>
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
                          marginHorizontal: 30,
                          color: 'black',
                          fontSize: 16,
                          width: '30%',
                        }}>
                        Description:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '60%',
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
                          marginHorizontal: 30,
                          color: 'black',
                          fontSize: 16,
                          width: '30%',
                        }}>
                        Start Date:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '60%',
                        }}>
                        {item.startDate}
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
                          marginHorizontal: 30,
                          color: 'black',
                          fontSize: 16,
                          width: '30%',
                        }}>
                        End Date:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '60%',
                        }}>
                        {item.endDate}
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
                          marginHorizontal: 30,
                          color: 'black',
                          fontSize: 16,
                          width: '30%',
                        }}>
                        Skills:
                      </Text>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 3,
                          color: 'black',
                          fontSize: 16,
                          width: '60%',
                        }}>
                        {item.skills}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={styles.appliedView}>
                    <TouchableOpacity
                      style={styles.appliedButton}
                      onPress={() => this.Applied(index, item)}>
                      <Text
                        style={styles.appliedText}>
                        Applied Data
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.deleteView}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => this.Delete(index, item)}>
                      <Text
                        style={styles.deleteText}>
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
  mainView:{
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: '#f98b34',
  },
  box: {
    height: hp('100%'),
  },
  list: {
    width: wp('100%'),
  },
  deleteText:{
    marginVertical: 3,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  deleteButton:{
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
  },
  deleteView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  appliedText:{
    marginVertical: 3,
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  appliedButton:{
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
  },
  appliedView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  flatlistView:{
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#e06100',
    borderColor: '#67bae3',
  },
  flatlistView:{
    marginVertical: 5,
    justifyContent: 'space-between',
  }
});

export default JobsList;
