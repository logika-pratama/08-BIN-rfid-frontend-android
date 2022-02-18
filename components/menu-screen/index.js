import React, { Node } from 'react'
import { Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import StylesFactory from '../../styles-factory'

const MenuScreen = ({ title }): Node => {
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
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