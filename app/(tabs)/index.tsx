import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeProvider';
import { Button, FAB, Searchbar, Text, TextInput } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import BookFilterButtons from '@/components/BookFilterButtons';
import BooksList from '@/components/BooksList';

const Index = () => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = React.useState('');

    const [category, setCategory] = useState("All");
    

    const onGenreChanged = (category: string) => {
        console.log("Categpry: ", category);
        setCategory(category);
    };

    return (
        <SafeAreaView style={[styles.container, {backgroundColor:theme.colors.background}]}>
            {/* <Text style={[styles.bookTitle]}>Book Library</Text> */}
            <View style={styles.inputContainer}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={{
                        padding: 0,
                        flex: 1
                    }}
                    />
                    <TouchableOpacity style={[styles.inputField, {backgroundColor: theme.colors.primary}]}>
                        <FontAwesome name="send" size={24} color="white" />
                    </TouchableOpacity>
            </View>
            <Text style={styles.booksTitle}>Books</Text>
            <BookFilterButtons onGenreChanged={onGenreChanged}/>
            <BooksList />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => router.push('/addBookModal')}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    bookTitle: {
        fontSize: 28,
        fontWeight: '800',
        marginTop: 20,
    },
    inputContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});

export default Index;
