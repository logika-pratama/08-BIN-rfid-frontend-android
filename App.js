import React, { Node, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider } from './src/contexts'
import NavigationStack from './src/navigation-stack'
import { Theme } from './src/lib/styles-ingredients'

const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <PaperProvider theme={Theme}>
      <AuthProvider>
        <NavigationStack />
      </AuthProvider>
    </PaperProvider>
  )
}

export default App
