import React from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon, Size } from '../../Themes'
import { connect } from 'react-redux'
import styles from './Styles'

import StartupActions from '../../Redux/StartupRedux'
import FriendRow from './FriendRow'

class FriendScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'isLoading',
    }
    this.dataRow = []
  }

  _setDataRowAndStatus(listFriend, recentlyMessager) {
    if (listFriend === null) return
    if (listFriend === 'error') {
      this.setState({ status: 'isError' })
    }
    else {
      if (Object.keys(listFriend).length === 0) {
        this.dataRow = []
        this.setState({ status: 'isNull' })
      }
      else {
        var temp_dataRow = []
        if (recentlyMessager !== null) temp_dataRow.push(recentlyMessager)
        Object.keys(listFriend).forEach((key, index) => {
          if (key !== recentlyMessager)
            temp_dataRow.push(key)
        })
        this.dataRow = temp_dataRow
        this.setState({ status: 'isComplete' })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this._setDataRowAndStatus(nextProps.listFriend, nextProps.recentlyMessager)
  }

  _renderIsLoading() {
    return (
      <View style={[{ flex: 1 }, styles.center]}>
        <ActivityIndicator
          size={'small'}
          style={{ height: Size(40) }}
        />
        <Text style={{ fontSize: Size(13) }}>Show List Friend, Loading... </Text>
      </View>
    )
  }
  _renderIsComplete() {
    return (
      <View style={{ backgroundColor: '#dedede', flex: 1 }}>
        <ScrollView>
          <View style={{ backgroundColor: '#fff' }}>
            {
              this.dataRow.map((item) => {
                return <FriendRow key={item} friendid={item} />
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
  _renderIsNull() {
    return (
      <View style={[{ flex: 1 }, styles.center]}>
        <Text>Không có bạn bè nào... </Text>
      </View>
    )
  }

  _renderIsFaild() {
    return (
      <View style={[{ flex: 1 }, styles.center]}>
        <Text>Show button reload</Text>
      </View>
    )
  }

  componentDidMount() {
    this._setDataRowAndStatus(this.props.listFriend, null)
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.titlebar}>
          {/*
            <TouchableOpacity style={{ paddingLeft: Size(5) }}>
              <Image source={Icon.search} style={styles.sizebtback} resizeMode='stretch' />
            </TouchableOpacity>
          */}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: Size(17) }}>Tin nhắn</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {
            this.state.status === 'isLoading'
              ? this._renderIsLoading()
              : (this.state.status === 'isNull'
                ? this._renderIsNull()
                : (this.state.status === 'isError'
                  ? this._renderIsFaild()
                  : this._renderIsComplete()
                )
              )
          }
        </View>
      </View>
    )
  }

  componentWillUnmount() {
    this.props.firebaseObject.database()
      .ref('user_info/' + this.props.user_info.uid)
      .transaction((currentRank) => {
        if (currentRank !== null)
          return { ...currentRank, status: 'offline' }
        else
          return currentRank
      })
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    firebaseObject: state.startup.firebaseObject,
    user_info: state.startup.user_info,
    listFriend: state.friend.listFriend,
    recentlyMessager: state.messager.recentlyMessager
  }
}

export default connect(mapStateToProps, null)(FriendScreen)