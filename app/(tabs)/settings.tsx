import ToggleSwitch from '@/components/ToggleSwitch';
import { useTheme } from '@/hooks/ThemeProvider';
import React, { useState } from 'react';
import { View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


 const SettingScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:theme.colors.background, padding: 20 }}>
      <Text variant='headlineLarge' style={{marginBottom: 20}}>Settings</Text>
      <ToggleSwitch
        icon="brightness-4"
        label="Dark Mode"
        value={theme.dark}
        colors={theme.colors}
        onToggle={()=> toggleTheme()}
      />
    </SafeAreaView>
  );
};

export default SettingScreen;