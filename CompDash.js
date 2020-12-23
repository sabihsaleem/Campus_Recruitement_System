import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground,FlatList,StyleSheet,ScrollView,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import { SearchBar } from 'react-native-elements';

class CompDash extends React.Component {

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
    selectedIndex: null,
    search: '',
    arrayHolder: [],
    }
    console.log("567",this.props)
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
    console.log("user",user)
    // user.getIdToken().then((token)=>{
    //   console.log("token",token)
    // })
    firebase.database().ref("company").on('value', (snapshot) => {
      // console.log("snapshot.val()", snapshot.val())
      const getValue = snapshot.val()
      let array = [];
      for (let key in getValue) {
      // console.log("key", key)
      const value =  { ...getValue[key], key}
        array.push(
          value
        );
      }
      // console.log(array,'accc');

      this.setState({
        list: array,
        dataSource: array,
        arrayHolder: array,
      });
    });
  }

  // CV(index,item){
  //   console.log("props",this.props)
  //   this.setState ({
  //     selectedIndex: index+1
  //   });
  //     this.props.navigation.navigate('CV',
  //     {
  //       item
  //     })
  //     console.log('s',item)
  // }

  apply(index,item){
    console.log("props",this.props)
    this.setState ({
      selectedIndex: index+1
    });
      this.props.navigation.navigate('Apply',
      {
        item
      })
      console.log('sa',item)
  }

  signOut(){
    auth()
    .signOut()
    .then(() => {
        console.log('User signed out!')
        this.props.navigation.navigate('Home')
    });
  }

  Create(){
    this.props.navigation.navigate('Jobs')
  }

render() {
  // console.log(this.state.list,"a")
    return (
      <View
      style={{flex: 1,resizeMode: 'cover',width: '100%',height: '100%',backgroundColor:'#f98b34'}}>
        
      <ScrollView>
        
        <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>
          
          <View style={{flexDirection: 'row',alignItems:'center',marginHorizontal:10}}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.goBack();
                // this.props.navigation.navigate('Home');
            }}>
                <Image style={{marginVertical:5, width:40, height:40,marginHorizontal:10}}
                        source={require('./back-button-icon-png-25.jpg')} />   
            </TouchableOpacity>
            <Text style={{fontWeight:'bold',fontSize:20,marginHorizontal:50}}>Company's Record</Text>
          </View>

        </View>


        {/* <View style={{flexDirection:'row'}}> */}

          {/* <View style={{flexDirection: 'row',marginHorizontal:10,marginVertical:5}}>
            <TouchableOpacity
              style={{backgroundColor: '#f39c12',borderRadius: 10,width:390,height:60,alignSelf:'center',borderWidth:2,borderColor:'#e06100'}}
              onPress={() => this.Create()}
            >
              <Text style={{fontWeight:'bold',color:'white',marginHorizontal:12,marginVertical:18}}>Create Your Cv</Text>
            </TouchableOpacity>
          </View> */}

          {/* <View style={{width:260,marginVertical:10}}>
              <SearchBar
                round
                searchIcon={{size: 25}}
                onChangeText={(text) => this.SearchFilterFunction(text)}
                onClear={(text) => this.SearchFilterFunction('')}
                placeholder="Type Here to Search..."
                value={this.state.search}
              />
          </View> */}

        {/* </View> */}


        {/* <View style={{alignItems:'center',height:50,borderColor:'black',borderWidth:1}}>
          
          <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Company's Record </Text>

        </View> */}

            <View style={styles.box}>
              <FlatList
                style={styles.list}
                data={this.state.list}
                renderItem={({item, index}) =>
                    <View style={{
                      borderRadius:15,
                      marginVertical:10,
                      borderWidth:2,
                      width:"95%",
                      alignSelf:'center',
                      backgroundColor:'#e06100',
                      borderColor:'#67bae3'
                    }}>
                        <View style={{marginVertical:5}}>
                          
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
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
                        
                        <View style={{flexDirection: 'row',alignItems:'center',marginHorizontal:10,marginVertical:5}}>
                          {/* <TouchableOpacity
                              style={{backgroundColor: this.state.selectedIndex === true? "red" : 'black',borderRadius: 60,marginVertical:5,marginHorizontal:20,borderWidth:1,width:80,height:30}}
                              onPress={() => this.CV(item.index,item)}
                          >
                              <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white'}}>
                                  Apply
                              </Text>
                          </TouchableOpacity> */}
                          <TouchableOpacity
                              style={{
                                backgroundColor: this.state.selectedIndex === true? "red" : '#f39c12',
                                borderRadius: 10,
                                marginVertical:5,
                                marginHorizontal:10,
                                alignItems:'center',
                                width:350,
                                height:40,
                                justifyContent:'center'
                              }}
                              onPress={() => this.apply(item.index,item)}
                          >
                              <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white',fontSize:20}}>
                                  Jobs
                              </Text>
                          </TouchableOpacity>
                        </View>

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


export default CompDash;