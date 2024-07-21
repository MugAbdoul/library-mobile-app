import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Snackbar, Text } from 'react-native-paper';
import { useTheme } from '@/hooks/ThemeProvider';

interface RatingModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  currentRating?: number;
}

const RatingModal: React.FC<RatingModalProps> = ({ visible, onClose, onSubmit, currentRating = 0 }) => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(currentRating);

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    onSubmit(rating);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={[styles.container]}>
        <View style={[styles.modal, {backgroundColor: theme.dark ? '#121212' : 'white'}]}>
          <Text style={styles.title}>Rate this Book</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }, (_, index) => {
              const starRating = index + 1;
              return (
                <TouchableOpacity key={starRating} onPress={() => handleRatingSelect(starRating)}>
                  <MaterialCommunityIcons
                    name={starRating <= rating ? 'star' : 'star-outline'}
                    size={40}
                    color={starRating <= rating ? 'gold' : 'gray'}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default RatingModal;
