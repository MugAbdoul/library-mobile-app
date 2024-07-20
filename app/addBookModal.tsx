import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/ThemeProvider';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { bookGenresWithIcons } from '@/constants/data';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import { createBooksTable, addNewBook, fetchBooks } from '@/redux/booksSlice';

const AddBookModal = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const bookStatus = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState<number | null>(null);
  const [author, setAuthor] = useState('');
  const [createdDate, setCreatedDate] = useState(new Date().toISOString());
  const [image, setImage] = useState<string | null>(null);
  const [genre, setGenre] = useState<string>(bookGenresWithIcons[1].genre);
  const [open, setOpen] = useState(false);
  const [genreList, setGenreList] = useState(
    bookGenresWithIcons.filter(item => item.genre !== 'All').map(item => ({
      label: item.genre,
      value: item.genre,
    }))
  );

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [snackError, setSnackError] = useState(false);

  useEffect(() => {
    dispatch(createBooksTable());

    navigation.setOptions({
      contentStyle: { backgroundColor: theme.colors.background },
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.onBackground,
    });
  }, [dispatch, navigation, theme]);

  useEffect(() => {
    if (bookStatus === 'succeeded') {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!title || !description || !author || !rate || !genre) {
      setSnackError(true);
      setMessage('Please fill in all fields.');
      setVisible(true);
      return;
    }

    dispatch(addNewBook({
      title,
      description,
      type: genre,
      rate,
      image,
      author,
      createdDate,
    })).then(() => {
      if (bookStatus === 'succeeded') {
        dispatch(fetchBooks());
        setTitle("");
        setDescription("");
        setGenre("");
        setRate(0);
        setImage("");
        setAuthor("");
    
        setSnackError(false);
        setMessage('Book added successfully!');
        setVisible(true);
      } else if (bookStatus === 'failed') {
        setSnackError(true);
        setMessage(error || 'Failed to add book.');
        setVisible(true);
      }
    });
    
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background, paddingHorizontal: 16 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        label="Rate"
        value={rate?.toString() || ''}
        onChangeText={(text) => setRate(parseFloat(text))}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Author"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <DropDownPicker
        open={open}
        value={genre}
        items={genreList}
        setOpen={setOpen}
        setValue={setGenre}
        setItems={setGenreList}
        style={[styles.picker, {marginBottom: 10}]}
      />
      <Button mode="contained" onPress={handleImagePicker} style={styles.button}>
        Select Image
      </Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Book
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: snackError ? 'red' : 'green' }}
      >
        {message}
      </Snackbar>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
    paddingVertical: 10
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  picker: {
    height: 40,
  },
});

export default AddBookModal;
