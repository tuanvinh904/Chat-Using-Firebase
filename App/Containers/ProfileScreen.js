import React from 'react';
import { Text, View, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { Images } from '../Themes'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/ProfileScreenStyle'

const { LoginManager } = require('react-native-fbsdk');

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logOuting: false
    }
  }
  _logOut() {
    //this.setState({ logOuting: true })
    LoginManager.logOut()
    this.props.firebaseObject.auth().signOut()
      .then(() => {
        console.log('Logout success')
        Actions.loginScreen()
      })
      .catch((error) => {
        console.log('Log out error', error)
        //this.setState({ logOuting: false })
        alert('Log Out Error')
      });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.logOuting}
          onRequestClose={() => { console.log('Logout success') }}
        >
          <View style={[{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' }, styles.center]}>
            <ActivityIndicator
              size={'small'}
              style={{ height: 40 }}
            />
          </View>
        </Modal>
        <View style={{ margin: 5 }}>
          <Text>Note: ProfileScreenProfileScreenProfileScreenProfileScreen-</Text>
          <TouchableOpacity onPress={() => this._logOut()}>
            <Text>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebaseObject: state.startup.firebaseObject,
  }
}
export default connect(mapStateToProps, null)(ProfileScreen)