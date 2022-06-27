import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { useTheme, TextInput as TextInputPaper, Snackbar, Surface as SurfacePaper } from 'react-native-paper'
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

export function Field({ selectedIndex, selectedMenuId, selectedUrlScreen, selectedTitle, changeUrl, customFieldStyles }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const fieldStyles = Styles.fieldStyles()

  const handleChangeField = (selectedIndex, selectedMenuId, selectedTitle, changeUrl) => (e) => {
    const finalUrlScreen = e.nativeEvent.text
    changeUrl(selectedIndex, selectedMenuId, selectedTitle, finalUrlScreen)
  }

  return (
    <View style={fieldStyles.fieldContainer}>
      <TextInputPaper
        style={[fieldStyles.fieldStyle, customFieldStyles]}
        name='url'
        onChange={handleChangeField(selectedIndex, selectedMenuId, selectedTitle, changeUrl)}
        value={selectedUrlScreen}
        label={`URL ${selectedTitle}`}
        placeholder={'url'}
      />
    </View>
  )
}

export function Notification({ visible, children, message, duration, onDismiss, customNotificationStyle }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const notificationStyles = Styles.notificationStyles()

  const handleDismiss = () => {
    onDismiss()
  }

  return (
    <View style={notificationStyles.notificationContainer}>
      <Snackbar
        style={[notificationStyles.notificationStyle, customNotificationStyle]}
        visible={visible}
        duration={duration}
        onDismiss={handleDismiss}>
        {children ? children : message}
      </Snackbar>
    </View>
  )
}

export function Surface({ children, elevation, customBoxStyle }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const boxStyles = Styles.boxStyles()

  return (
    <View style={[boxStyles.boxContainer, customBoxStyle]}>
      <SurfacePaper style={boxStyles.boxStyle} elevation={elevation}>
        {children}
      </SurfacePaper>
    </View>
  )
}