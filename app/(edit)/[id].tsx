import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/ThemeProvider';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import { bookGenresWithIcons } from '@/constants/data';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import { fetchBooks, editBook } from '@/redux/booksSlice';

const EditBookModal = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const bookStatus = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);
  const books = useSelector((state: RootState) => state.books.books);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rate, setRate] = useState<number | null>(null);
  const [author, setAuthor] = useState('');
  const [read, setRead] = useState<Number | undefined>();
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

    navigation.setOptions({
      contentStyle: { backgroundColor: theme.colors.background },
      headerStyle: { backgroundColor: theme.colors.background },
      headerTintColor: theme.colors.onBackground,
    });
  }, [ navigation, theme]);

  useEffect(() => {
    const book = books.find((book) => book.id === Number(id));
    if (book) {
      setTitle(book.title);
      setDescription(book.description);
      setRate(book.rate);
      setAuthor(book.author);
      setCreatedDate(book.createdDate);
      setImage(book.image);
      setGenre(book.type);
      setRead(book.read);
    }
  }, [id]);

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

  const handleSave = async () => {
    if (!title || !description || !author || !genre) {
      setSnackError(true);
      setMessage('Please fill in all fields.');
      setVisible(true);
      return;
    }

    const data = {
      id: Number(id),
      title,
      description,
      type: genre,
      rate,
      image,
      author,
      createdDate,
      read: Number(read),
    };

    try {
      await dispatch(editBook(data)).unwrap();
      setSnackError(false);
      setMessage('Book updated successfully!');
      setVisible(true);
      navigation.goBack();
    } catch (err) {
      setSnackError(true);
      setMessage('Failed to update book.');
      setVisible(true);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background, paddingHorizontal: 16 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={(text) => {
          console.log("Title: ", text);
          setTitle(text);
        }}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(text) => {
          console.log("Description: ", text);
          setDescription(text);
        }}
        style={styles.input}
      />
      {/* <TextInput
        label="Rate"
        value={rate?.toString() || ''}
        onChangeText={(text) => {
            console.log("Rate: ", text);
            const value = parseFloat(text);
            if (!isNaN(value) || text === '') {
            setRate(text === '' ? null : value);
            }
        }}
        keyboardType="numeric"
        style={[styles.input, disp]}
        /> */}
      <TextInput
        label="Author"
        value={author}
        onChangeText={(text) => {
          console.log("Author: ", text);
          setAuthor(text);
        }}
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
        Update Book
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

export default EditBookModal;
