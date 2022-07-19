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
      display: 'flex',
      flex: 1,
      position: 'absolute',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      backgroundColor: this.colors?.accent,
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

  fieldStyles = () => this.createStyles({
    fieldContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5
    },
    fieldStyle: {
      width: '90%',
      overflow: 'hidden',
    }
  })

  boxStyles = () => this.createStyles({
    boxContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: 10,
      marginBottom: 15
    },
    boxStyle: {
      padding: 8,
      height: 40,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  notificationStyles = () => this.createStyles({
    notificationContainer: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notificationStyle: {
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
      width: 164,
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

  integrationModuleScreenStyles = () => this.createStyles({
    integrationModuleScreenContainer: {
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
      width: 36,
      height: 39
    },
    textStyle: {
      alignSelf: 'center',
      color: this.colors?.white
    }
  })

  rfidScreenStyles = () => this.createStyles({
    rfidScreenContainer: {
      display: 'flex',
      flex: 1,
      // marginTop: 48,
      marginLeft: 2,
      marginRight: 2,
      backgroundColor: this.colors?.white,
    },
    searchingContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 40,
      marginLeft: 16,
      marginBottom: 24
    },
    dropdownContainer: {
      display: 'flex',
      width: '75%',
      marginTop: 40,
      marginLeft: 16,
      marginBottom: 24,
    },
    boxContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 12,
      marginRight: 12
    },
    customLoadingContainer: {
      backgroundColor: 'background: rgba(52,42,41,.5)'
    },
    boxModel: {
      // borderWidth: '1',
      borderColor: 'red',
      height: 60,
      width: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: this.colors?.accent
    },
    boxText: {
      color: this.colors.black,
      fontWeight: '600'
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
    tableHeadersStyle: {
      backgroundColor: this.colors?.accent,
    },
    tableBodyStyle: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15
    },
    cellsFooter: {
      textAlign: 'right'
    },
    tableHeaderTitleStyle: {
      marginRight: 15
    },
    tableHeadersTitleText: {
      color: this.colors?.white
    },
    tableBodyTitleText: {
      display: 'flex',
      backgroundColor: this.colors?.white,
      color: this.colors?.primary
    },
    tableFootersTitleText: {
      color: this.colors?.white,
      textAlign: 'right'
    }
  })

  webViewStyles = () => this.createStyles({
    webViewContainer: {
      display: 'flex',
      flex: 1,
    }
  })

}