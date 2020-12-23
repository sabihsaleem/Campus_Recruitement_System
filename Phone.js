import React from 'react';
import {View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export default class Phone extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            confirmResult: null,
            verificationCode: '',
            userId: '',
            // confirm: null,
            // code: '',
        }
    }
    
    // signinWithPhoneNumber(phoneNumber) {
    //     const confirmation = firebase.auth().signInWithPhoneNumber(phoneNumber);
    //     console.log('p',phoneNumber)
    //     this.setState = {
    //         confirmation
            
    //     }
    //     console.log("r")
    //     this.props.navigation.navigate('Dashboard')
    // }

    async confirmCode () {
        try{
            await confirm.confirm(code)
        }catch (error) {
            console.log('Invalid code.')
        }
    }

    validatePhoneNumber = () => {
        var x = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return x.test(this.state.phone)
    }

    handleSendCode = () => {
        if(this.validatePhoneNumber()){
            firebase.auth().signInWithPhoneNumber(this.state.phone)
            .then(confirmResult => {
                this.setState({confirmResult})
            })
            .catch(error => {
                alert(error.message)
                console.log(error)
            })
        }
        else {
            alert('Invalid Phone Number')
        }
    }
    
    componentDidMount(){
        this.setState({
            confirmResult: null,
            verificationCode: ''
        })
    }

    handleVerifyCode = () => {
        const { confirmResult, verificationCode } = this.state
            if (verificationCode.length == 6) {
                confirmResult
                .confirm(verificationCode)
                .then(user => {
                    this.setState({ userId: user.uid })
                    alert(`Verified! ${user.uid}`)
                })
                .catch(error => {
                    alert(error.message)
                    console.log(error)
                })
            } else {
                alert('Please enter a 6 digit OTP code.')
            }
    }
    renderConfirmationCodeView = () => {
        return (
            <View style={styles.verificationView}>
                <TextInput
                style={styles.textInput}
                placeholder='Verification code'
                placeholderTextColor='#eee'
                value={this.state.verificationCode}
                keyboardType='numeric'
                onChangeText={verificationCode => {
                this.setState({ verificationCode })
                }}
                maxLength={6}
                />
                <TouchableOpacity
                style={[styles.themeButton, { marginTop: 20 }]}
                onPress={this.handleVerifyCode}>
                    <Text style={styles.themeButtonTitle}>Verify Code</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // render() {
    //     if (!this.state.confirm) {
    //         return (
    //             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    //                 <Button
    //                 title="Phone Number Sign In"
    //                 onPress={() => this.signinWithPhoneNumber('7123843798')}
    //             />
    //             </View>
    //         );
    //     }
            
    //     return (
    //         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    //             <TextInput value={code} onChangeText={text => this.setState(text)} />
    //             <Button title="Confirm Code" onPress={() => this.confirmCode()} />
    //         </View>
    //     );
    // }

    render() {
        return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#333' }]}>
            <View style={styles.page}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Phone Number with country code'
                    placeholderTextColor='#eee'
                    keyboardType='phone-pad'
                    value={this.state.phone}
                    onChangeText={phone => {
                    this.setState({ phone })
                    }}
                maxLength={15}
                editable={this.state.confirmResult ? false : true}
                />
            
                <TouchableOpacity
                    style={[styles.themeButton, { marginTop: 20 }]}
                    onPress={
                    this.state.confirmResult
                    ? this.changePhoneNumber
                    : this.handleSendCode
                    }>
                    <Text style={styles.themeButtonTitle}>
                    {this.state.confirmResult ? 'Change Phone Number' : 'Send Code'}
                    </Text>
                </TouchableOpacity>
            
                {this.state.confirmResult ? this.renderConfirmationCodeView() : null}
            </View>
        </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#aaa'
    },
    page: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textInput: {
      marginTop: 20,
      width: '90%',
      height: 40,
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 10,
      color: '#fff',
      fontSize: 16
    },
    themeButton: {
      width: '90%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#888',
      borderColor: '#555',
      borderWidth: 2,
      borderRadius: 5
    },
    themeButtonTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff'
    },
    verificationView: {
      width: '100%',
      alignItems: 'center',
      marginTop: 50
    }
  })