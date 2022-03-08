import React, { Node, useEffect, useState } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import decode from 'jwt-decode'
import HomeScreen from '../components/home-screen'
import DetailScreen from '../components/detail-screen'
import LoginScreen from '../components/login-screen'
import StylesFactory from '../styles-factory'

// * Checking JWT Auth
const checkAuth = async () => {
  try {
    const token = await AsyncStorage.getItem('@token')
    try {
      const { exp } = decode(token)
      if (exp < new Date().getTime() / 1000) {
        return false
      }
    } catch (e) {
      return false
    }
    return token
  } catch (err) {
    console.log('Failed get token from async storage', err)
    return false
  }
}

const Stack = createNativeStackNavigator()

const AppStack = ({ token }): Node => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={HomeScreen}
      />
      <Stack.Screen
        name='detail'
        component={DetailScreen}
        initialParams={{ token: token }}
      />
    </Stack.Navigator>
  )
}

const LoginStack = (): Node => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='home'
        component={HomeScreen}
      />
    </Stack.Navigator>
  )
}

const NavigationStack = (): Node => {
  const theme = useTheme()
  const [token, setToken] = useState(false)
  const Styles = new StylesFactory(theme)
  const navigationStackStyles = Styles.navigationStackStyles()

  useEffect(() => {
    async function handleAsyncCheckOut() {
      const token = await checkAuth()
      setToken(token)
    }
    handleAsyncCheckOut()
  }, [])

  return (
    <SafeAreaView style={navigationStackStyles.navigationStackContainer}>
      <NavigationContainer>
        {/* <LoginStack /> */}
        {token ? <AppStack token={token} /> : <LoginStack />}
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default NavigationStack 