import { StyleSheet } from 'react-native'

export default class StylesKitchen {
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

  loadingStyles = () => this.createStyles({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: this.colors?.white,
    }
  })

  buttonStyles = () => this.createStyles({
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonStyle: {
      borderRadius: 20,
      width: 100,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: this.colors?.accent
    },
    textStyle: {
      color: this.colors?.white
    }
  })

  loginScreenStyles = () => this.createStyles({
    loginScreenContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: this.colors?.lightGray,
    },
    formContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    feildsStyle: {
      width: '80%',
      marginBottom: 6,
      overflow: 'hidden',
    },
    imageAndTextContainer: {
      alignItems: 'center',
      marginBottom: 30
    },
    imageStyle: {
      width: 150,
      height: 175
    },
    textStyle: {
      color: this.colors.primary,
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold'
    },
    buttonStyle: {
      marginTop: 10
    }
  })

  homeScreenStyles = () => this.createStyles({
    homeScreenContainer: {
      display: 'flex',
      flex: 1,
      marginTop: 10,
      backgroundColor: this.colors?.white,
    }
  })

  menuScreenStyles = () => this.createStyles({
    menuScreenContainer: {
      backgroundColor: this.colors?.accent,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    },
    title: {
      textAlign: 'center',
      fontSize: 16,
      color: this.colors?.white
    }
  })

  navBarStyles = () => this.createStyles({
    navbarContainer: {
      display: 'flex',
      // flex: .1,
      height: 65,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: this.colors?.primary
    },
    menuContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginRight: 8,
    },
    imageContainer: {
      marginLeft: 16
    },
    imageStyle: {
      width: 33,
      height: 39
    },
    textStyle: {
      alignSelf: 'center',
      color: this.colors?.white
    }
  })

  detailScreenStyles = () => this.createStyles({
    detailScreenContainer: {
      display: 'flex',
      flex: 1,
      marginTop: 48,
      marginLeft: 2,
      marginRight: 2,
      backgroundColor: this.colors?.white,
    },
    searchingContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 16,
      marginBottom: 24
    },
    feildsStyle: {
      width: '70%',
      overflow: 'hidden'
    },
    buttonStyle: {
      marginTop: 10,
      marginBottom: 40,
    },
    tableContainer: {
      marginBottom: 24
    },
    tableHeaders: {
      backgroundColor: this.colors?.accent,
    },
    tableHeadersTitle: {
      color: this.colors?.white
    }
  })

}