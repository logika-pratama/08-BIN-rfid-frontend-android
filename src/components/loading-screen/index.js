import React, { Node } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native'
import { useTheme } from 'react-native-paper'
import StylesFactory from '../../styles-factory'

const LoadingScreen = (): Node => {
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const loadingStyles = Styles.loadingStyles()
  const primaryColor = theme.colors.primary

  return (
    <SafeAreaView style={loadingStyles.loadingContainer}>
      <ActivityIndicator color={primaryColor} animating={true} size="small" />
    </SafeAreaView>
  )
}

export default LoadingScreen