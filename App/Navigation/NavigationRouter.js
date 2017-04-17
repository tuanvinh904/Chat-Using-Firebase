import React, { Component } from 'react'
import { Scene, Router,  Modal,  Actions, Reducer, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'

// screens identified by the router
import StartupScreen from '../Containers/StartupScreen'
import LoginScreen from '../Containers/LoginScreen'

import FriendScreen from '../Containers/FriendScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import MessagerScreen from '../Containers/MessagerScreen'

import ImageViewModal from '../Containers/ImageViewModal'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/


// const reducerCreate = params => {
//   const defaultReducer = Reducer(params);
//   return (state, action) => {
//     console.log("ACTION:", action);
//     return defaultReducer(state, action);
//   }
// };

class NavigationRouter extends Component {
  render() {
    return (
      <Router /*createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#F7F7F7' }} */>
        <Scene key="modal" component={Modal} >
          <Scene key="root" hideNavBar={true}  >
            <Scene initial key='startupScreen' component={StartupScreen} title='startupScreen' type={ActionConst.REPLACE} />
            <Scene key='loginScreen' component={LoginScreen} title='loginScreen' type={ActionConst.REPLACE} />
            <Scene key='friendScreen' component={FriendScreen} title='friendScreen' type={ActionConst.REPLACE} />
            <Scene key='profileScreen' component={ProfileScreen} title='profileScreen' type={ActionConst.REPLACE} />
            <Scene key='messagerScreen' component={MessagerScreen} title='messagerScreen' duration={0} />
          </Scene>
          <Scene key="imageViewModal" component={ImageViewModal} direction="vertical"/>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter

/*
            <Scene initial key='startupScreen' component={StartupScreen} title='startupScreen' type={ActionConst.REPLACE} />
            <Scene key='loginScreen' component={LoginScreen} title='loginScreen' type={ActionConst.REPLACE} />
            <Scene key='friendScreen' component={FriendScreen} title='friendScreen' type={ActionConst.REPLACE} />
            <Scene key='profileScreen' component={ProfileScreen} title='profileScreen' type={ActionConst.REPLACE} />
            <Scene key='messagerScreen' component={MessagerScreen} title='messagerScreen' duration={0} />
*/