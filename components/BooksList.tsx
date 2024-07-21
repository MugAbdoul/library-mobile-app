import React, { useEffect } from 'react';
import { FlatList, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '@/redux/booksSlice';
import { RootState, AppDispatch } from '@/redux/store';
import { Book } from '@/constants/Book';
import { Text } from 'react-native-paper';
import Rate from './Rate';
import { useTheme } from '@/hooks/ThemeProvider';
import { useLinkTo } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface BooksListProps {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  category: string;
}

const BooksList: React.FC<BooksListProps> = ({ sortBy, sortOrder, category }) => {
  const { theme } = useTheme();
  const linkTo = useLinkTo();

  const dispatch = useDispatch<AppDispatch>();
  const { books, status, error } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const sortBooks = (books: Book[]) => {
    const sortedBooks = [...books].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.author.localeCompare(b.author);
          break;
        case 'rate':
          comparison = b.rate - a.rate;
          break;
        case 'date':
          comparison = new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          break;
        default:
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return sortedBooks;
  };

  const filterBooks = (books: Book[]) => {
    if (category === "All") return books;
    return books.filter(book => book.type === category);
  };

  const filteredAndSortedBooks = sortBooks(filterBooks(books));

  const renderItem = ({ item }: { item: Book }) => (
    <TouchableOpacity 
      style={[styles.bookContainer, { backgroundColor: theme.colors.backdrop }]}
      onPress={() => linkTo(`/(book)/${item.id}`)}
    >
      <View>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      </View>
      <View style={{ paddingVertical: 2, paddingHorizontal: 7, flex: 2 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description.trim().length > 67 ? item.description.trim().substring(0, 67) + '...' : item.description.trim()}</Text>
        <Text style={{ marginTop: 4 }}>Author: {item.author}</Text>
        <View style={styles.bottomView}>
          <Text style={[styles.type, { backgroundColor: theme.dark ? theme.colors.onPrimary : theme.colors.primary }]}>{item.type}</Text>
          <Rate rate={item.rate} />
          <Ionicons
            name={item.read ? "checkmark-done-circle-sharp" : "checkmark-done-circle-outline"}
            size={27}
            color={item.read ? theme.colors.primary : "black"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={filteredAndSortedBooks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={{ marginTop: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 5,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  type: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    fontSize: 12,
    borderRadius: 5,
  },
});

export default BooksList;
