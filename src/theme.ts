import { theme } from '@chakra-ui/core';
import { ColorHues } from '@chakra-ui/core/dist';

// Color Creator function
const createColor = (objRange: string[]): ColorHues => {
  let obj = {
    50: '',
    100: '',
    200: '',
    300: '',
    400: '',
    500: '',
    600: '',
    700: '',
    800: '',
    900: ''
  };
  [obj[900], obj[800], obj[700], obj[600], obj[500], obj[400], obj[300], obj[200], obj[100], obj[50]] = objRange;
  return obj;
};

//Color ranges
// ---------------- 900 ------- 800 ------- 700 ------ 600 ------ 500 ------ 400 ------ 300 ------ 200 ----- 100 ------- 50 ----
// https://gka.github.io/palettes/#/10|s|000000,585858|ffffe0,ff005e,93003a|0|0
const blackRange = ['#000000', '#0a0a0a', '#141414', '#1d1d1d', '#272727', '#313131', '#3b3b3b', '#444444', '#4e4e4e', '#585858'];

// https://gka.github.io/palettes/#/10|s|1c2d4e|ffffe0,ff005e,93003a|0|0
const navyRange = ['#031a38', '#1c2d4e', '#334265', '#4a587c', '#626f95', '#7a87ae', '#939fc8', '#acb9e3', '#c6d3fe', '#e1edff'];

// https://gka.github.io/palettes/#/10|s|447df7|ffffe0,ff005e,93003a|0|0
const blueRange = ['#001774', '#00288d', '#003ba7', '#0050c1', '#0e66dc', '#447df7', '#6695ff', '#85aeff', '#a3c8ff', '#c0e2ff'];

// https://gka.github.io/palettes/#/10|s|aaaaaa,d8d8d8,f5f5f5|ffffe0,ff005e,93003a|0|1
const grayRange = ['#aaaaaa', '#b4b4b4', '#bdbdbd', '#c6c6c6', '#cfcfcf', '#d8d8d8', '#e0e0e0', '#e7e7e7', '#eeeeee', '#f5f5f5'];

// https://gka.github.io/palettes/#/10|s|45bf88|ffffe0,ff005e,93003a|0|0
const greenRange = ['#002000', '#002e01', '#004319', '#005b2d', '#007342', '#008b59', '#22a570', '#45bf88', '#62daa1', '#7ef5ba'];

// https://gka.github.io/palettes/#/10|s|bd2624|ffffe0,ff005e,93003a|0|0
const redRange = ['#4f0000', '#670000', '#830000', '#9f0010', '#bd2624', '#db4439', '#f95f4f', '#ff7966', '#ff947e', '#ffae97'];

// https://gka.github.io/palettes/#/10|s|ffa000|ffffe0,ff005e,93003a|0|0
const orangeRange = ['#460000', '#591300', '#712a00', '#8a4100', '#a65800', '#c36f00', '#e18700', '#ffa000', '#ffba2e', '#ffd44b'];

// https://gka.github.io/palettes/#/10|s|ffd900|ffffe0,ff005e,93003a|0|0
const yellowRange = ['#3a1d00', '#473200', '#5b4800', '#725e00', '#8c7500', '#a88d00', '#c5a600', '#e2bf00', '#ffd900', '#fff436'];

export const dark = createColor(blackRange);
// Default is navy.800
export const navy = createColor(navyRange);
// Default is blue.400
export const blue = createColor(blueRange);
// Defaults are gray.900 , gray.50 , gray.400
export const gray = createColor(grayRange);
// Default green.200
export const green = createColor(greenRange);
// Default red.500
export const red = createColor(redRange);
// Default orange.200
export const orange = createColor(orangeRange);
// Default yellow.100
export const yellow = createColor(yellowRange);

export const appTheme = {
  ...theme,

  ////////////////////////////////////////////////////////////////
  // To configure the default breakpoints used in responsive
  // array values, add a breakpoints array to your theme.
  // These values will be used to generate mobile-first
  // (i.e. min-width) media queries, which can then be
  // used to apply responsive styles.
  // For example, you can write <Box fontSize={["14px", "16px"]}/>
  // to make the fontSize will be responsive.
  ////////////////////////////////////////////////////////////////
  // breakpoints: ["30em", "48em", "62em", "80em"],

  ////////////////////////////////////////////////////////////////
  // By default these colors can be referenced by the color,
  // borderColor, and backgroundColor, fill, stroke, styles.
  // We recommend adding palette that go from 50 - 900
  ////////////////////////////////////////////////////////////////
  colors: {
    ...theme.colors,
    dark,
    navy,
    blue,
    gray,
    green,
    red,
    orange,
    yellow
  },
  ////////////////////////////////////////////////////////////////
  // Manage the typography below
  ////////////////////////////////////////////////////////////////
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, Helvetica, sans-serif',
    mono: 'Menlo, monospace'
  }
};
