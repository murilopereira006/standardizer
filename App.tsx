import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DarkModeSwitch from './src/components/DarkModeSwitch';
import colors from './colors.global';

function App(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: isDarkMode 
          ? colors.dark.backgroundPrimary 
          : colors.light.backgroundPrimary 
      }
    ]}>
      <DarkModeSwitch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
});

export default App;