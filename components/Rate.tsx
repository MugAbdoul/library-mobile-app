import { View, StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { useTheme } from '@/hooks/ThemeProvider';

interface Props {
  rate: number;
}

const Rate: React.FC<Props> = ({ rate }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <MaterialIcons name="star-rate" size={18} color={theme.dark ? "yellow" : "yellow"} />
      <Text style={styles.text}>{rate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10
  },
  text: {
    marginLeft: 2,
    fontSize: 13,
  },
});

export default Rate;
