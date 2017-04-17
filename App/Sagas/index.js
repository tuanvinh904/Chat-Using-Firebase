import { takeLatest } from 'redux-saga'
import { put } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux';

/* ------------- Sagas ------------- */
import { chanelFirebase } from './FirebaseSaga';

/* ------------- Actions ------------- */
import StartupActions from '../Redux/StartupRedux'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.







const api = API.create()


const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyBTjFDedPJzUHpuL9OVI9Pm6ILB1qlLPcc",
  authDomain: "chatreactexample.firebaseapp.com",
  databaseURL: "https://chatreactexample.firebaseio.com",
  storageBucket: "gs://chatreactexample.appspot.com/",
};
const firebaseAPI = firebase.initializeApp(firebaseConfig);

//https://firebase.google.com/docs/database/web/offline-capabilities
//onDisconnect



const setFirebase = function* (firebaseObject) {
  yield put(StartupActions.setFirebase(firebaseObject))
}

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [
    takeLatest(StartupTypes.STARTUP, setFirebase, firebaseAPI),
    takeLatest(StartupTypes.CALL_START_CHANNEL, chanelFirebase),
  ]
}
