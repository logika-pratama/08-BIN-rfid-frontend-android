import { StyleSheet } from 'react-native'

export default class StylesFactory {
  constructor(theme) {
    this.colors = theme?.colors
    this.fonts = theme?.fonts
  }

  createStyles = (obj = {}) => StyleSheet.create(obj)

  navigationStackStyles = () => this.createStyles({
    navigationStackContainer: {
      display: 'flex',
      flex: 1,
    }
  })

  loginScreenStyles = () => this.createStyles({
    loginScreenContainer: {
      display: 'flex',
      flex: 1,
      backgroundColor: this.colors?.lightGray,
    },
    formContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    }
  })

  homeScreenStyles = () => this.createStyles({
    homeScreenContainer: {
      display: 'flex',
      flex: 1,
      backgroundColor: this.colors?.lightGray,
    }
  })

  menuScreenStyles = () => this.createStyles({
    menuScreenContainer: {
      backgroundColor: this.colors?.accent,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      fontSize: 12,
    }
  })

  navBarStyles = () => this.createStyles({
    navbarContainer: {
      display: 'flex',
      flex: .1,
      backgroundColor: this.colors?.primary,
    },
    sectionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
      marginRight: 24
    },
    sectionChildren: {
      marginRight: 8
    }
  })

  detailScreenStyles = () => this.createStyles({
    detailScreenContainer: {
      display: 'flex',
      flex: 1,
      backgroundColor: this.colors?.lightGray,
    },
    title: {
      color: this.colors?.black,
      textAlign: 'left',
      fontSize: 12,
    }
  })
}