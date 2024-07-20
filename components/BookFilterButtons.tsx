import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Button, FAB, Searchbar, Text, TextInput } from 'react-native-paper';
import { bookGenresWithIcons } from '@/constants/data';
import { useTheme } from '@/hooks/ThemeProvider';


type Props = {
    onGenreChanged: (genre: string) => void;
  }

const bookFilterButtons = ({  onGenreChanged }: Props) => {

    
    const { theme } = useTheme();
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

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
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            contentContainerStyle={{
                gap: 20,
                paddingVertical: 10,
                marginBottom: 20,
                paddingHorizontal: 2
            }}
        >
            {
                bookGenresWithIcons.map((item, index)=>{
                    return (
                        <TouchableOpacity 
                        style={
                            [styles.container,
                                activeIndex === index ?
                                {
                                    backgroundColor: theme.colors.primary,
                                    shadowColor: theme.dark ? '#ffffff' : '#333333',
                                } :
                                {
                                    backgroundColor: theme.colors.background,
                                    shadowColor: theme.dark ? '#ffffff' : '#333333',
                                }
                            ]
                        }
                        ref={(el) => itemRef.current[index] = el}
                        onPress={() => handleSelectCategory(index)}
                        key={index}>
                            {renderIcon(item.icon.name, item.icon.library, index)}
                            <Text style={
                                [
                                    styles.text,

                                    activeIndex === index ?
                                    {
                                        color: theme.colors.onPrimary,
                                    } :
                                    {
                                    }
                            ]}
                            >
                                {item.genre}
                            </Text>
                        </TouchableOpacity>
                    );
                })

            }
            </ScrollView>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 1,
        paddingHorizontal: 15,
        height: 40,
        borderRadius: 3,
        shadowOffset: {width: 1, height: 2},
        shadowRadius: 3,
        shadowOpacity: 0.2,
        elevation: 5
        
    },
    text: {
        marginLeft: 4,
        fontSize: 14
    }
})

export default bookFilterButtons;
