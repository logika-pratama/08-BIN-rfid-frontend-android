import React from 'react'
import { View, Text } from 'react-native'
import { useTheme, IconButton } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import decode from 'jwt-decode'
import { useAuth } from '../../contexts'
import StylesKitchen from '../../styles-kitchen'

const NavbarHomeScreen = () => {
  const { deleteToken } = useAuth()
  const route = useRoute()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const navBarStyles = Styles.navBarStyles()
  const whiteColor = theme.colors.white
  const { token } = route.params

  const { id_user, Device_ID } = decode(token)

  const handleLogout = async () => {
    await deleteToken()
  }

  const accountInfo = Device_ID ? `${id_user}/${Device_ID}` : `${id_user}`

  return (
    <View style={navBarStyles.navbarContainer}>
      <View style={navBarStyles.menuContainer}>
        <Text style={navBarStyles.textStyle}>
          {accountInfo}
        </Text>
        <IconButton icon='logout' color={whiteColor} size={25} onPress={handleLogout} />
      </View>
    </View>
  )
}

export { NavbarHomeScreen }