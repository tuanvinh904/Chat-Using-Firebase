import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import { Images, Size } from '../Themes'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';

import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';








/*
         <ScrollView
          ref="_ScrollViewTextInput"
          style={{
            maxHeight: this.state.heightScrollView,
            backgroundColor: 'gray'
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.refs._ScrollViewTextInput.scrollTo({ y: contentHeight, animated: true });
          }}
        >
          <TextInput
            onContentSizeChange={(event) => this._onAddLine(event)}
            style={{ width: this.props.width, height: this.state.heighTextInput }}
            multiline={true}
            underlineColorAndroid={this.props.underlineColorAndroid}
            placeholder={this.props.placeholder}

            onChangeText={(text) => {
              if (this.props.onChangeText !== null)
                this.props.onChangeText(text)
              this.setState({ text: text })
            }}
            value={this.state.text}
          />
        </ScrollView>
*/

class ScreenTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          multiline={true}
          style={{ height: 20, width: 200, borderColor: 'gray', borderWidth: 1, padding: 0 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#76c6ff'
  },
  welcome: {
    marginTop: 100,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  textInput: {
    margin: 10,
    paddingLeft: 10,
    fontSize: 17,
  },
  button: {
    alignItems: 'center',
    width: 100,
    height: 80,
    marginTop: 50
  }
});

export default ScreenTest

/*
        <View style={styles.styleview}>
          <Image
            style={styles.imagesms}
            source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
          />
        </View>
        <View style={styles.styleview}>
          <Image style={styles.imagesms} source={{ uri: 'http://www.esa.int/var/esa/storage/images/esa_multimedia/images/2016/04/sentinel-1b_s_first_image/15966791-2-eng-GB/Sentinel-1B_s_first_image_fullwidth.jpg' }} />
        </View>

*/