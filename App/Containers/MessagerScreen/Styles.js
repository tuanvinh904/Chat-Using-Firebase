import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Size, Fonts, Colors, Images } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  titlebar: {
    flexDirection: 'row', height: Size(35), backgroundColor: 'blue'
  },
  btback: {
    paddingLeft: Size(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
  },
  btbackText: {
    color: '#fff', fontSize: Size(13)
  },
  displayNameStyle: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  displayNameTextStyle: {
    color: '#fff', fontSize: Size(17)
  },
  displayMenuStyle: {
    justifyContent: 'center', alignItems: 'center'
  },
  sizebtback: {
    width: Size(25), height: Size(25)
  },
  sizebtcamera: {
    width: Size(25), height: Size(25)
  },
  inputsms: {
    borderColor: '#ebebeb', borderWidth: Size(1), borderRadius: Size(8), margin: Size(5), paddingLeft: Size(5), fontSize: Size(13)
  },
  btsendsms: {
    justifyContent: 'center', alignItems: 'center', paddingRight: Size(10), paddingLeft: Size(5)
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewAutoText: {
    flex: 1,
    justifyContent: 'center', borderColor: '#ebebeb', borderWidth: Size(1), borderRadius: Size(8), margin: Size(5),
    paddingTop: Size(5),
    paddingBottom: Size(5),
    paddingLeft: Size(5),
  }
})