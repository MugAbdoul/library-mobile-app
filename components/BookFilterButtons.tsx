import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { bookGenresWithIcons } from '@/constants/data';
import { useTheme } from '@/hooks/ThemeProvider';

type Props = {
    onGenreChanged: (genre: string) => void;
    genre: string;
}

const BookFilterButtons = ({ onGenreChanged, genre }: Props) => {
    const { theme } = useTheme();
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(()=> {
        if(genre){
            const genreIndex = bookGenresWithIcons.findIndex(book => book.genre === genre);
            if(genreIndex){
                handleSelectCategory(genreIndex);
            }
        }
    }, [genre])

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
        });

        onGenreChanged(bookGenresWithIcons[index].genre);
    };

    const renderIcon = (icon: any, library: any, index: number) => {
        const color = activeIndex === index ? theme.colors.onPrimary : theme.colors.onBackground;
        if (library === 'MaterialCommunityIcons') {
            return <MaterialCommunityIcons name={icon as any} size={20} color={color} />;
        } else if (library === 'FontAwesome') {
            return <FontAwesome name={icon as any} size={20} color={color} />;
        } else {
            return <MaterialIcons name={icon as any} size={20} color={color} />;
        }
    };

    return (
        <View>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                ref={scrollRef}
                contentContainerStyle={styles.scrollViewContent}
            >
                {bookGenresWithIcons.map((item, index) => (
                    <TouchableOpacity 
                        style={[
                            styles.container,
                            activeIndex === index
                                ? { backgroundColor: theme.colors.primary, shadowColor: theme.dark ? '#ffffff' : '#333333' }
                                : { backgroundColor: theme.colors.background, shadowColor: theme.dark ? '#ffffff' : '#333333' }
                        ]}
                        ref={(el) => (itemRef.current[index] = el)}
                        onPress={() => handleSelectCategory(index)}
                        key={index}
                    >
                        {renderIcon(item.icon.name, item.icon.library, index)}
                        <Text style={[
                            styles.text,
                            activeIndex === index ? { color: theme.colors.onPrimary } : {}
                        ]}>
                            {item.genre}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        gap: 20,
        paddingVertical: 10,
        marginBottom: 0,
        paddingHorizontal: 2,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 15,
        height: 40,
        borderRadius: 3,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 5,
    },
    text: {
        marginLeft: 4,
        fontSize: 14,
    },
});

export default BookFilterButtons;
