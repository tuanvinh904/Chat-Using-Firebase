import React from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { Images, Size } from '../Themes'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/StartupScreenStyle'

import StartupActions from '../Redux/StartupRedux'

class StartupScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    let callChannel = nextProps.isPersistReady && nextProps.firebaseObject !== null
    if (callChannel && !nextProps.isChannelReady) {
      this.props.callStartChannel()
      console.log('Channel Start')
    }
    if (callChannel && nextProps.isChannelReady) {
      console.log('Channel Ready')
      var unsubscribe = nextProps.firebaseObject.auth().onAuthStateChanged((user) => {
        if (user) {
          const user_info = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
          }
          this.props.setUserInfo(user_info)
          //wait setUserInfo resuild => if fail -> show bt reLoad
          unsubscribe()
          Actions.friendScreen({ user: user_info })
        }
        else {
          unsubscribe()
          Actions.loginScreen()
        }
      });
    }
  }

  render() {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <ActivityIndicator
          size={'small'}
          style={{ height: Size(40) }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isPersistReady: state.startup.isPersistReady,
    isChannelReady: state.startup.isChannelReady,
    firebaseObject: state.startup.firebaseObject,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (user_info) => dispatch(StartupActions.setUserInfo(user_info)),
  callStartChannel: () => dispatch(StartupActions.callStartChannel()),
})
export default connect(mapStateToProps, mapDispatchToProps)(StartupScreen)