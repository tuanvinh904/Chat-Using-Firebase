import React from 'react'
import { Text, Keyboard, View, ActivityIndicator, ScrollView, TouchableOpacity, TouchableHighlight, Image, TextInput } from 'react-native'
import { Images, Icon, Size } from '../../Themes'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Immutable from 'seamless-immutable'
import ImagePicker from 'react-native-image-crop-picker';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import styles from './Styles'
import RowContainer from './RowContainer'
import AutoSizeTextInput from '../../Component/AutoSizeTextInput'

import MessagerActions from '../../Redux/MessagerRedux'
import RNFetchBlob from 'react-native-fetch-blob'
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const sendThis = null

class MessagerScreen extends React.Component {
  constructor(props) {
    super(props)
    this.scrollBottomY = 0
    sendThis = this
    this.state = {
      status: 'isLoading',
      contentMessager: '',
      isReadyLoadMore: true,
    }
    this.dataRow = []
    //this.keyInDataRow = []
    this.isFirstScroll = true
    this.heightBeforLoadMore = 0
    this.isScrollAfterLoadMore = false
    this.isScrollAfterReceiveMess = false
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._scrollToBottom);
  }
  componentWillReceiveProps(nextProps) {
    if ((this.state.status === 'isNull' || this.state.status === 'isFail') && Object.keys(nextProps.listMessager))
      this.setState({ status: 'isComplete' })
    if (this.props.newMessager !== null && this.props.newMessager.count !== nextProps.newMessager.count)
      this.isScrollAfterReceiveMess = true
  }
  componentDidMount() {
    if (this.props.listMessager !== null && Object.keys(this.props.listMessager).length > 20) {
      this.setState({ status: 'isComplete' })
    }
    else {
      this.props.firebaseObject.database().ref("users/" + this.props.user_info.uid + '/messager/' + this.props.currentFriend.uid).limitToLast(20).once('value').then((snap) => {
        if (snap.val() === null) {
          this.setState({ status: 'isNull' })
        }
        else {
          this.props.setListMessager(snap.val(), this.props.currentFriend.uid)
          this.setState({ status: 'isComplete' })
        }
      }).catch((err) => {
        this.setState({ status: 'isFail' })
        console.log('Error load list messager: ' + err)
      })
    }
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }
  _scrollToBottom() {
    sendThis.refs._scrollView.scrollTo({ y: sendThis.scrollBottomY, animated: true });
  }
  _scroll(position) {
    this.refs._scrollView.scrollTo({ y: position, animated: true });
  }

  _sendMessager(timeStapNow, data) {
    const dataImage = data
    if (data.type === 'image') data = { ...data, content: data.content.name }

    console.log('content name: ', data)

    var sendMessagerData = {};
    sendMessagerData['users/' + this.props.user_info.uid + '/messager/' + this.props.currentFriend.uid + '/' + timeStapNow] = { ...data, receive: false, send: true }
    sendMessagerData['users/' + this.props.currentFriend.uid + '/messager/' + this.props.user_info.uid + '/' + timeStapNow] = { ...data, receive: true, seen: false }


    this.props.firebaseObject.database().ref().update(sendMessagerData).then(() => {
      this.props.firebaseObject.database()
        .ref('users/' + this.props.currentFriend.uid + '/receive/' + this.props.user_info.uid)
        .transaction((currentRank) => {
          if (currentRank === null)
            return { count: 1, time: timeStapNow, content: { ...data, receive: true } }
          else
            return { count: currentRank.count + 1, time: timeStapNow, content: { ...data, receive: true } }
        })
      data.type === 'image'
        ? this.props.updateMessager(timeStapNow, this.props.currentFriend.uid, { ...dataImage, send: true })
        : this.props.updateMessager(timeStapNow, this.props.currentFriend.uid, { ...data, send: true })
    }).catch((err) => {
      data.type === 'image'
        ? this.props.updateMessager(timeStapNow, this.props.currentFriend.uid, { ...dataImage, send: false })
        : this.props.updateMessager(timeStapNow, this.props.currentFriend.uid, { ...data, send: false })
      console.log('send messager error: ', err)
    })
  }

  _sendTextMessager() {
    if (this.state.contentMessager === '') return
    let timeStapNow = (new Date().getTime())
    let data = {
      content: this.state.contentMessager,
      time: timeStapNow,
      type: 'text',
    }
    this.isScrollAfterReceiveMess = true
    var objectMessager = { [timeStapNow]: { ...data, send: false } }
    this.props.setListMessager(objectMessager, this.props.currentFriend.uid)
    this._sendMessager(timeStapNow, data)
    this.setState({ contentMessager: '' })
  }


  _loadOldMessager(nativeEvent) {
    if (nativeEvent.contentOffset.y === 0 && this.state.isReadyLoadMore) {
      this.setState({ isReadyLoadMore: false })
      console.log('Check end key ', this.props.listMessager.firstKey)
      this.props.firebaseObject.database().ref("users/" + this.props.user_info.uid + '/messager/' + this.props.currentFriend.uid).orderByKey().endAt(this.props.listMessager.firstKey).limitToLast(20).once('value')
        .then((snap) => {
          this.heightBeforLoadMore = nativeEvent.contentSize.height
          this.isScrollAfterLoadMore = true
          this.setState({ isReadyLoadMore: true })
          this.props.setListMessager(snap.val(), this.props.currentFriend.uid)
        }).catch((err) => {
          this.setState({ isReadyLoadMore: true })
          console.log('Error load MORE list messager: ' + err)
        })
    }
  }
  _isSeen() {
    if (this.props.newMessager !== null && this.props.newMessager.count > 0) {
      this.props.firebaseObject.database()
        .ref('users/' + this.props.user_info.uid + '/receive/' + this.props.currentFriend.uid)
        .transaction((currentRank) => {
          if (currentRank !== null)
            return { ...currentRank, count: 0 }
        })
    }
  }
  _selectAndSendPhoto() {
    Keyboard.dismiss()
    ImagePicker.openPicker({ multiple: false })
      .then(images => {
        const extentfile = images.path.split(/(\\|\/)/g).pop().split('.').pop()
        if (extentfile === 'png' || extentfile === 'jpg' || extentfile === 'gif') {
          let rnfbURI = RNFetchBlob.wrap(images.path)
          Blob.build(rnfbURI, { type: 'image/' + extentfile + ';' })
            .then((blob) => {
              let timeStapNow = (new Date().getTime())
              let data = {
                content: {
                  name: (timeStapNow + '.' + extentfile),
                  url: null,
                  path: images.path,
                },
                time: timeStapNow,
                type: 'image',
              }
              this.isScrollAfterReceiveMess = true
              var objectMessager = { [timeStapNow]: { ...data, send: false } }
              this.props.setListMessager(objectMessager, this.props.currentFriend.uid)

              var storageRef = this.props.firebaseObject.storage().ref();
              var imageRef = storageRef.child(timeStapNow + '.' + extentfile);
              imageRef.put(blob)
                .then((snapshot) => {
                  const newContent = { ...data.content, url: snapshot.downloadURL }
                  this._sendMessager(timeStapNow, { ...data, content: newContent })
                  blob.close()
                })
                .catch((err) => {
                  this.props.updateMessager(timeStapNow, this.props.currentFriend.uid, { ...data, send: false })
                  console.log('Upload image error ', err)
                })

            })
            .catch((err) => {
              console.log('Buid Blob file error ', err)
              alert('Lỗi ngoài mong muốn, Xin thử lại...')
            })
        }
        else alert('Chỉ gửi được file ảnh...')
      })
      .catch((err) => {
        console.log('Select image cancel or error ', err)
      })
  }



  _renderContent() {
    if (this.state.status === 'isLoading') {
      return (
        <View style={[{ flex: 1 }, styles.center]}>
          <ActivityIndicator
            size={'small'}
            style={{ height: 40 }}
          />
        </View>
      )
    }
    else if (this.state.status === 'isNull') {
      return (
        <View style={styles.center}>
          <Text style={{ fontSize: Size(13) }}>Hãy gửi tin nhắn...</Text>
        </View>
      )
    }
    else if (this.state.status === 'isFail') {
      return (
        <View>
          <Text>Display reload page </Text>
        </View>
      )
    }
    else {
      return (
        <View>
          <RowContainer img={this.props.currentFriend.photoURL} data={this.props.listMessager} />
        </View>
      )
    }
  }
  render() {
    return (
      <View style={styles.mainContainer} >
        <View style={styles.titlebar}>
          <TouchableOpacity style={styles.btback} onPress={() => { Actions.pop() }}>
            <Image source={Icon.arrow} style={styles.sizebtback} resizeMode='stretch' />
            <Text style={styles.btbackText}>Trở lại</Text>
          </TouchableOpacity>
          <View style={styles.displayNameStyle}>
            <Text style={styles.displayNameTextStyle}>{this.props.currentFriend.displayName}</Text>
          </View>
          <View style={styles.displayMenuStyle}>
            <Image source={Icon.menu} style={styles.sizebtback} resizeMode='stretch' />
          </View>
        </View>
        <View style={{ flex: 1 }} >
          <ScrollView
            ref='_scrollView'
            style={{ flex: 1, backgroundColor: '#d8d8d8' }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.scrollBottomY = contentHeight;
              if (this.isFirstScroll && contentHeight > 100) {
                this.heightBeforLoadMore = contentHeight
                this._scrollToBottom()
                this.isFirstScroll = false
              }
              if (this.isScrollAfterLoadMore) {
                this._scroll(contentHeight - this.heightBeforLoadMore - 15)
                this.isScrollAfterLoadMore = false
              }
              if (this.isScrollAfterReceiveMess) {
                this.isScrollAfterReceiveMess = false
                this._scrollToBottom()
              }
            }}
            onScroll={(event) => this._loadOldMessager(event.nativeEvent)}
          >
            {
              this.state.isReadyLoadMore
                ? null
                : <ActivityIndicator size={'small'} style={{ height: 40 }} />
            }
            {this._renderContent()}
          </ScrollView>
          <View style={{ flexDirection: 'row' }} >
            <View style={styles.ViewAutoText}>
              <AutoSizeTextInput
                height={19}
                placeholder='Nội dung tin nhắn...'
                maxHeight={80}
                onChangeText={(text) => {
                  this._isSeen()
                  this.setState({ contentMessager: text })
                }}
                value={this.state.contentMessager}
                onFocus={() => this._isSeen()}
                fontSize={Size(13)}
              />
            </View>
            {
              this.state.contentMessager !== ''
                ? (
                  <TouchableOpacity
                    onPress={() => this._sendTextMessager()}
                    activeOpacity={0.5}
                    style={styles.btsendsms}
                  >
                    <Text style={{ fontSize: Size(20), color: 'blue' }}>Gửi</Text>
                  </TouchableOpacity>
                )
                : (
                  <TouchableOpacity onPress={() => this._selectAndSendPhoto()}
                    style={styles.btsendsms}>
                    <Image source={Icon.camera} style={styles.sizebtcamera} resizeMode='stretch' />
                  </TouchableOpacity>
                )
            }
          </View>
        </View>
      </View >
    )
  }

}

// this.props.firebaseObject.database().ref("users/" + this.props.user_info.uid + '/messager/' + this.props.currentFriend.uid).orderByKey().startAt('-1491277968281').limitToFirst(1).once('value').then((snap) => {

MessagerScreen.propTypes = {
  currentFriend: React.PropTypes.object
}
const mapStateToProps = (state, ownProps) => {
  const mapState = {
    firebaseObject: state.startup.firebaseObject,
    user_info: state.startup.user_info,
    newMessager: null,
    listMessager: null,
  }

  if (
    state.messager.newMessager !== null &&
    state.messager.newMessager.hasOwnProperty(ownProps.currentFriend.uid)
  )
    mapState.newMessager = Immutable.asMutable(state.messager.newMessager[ownProps.currentFriend.uid])
  if (
    state.messager.listMessager !== null &&
    state.messager.listMessager.hasOwnProperty(ownProps.currentFriend.uid)
  )
    mapState.listMessager = Immutable.asMutable(state.messager.listMessager[ownProps.currentFriend.uid])

  return mapState
}

const mapDispatchToProps = (dispatch) => ({
  setListMessager: (messager, friendid) => dispatch(MessagerActions.setListMessager(messager, friendid)),
  updateMessager: (messagerid, friendid, content) => dispatch(MessagerActions.updateMessager(messagerid, friendid, content)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagerScreen)
/*
              <TextInput
                style={styles.inputsms}
                multiline={true}
                underlineColorAndroid='#fff'
                placeholder='Nội dung tin nhắn...'
                onChangeText={(text) => {
                  this._isSeen()
                  this.setState({ contentMessager: text })
                }}
                value={this.state.contentMessager}
                onFocus={() => this._isSeen()}
              />
              */