import React from 'react';
import { View,Text,TouchableOpacity,ImageBackground,FlatList,StyleSheet,ScrollView,Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';

class Apply extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    list: [],
    selectedIndex: null,
    jobIDs: [],
    }

  }
  
  componentDidMount() {
    console.log("propsCV",this.props)
    console.log("data",this.props.route.params.item.jobs)
    const c = this.props.route.params.item.jobs
    let a = []
    for(let i in c ){
        console.log("i",i)
        const z={...c[i]}
            a.push(
                z,
            )
    }
    console.log("5",a)
    let aa = []
    for(let j in c ){
        console.log("8",j)
        const zz={...c[j],j}
            aa.push(
                zz.j
            )
    }
    console.log("56",aa)
    this.setState({
        list: a,
        jobIDs:aa,
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

  CV(index,item,a){
    console.log("props",this.props)
    this.setState ({
      selectedIndex: index+1
    });
      this.props.navigation.navigate('CV',
      {
        item,
        jobId: a
      })
      console.log('s',item)
      console.log('s21',a)
  }

  signOut(){
    auth()
    .signOut()
    .then(() => {
        console.log('User signed out!')
        this.props.navigation.navigate('Home')
    });
  }

render() {
  console.log(this.state.list,"a")
  console.log(this.state.jobIDs,"Jobs IDS")
    return (
      <View
      style={{flex: 1,resizeMode: 'cover',width: '100%',height: '100%',backgroundColor:'#f98b34'}}>
        
      <ScrollView>
        
        <View style={{alignItems:'stretch',height:50,borderColor:'black',borderWidth:1}}>
            
            <View style={{flexDirection: 'row',alignItems:'center'}}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.goBack();
                    // this.props.navigation.navigate('Login');
                }}>
                    <Image style={{marginVertical:5, width:40, height:40,marginHorizontal:10}}
                            source={require('./back-button-icon-png-25.jpg')} />   
                </TouchableOpacity>
                <Text style={{marginHorizontal:100,fontSize:20,fontWeight: 'bold'}}> Jobs List </Text>

            </View>

        </View>

        {/* <View style={{alignItems:'center',height:50,borderColor:'black',}}>
          
          <Text style={{marginVertical: 7,fontSize:20,fontWeight: 'bold'}}> Jobs List </Text>

        </View> */}

            <View style={styles.box}>
              <FlatList
                style={styles.list}
                data={this.state.list}
                renderItem={({item, index,a}) =>
                    <View style={{
                      borderRadius:15,
                      marginVertical:5,
                      borderWidth:2,
                      width:"95%",
                      alignSelf:'center',
                      backgroundColor:'#e06100',
                      borderColor: '#67bae3',
                    }}>
                        <View style={{marginVertical:5,justifyContent:'space-between'}}>
                          <Text style={{marginVertical:3,marginHorizontal:30,color:'black',fontSize:18}}>{item.name}</Text>
                          <Text style={{marginVertical:3,marginHorizontal:30,color:'black',fontSize:18}}>{item.description}</Text>
                          <Text style={{marginVertical:3,marginHorizontal:30,color:'black',fontSize:18}}>{item.startDate}</Text>
                          <Text style={{marginVertical:3,marginHorizontal:30,color:'black',fontSize:18}}>{item.endDate}</Text>
                          <Text style={{marginVertical:3,marginHorizontal:30,color:'black',fontSize:18}}>{item.skills}</Text>
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
                                borderColor:'black',
                                borderWidth:2,
                              }}
                              onPress={() => this.CV(item.index,item,this.state.jobIDs[index])}
                          >
                              <Text style={{marginVertical:3,marginHorizontal:10,fontWeight:'bold',color:'white',fontSize:20}}>
                                  Apply
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


export default Apply;