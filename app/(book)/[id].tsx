import { View, Dimensions, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchBooks, updateBookReadStatus, removeBook, updateRate } from '@/redux/booksSlice';
import { useTheme } from '@/hooks/ThemeProvider';
import { Snackbar, Text } from 'react-native-paper';
import RatingModal from '@/components/RatingModal';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;

const Book = () => {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const dispatch = useDispatch<AppDispatch>();
  const { books, status, error } = useSelector((state: RootState) => state.books);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [snackError, setSnackError] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const book = books.find((book) => book.id === Number(id));

  const toggleFavoriteStatus = () => {
    if (book) {
      dispatch(updateBookReadStatus({ id: Number(book.id), read: book.read === 1 ? 0 : 1 }));
      setSnackError(false);
      setMessage(`Read status ${book.read === 1 ? 'disactivated' : 'activated'} successfully`);
      setVisible(true);
    }
  };

  const handleDelete = () => {
    if (book) {
      Alert.alert(
        'Delete Book',
        'Are you sure you want to delete this book?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              dispatch(removeBook(Number(book.id)));
              navigation.goBack();
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleRatingSubmit = (rating: number) => {
    if (book) {
      dispatch(updateRate({ id: Number(book.id), rate: rating }));
      setSnackError(false);
      setMessage(`Rating updated to ${rating} stars successfully`);
      setVisible(true);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      headerBackground: () => (
        <Animated.View style={[headerAnimatedStyle, styles.header]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity
            style={[styles.roundButton, { backgroundColor: theme.dark ? theme.colors.errorContainer : theme.colors.onErrorContainer }]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={27} color={!theme.dark ? theme.colors.errorContainer : theme.colors.onErrorContainer} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push(`/(edit)/${book?.id}`)}
            style={[styles.roundButton, { backgroundColor: theme.dark ? theme.colors.primaryContainer : theme.colors.onPrimaryContainer }]}
          >
            <Ionicons name="pencil" size={27} color={!theme.dark ? theme.colors.primaryContainer : theme.colors.onPrimaryContainer} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={toggleFavoriteStatus}>
            <Ionicons name={book?.read ? "checkmark-done-circle-sharp" : "checkmark-done-circle-outline"} size={36} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={() => setRatingModalVisible(true)}>
            <Ionicons name="star" size={27} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme, book]);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.ScrollView contentContainerStyle={{ paddingBottom: 100 }} ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image source={{ uri: book?.image }} style={[styles.image, imageAnimatedStyle]} resizeMode="cover" />

        <View style={[styles.infoContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={styles.name}>{book?.title}</Text>
          <Text style={styles.location}>Type: {book?.type}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>{book?.rate} reviews</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <View>
              <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 3 }}>Author: {book?.author}</Text>
              <Text>Created Date: {book?.createdDate}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{book?.description}</Text>
        </View>
      </Animated.ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={{ backgroundColor: snackError ? 'red' : 'green' }}
      >
        {message}
      </Snackbar>
      <RatingModal
        visible={ratingModalVisible}
        onClose={() => setRatingModalVisible(false)}
        onSubmit={handleRatingSubmit}
        currentRating={book?.rate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-semiBold',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-semiBold',
    marginBottom: 10,
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-semiBold',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginVertical: 16,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blue',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon-regular',
  },
});

export default Book;
