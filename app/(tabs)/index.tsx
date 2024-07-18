import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/ThemeProvider';
import { Button, Text, TextInput } from 'react-native-paper';

const Index = () => {
    const { theme, toggleTheme } = useTheme();


    return (
        <SafeAreaView style={[styles.container, {backgroundColor:theme.colors.background}]}>
            <Text style={[styles.bookTitle]}>Book Library</Text>
            <View style={styles.inputContainer}>
                <Ionicons name='search' size={24} color={theme.colors.primary} />
                <TextInput style={styles.inputField} placeholder='Search here' />
            </View>
            <Button onPress={()=> toggleTheme()}>Click Here</Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    inputField: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default Index;
