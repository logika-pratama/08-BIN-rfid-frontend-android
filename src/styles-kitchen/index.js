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
    buttonStyle: {
      borderRadius: 20,
      width: 110,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: this.colors?.accent,
      color: this.colors?.white
    }
  })

  fieldStyles = () => this.createStyles({
    fieldStyle: {
      width: '90%',
      overflow: 'hidden',
    }
  })

  surfaceStyles = () => this.createStyles({
    surfaceStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  boxStyles = () => this.createStyles({
    boxStyle: {
      padding: 8,
      height: 40,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  notificationStyles = () => this.createStyles({
    notificationStyle: {
    }
  })

  multipleNotificationsStyles = () => this.createStyles({
    multipleNotificationsStyle: {
      display: 'flex',
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'column',
      backgroundColor: this.colors?.primary
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
    buttonLoginContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
    buttonLoginStyle: {
      marginTop: 15
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
    customLoadingContainer: {
      backgroundColor: 'background: rgba(52,42,41,.5)'
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
    boxCountContainer: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      marginRight: 12,
      marginBottom: 12
    },
    customLoadingContainer: {
      backgroundColor: 'background: rgba(52,42,41,.5)'
    },
    surfaceScanQrBleTagContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 5,
      marginTop: 40,
      height: 100,
      backgroundColor: this.colors?.white
    },
    surfaceScanQrRfidTagContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 5,
      marginTop: 40,
      height: 100,
      backgroundColor: this.colors?.white
    },
    buttonScanQrBleTagStyle: {
      marginTop: 3,
      width: 165
    },
    buttonScanQrRfidTagStyle: {
      marginTop: 3,
      width: 165
    },
    buttonConfirmContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fieldUrlContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      marginTop: 40,
      marginBottom: 0
    },
    notificationUrlContainer: {
      flex: 1,
    },
    fieldUrlStyle: {
      marginBottom: 10
    },
    qrBleTextStyle: {
      color: this.colors.black,
      fontSize: 10,
    },
    qrRfidTextStyle: {
      color: this.colors.black,
      fontSize: 10,
    },
    boxTextStyle: {
      color: this.colors.black,
      fontWeight: '600'
    },
    feildsStyle: {
      width: '70%',
      overflow: 'hidden'
    },
    buttonConfirmStyle: {
      marginTop: 20,
      marginBottom: 40,
      width: 140
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

  rfidSecondaryScreenStyles = () => this.createStyles({
    rfidSecondaryScreenContainer: {
      display: 'flex',
      flex: 1,
      // marginTop: 48
    },
    imageContainer: {
      display: 'flex',
      paddingTop: 30,
      paddingBottom: 30,
      marginBottom: 20
    },
    imageStyle: {
      height: 200,
      width: 200,
      resizeMode: 'contain'
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 20,
      paddingBottom: 15,
      paddingLeft: 30,
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    contentStyle: {
      color: this.colors.primary,
      marginBottom: 5
    }
  })

  webViewStyles = () => this.createStyles({
    webViewContainer: {
      display: 'flex',
      flex: 1,
    }
  })

}