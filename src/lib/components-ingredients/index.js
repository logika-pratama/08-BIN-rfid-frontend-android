import React from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTheme, TextInput as TextInputPaper, Snackbar, Surface as SurfacePaper, FAB } from 'react-native-paper'
import StylesKitchen from '../../styles-kitchen'

export function Button({ customButtonStyles, label, loading, icon, onPress }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const buttonStyles = Styles.buttonStyles()

  const handlePress = () => {
    onPress()
  }

  return (
    <FAB
      style={[buttonStyles.buttonStyle, customButtonStyles]}
      icon={icon}
      label={label}
      loading={loading}
      onPress={handlePress} />
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
    <TextInputPaper
      style={[fieldStyles.fieldStyle, customFieldStyles]}
      name='url'
      onChange={handleChangeField(selectedIndex, selectedMenuId, selectedTitle, changeUrl)}
      value={selectedUrlScreen}
      label={`URL ${selectedTitle}`}
      placeholder={'url'}
    />
  )
}

export function Notification({ children, message, duration, onDismiss, customNotificationStyle }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const notificationStyles = Styles.notificationStyles()

  const handleDismiss = () => {
    onDismiss()
  }

  return (
    <Snackbar
      wrapperStyle={[notificationStyles.notificationStyle, customNotificationStyle]}
      visible={!!message}
      duration={duration}
      onDismiss={handleDismiss}>
      {children ? children : message}
    </Snackbar>
  )
}

export function MultipleNotifications({ messages, duration, onDismiss, customMultipleNotificationsStyle }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const multipleNotificationsStyles = Styles.multipleNotificationsStyles()

  const handleDismiss = (idx) => () => {
    onDismiss(idx)
  }

  if (messages.length > 0) {
    return messages.map((message, idx) => (
      <Snackbar
        key={idx}
        wrapperStyle={[multipleNotificationsStyles.multipleNltotificationsStyle, customMultipleNotificationsStyle]}
        visible={true}
        duration={duration}
        onDismiss={handleDismiss(idx)}>
        {message}
      </Snackbar>
    ))
    // return <View style={[multipleNotificationsStyles.multipleNltotificationsStyle, customMultipleNotificationsStyle]}>
    //   {messages.map((message, idx) => (
    //     <Text
    //       key={idx}>
    //       {message}
    //     </Text >
    //   ))}
    // </View>
  } else {
    return <Snackbar
      style={[multipleNotificationsStyles.multipleNltotificationsStyle, customMultipleNotificationsStyle]}
      visible={false}
      duration={duration}>
      {messages}
    </ Snackbar>
  }
}

export function Box({ children, customBoxStyle, elevation }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const boxStyles = Styles.boxStyles()

  return (
    <SurfacePaper style={[boxStyles.boxStyle, customBoxStyle]} elevation={elevation}>
      {children}
    </SurfacePaper>
  )
}

export function Surface({ children, customSurfaceStyle, elevation }) {
  const theme = useTheme()
  const Styles = new StylesKitchen(theme)
  const surfaceStyles = Styles.surfaceStyles()

  return (
    <SurfacePaper style={[surfaceStyles.surfaceStyle, customSurfaceStyle]} elevation={elevation}>
      {children}
    </SurfacePaper>
  )
}

export function Loading({ color }) {
  return (
    <ActivityIndicator color={color} animating={true} size="small" />
  )
}