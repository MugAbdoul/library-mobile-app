import { MaterialCommunityIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";

type MaterialCommunityIconsName = keyof typeof MaterialCommunityIcons.glyphMap;
type FontAwesomeName = keyof typeof FontAwesome.glyphMap;
type MaterialIconsName = keyof typeof MaterialIcons.glyphMap;

interface BookGenre {
    genre: string;
    icon: {
      name: MaterialCommunityIconsName | FontAwesomeName | MaterialIconsName;
      library: 'MaterialCommunityIcons' | 'FontAwesome' | 'MaterialIcons';
    };
  }

export const bookGenresWithIcons: BookGenre[] = [
    {
        genre: "All",
        icon: {
            name: "sword-cross",
            library: "MaterialCommunityIcons"
        }
    },
    {
      genre: "Action and Adventure",
      icon: {
        name: "sword-cross",
        library: "MaterialCommunityIcons"
      }
    },
    {
      genre: "Autobiography",
      icon: {
        name: "book-account",
        library: "MaterialCommunityIcons"
      }
    },
    {
      genre: "Biography",
      icon: {
        name: "account-box",
        library: "MaterialIcons"
      }
    },
    {
      genre: "Children's",
      icon: {
        name: "baby",
        library: "MaterialCommunityIcons"
      }
    },
    {
      genre: "Fantasy",
      icon: {
        name: "magic",
        library: "FontAwesome"
      }
    },
    {
      genre: "History",
      icon: {
        name: "history",
        library: "MaterialIcons"
      }
    },
    {
      genre: "Horror",
      icon: {
        name: "ghost",
        library: "MaterialCommunityIcons"
      }
    },
    {
      genre: "Mystery",
      icon: {
        name: "magnify",
        library: "MaterialCommunityIcons"
      }
    },
    {
      genre: "Science Fiction",
      icon: {
        name: "rocket",
        library: "FontAwesome"
      }
    },
    {
      genre: "Romance",
      icon: {
        name: "heart",
        library: "FontAwesome"
      }
    },
    {
      genre: "Thriller",
      icon: {
        name: "movie",
        library: "MaterialIcons"
      }
    },
    {
      genre: "Travel",
      icon: {
        name: "airplanemode-on",
        library: "MaterialIcons"
      }
    },
    {
      genre: "Young Adult",
      icon: {
        name: "school",
        library: "MaterialIcons"
    }
  }
];
