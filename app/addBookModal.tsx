import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '@/hooks/ThemeProvider';
import { useNavigation } from 'expo-router';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

const addBookModal = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ 
      contentStyle: {
        backgroundColor: theme.colors.background,
      },
      headerStyle: {
        backgroundColor: theme.colors.background,
      },
      headerTintColor: theme.colors.onBackground
  });
  }, [navigation, theme]);

  return (
    <View style={{backgroundColor:theme.colors.background}}>
      <Text>Ok</Text>
    </View>
  )
}

export default addBookModal