import React, { useEffect } from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '@/redux/booksSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { Book } from '@/constants/Book';
import { Text } from 'react-native-paper';

const BooksList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const status = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const renderItem = ({ item }: { item: Book }) => (
    <View style={styles.bookContainer}>
        <View>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        </View>
        <View style={{ padding: 10}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Rate: {item.rate}</Text>
        </View>
    </View>
  );

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={{marginTop: 10}}
    />
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    // marginBottom: 8,
  },
  image: {
    width: 120,
    height: 150,
    // marginBottom: 8,
  },
});

export default BooksList;
