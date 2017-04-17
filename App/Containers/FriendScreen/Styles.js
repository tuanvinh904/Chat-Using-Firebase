import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Size, Fonts, Colors, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  titlebar: {
    flexDirection: 'row', height: Size(36), backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'
  },
  btback: {
    paddingLeft: Size(5), flexDirection: 'row', justifyContent: 'center'
  },
  sizebtback: {
    width: Size(25), height: Size(25)
  },



  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: Size(5),
    borderTopColor: Colors.fire,
    borderRightColor: Colors.fire,
    borderBottomColor: Colors.fire,
    borderLeftColor: Colors.fire,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: Colors.ember,
    padding: Size(10)
  },
  buttonText: {
    margin: Size(18),
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },

})
