export interface Theme {
  white: string;
  black: string;
  grey: string;

  darkRed: string;
  red: string;
  green: string;
  blue: string;
  lightBlue: string;
  darkGrey: string;
  lightgrey: string;
  doveGrey: string;
}

const light_theme: Theme = {
  white: '#fff',
  black: '#000',
  grey: '#747474',

  darkRed: '#E52322',
  red: '#FF3D3D',
  green: '#19B500',
  blue: '#4F8BED',
  lightBlue: '#EBF2FF',
  darkGrey: '#0F0F0F',
  lightgrey: '#D9D9D9',
  doveGrey: '#646464'
};
const dark_theme: Theme = {
  white: '#000',
  black: '#fff',
  grey: '#747474',

  darkRed: '#E52322',
  red: '#FF3D3D',
  green: '#19B500',
  blue: '#4F8BED',
  lightBlue: '#EBF2FF',
  darkGrey: '#0F0F0F',
  lightgrey: '#D9D9D9',
  doveGrey: '#646464'
};
const defaultTheme: Theme = {
  white: '#ffffff',
  black: '#000000',
  grey: '#747474',

  darkRed: '#E52322',
  red: '#FF3D3D',
  green: '#19B500',
  blue: '#4F8BED',
  lightBlue: '#EBF2FF',
  darkGrey: '#0F0F0F',
  lightgrey: '#D9D9D9',
  doveGrey: '#646464'
};
export default defaultTheme;
export {light_theme, dark_theme};
