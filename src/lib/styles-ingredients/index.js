import { configureFonts, DefaultTheme } from 'react-native-paper'

export const Colors = {
  primary: '#0065a8',
  secondary: '#ffd700',
  accent: '#0040a8',
  white: '#eeeeee',
  lightGray: '#D3D3D3',
  black: '#333333'
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
    secondary: Colors.secondary,
    accent: Colors.accent,
    white: Colors.white,
    lightGray: Colors.lightGray,
    black: Colors.black
  }
}