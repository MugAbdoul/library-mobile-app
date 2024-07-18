import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeProvider as PaperProvider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';

type ThemeContextType = {
  theme: typeof DefaultTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: DefaultTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const themeDefault = useColorScheme() === 'dark' ? MD3DarkTheme : DefaultTheme;
  const [theme, setTheme] = useState(themeDefault);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme === 'dark' ? MD3DarkTheme : DefaultTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === DefaultTheme ? MD3DarkTheme : DefaultTheme;
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme.dark ? 'dark' : 'light')
      .catch(error => console.error('Error saving theme:', error));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
