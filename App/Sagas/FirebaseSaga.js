import { call, select, put, take, fork, cancelled, actionChannel } from 'redux-saga/effects'

import { eventChannel, END } from 'redux-saga'
import StartupActions from '../Redux/StartupRedux'
import FriendActions from '../Redux/FriendRedux'
import MessagerActions from '../Redux/MessagerRedux'
import { StartupTypes } from '../Redux/StartupRedux'

function createFirebaseChange(firebaseAPI, uid) {
  const userInfoRef = firebaseAPI.database().ref('user_info');
  const userReceiveRef = firebaseAPI.database().ref('users/' + uid + '/receive');
  return eventChannel(emit => {
    //---------------------function return actions---------------------
    // const logOutHandler = (childRef) => {
    //   if (childRef.val() === 'logout') emit(END)
    // }
    const userInfoChangedHandler = (childRef) => {
      emit({ type: 'CHANNEL_CHANGE_STATUS', data: childRef.val(), parent: null })
    }
    const userReceiveMessagerdHandler = (childRef) => {
      let ref = childRef.ref;
      emit({ type: 'CHANNEL_RECEIVE_MESSAGER', data: childRef.val(), key: ref.key })
    }

    //---------------------function register event---------------------
    userInfoRef.on('child_changed', userInfoChangedHandler)
    userReceiveRef.on('child_added', userReceiveMessagerdHandler)
    userReceiveRef.on('child_changed', userReceiveMessagerdHandler)

    //---------------------function unsupcribe event-------------------
    const unsubscribe = () => {
      userInfoRef.off('child_changed', userInfoChangedHandler)
      userReceiveRef.off('child_added', userReceiveMessagerdHandler)
      userReceiveRef.off('child_changed', userReceiveMessagerdHandler)
    }
    return unsubscribe
  })
}

export function* chanelFirebase(action) {
  yield put(StartupActions.setChannelReady(true))
  while (true) { //while change user
    const { user_info } = yield take(StartupTypes.SET_USER_INFO)
    const firebaseObject = yield select((state) => state.startup.firebaseObject)
    firebaseObject.database().ref('user_info/' + user_info.uid).set({
      uid: user_info.uid,
      displayName: user_info.displayName,
      email: user_info.email,
      photoURL: user_info.photoURL,
      status: 'online'
    }).then(() => {
      console.log('reSet profile user success')
    }).catch((err) => {
      console.log('reSet profile user error: ', err)
    })

    const listFriend = yield call(getListFriendAndStatus, firebaseObject, user_info.uid)
    if (listFriend.hasOwnProperty(user_info.uid)) delete listFriend[user_info.uid];

    
    yield put(FriendActions.setListFriend(listFriend))



    const firebaseChannel = yield call(createFirebaseChange, firebaseObject, user_info.uid)

    try {
      while (true) {
        const payload = yield take(firebaseChannel)
        const { type, data, key } = payload
        switch (type) {
          case 'CHANNEL_CHANGE_STATUS':
            yield put(FriendActions.changeStatusOnline(data))
            break
          case 'CHANNEL_RECEIVE_MESSAGER':
            yield put(MessagerActions.setNewMessager(data, key))
            break
          default:
            console.log('gau gau')
        }
      }
    }
    finally {
      if (yield cancelled()) firebaseChannel.close()
      firebaseObject.database().ref('users/' + uid + '/is_online').set('offline')
      console.log('Logout and end channel')
    }
  }
}

function* getListFriendAndStatus(firebaseObject, uid) {
  return yield firebaseObject.database().ref('user_info').once('value').then((snap) => {
    return snap.val()
  }).catch((err) => {
    console.log('get list friend error: ', err)
    return 'error'
  })
}

/*
function* getReceiveSmsAndDeleteNode(firebaseObject, uid) {
  const ref = firebaseObject.database().ref('users/' + uid + '/receive')
  return yield ref.orderByKey().once('value').then((snap) => {
    const returnData = snap.val()
    // return ref.remove()
    //   .then(function () {
    //     return returnData
    //   })
    //   .catch(function (error) {
    //     console.log("Remove failed: " + error.message)
    //     return null
    //   });
    return returnData
  }).catch((err) => {
    console.log('get messager of friend error: ', err)
    return null
  })
}
*/