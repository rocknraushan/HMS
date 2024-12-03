import {Dimensions, PixelRatio, Platform} from 'react-native';
import {
  EdgeInsets,
  Metrics,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {scale, moderateScale} from 'react-native-size-matters';

// const insets = initialWindowMetrics?.insets;

const insets: EdgeInsets | undefined = initialWindowMetrics?.insets;

const {width, height} = Dimensions.get('screen');

const scrn_width = width;
const scrn_height = height;

// f_hight = figma screen height
const f_height: number = 932;
const f_width: number = 430;

const fl_per: number = 1.2;

const safe_top: number | undefined = insets?.top;
const safe_bottom: number | undefined = insets?.bottom;

const act_hg =
  scrn_height -
  (Platform.OS === 'android' ? (safe_top || 0) + (safe_bottom || 0) : 0);

const rspF = (val: number) => {
  // let res = (val / f_height) * (height)
  let res = (val / f_height) * height;

  return res;
};

const rspF2 = (val: number) => {
  let res = scale(val);
  // let res =  (val/ (f_height/f_width) ) * (scrn_height/scrn_width) ;
  return res;
};

const rspFL = (val: number) => {
  let res = (val / f_height) * scrn_height * fl_per;
  return res;
};

const rspH = (val: number) => {
  let res = (val / f_height) * scrn_height;
  return res;
};

const rmTop: number | undefined =
  Platform.OS == 'ios' ? insets?.bottom : insets?.top;

const rspHA = (val: number) => {
  let res = (val / f_height) * scrn_height - (rmTop || 0);
  return res;
};

const rspW = (val: number) => {
  let res = (val / f_width) * scrn_width;
  return res;
};

export {
  scrn_width,
  scrn_height,
  act_hg,
  rspH,
  rspHA,
  rspW,
  rspF,
  rspFL,
  safe_top,
  safe_bottom,
};
