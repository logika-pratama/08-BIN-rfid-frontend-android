import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import StylesKitchen from '../../styles-kitchen'

const NavbarHomeScreen = () => {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const navBarStyles = Styles.navBarStyles()

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