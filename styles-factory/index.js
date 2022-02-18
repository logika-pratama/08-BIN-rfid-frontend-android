import { StyleSheet } from 'react-native'

export default class StylesFactory {
  constructor(theme) {
    this.colors = theme?.colors
    this.fonts = theme?.fonts
  }

  createStyles = (obj = {}) => StyleSheet.create(obj)

  navigationStackStyles = () => this.createStyles({
    navigationStackContainer: {
      flex: 1,
    }
  })

  homeScreenStyles = () => this.createStyles({
    homeScreenContainer: {
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
      backgroundColor: this.colors?.lightGray,
    },
    title: {
      color: this.colors?.black,
      textAlign: 'left',
      fontSize: 12,
    }
  })
}