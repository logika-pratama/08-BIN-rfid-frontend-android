import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'react-native-paper'
import { useAuth } from '../contexts'
import HomeScreen from '../components/home-screen'
import DetailScreen from '../components/detail-screen'
import IntegrationModuleScreen from '../components/integration-module-screen'
import LoginScreen from '../components/login-screen'
import StylesKitchen from '../styles-kitchen'
import LoadingScreen from '../components/loading-screen'
import { NavbarHomeScreen } from '../components/navbar'

const Stack = createNativeStackNavigator()

const AppStack = ({ token }) => {
  const theme = useTheme()
  const whiteColor = theme.colors.white
  const primaryColor = theme.colors.primary

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={HomeScreen}
        options={{
          header: (props) => < NavbarHomeScreen {...props} />
        }}
        initialParams={{ token }}
      />
      <Stack.Screen
        name='integration_module'
        component={IntegrationModuleScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: primaryColor
          },
          headerTintColor: whiteColor,
        })}
        initialParams={{ token }}
      />
      <Stack.Screen
        name='detail'
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: primaryColor
          },
          headerTintColor: whiteColor,
        })}
        initialParams={{ token }}
      />
    </Stack.Navigator>
  )
}

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='login'
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

const NavigationStack = () => {
  const theme = useTheme()
  const { authData, loadingAuth } = useAuth()
  const Styles = new StylesKitchen(theme)
  const navigationStackStyles = Styles.navigationStackStyles()

  if (loadingAuth) {
    return <LoadingScreen />
  }

  return (
    <SafeAreaView style={navigationStackStyles.navigationStackContainer}>
      <NavigationContainer>
        {authData ? <AppStack token={authData.jwtToken} /> : <LoginStack />}
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default NavigationStack 