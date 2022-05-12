import React, { Node } from 'react'
import { Pressable, View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import StylesKitchen from '../../styles-kitchen'

export function Button({ onPress, text, isDisabled, customButtonStyles, customTextStyles }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const buttonStyles = Styles.buttonStyles()

  const handlePress = () => {
    onPress()
  }

  return (
    <View style={buttonStyles.buttonContainer}>
      <Pressable style={[buttonStyles.buttonStyle, customButtonStyles]} onPress={handlePress} disabled={isDisabled}>
        <Text style={[buttonStyles.textStyle, customTextStyles]}>
          {text}
        </Text>
      </Pressable>
    </View>
  )
}