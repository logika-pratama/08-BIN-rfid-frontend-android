import React, { Node } from 'react';
import { Provider as PaperProvider } from 'react-native-paper'
import NavigationStack from './navigation-stack';
import { Theme } from './lib/styles-ingredients';

const App: () => Node = () => {
  return (
    <PaperProvider theme={Theme}>
      <NavigationStack />
    </PaperProvider>
  );
};

export default App;
