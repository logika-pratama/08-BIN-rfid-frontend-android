import React, { Node } from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import HomeScreen from '../components/home-screen'
import DetailScreen from '../components/detail-screen'
import LoginScreen from '../components/login-screen'
import StylesFactory from '../styles-factory'

const Stack = createNativeStackNavigator()

const NavigationStack = (): Node => {
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const navigationStackStyles = Styles.navigationStackStyles()

  return (
    <SafeAreaView style={navigationStackStyles.navigationStackContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='login'
            component={LoginScreen}
          />
          <Stack.Screen
            name='home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='detail'
            component={DetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default NavigationStack 