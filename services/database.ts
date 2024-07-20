import { Book } from '@/constants/Book';
import * as SQLite from 'expo-sqlite';

const databaseName = 'bookLibrary2.db';

export const createTable = async () => {
    const db = await SQLite.openDatabaseAsync(databaseName);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            type TEXT,
            rate REAL,
            image BLOB,
            author TEXT,
            createdDate TEXT,
            read INTEGER DEFAULT 0
        );
    `);
};
    
export const addBook = async (
    title: string,
    description: string,
    type: string,
    rate: any,
    image: any,
    author: string,
    createdDate: string,
    read: number = 0
) => {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.runAsync(
        'INSERT INTO books (title, description, type, rate, image, author, createdDate, read) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, type, rate, image, author, createdDate, read]
    );

    return {
        id: result.lastInsertRowId,
        title: title,
        description: description,
        type: type,
        rate: rate,
        image: image,
        author: author,
        createdDate: createdDate,
        read: read,
    };
};

export const updateBookFavoritedStatus = async (id: number, read: number) => {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.runAsync(
        'UPDATE books SET read = ? WHERE id = ?',
        [read, id]
    );
    
    return result.lastInsertRowId > 0;
};

export const getBooks = async (): Promise<Book[]> => {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const allRows = await db.getAllAsync('SELECT * FROM books');
    return allRows.map((row:any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        type: row.type,
        rate: row.rate,
        image: row.image,
        author: row.author,
        createdDate: row.createdDate,
        read: row.read,
    }));
}

export const updateBook = async (
    id: number,
    title: string,
    description: string,
    type: string,
    rate: any,
    image: any,
    author: string,
    createdDate: string,
    read: number
) => {
    console.log(image)
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.runAsync(
        'UPDATE books SET title = ?, description = ?, type = ?, rate = ?, image = ?, author = ?, createdDate = ? WHERE id = ?',
        [title, description, type, rate, image, author, createdDate, id]
    );

    console.log(image);
    
    return {
        id: id,
        title: title,
        description: description,
        type: type,
        rate: rate,
        image: image,
        author: author,
        createdDate: createdDate,
        read: read,
    };
}

export const deleteBook = async (id: number) => {
    const db = await SQLite.openDatabaseAsync(databaseName);
    const result = await db.runAsync(
        'DELETE FROM books WHERE id = ?',
        [id]
    );
    
    return result.lastInsertRowId > 0;
}
