import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'react-native';
import { ThemeProvider as PaperProvider, useTheme } from '@/hooks/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <Provider store={store}>
    <PaperProvider>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(book)/[id]" options={{ }} />
        <Stack.Screen
            name="addBookModal"
            options={{
              presentation: 'modal',
              title: 'ADD BOOK'
        }}
      />
      <Stack.Screen
            name="(edit)/[id]"
            options={{
              presentation: 'modal',
              title: 'EDIT BOOK'
        }}
      />
      </Stack>
    </PaperProvider>
    </Provider>
  );
}
