import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Size } from '../../Themes'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'



class ImageMessager extends React.Component {
  constructor(props) {
    super(props)
    this.imageSend = (typeof this.props.data.content) === 'object' ? true : false
    this.state = {
      displayFileLocal: this.imageSend,
      displayIndicator: true,
      loadUrl: true,
    }
    this.url = null
    this.loadUrl = true
  }
  _updateImgOnline() {
    this.setState({ displayFileLocal: false, displayIndicator: false })
  }
  _getUrl() {
    if (this.imageSend) {
      this.url = this.props.data.content.url
    }
    else if (this.state.loadUrl) {
      this.props.firebaseObject.storage().ref(this.props.data.content).getDownloadURL()
        .then((url) => {
          this.url = url
          this.setState({ loadUrl: false })
        })
        .catch((err) => {
          console.log('Error load link image ', err)
        })
    }
  }

  _toggleImage() {
    if (this.url !== null) Actions.imageViewModal(this.url)
  }

  render() {
    this._getUrl()
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.touch} onPress={() => this._toggleImage()}>
        {
          this.state.displayFileLocal
            ? <Image style={[styles.image, styles.touch]} source={{ uri: this.props.data.content.path }} />
            : null
        }
        {
          this.url !== null
            ? <Image style={[styles.image, styles.touch]} onLoad={() => this._updateImgOnline()} source={{ uri: this.url }} />
            : null
        }
        {
          this.state.displayIndicator
            ? <View style={[styles.touch, styles.loading]}><ActivityIndicator size={'small'} style={{ height: Size(40) }} /></View>
            : null
        }
      </TouchableOpacity>
    )
  }
}


ImageMessager.propTypes = {
  data: React.PropTypes.object,
}


const styles = StyleSheet.create({
  touch: {
    width: Size(180),
    height: Size(180),
  },
  image: {
    resizeMode: 'contain',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: Size(5),
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    firebaseObject: state.startup.firebaseObject,
  }
}

export default connect(mapStateToProps, null)(ImageMessager)


