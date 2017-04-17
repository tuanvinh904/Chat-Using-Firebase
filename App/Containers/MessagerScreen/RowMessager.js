import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import ImageMessager from './ImageMessager'
import { Icon, Size } from '../../Themes'

class RowMessager extends React.Component {
  constructor(props) {
    super(props)
  }

  _renderTextSms() {
    var content = this.props.data.content.trim()
    if (this.props.friendsms)
      return (<Text style={{ fontSize: Size(13) }}>{content}</Text>)
    else
      return (<Text style={{ color: '#fff', fontSize: Size(13) }}>{content}</Text>)
  }

  _renderImageSms() {
    return (
      <ImageMessager data={this.props.data} />
    )
  }

  _renderContent() {
    var dataSms = null
    if (this.props.data.type === 'image')
      dataSms = this._renderImageSms()
    else
      dataSms = this._renderTextSms()
    var styleSms = this.props.friendsms ? styles.smsFriend : styles.smsUser

    if (this.props.friendsms)
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.imageFriend}>
            <Image source={{ uri: this.props.img }} style={styles.imageSize} />
          </View>
          <TouchableOpacity activeOpacity={1} style={styleSms}>
            {dataSms}
          </TouchableOpacity>
        </View>
      )
    else
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={1} style={styleSms}>
            {dataSms}
          </TouchableOpacity>
          <View style={styles.checkSend}>
            {
                this.props.data.send
                ? <Image source={Icon.check} style={styles.ViewO} />
                : <View style={styles.ViewO}></View>
            }
          </View>
        </View>
      )
  }

  render() {
    return (
      <View style={
        this.props.friendsms
          ? styles.styleView
          : [styles.styleView, { alignSelf: 'flex-end' }]
      }>
        {this._renderContent()}
      </View>
    )
  }
}

RowMessager.propTypes = {
  friendsms: React.PropTypes.bool,
  data: React.PropTypes.object,
}

const styles = StyleSheet.create({
  styleView: {
    flexDirection: 'row'
  },
  smsFriend: {
    marginBottom: Size(4),
    minWidth: Size(50),
    maxWidth: Size(250),
    padding: Size(5),
    borderTopLeftRadius: Size(5),
    borderTopRightRadius: Size(12),
    borderBottomLeftRadius: Size(5),
    borderBottomRightRadius: Size(12),
    backgroundColor: '#fff',
  },
  smsUser: {
    marginBottom: Size(4),
    minWidth: Size(50),
    maxWidth: Size(250),
    padding: Size(5),
    borderTopLeftRadius: Size(12),
    borderTopRightRadius: Size(5),
    borderBottomLeftRadius: Size(12),
    borderBottomRightRadius: Size(5),
    backgroundColor: '#2e93fd',
  },
  imageFriend: {
    width: Size(30),
    height: Size(30),
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: Size(30),
    marginLeft: Size(3),
    marginRight: Size(3),
  },
  checkSend: {
    width: Size(10),
    justifyContent: 'flex-end',
    marginBottom: Size(5),
    alignItems: 'center'
  },
  imageSize: {
    flex: 1,
    resizeMode: 'center',
    borderRadius: Size(30)
  },
  ViewO: {
    width: Size(8),
    height: Size(8),
    borderRadius: Size(8),
    borderWidth: 1,
    borderColor: '#2e93fd'
  },
})
export default RowMessager