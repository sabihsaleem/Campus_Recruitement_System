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
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Apply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectedIndex: null,
      jobIDs: [],
      cvData: [],
      cvKey: '',
      uid: '',
      name: '',
      description: '',
      education: '',
      percentage: '',
      skills: '',
      apply: [],
      applyK: '',
      compKey: '',
      currentUser: '',
      userID:'',
      currentUserKey:'',
    };
  }

  componentDidMount() {
    // console.log("propsCV",this.props.route.params.item)
    // console.log("data",this.props.route.params.item.jobs)
    // const {item } = this.props.route.params
    // console.log({item})
    const cc = this.props.route.params.item;
    const {uid} = this.props.route.params;
    console.log('0909', uid);
    console.log('@@CC123', this.props.route.params);

    let data = [];
    data.push(cc);
    console.log('comp', data[0].key);
    const c = this.props.route.params.item.jobs;
    console.log('@@CC', c);
    let a = [];
    for (let i in c) {
      // console.log("i",i)
      const z = {...c[i], jobKey: i};
      a.push(z);
    }
    console.log('jobs', a);
    let aa = [];
    for (let j in c) {
      // console.log("8",j)
      const zz = {...c[j], j};
      aa.push(zz.j);
    }
    // console.log("56",aa)

    const user = auth().currentUser;
    console.log('user', user);

    firebase
      .database()
      .ref('student')
      .on('value', (snapshot) => {
        //   console.log("snapshot.val()", snapshot.val())
        const getValue = snapshot.val();
        //   console.log("getCompany", getValue)
        let array = [];
        for (let key in getValue) {
          //   console.log("companyKey", key)
          const value = {...getValue[key], key};
          array.push(value);
        }
        console.log(array, 'studentList');
        const currentUser = array.filter(
          (el) => el.email.toLowerCase() === user.email.toLowerCase(),
        );
        console.log(currentUser, 'CCCC');
        console.log('cv', currentUser[0].cv);
        console.log('currentUser[0].key', currentUser[0].key);
        let cc = currentUser[0].cv;
        let cv = [];
        for (let key in cc) {
          //   console.log("currentUser[0].cv", key)
          const value = {...cc[key], key};
          cv.push(value);
        }
        console.log(cv, '{cv}');
        let c = currentUser[0].cv;
        let array1 = [];
        for (let key in c) {
          //   console.log("currentUser[0].cv", key)
          const value = {...c[key], key};
          array1.push(key);
        }
        console.log(array1[0], 'currentUser[0].cv534534');
        this.setState({
          cvKey: array1[0],
          cvData: cv,
          uid: cv[0].key,
          name: cv[0].name,
          userID: cv[0].uid,
          description: cv[0].description,
          education: cv[0].education,
          percentage: cv[0].percentage,
          skills: cv[0].skills,
          currentUser: currentUser,
          currentUserKey:currentUser[0].key,
        });
      });

    this.setState({
      list: a,
      jobIDs: aa,
      compKey: data[0].key,
    });

    // firebase.database().ref("company").on('value', (snapshot) => {
    //   console.log("snapshot.val()", snapshot.val())
    //   const getValue = snapshot.val()
    //   let array = [];
    //   for (let key in getValue) {
    //   console.log("key", key)
    //   const value =  { ...getValue[key], key}
    //     array.push(
    //       value
    //     );
    //   }
    //   console.log(array,'accc');

    //   // this.setState({
    //   //   list: array,
    //   // });
    // });
  }

  // CV(index,item,a){
  //   console.log("props",this.props)
  //   this.setState ({
  //     selectedIndex: index+1
  //   });
  //     this.props.navigation.navigate('CV',
  //     {
  //       item,
  //       jobId: a
  //     })
  //     console.log('s',item)
  //     console.log('s21',a)
  // }

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

  CV = (index, item, name, description, education, percentage, skills) => {
    console.log('c', item.uid, 'j', item.jobKey);
    let del = 'company/' + item.uid + '/jobs/' + item.jobKey + '/apply';
    console.log('del', del);
    const {currentUser} = this.state;
    console.log({currentUser}, 'from CV');
    //   firebase.database().ref(del).on('value', (snapshot) => {
    //   console.log("snapshot.val()", snapshot.val())
    //   const getValue = snapshot.val()
    //   let array = [];
    //   for (let key in getValue) {
    //     const value =  { ...getValue[key], key}
    //     array.push(
    //       value
    //       );
    //       console.log("key", key, array)
    //   }
    //   // console.log(array,'accc',array[0].key);
    //   // this.setState({
    //   //   apply: array,
    //   //   applyKey:array[0].key
    //   // });
    // });
    console.log('mydata', {
      uid: item.uid,
      name,
      description,
      education,
      percentage,
      skills,
    });
    firebase
      .database()
      .ref(del)
      .child(currentUser[0].key)
      .set({
        uid: item.uid,
        name: name,
        description: description,
        education: education,
        percentage: percentage,
        skills: skills,
        userID: currentUser[0].key,
      })
      // .push()
      .then((res) => {
        console.log('PPPPPoPPPPPP', res);
        this.setState({
          uid: this.state.cvData[0].uid,
          name: this.state.name,
          description: this.state.description,
          education: this.state.education,
          percentage: this.state.percentage,
          skills: this.state.skills,
          userID: this.state.userID,
        });
        console.log('Data update.');
        Alert.alert(
          'Alert',
          'Update successfully',
          [{text: 'OK', onPress: () => this.UpdateData()}],
          {cancelable: false},
        );

        // alert('Data update.');
      })
      .catch((error) => {
        console.log('failed: ' + error.message);
      });
  };
  UpdateData = () => {
    console.log('call update');
    const {uid} = this.props.route.params;

    firebase
      .database()
      .ref('company/' + uid + '/jobs')
      .on('value', (snapshot) => {
        let a = [];
        const getValue = snapshot.val();
        // alert("getata")
        // console.log('Jobs Record', {getValue});
        for (let i in getValue) {
          console.log('i', i);
          const z = {...getValue[i], jobKey: i};
          a.push(z);
        }
        
        this.setState({
          list: a,
        });
      });
  };

  render() {
    // console.log(this.state.applyKey, 'applyKey');
    const {list} = this.state;
    console.log('job list from render', list);
    const {
      name,
      description,
      education,
      percentage,
      skills,
      currentUserKey,
      uid,
      currentUser,
      userID
    } = this.state;
    // const {currentUser} = this.state;
    console.log('currentUser from render', currentUser[0]?.key);
    console.log(userID,"{userID}")
    console.log(currentUserKey,"{currentUserKey}")

    // console.log("currentUser from render", this.state.currentUser)
    console.log(
      name,
      description,
      education,
      percentage,
      skills,
      // applyKey,
      uid,
    );
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
                  marginHorizontal: 100,
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {' '}
                Jobs List{' '}
              </Text>
            </View>
          </View>

          {/* <View style={{alignItems:'center',height:50,borderColor:'black',}}>
          
          <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Jobs List </Text>

        </View> */}

          <View style={styles.box}>
            <FlatList
              style={styles.list}
              data={list}
              ListEmptyComponent={() => this.emptyComponent()}
              renderItem={({item, index}) => (
                console.log("flateList", item?.apply && item?.apply[userID]),
                console.log("flateList", {userID}),
                
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
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 3,
                        marginHorizontal: 30,
                        color: 'black',
                        fontSize: 18,
                      }}>
                      {item.description}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 3,
                        marginHorizontal: 30,
                        color: 'black',
                        fontSize: 18,
                      }}>
                      {item.startDate}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 3,
                        marginHorizontal: 30,
                        color: 'black',
                        fontSize: 18,
                      }}>
                      {item.endDate}
                    </Text>
                    <Text
                      style={{
                        marginVertical: 3,
                        marginHorizontal: 30,
                        color: 'black',
                        fontSize: 18,
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
                      onPress={() =>
                        this.CV(
                          index,
                          item,
                          name,
                          description,
                          education,
                          percentage,
                          skills,
                        )
                      }>
                      <Text
                        style={{
                          marginVertical: 3,
                          marginHorizontal: 10,
                          fontWeight: 'bold',
                          color: 'white',
                          fontSize: 20,
                        }}>
                          {
                            item?.apply && item?.apply[userID] != undefined ? "Applied" : "Apply" 
                          }
                        {/* Apply */}
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

export default Apply;
