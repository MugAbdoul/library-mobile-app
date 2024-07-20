import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeProvider';

const Favoured = () => {
  const { theme } = useTheme();
  const [favored, setFavored] = useState(false);

  const toggleFavored = () => {
    setFavored(!favored);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleFavored}>
      <Ionicons
        name={favored ? "checkmark-done-circle-sharp" : "checkmark-done-circle-outline"}
        size={27}
        color={favored ? theme.colors.primary : "black"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  }
});

export default Favoured;
