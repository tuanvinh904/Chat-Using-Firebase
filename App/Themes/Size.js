import {Dimensions, Platform} from 'react-native'
const { width } = Dimensions.get('window')
const proportion = width / 320

const Size = (points) => {
  return (points*proportion)

}

export default Size
