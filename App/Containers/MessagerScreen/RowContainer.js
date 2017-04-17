import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Size } from '../../Themes'
import RowMessager from './RowMessager'

class RowContainer extends React.Component {
  constructor(props) {
    super(props)
    this.timeline = 0
  }

  _renderTimeLine(time) {
    var date = new Date(time);
    var timeText = date.getHours() + ':' + date.getMinutes() + '  ' + date.getDate() + ' Th ' + date.getMonth()
    return (
      <View key={'timeline-' + time} style={styles.timeline}>
        <Text style={styles.timelineText}>{timeText}</Text>
      </View>
    )
  }

  _renderRow(key, value) {
    if (key === 'firstKey') return
    let arrReturn = []

    if (this.timeline === 0) {
      this.timeline = value.time
      arrReturn.push(this._renderTimeLine(value.time))
    }
    else
      if ((value.time - this.timeline) >= 3600000)
        arrReturn.push(this._renderTimeLine(value.time))
    this.timeline = value.time

    if (value.receive)
      arrReturn.push(<RowMessager key={key} friendsms={true} data={value} img={this.props.img} />)
    else
      arrReturn.push(<RowMessager key={key} friendsms={false} data={value} />)

    return arrReturn
  }


  render() {
    return (
      <View>
        {
          Object.keys(this.props.data).map((key) => {
            return this._renderRow(key, this.props.data[key])
          })
        }
      </View>
    )
  }
}

RowContainer.propTypes = {
  data: React.PropTypes.object,
  img: React.PropTypes.string
}
const styles = StyleSheet.create({
  timeline: {
    marginTop: Size(10),
    marginBottom: Size(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineText: {
    color: '#a0a0a0',
    fontSize: Size(12)
  },
})

export default RowContainer
