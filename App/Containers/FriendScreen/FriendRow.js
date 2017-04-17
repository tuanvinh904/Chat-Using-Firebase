import React from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Size } from '../../Themes'
import { Actions } from 'react-native-router-flux'
import Immutable from 'seamless-immutable'
import { agoTime } from '../../Function/CalculatorDateTime'


class FriendRow extends React.Component {
  constructor(props) {
    super(props)
    this.numberNewMessager = 0
  }

  _currentMessagerTime() {
    if (this.props.newMessager === null) return
    return agoTime(new Date().getTime(), this.props.newMessager.time)
  }

  _renderText() {
    if (this.props.newMessager !== null) {
      var stylex = null

      if (this.props.newMessager.count > 0) {
        this.numberNewMessager = this.props.newMessager.count > 9 ? '9+' : this.props.newMessager.count
        stylex = { fontSize: Size(16), fontWeight: 'bold' }
      }
      else {
        this.numberNewMessager = 0
        stylex = { fontSize: Size(16) }
      }


      var content = this.props.newMessager.content.content.trim()
      if (content.length > 50) content = content.substring(0, 50) + ' ...'
      var dataSplit = content.split("\n")
      if (dataSplit.length > 2) content = dataSplit[0] + '\n' + dataSplit[1]

      return (
        <View>
          <Text style={stylex}> {this.props.currentFriend.displayName}  </Text>
          <Text style={{ marginLeft: Size(8), color: '#868686', fontSize: Size(13) }}>
            {
              this.props.newMessager.content.type === 'text'
                ? content
                : this.props.currentFriend.displayName + ' đã gửi một ảnh'
            }
          </Text>
        </View>
      )
    }
    else
      return (
        <Text style={{ fontSize: Size(16) }} >
          {this.props.currentFriend.displayName}
        </Text>
      )
  }

  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ padding: Size(5) }}>
            <Image source={{ uri: this.props.currentFriend.photoURL }} style={{ width: Size(50), height: Size(50), borderRadius: Size(50) }} />
            <Image source={
              this.props.currentFriend.status === 'online'
                ? Icon.online
                : Icon.offline
            } style={{ width: Size(15), height: Size(15), position: 'absolute', right: Size(5), bottom: Size(5) }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
            <TouchableOpacity onPress={() => Actions.messagerScreen({ currentFriend: this.props.currentFriend })}>
              {this._renderText()}
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: Size(10), borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
            <Text style={{ fontSize: Size(12), color: '#cacaca' }}> {this._currentMessagerTime()}</Text>
            {
              this.numberNewMessager > 0
                ? <Text style={{ fontSize: Size(12), backgroundColor: 'red', color: '#fff', paddingLeft: Size(8), paddingRight: Size(8), borderRadius: Size(10), marginTop: Size(5) }}>
                  {this.numberNewMessager}
                </Text>
                : null
            }
          </View>
        </View>
      </View>
    )
  }
}

FriendRow.propTypes = {
  friendid: React.PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const tempReturn = {
    currentFriend: state.friend.listFriend[ownProps.friendid],
    newMessager: null,
  }
  if (
    state.messager.newMessager !== null &&
    state.messager.newMessager.hasOwnProperty(ownProps.friendid)
  )
    tempReturn.newMessager = Immutable.asMutable(state.messager.newMessager[ownProps.friendid])
  return tempReturn
}

export default connect(mapStateToProps, null)(FriendRow)
