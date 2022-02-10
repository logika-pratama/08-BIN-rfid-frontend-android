import React, { Node } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../components/home-screen'
import DetailScreen from '../components/detail-screen'

const Stack = createNativeStackNavigator()

const NavigationStack = (): Node => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
  )
}

export default NavigationStack 