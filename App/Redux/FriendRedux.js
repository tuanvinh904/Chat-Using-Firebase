import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ================== Types and Action Creators ================== */
const { Types, Creators } = createActions({
  setListFriend: ['listFriend'],
  changeStatusOnline: ['valueRef'],
})

export const FriendTypes = Types
export default Creators


/* ================== Initial State ================== */
export const INITIAL_STATE = Immutable({
  listFriend: null,
})

/* ================== Reducers ================== */
export const setList = (state, action) => {
  const { listFriend } = action
  return { ...state, listFriend }
}
export const changeStatus = (state, action) => {
  const { listFriend } = state
  const { valueRef } = action
  let newListFriend = { ...listFriend }
  Object.keys(newListFriend).forEach((key, index) => {
    if (key === valueRef.uid) newListFriend[key] = valueRef
  })
  return { ...state, listFriend: newListFriend }
}


/* ================== Hookup Reducers To Types ================== */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LIST_FRIEND]: setList,
  [Types.CHANGE_STATUS_ONLINE]: changeStatus,
})
