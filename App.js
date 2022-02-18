import React, { Node } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import NavigationStack from './navigation-stack';
import { Theme } from './lib/styles-ingredients';
import StylesFactory from './styles-factory'

const NavigationHome = (): Node => {
  const theme = useTheme()
  const Styles = new StylesFactory(theme)
  const navigationHomeStyles = Styles.navigationHomeStyles()
  return (
    <SafeAreaView style={navigationHomeStyles.navigationHomeContainer}>
      <NavigationStack />
    </SafeAreaView >
  );
};

const App: () => Node = () => {
  return (
    <PaperProvider theme={Theme}>
      <NavigationHome />
    </PaperProvider>
  );
};

export default App;
