import React, { Node } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import StylesKitchen from '../../styles-kitchen'

const MenuScreen = ({ title }) => {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const menuScreenStyles = Styles.menuScreenStyles()

  return (
    <View style={menuScreenStyles.menuScreenContainer}>
      <Text style={menuScreenStyles.title}>
        {title}
      </Text>
    </View>
  )
}

export default MenuScreen