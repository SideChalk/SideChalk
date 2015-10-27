// ================= resources: colors ================ //

const colors = {
  wetAsphalt: '#34495E',
  greenSea: '#2C3E50',
  concrete: '#95A5A6',
  asbestos: '#7F8C8D',
  clouds: '#ECF0F1',
  silver: '#BDC3C7'
};

const materialColors = {
  blueGreys: {
    50: '#ECEFF1',
    100: '#CFD8DC',
    200: '#B0BEC5',
    300: '#90A4AE',
    400: '#78909C',
    500: '#607D8B',
    600: '#546E7A',
    700: '#455A64',
    800: '#37474F',
    900: '#263238',
  },
  greys: {
    50 : '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  }
};

const cssTricksColors = {
  nearBlack: '#111',
  darkShadow: '#222',
  darkSmoothGrey: '#333',
  mediumSmoothGrey: '#444',
  mediumGrey: '#555',
  white: '#eee',
  lightCloudyGrey: '#b4b4b4',
  snazzyBlue: '#2793C7'
};

const victorColors = {
  snazzyOrange: '#BF4E30'
};

const palette = {
  brightText: cssTricksColors.white,
  softText: cssTricksColors.lightCloudyGrey,
  highlightTextCool: cssTricksColors.snazzyBlue,
  highlightTextWarm: victorColors.snazzyOrange,
  button: cssTricksColors.snazzyBlue,
  darkBackground: cssTricksColors.darkShadow,
  midBackground: cssTricksColors.darkSmoothGrey,
  lightBackground: cssTricksColors.mediumSmoothGrey
  // primary1Color: Colors.cyan500,
  // primary2Color: Colors.cyan700,
  // primary3Color: Colors.lightBlack,
  // accent1Color: Colors.pinkA200,
  // accent2Color: Colors.grey100,
  // accent3Color: Colors.grey500,
  // textColor: Colors.darkBlack,
  // alternateTextColor: Colors.white,
  // canvasColor: Colors.white,
  // borderColor: Colors.grey300,
  // disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
};

// ================= resources: fonts ================ //

const fonts = {
  serifChoice: 'Oswald',
  sansSerifChoice: 'Futura'
};

// ================= resources: spacing ================ //

const spacing = {
  smallMargin: '5px',
  bigMargin: '10px',
  smallPadding: '5px',
  bigPadding: '10px',
  rounding: '2px'
};


// ================= specific sets ================ //

export const rootStyle = {
  backgroundColor: palette.darkBackground,
  color: palette.softText
};