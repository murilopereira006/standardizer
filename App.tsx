import React, { createContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DarkModeSwitch from './src/components/DarkModeSwitch';
import colors from './colors.global';
import { PatterSelection } from './src/components/PatterSelection';

export const DarkTheme = createContext(true);

function App(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <DarkTheme value={isDarkMode}>
      <View style={[
        styles.container, 
        { 
          backgroundColor: isDarkMode 
          ? colors.dark.backgroundPrimary 
          : colors.light.backgroundPrimary 
        }
      ]}>
        <View style={styles.header} >
          <DarkModeSwitch setIsDarkMode={setIsDarkMode} />
        </View>
        <View style={styles.body} >
          <PatterSelection />

          {/**
          <FolderPicker /> 
          **/}
        </View>
      </View>
    </DarkTheme>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  body: {
    marginVertical: 10,
    gap: 10
  },
});

export default App;