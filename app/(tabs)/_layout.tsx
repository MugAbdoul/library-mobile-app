import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/hooks/ThemeProvider';
import { StatusBar } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

const TabsLayout = () => {
  const { theme } = useTheme();
  console.log(theme.dark);
  return (
    <ThemeProvider value={theme.dark ? DarkTheme : DefaultTheme}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <Tabs 
        screenOptions={{ 
          headerShown: false, 
          // tabBarActiveTintColor: 'green'
          }}
          initialRouteName='index'
          >
        
        <Tabs.Screen 
          name='search'
          options={{
            title: 'Search',
            tabBarIcon:  ({ color, focused, size }) => (
              <Ionicons name={focused? 'search' : 'search-sharp'} size={size} color={color}/>
            ),

          }}
        />
        <Tabs.Screen 
          name='index'
          options={{
            title: 'Explore',
            tabBarIcon:  ({ color, focused, size }) => (
              <Ionicons name={focused? 'home' : 'home-outline'} size={size} color={color}/>
            )

          }}
        />
        <Tabs.Screen 
          name='settings'
          options={{
            title: 'Settings',
            tabBarIcon:  ({ color, focused, size }) => (
              <Ionicons name={focused? 'settings' : 'settings-outline'} size={size} color={color}/>
            ),

          }}
        />
      </Tabs>
    </ThemeProvider>
      
  )
}

export default TabsLayout;