import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground,FlatList,StyleSheet,ScrollView,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import { SearchBar } from 'react-native-elements';

class Dashboard extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    phone: '',
    email: '',
    contactNo: '',
    name: '',
    password: '',
    address: '',
    isAdmin: '',
    currentUser:[],
    list: [],
    dataSource:[],
    selectedIndex: null,
    search: '',
    arrayHolder: [],
    companyKeys:[],
    companyID:[],
    companyList:[],
    compList:[],
    }
  }
  
  search = (text) => {
    console.log(text);
  };
  
  clear = () => {
    this.search.clear();
  };
  
  SearchFilterFunction(text) {
    console.log('text:',text)
    const newData = this.state.arrayHolder.filter( (item) => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log('newData:',newData)
    this.setState({list: newData, search: text});
  }

  componentDidMount() {
    const user = auth().currentUser

    firebase.database().ref("student").on('value', (snapshot) => {
      // console.log("snapshot.val()", snapshot.val())
      const getValue = snapshot.val()
      // console.log("getValue", getValue)
      let array = [];
      for (let key in getValue) {
      // console.log("key", key)
      const value =  { ...getValue[key], key}
        array.push(
          value
        );
      }
      // console.log(array,'accc');
      // const currentUser =  array.find(el => el.email === user.email )
      // console.log({currentUser})
      // const cu = []
      // cu.push(currentUser)
      const list = array.filter(el=> el.isAdmin === false)
      console.log("000000000",list)
      this.setState({
        // phone:currentUser.contactNo,
        // currentUser:cu,
        list,
        dataSource: array,
        arrayHolder: array,
      });
    });

    firebase.database().ref("company").on('value', (snapshot) => {
      console.log("23snapshot.val()", snapshot.val())
      const getValue = snapshot.val()
      // console.log("getValue", getValue)
      let array = [];
      for (let key in getValue) {
      // console.log("key", key)
      const value =  { ...getValue[key], key}
        array.push(
          value
        );
      }
      console.log(array,'23accc');
      let array1 = [];
      for (let key in getValue) {
        // console.log("key", key)
        const value =  { ...getValue[key], key}
          array1.push(
            key
          );
        }
        console.log(array1,'23key');
      this.setState({
        companyKeys:array1,
        companyList:array,
      });
    });

  }

  signOut(){
    auth()
    .signOut()
    .then(() => {
        console.log('User signed out!')
        this.props.navigation.navigate('Home')
    });
  }

  // details(index,item,a,c){
  //   console.log("propssa",this.props)
  //   this.setState ({
  //     selectedIndex: index+1
  //   });
  //   this.props.navigation.navigate('a',
  //   {
  //     item,
  //     companyID:a,
  //     compList:c,
  //   })
  //   console.log('ss',item)
  //   console.log('ss432',a)
  //   console.log('ss432sad',c)
  // }

render() {
  console.log(this.state.companyKeys,"a")
  // console.log(this.state.arrayHolder,"arrayHolder")
  // const { search } = this.state;
    return (
      <View
      style={{flex: 1,resizeMode: 'cover',width: '100%',height: '100%',backgroundColor:'#f98b34'}}>
        
      <ScrollView>

        <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>

          <View style={{flexDirection: 'row',alignItems:'center',}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack();
              // this.props.navigation.navigate('Login');
            }}>
              <Image style={{marginVertical:5, width:40, height:40,}}
                source={require('./back-button-icon-png-25.jpg')} />   
            </TouchableOpacity>
            <Text style={{fontWeight:'bold',fontSize:20,marginHorizontal:70,marginVertical:5}}>Student's Record</Text>
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
<View style={{marginVertical:5}}/>

            <View style={styles.box}>
              <FlatList
                style={styles.list}
                data={this.state.list}
                renderItem={({item, index}) =>
                    <View style={{
                      borderRadius:15,
                      marginVertical:5,
                      borderWidth:2,
                      width:"95%",
                      alignSelf:'center',
                      backgroundColor:'#e06100',
                      borderColor: '#67bae3',
                    }}>
                        <View style={{marginVertical:5}}>
                          
                          <View style={{flexDirection:'row',justifyContent:'space-between',}}>
                            <View>
                              <Text style={{paddingHorizontal:20,color:'black',fontSize:20,fontWeight:'bold'}}>{item.name}</Text>
                              <Text style={{paddingHorizontal:20,color:'black',fontSize:16}}>{item.email}</Text>
                            </View>
                            
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                              <Text style={{paddingHorizontal:10,color:'black',fontSize:16}}>{item.contactNo}</Text>
                            </View>
                          </View>

                          <Text style={{paddingHorizontal:20,color:'black',fontSize:16}}>{item.address}</Text>
                          
                        </View>
                        {/* <View style={{flexDirection: 'row',alignItems:'center',marginHorizontal:10,marginVertical:5}}>
                          <TouchableOpacity
                              style={{backgroundColor: this.state.selectedIndex === true? "red" : '#f39c12',borderRadius: 10,marginVertical:5,marginHorizontal:20,alignItems:'center',width:80,height:30,justifyContent:'center'}}
                              onPress={() => this.details(item.index,item,this.state.companyKeys[index],this.state.companyList[index])}
                          >
                              <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white'}}>
                                  Read More...
                              </Text>
                          </TouchableOpacity>
                        </View> */}
                    </View>
                }
                keyExtractor={(item,index) => `${index}` }
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


export default Dashboard;