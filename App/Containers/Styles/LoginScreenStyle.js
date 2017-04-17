import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  titlebar: {
    flexDirection: 'row', height: 40, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center'
  },
  btback: {
    paddingLeft: 5, flexDirection: 'row', justifyContent: 'center'
  },
  sizebtback: {
    width: 25, height: 25
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
    marginVertical: 5,
    borderTopColor: Colors.fire,
    borderRightColor: Colors.fire,
    borderBottomColor: Colors.fire,
    borderLeftColor: Colors.fire,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: Colors.ember,
    padding: 10
  },
  buttonText: {
    margin: 18,
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold
  },

})
