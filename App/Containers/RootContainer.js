import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import NavigationRouter from '../Navigation/NavigationRouter'
import ReduxPersist from '../Config/ReduxPersist'
import PushController from "../Notification/PushController";

// Styles
import StartupActions from '../Redux/StartupRedux'

import ScreenTest from './ScreenTest'

class RootContainer extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <PushController
          onChangeToken={token => {
            //console.log('vinhanhheo', token)
          }}
        />
        <StatusBar barStyle='light-content' />
        <NavigationRouter />
      </View>
    )
  }

  
    /*render() {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='light-content' />
          <ScreenTest />
        </View>
      )
    }*/
    

  componentDidMount() {
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(null, mapDispatchToProps)(RootContainer)
