export interface Theme {
  midnightBlue: string;
  white: string;
  Black:string;
  grey50: string;
  grey100: string;
  grey200: string;
  grey300: string;
  grey400: string;
  grey500: string;
  grey600: string;
  grey700: string;
  grey800: string;
  grey900: string;

  deepTeal: string;
  teal: string;
  lightTeal: string;
  green: string;
  paleGreen: string;

  darkRed: string;
  deepPink: string;
  pink: string;
  lightPink: string;
  lightPurple: string;

  blue: string;
  paleBlue: string;
  purple: string;
  orange: string;
}

const light_theme: Theme = {
  midnightBlue: '#2C3A5A',
  white: '#FFFFFF',

  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',

  deepTeal: '#014737',
  teal: '#02897A',
  lightTeal: '#A4CEC3',
  green: '#93C6B6',
  paleGreen: '#DEF7E4',

  darkRed: '#771919',
  deepPink: '#EC3A47',
  pink: '#E0B6B5',
  lightPink: '#FEBEBA',
  lightPurple: '#A8ACAD',

  blue: '#1C64F2',
  paleBlue: '#89C0DB',
  purple: '#5A226F',
  orange: '#FA7D7F',
  Black:'#000000'
};

const dark_theme: Theme = {
  ...light_theme,
  white: '#000000',
  midnightBlue: '#FFFFFF',
};

const defaultTheme: Theme = light_theme;

export default defaultTheme;
export { light_theme, dark_theme };
