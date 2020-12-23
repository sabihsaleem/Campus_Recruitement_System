import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground,FlatList,StyleSheet,ScrollView,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import { SearchBar } from 'react-native-elements';

class a extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        jobKey:[],
        uid:[],
    }
  }
 
  componentDidMount() {
    console.log("this.props",this.props)
    const user = auth().currentUser
    console.log('user',user)
    firebase.database().ref("company").on('value', (snapshot) => {
        //   console.log("snapshot.val()", snapshot.val())
          const getValue = snapshot.val()
          console.log("getCompany", getValue)
          let array = [];
          for (let key in getValue) {
          console.log("companyKey", key)
          const value =  { ...getValue[key], key}
            array.push(
              value
            );
          }
          console.log(array,'companyList');
          const currentUser =  array.filter(el => el.email.toLowerCase() === user.email.toLowerCase())   
          console.log(currentUser,"CCCC")
          console.log("currentUser",user.email)

          const cu = []
          cu.push(currentUser)
          console.log("cu",currentUser[0].email)
          console.log("name",currentUser[0].name)
          console.log("uid",currentUser[0].key)

          let c = currentUser[0].jobs
          let array1 = [];
          for (let key in c) {
          console.log("currentUser[0].jobs", key)
          const value =  { ...c[key], key}
            array1.push(
              key
            );
          }
          console.log(array1[0],'currentUser[0].jobkey');

          this.setState({
            jobKey:array1[0],
            uid:currentUser[0].key
          });
        });

  }

render() {
    console.log("companykey",this.state.uid)
    console.log("jobkey",this.state.jobKey)
    return (
   
        <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>

         <Text>sdsdsdsdsdsdsds</Text>
          
        </View>
    //     <ImageBackground
    //   source={require('./abstract_blue_background_vector_graphic_6_148045.jpg')}
    //   style={{flex: 1,resizeMode: 'cover',width: '100%',height: '100%'}}>
        
    //   <ScrollView>

    //     <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>
          
    //       <View style={{flexDirection: 'row',alignItems:'center',marginHorizontal:10,marginVertical:5}}>
    //         <Text style={{fontWeight:'bold',fontSize:20}}>Welcome</Text>
    //         <TouchableOpacity
    //             style={{backgroundColor: 'black',borderRadius: 60,marginVertical:5,marginHorizontal:220,borderWidth:1,width:80,height:30}}
    //             onPress={() => this.signOut()}
    //         >
    //             <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white'}}>
    //                 Sign out
    //             </Text>
    //         </TouchableOpacity>
    //       </View>

    //     </View>
        
    //     <View style={{marginVertical:10}}>
    //         <SearchBar
    //           round
    //           searchIcon={{size: 25}}
    //           onChangeText={(text) => this.SearchFilterFunction(text)}
    //           onClear={(text) => this.SearchFilterFunction('')}
    //           placeholder="Type Here to Search..."
    //           value={this.state.search}
    //         />
    //     </View>

    //     <View style={{alignItems:'center',height:50,borderColor:'black',borderWidth:1}}>
          
    //       <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Student's Record </Text>

    //     </View>

    //     <View style={{flexDirection: 'row',marginHorizontal:20,marginVertical:5}}>
    //       <TouchableOpacity
    //         style={{backgroundColor: 'black',borderRadius: 60,width:150,height:20,marginVertical:5}}
    //         onPress={() => this.CompDash()}
    //       >
    //         <Text style={{fontWeight:'bold',color:'white',marginHorizontal:7}}>Company's Records</Text>
    //       </TouchableOpacity>
    //     </View>


    //         <View style={styles.box}>
            
    //           <FlatList
    //             style={styles.list}
    //             // data={ isStudnet === true ?this.state.studentList : this.state.companyList}
    //             data={ this.state.list}
    //             renderItem={({item, index}) =>
    //                 <View style={{marginVertical:5}}>
    //                     <View style={{alignSelf:'center',backgroundColor:'black',borderRadius:30}}>
    //                       <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white',fontSize:22,borderWidth:1}}>
    //                       {item.name}
    //                       </Text>
    //                     </View>
    //                     <View style={{flexDirection:'row',marginVertical:5}}>
    //                       <Text style={{marginVertical:3,marginHorizontal:15,color:'black',fontSize:18,fontWeight:'bold'}}>Email:</Text>
    //                       <Text style={{marginVertical:3,paddingHorizontal:52,color:'black',fontSize:18}}>{item.email}</Text>
    //                     </View>
    //                     <View style={{flexDirection:'row',marginVertical:5}}>
    //                       <Text style={{marginVertical:3,marginHorizontal:15,color:'black',fontSize:18,fontWeight:'bold'}}>Address:</Text>
    //                       <Text style={{marginVertical:3,paddingHorizontal:30,color:'black',fontSize:18}}>{item.address}</Text>
    //                     </View>
    //                     <View style={{flexDirection:'row',marginVertical:5}}>
    //                       <Text style={{marginVertical:3,marginHorizontal:15,color:'black',fontSize:18,fontWeight:'bold'}}>Contact No:</Text>
    //                       <Text style={{marginVertical:3,paddingHorizontal:3,color:'black',fontSize:18}}>{item.contactNo}</Text>
    //                     </View>
    //                   <View style={{flexDirection: 'row',alignItems:'center',marginHorizontal:10,marginVertical:5}}>
    //                       <TouchableOpacity
    //                           style={{backgroundColor: this.state.selectedIndex === true? "red" : 'black',borderRadius: 60,marginVertical:5,marginHorizontal:20,borderWidth:1,width:80,height:30}}
    //                           onPress={() => this.delete(index)}
    //                       >
    //                           <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white'}}>
    //                               Delete
    //                           </Text>
    //                       </TouchableOpacity>
    //                   </View>
    //                 </View>
    //             }
    //           />
    //         </View>

    //   </ScrollView>



    //   </ImageBackground>
      
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


export default a;