import {StatusBar, StyleSheet} from 'react-native';
import {
  rspF,
  rspFL,
  rspH,
  rspHA,
  rspW,
  scrn_width,
} from '../../../theme/responsive';
import gStyles from '../../../gStyles/gStyles';
import fontFM from '../../../theme/fontFM';
import colors from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: rspF(32),
    lineHeight: rspFL(48),
    textAlign: 'center',
    fontFamily: fontFM.regular,
    color: colors.black,
  },
  logo: {
    marginTop: rspH(44),
    width: rspW(150),
    height: rspW(150),
  },
  img: {
    width: scrn_width,
    // height: rspH(524),
    flex: 1,
    marginTop: -rspH(15),
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: colors.darkRed,

  },
  bsCont: {
    width: rspW(163),
    marginBottom: rspH(5),
    justifyContent: 'space-between',
  },
  btn2Cont: {
    ...gStyles.rowBetween,
    marginTop: rspH(15),
  },
  subTitle: {
    fontSize: rspF(20),
    lineHeight: rspFL(20),
    textAlign: 'center',
    fontFamily: fontFM.bold,
    color: colors.black,
  },
  subTitle2: {
    fontSize: rspF(16),
    lineHeight: rspFL(24),
    textAlign: 'center',
    fontFamily: fontFM.medium,
    color: colors.black,
  },
  btn: {
    width: rspW(60),
    height: rspH(60),
    position: 'absolute',
    top: rspHA(741),
    borderRadius: rspW(12),
    // padding: rspH(0),

    ...gStyles.colCenter,
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: rspF(17),
    fontFamily: fontFM.regular,
    lineHeight: rspFL(24.41),
    color: colors.white,
  },
  buttonContainer: {
    height: rspH(120),
  }
});

export default styles;
