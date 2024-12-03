import {StyleSheet} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const insets = initialWindowMetrics?.insets;

const gStyles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  colBetween: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default gStyles;
