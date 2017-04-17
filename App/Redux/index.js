import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    startup: require('./StartupRedux').reducer,
    friend: require('./FriendRedux').reducer,
    messager: require('./MessagerRedux').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}







// const firebase = require("firebase");
// const firebaseConfig = {
//   apiKey: "AIzaSyBTjFDedPJzUHpuL9OVI9Pm6ILB1qlLPcc",
//   authDomain: "chatreactexample.firebaseapp.com",
//   databaseURL: "https://chatreactexample.firebaseio.com",
//   storageBucket: "",
// };
// firebase.initializeApp(firebaseConfig);

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     console.log('user user', user.uid)
//   } else {
//     console.log('disabled disabled disabled disabled')
//   }
// });

// setTimeout(function () {
//   firebase.auth().signOut()
//     .then(() => console.log('Logout success'))
//     .catch((error) => console.log('Log out error', error));
// }, 5000);


// Create a reference with .ref() instead of new Firebase(url)
//const rootRef = firebase.database().ref('/');
//LoginManager.logOut()
// rootRef.once('value', snap => {
//   const invite = snap.val();
//   console.log(invite)
// }).catch((error) => {
//   console.log(error);
// });

// setTimeout(function () {
//   rootRef.push({ testpush: 'valuepus4444444' })
// }, 8000);


// console.log(rootRef.child('users/user22/messager/user1').orderByChild("height")+'ln')

// rootRef.child('users/user22/messager/user1').limitToLast(3).once('value', snap => {
//   console.log(snap.numChildren())
//   console.log(snap.val())
// }).catch((error) => {
//   console.log(error);
// });


// rootRef.child('users/user22/messager/user1').on('child_changed', (snap) => {
//   console.log('event actives', snap.val(), snap.key)
// });

// const { AccessToken, LoginManager, GraphRequest, GraphRequestManager } = require('react-native-fbsdk');


// AccessToken.getCurrentAccessToken().then(
//   (data) => {
//     //console.log('datata',data)
//     //alert(data.accessToken.toString())
//     const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
//     // firebase.auth()
//     //   .signInWithCredential(credential)
//     //   .then(() => console.log('Account accepted'))
//     //   .catch((error) => console.log('Account disabled', error));

//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//          console.log('user user',user.uid)
//       } else {
//         console.log('disabled disabled disabled disabled')
//       }
//     });
//   },
//   (err) => {
//     console.log('error viiiiii')
//   }
// )


              // const infoRequest = new GraphRequest('/me', {
              //   accessToken: data.accessToken,
              //   parameters: {
              //     fields: {
              //       string: 'email,name,first_name,middle_name,last_name'
              //     }
              //   }
              // },
              //   (error, result) => {
              //     if (error) {
              //       console.log(error)
              //       alert('Error fetching data: ' + error.toString());
              //     } else {
              //       console.log(result)
              //       alert('Success fetching data: ' + result.toString());
              //     }
              //   }
              // );
              // new GraphRequestManager().addRequest(infoRequest).start();





