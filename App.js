// import { GoogleSignin } from '@react-native-community/google-signin';
// import React from 'react';
// import { Button } from 'react-native'
// import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   webClientId: '111760240138-vsoqsun5nob7tq52jdi10ot03dqujl9j.apps.googleusercontent.com',
// });

// async function onGoogleButtonPress() {
//   // Get the users ID token
//   const { idToken } = await GoogleSignin.signIn();

//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);
// }

// export default function GoogleSignIn() {
//   return (
//     <Button
//       title="Google Sign-In"
//       onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
//     />
//   );
// }
// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {firebase} from '@react-native-firebase/database';

// let config = {
//   appId: '1:111760240138:android:13547208e8d9c0411bf9f3',
//   apiKey: 'AIzaSyB4xFdiMM3KXdIR3dQpOVLyew1ayoeDfJU',
//   authDomain: '111760240138-et4krv9mktf5arv4gem04cb9vn4ftd9a.apps.googleusercontent.com',
//   databaseURL: 'https://campusrecruitementsystem-e95c7.firebaseio.com/',
//   projectId: 'campusrecruitementsystem-e95c7',
//   storageBucket: 'campusrecruitementsystem-e95c7.appspot.com',
//   messagingSenderId: '',
// };
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(config);
// }

// export default function PhoneSignIn() {
//   // If null, no SMS has been sent
//   const [confirm, setConfirm] = useState(null);

//   const [code, setCode] = useState('');

//   // Handle the button press
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     console.log("s",confirmation)
//     setConfirm(confirmation);
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//     } catch (error) {
//       console.log('Invalid code.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <Button
//         title="Phone Number Sign In"
//         onPress={() => signInWithPhoneNumber('+92 334-262-8901')}
//       />
//     );
//   }
//   console.log('jj')

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
// }
import {firebase} from '@react-native-firebase/database';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Nav';

let config = {
  appId: '1:111760240138:android:13547208e8d9c0411bf9f3',
  apiKey: 'AIzaSyB4xFdiMM3KXdIR3dQpOVLyew1ayoeDfJU',
  authDomain: '111760240138-et4krv9mktf5arv4gem04cb9vn4ftd9a.apps.googleusercontent.com',
  databaseURL: 'https://campusrecruitementsystem-e95c7.firebaseio.com/',
  projectId: 'campusrecruitementsystem-e95c7',
  storageBucket: 'campusrecruitementsystem-e95c7.appspot.com',
  messagingSenderId: '',
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(config);
}

class App extends React.Component {
  constructor(){
    super()
  }
  


  render() {
    return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    );
  }
}


export default App;