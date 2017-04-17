import React from 'react'
import { View, TextInput, ScrollView } from 'react-native'
import { Images, Size } from '../Themes'

class AutoSizeTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heighTextInput: this.props.height,
      heightScrollView: this.props.height,
    }
  }

  _onAddLine(event) {
    let thisHeight = event.nativeEvent.contentSize.height
    if (this.props.maxHeight >= thisHeight) {
      this.setState({
        heighTextInput: thisHeight,
        heightScrollView: thisHeight
      })
    }
    else {
      this.setState({
        heighTextInput: thisHeight,
      })
    }
  }

  render() {
    return (
      <ScrollView
        ref="_ScrollViewTextInput"
        style={{ maxHeight: this.state.heightScrollView }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          this.refs._ScrollViewTextInput.scrollTo({ y: contentHeight, animated: true });
        }}
      >
        <TextInput
          onContentSizeChange={(event) => this._onAddLine(event)}
          style={{
            height: this.state.heighTextInput,
            padding: 0,
            fontSize: this.props.fontSize
          }}
          multiline={true}
          underlineColorAndroid={this.props.underlineColorAndroid}
          placeholder={this.props.placeholder}

          onChangeText={(text) => {
            if (this.props.onChangeText !== null)
              this.props.onChangeText(text)
          }}
          onFocus={() => {
            if (this.props.onFocus !== null)
              this.props.onFocus()
          }}
          value={this.props.value}
        />
      </ScrollView>
    )
  }
}
AutoSizeTextInput.propTypes = {
  height: React.PropTypes.number,
  placeholder: React.PropTypes.string,
  maxHeight: React.PropTypes.number,
  underlineColorAndroid: React.PropTypes.string,
  onChangeText: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  value: React.PropTypes.string,
  fontSize: React.PropTypes.number,
}
AutoSizeTextInput.defaultProps = {
  value: '',
  fontSize: 13,
  height: 20,
  placeholder: '',
  maxHeight: 80,
  underlineColorAndroid: '#fff',
  onChangeText: null,
  onFocus: null,
}

export default AutoSizeTextInput