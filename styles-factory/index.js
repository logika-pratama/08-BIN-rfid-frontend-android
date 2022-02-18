import { StyleSheet } from 'react-native'

export default class StylesFactory {
  constructor(theme) {
    this.colors = theme?.colors
    this.fonts = theme?.fonts
  }

  createStyles = (obj = {}) => StyleSheet.create(obj)

  homeScreenStyles = () => this.createStyles({
    homeScreenContainer: {
      flex: 1
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

  navigationHomeStyles = () => this.createStyles({
    navigationHomeContainer: {
      flex: 1,
    }
  })

  navBarStyles = () => this.createStyles({
    navbarContainer: {
      flex: .1,
      backgroundColor: this.colors?.primary,
    },
    sectionContainer: {
      display: 'flex',
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
      flex: 1,
      backgroundColor: '#eeeeee',
      marginVertical: 8,
      marginHorizontal: 16
    },
    title: {
      color: '#333333',
      textAlign: 'left',
      fontSize: 12,
    }
  })
}