import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  setFirebase: ['firebaseObject'],
  callStartChannel: null,
  setChannelReady: ['isChannelReady'],
  setUserInfo: ['user_info'],
})

export const StartupTypes = Types
export default Creators

/* ================== Initial State ================== */
export const INITIAL_STATE = Immutable({
  isPersistReady: false,
  firebaseObject: null,
  isChannelReady: false,
  user_info: null,
})

/* ================== Reducers ================== */
export const complete = (state, action) => {
  return { ...state, isPersistReady: true }
}
export const setFire = (state, action) => {
  const { firebaseObject } = action
  return { ...state, firebaseObject }
}
export const setReady = (state, action) => {
  const { isChannelReady } = action
  return { ...state, isChannelReady }
}
export const setUser = (state, action) => {
  const { user_info } = action
  return { ...state, user_info }
}

/* ================== Hookup Reducers To Types ================== */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: complete,
  [Types.SET_FIREBASE]: setFire,
  [Types.SET_CHANNEL_READY]: setReady,
  [Types.SET_USER_INFO]: setUser,
})


// Config/ReduxPersist.js
// active: true,
// return actions STARTUP
// if (active===fasle)  call startup screen
// maybe open 'Modal' screen

