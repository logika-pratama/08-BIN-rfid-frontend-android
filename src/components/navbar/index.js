import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useTheme, IconButton } from 'react-native-paper'
import decode from 'jwt-decode'
import {
  SHEET_DB_URL,
  SHEET_DB_TIMEOUT,
  ERROR_TITLE
} from 'react-native-dotenv'
import InstanceServices from '../../services'
import { useSheetDb } from '../../contexts/sheet-db'
import { useAuth } from '../../contexts'
import StylesKitchen from '../../styles-kitchen'
import LoadingScreen from '../loading-screen'
import DivTikPolri from '../../assets/images/logo_divtik_verysmall.png'

const NavbarHomeScreen = () => {
  const { deleteToken } = useAuth()
  const { sheetDb, loadingSheetDb, saveSheet } = useSheetDb()
  const [loadingDownload, setLoadingDownload] = useState(false)
  const route = useRoute()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const navBarStyles = Styles.navBarStyles()
  const whiteColor = theme.colors.white
  const { token } = route.params

  // const { id_user, Device_ID, idaccount } = decode(token)

  const SheetDbService = new InstanceServices(SHEET_DB_URL, SHEET_DB_TIMEOUT)

  const handleLogout = async () => {
    await deleteToken()
  }

  const handleDownloadFile = (endPoint) => async () => {
    setLoadingDownload(true)
    const resp = await SheetDbService.getSheetDb(endPoint)
    if (resp.status) {
      if (resp.status === 200) {
        const data = resp.data
        saveSheet(data)
      }
    }
    else {
      const message = resp
      Alert.alert(
        ERROR_TITLE,
        message
      )
    }
    setLoadingDownload(false)
  }

  // const accountInfo = Device_ID ? `${id_user}/${Device_ID}` : `${id_user}`
  if (loadingSheetDb || loadingDownload) {
    return <LoadingScreen customLoadingContainer={navBarStyles.customLoadingContainer} />
  }

  return (
    <View style={navBarStyles.navbarContainer}>
      <IconButton icon='download' color={whiteColor} size={25} onPress={handleDownloadFile('/5ueoikmvi29vt')} />
      {/* <View style={navBarStyles.imageContainer} >
        <Image
          style={navBarStyles.imageStyle}
          source={DivTikPolri}
        />
      </View>
      <View style={navBarStyles.menuContainer}>
        <Text style={navBarStyles.textStyle}>
          {accountInfo}
        </Text>
        <IconButton icon='logout' color={whiteColor} size={25} onPress={handleLogout} />
      </View> */}
    </View>
  )
}

export { NavbarHomeScreen }