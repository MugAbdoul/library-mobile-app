import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeProvider';
import { Button, FAB, Searchbar, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import BookFilterButtons from '@/components/BookFilterButtons';
import BooksList from '@/components/BooksList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedCategory = await AsyncStorage.getItem('category');
        const savedSortBy = await AsyncStorage.getItem('sortBy');
        const savedSortOrder = await AsyncStorage.getItem('sortOrder');

        if (savedCategory !== null) setCategory(savedCategory);
        if (savedSortBy !== null) setSortBy(savedSortBy);
        if (savedSortOrder !== null) setSortOrder(savedSortOrder as 'asc' | 'desc');
      } catch (error) {
        console.error('Failed to load preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  useEffect(() => {
    const savePreferences = async () => {
      try {
        await AsyncStorage.setItem('category', category);
        await AsyncStorage.setItem('sortBy', sortBy);
        await AsyncStorage.setItem('sortOrder', sortOrder);
      } catch (error) {
        console.error('Failed to save preferences:', error);
      }
    };

    savePreferences();
  }, [category, sortBy, sortOrder]);

  const onGenreChanged = (category: string) => {
    setCategory(category);
  };

  const toggleSortOrder = (criteria: string) => {
    if (sortBy === criteria) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.inputContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{ padding: 0, flex: 1 }}
        />
        {/* <TouchableOpacity style={[styles.inputField, { backgroundColor: theme.colors.primary }]}>
          <FontAwesome name="send" size={24} color="white" />
        </TouchableOpacity> */}
      </View>
      <Text style={styles.booksTitle}>Books</Text>
      <BookFilterButtons onGenreChanged={onGenreChanged} genre={category}/>
      <View style={styles.sortContainer}>
        <Text>Sort by:</Text>
        <TouchableOpacity onPress={() => toggleSortOrder('title')}>
          <Text style={[styles.sortOption, sortBy === 'title' && {color: theme.dark ? 'white' : 'black'}]}>Title {sortBy === 'title' && (sortOrder === 'asc' ? '▲' : '▼')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSortOrder('author')}>
          <Text style={[styles.sortOption, sortBy === 'author' && {color: theme.dark ? 'white' : 'black'}]}>Author {sortBy === 'author' && (sortOrder === 'asc' ? '▲' : '▼')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSortOrder('rate')}>
          <Text style={[styles.sortOption, sortBy === 'rate' && {color: theme.dark ? 'white' : 'black'}]}>Rate {sortBy === 'rate' && (sortOrder === 'asc' ? '▲' : '▼')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleSortOrder('date')}>
          <Text style={[styles.sortOption, sortBy === 'date' && {color: theme.dark ? 'white' : 'black'}]}>Date {sortBy === 'date' && (sortOrder === 'asc' ? '▲' : '▼')}</Text>
        </TouchableOpacity>
      </View>
      <BooksList sortBy={sortBy} sortOrder={sortOrder} category={category} searchQuery={searchQuery} />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push('/addBookModal')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    marginLeft: 10,
    padding: 12,
    borderRadius: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  booksTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginTop: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  sortOption: {
    marginHorizontal: 5,
    fontSize: 16,
    color: 'grey',
  },
});

export default Index;
