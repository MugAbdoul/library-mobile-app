import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export interface ExtendedTheme extends Theme {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      secondColor: string;
    };
  }

export const defaultTheme: ExtendedTheme  = {
    dark: false,
    colors: {
        primary: 'red',
        background: 'red',
        card: 'red',
        text: 'red',
        border: 'red',
        notification: 'red',
        secondColor: 'blue',
    }
};

export const darkTheme : ExtendedTheme  = {
  dark: true,
  colors: {
    primary: 'blue',
    background: 'blue',
    card: 'blue',
    text: 'blue',
    border: 'blue',
    notification: 'blue',
    secondColor: 'red'
  },
};
