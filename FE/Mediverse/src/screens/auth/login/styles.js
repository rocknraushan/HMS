import {StyleSheet} from 'react-native';
import {rspH, rspHA, rspW, scrn_width} from '../../../theme/responsive';

const styles = StyleSheet.create({
  logoImg: {
    height: rspH(100),
    width: rspW(100),
    position: 'absolute',
    top: rspH(64),
    zIndex: 2,
    alignSelf: 'center',
  },
  wall: {
    position: 'absolute',
    top: 0,
    height: rspH(550),
    width: scrn_width,
    zIndex: 1,
  },
});

export default styles;
