import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeProvider';
import { Button, FAB, Searchbar, Text, TextInput } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const Index = () => {
    const { theme, toggleTheme } = useTheme();
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <SafeAreaView style={[styles.container, {backgroundColor:theme.colors.background}]}>
            <Text style={[styles.bookTitle]}>Book Library</Text>
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
        marginTop: 20,
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
});

export default Index;
