import React from 'react'
import { ScrollView, Text, ActivityIndicator, Modal, Image, View, TouchableOpacity } from 'react-native'
import { Images, Size } from '../Themes'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/LoginScreenStyle'

import StartupActions from '../Redux/StartupRedux'
const { AccessToken, LoginManager, GraphRequest, GraphRequestManager } = require('react-native-fbsdk');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openModal: false }
  }
  _get_User_ID() {
    var unsubscribe = this.props.firebaseObject.auth().onAuthStateChanged((user) => {
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
        console.log('Can not get user id')
        unsubscribe()
        this.setState({ openModal: false })
      }
    });

  }
  _register_User_Firebase(token) {
    const credential = require("firebase").auth.FacebookAuthProvider.credential(token);
    this.props.firebaseObject.auth()
      .signInWithCredential(credential)
      .then(() => this._get_User_ID())
      .catch((error) => {
        console.log('Faild register user: ', error)
        this.setState({ openModal: false })
      });
  }
  _get_token() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) this._register_User_Firebase(data.accessToken)
        else console.log('Token is null !');
      }),
      (error) => {
        console.log('Get token error: ' + error);
        this.setState({ openModal: false })
      }
  }

  _fbLogin() {
    this.setState({ openModal: true })
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login cancelled')
          this.setState({ openModal: false })
        }
        else this._get_token()
      },
      (error) => {
        console.log('Login facebook fail with error: ' + error);
        this.setState({ openModal: false })
        alert('Lỗi mạng!...')
      }
    )

  }
  render() {
    if (this.state.openModal)
      return (
        <View style={[{ flex: 1 }, styles.center]}>
        </View>
      )
    else return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>
          <View style={styles.center}>
            <TouchableOpacity onPress={() => this._fbLogin()}>
              <Image source={Images.fblogin} style={{ height: Size(50), width: Size(250) }} />
            </TouchableOpacity>
          </View>
          <View style={{ margin: Size(5) }}>
            <Text style={{ color: '#fff' }}>Note: 1234567890-</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebaseObject: state.startup.firebaseObject,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (uid) => dispatch(StartupActions.setUserInfo(uid)),
})
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)