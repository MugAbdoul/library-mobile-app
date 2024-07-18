import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar, useColorScheme } from 'react-native';
import { ThemeProvider as PaperProvider, useTheme } from '@/hooks/ThemeProvider'; // Adjust the import path as per your file structure
import { DefaultTheme, DarkTheme } from '@react-navigation/native'; // Adjust the import based on your theme setup

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { theme } = useTheme();

  const [loaded] = useFonts({
    'mon-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'mon-semiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
