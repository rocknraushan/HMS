import {StyleSheet} from 'react-native';
import {rspH, rspHA, rspW, safe_top} from '../../../theme/responsive';
import gStyles from '../../../gStyles/gStyles';

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    ...gStyles.colCenter,
  },
  logoImg: {
    marginTop: -(safe_top || 0),
    width: rspH(200),
    height: rspH(200),
  },
});

export default styles;
