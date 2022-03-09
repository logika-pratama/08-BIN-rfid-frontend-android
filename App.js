import React, { Node } from 'react';
import { Provider as PaperProvider } from 'react-native-paper'
import { AuthProvider } from './src/contexts'
import NavigationStack from './src/navigation-stack'
import { Theme } from './src/lib/styles-ingredients'

const App = (): Node => {
  return (
    <AuthProvider>
      <PaperProvider theme={Theme}>
        <NavigationStack />
      </PaperProvider>
    </AuthProvider>
  )
}

export default App;
