import React, { Node } from 'react'
import { View, Text, Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useAuth } from '../../contexts'
import StylesKitchen from '../../styles-kitchen'
import { Button } from '../../lib/components-ingredients'
import LogistikPolri from '../../assets/images/logistik_polri.png'

const NavbarHomeScreen = (): Node => {
  const { deleteToken } = useAuth()
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const navBarStyles = Styles.navBarStyles()

  const handleLogout = async () => {
    await deleteToken()
  }

  return (
    <View style={navBarStyles.navbarContainer}>
      <View style={navBarStyles.imageContainer} >
        <Image
          style={navBarStyles.imageStyle}
          source={LogistikPolri}
        />
      </View>
      <View style={navBarStyles.menuContainer}>
        <Button onPress={handleLogout} text='Keluar' />
      </View>
    </View>
  )
}

export { NavbarHomeScreen }