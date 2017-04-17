import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ================== Types and Action Creators ================== */
const { Types, Creators } = createActions({
  setNewMessager: ['newMessager', 'friendid'],
  setListMessager: ['messager', 'friendid'],
  updateMessager: ['messagerid', 'friendid', 'content']
})

export const MessagerTypes = Types
export default Creators


/* ================== Initial State ================== */
export const INITIAL_STATE = Immutable({
  recentlyMessager: null,
  newMessager: null,
  listMessager: null,
})

/* ================== Reducers ================== */
export const setNew = (state, action) => {
  const { listMessager } = state
  const { newMessager, friendid } = action

  var temp_newMessager = null

  if (newMessager === null)
    temp_newMessager = { [friendid]: newMessager }
  else {
    temp_newMessager = Immutable.asMutable(newMessager)
    temp_newMessager[friendid] = newMessager
  }

  var temp_listMessager = {}
  if(listMessager===null){
    temp_listMessager[friendid] = { [newMessager.time]: newMessager.content }
    temp_listMessager[friendid].firstKey = newMessager.time
  }
  else {
    if(listMessager.hasOwnProperty(friendid)){
      temp_listMessager = Immutable.asMutable(listMessager)
      temp_listMessager[friendid][newMessager.time] = newMessager.content
    }
    else {
      temp_listMessager = Immutable.asMutable(listMessager)
      temp_listMessager[friendid] = { [newMessager.time]: newMessager.content }
      temp_listMessager[friendid].firstKey = newMessager.time
    }
  }
  return { ...state, recentlyMessager: friendid, newMessager: temp_newMessager, listMessager: temp_listMessager }
}

export const setMess = (state, action) => {
  const { listMessager } = state
  const { messager, friendid } = action

  var arrKey = Object.keys(messager)
  var temp_listMessager = {}
  if (listMessager === null) {
    temp_listMessager[friendid] = Immutable.asMutable(messager)
  }
  else {
    temp_listMessager = Immutable.asMutable(listMessager)
    if (!temp_listMessager.hasOwnProperty(friendid))
      temp_listMessager[friendid] = {}
    arrKey.forEach((key, index) => {
      temp_listMessager[friendid][key] = messager[key]
    })
  }
  temp_listMessager[friendid].firstKey = arrKey[0]

  var sortdata = temp_listMessager[friendid]
  delete temp_listMessager[friendid]
  var afterSort_listMessager = {}
  var listKeys = Object.keys(sortdata)
  listKeys.sort();
  listKeys.forEach((key, index) => {
    afterSort_listMessager[key] = sortdata[key]
  })
  temp_listMessager[friendid] = afterSort_listMessager
  
  return { ...state, listMessager: temp_listMessager }
}

export const updateMess = (state, action) => {
  const { listMessager } = state
  const { messagerid, friendid, content } = action
  if (
    listMessager !== null &&
    listMessager.hasOwnProperty(friendid) &&
    listMessager[friendid].hasOwnProperty(messagerid)
  ) {
    var temp_listMessager = Immutable.asMutable(listMessager)
    // if (listMessager[friendid][messagerid].type === 'image') {
    //   temp_listMessager[friendid][messagerid] = content
    // }
    temp_listMessager[friendid][messagerid] = content

    return { ...state, listMessager: temp_listMessager }
  }
  else {
    return state
  }
}

/* ================== Hookup Reducers To Types ================== */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_NEW_MESSAGER]: setNew,
  [Types.SET_LIST_MESSAGER]: setMess,
  [Types.UPDATE_MESSAGER]: updateMess,
})

