import React from 'react'
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { Images, Size } from '../Themes'
import { Actions } from 'react-native-router-flux'
import PhotoView from 'react-native-photo-view';


class ImageViewModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true,
      showIndicator: true
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }
  closeModal() {
    Actions.pop()
  }


  render() {
    const { visible, showIndicator } = this.state
    if (visible)
      return (
        <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#000' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{color: '#fff', padding: Size(10), fontSize: Size(13)}} onPress={() => this.closeModal()}>Đóng</Text>
          </View>
          <View style={{flex:1}}>
            <PhotoView
              source={{ uri: this.props.data }}
              minimumZoomScale={1}
              maximumZoomScale={4}
              androidScaleType="fitCenter"
              onLoad={() => this.setState({ showIndicator: false })}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
            />
            {
              showIndicator
                ? (<View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'center', alignItems: 'center', }}>
                  <ActivityIndicator size={'small'} style={{ height: Size(40) }} />
                </View>)
                : null
            }
          </View>
        </View>
      )
    else return null
  }
}

///////////////.const styles = StyleSheet.create({})

export default ImageViewModal
