import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'
//import { reactReduxFirebase } from 'react-redux-firebase/dist/react-redux-firebase'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []
  const isDebug = __DEV__
  //const isDebug = false

  /* ------------- Saga Middleware ------------- */
  const sagaMonitor = isDebug ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)


  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware))


  /* ------------- Redux firebase middlewave ------------- */
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBTjFDedPJzUHpuL9OVI9Pm6ILB1qlLPcc",
  //   authDomain: "chatreactexample.firebaseapp.com",
  //   databaseURL: "https://chatreactexample.firebaseio.com",
  //   storageBucket: "",
  // };
  // const config = {
  //   userProfile: 'users'
  // }
  //enhancers.push(reactReduxFirebase(firebaseConfig,config))


  /* ------------- AutoRehydrate Enhancer ------------- */

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = isDebug ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
