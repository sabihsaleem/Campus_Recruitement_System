import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground,FlatList,StyleSheet,ScrollView,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import { SearchBar } from 'react-native-elements';

export default class AdminComp extends React.Component {

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
    studentList:[],
    companyList:[],
    search: '',
    arrayHolder: [],
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

    firebase.database().ref('company').on('value', (snapshot) => {
      console.log("snapshot.val()", snapshot.val())
      const getValue = snapshot.val()
      let array = [];
      for (let key in getValue) {
      console.log("key", key)
      const value =  { ...getValue[key], key}
        array.push(
          value
        );
      }

      this.setState({
        list: array,
        dataSource: array,
        arrayHolder: array,
      });
    });
  }

  delete(i){
    // this.state.list[i];
    let deleted = this.state.list[i].key
    console.log("listname", deleted)
    firebase.database().ref('/company/'+deleted).remove()
  }

render() {
  console.log(this.state.list,"a")
    return (
      <View
      style={{flex: 1,resizeMode: 'cover',width: '100%',height: '100%',backgroundColor:'#f98b34'}}>
        
      <ScrollView>

        <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>
          
          <View style={{flexDirection: 'row',alignItems:'center',marginHorizontal:10,}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack();
              // this.props.navigation.navigate('Login');
            }}>
              <Image style={{marginVertical:5, width:40, height:40,}}
                source={require('./back-button-icon-png-25.jpg')} />   
            </TouchableOpacity>
            <View style={{alignItems:'center',height:50,marginHorizontal:70}}>
          
              <Text style={{marginVertical: 10,fontSize:20,fontWeight: 'bold'}}> Company's Record </Text>

            </View>
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

        {/* <View style={{alignItems:'center',height:50,borderColor:'black'}}>
          
          <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Company's Record </Text>

        </View> */}


            <View style={styles.box}>
            
              <FlatList
                style={styles.list}
                // data={ isStudnet === true ?this.state.studentList : this.state.companyList}
                data={ this.state.list}
                renderItem={({item, index}) =>
                    <View style={{
                      borderRadius:15,
                      marginVertical:10,
                      borderWidth:2,
                      width:"95%",
                      alignSelf:'center',
                      backgroundColor:'#e06100',
                      borderColor: '#67bae3',
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
                          <TouchableOpacity
                              style={{
                                backgroundColor: this.state.selectedIndex === true? "red" : '#f39c12',
                                borderRadius: 10,
                                marginVertical:5,
                                marginHorizontal:10,
                                alignItems:'center',
                                width:350,
                                height:40,
                                justifyContent:'center',
                                borderWidth:2,
                                borderColor:'white'
                              }}
                              onPress={() => this.delete(index)}
                          >
                              <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white',fontSize:20}}>
                                  Delete
                              </Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                }
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


