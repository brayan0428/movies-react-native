import { StatusBar } from 'react-native';
import React, { useState } from 'react';
import {
  DarkTheme as DarkThemePaper,
  DefaultTheme as DefaultThemePaper,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DarkTheme as DarkThemeNavigation,
  DefaultTheme as DefaultThemeNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import ThemeContext from './src/context/ThemeContext';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(true)

  const toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  const preferences = {
    darkTheme,
    toggleTheme
  }

  DefaultThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.primary = "#1ae1f2"
  DarkThemePaper.colors.accent = "#1ae1f2"

  DarkThemeNavigation.colors.background = "#192734"
  DarkThemeNavigation.colors.card = "#15212b"
  
  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={darkTheme ? DarkThemePaper : DefaultThemePaper}>
        <StatusBar barStyle={darkTheme ? "light-content" : "dark-content"}/>
        <NavigationContainer theme={darkTheme ? DarkThemeNavigation : DefaultThemeNavigation}>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export default App;
