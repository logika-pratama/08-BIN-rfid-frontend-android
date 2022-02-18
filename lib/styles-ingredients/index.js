import { configureFonts, DefaultTheme } from 'react-native-paper'

export const Colors = {
  primary: '#342A29',
  accent: '#504141',
  white: '#eeeeee'
}

export const Fonts = {
  default: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
}

export const Theme = {
  ...DefaultTheme,
  fonts: configureFonts(Fonts),
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent
  }
}