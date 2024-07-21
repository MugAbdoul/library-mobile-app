import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createTable, addBook, updateBookFavoritedStatus, updateBook, deleteBook, getBooks, updateBookRate } from '@/services/database';
import { Book } from '@/constants/Book';

interface BookState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookState = {
  books: [],
  status: 'idle',
  error: null,
};

export const createBooksTable = createAsyncThunk('books/createTable', async () => {
  await createTable();
});

export const addNewBook = createAsyncThunk(
  'books/addBook',
  async (bookData: {
    title: string;
    description: string;
    type: string;
    rate: any;
    image: any;
    author: string;
    createdDate: string;
    read?: number;
  }) => {
    const { title, description, type, rate, image, author, createdDate, read = 0 } = bookData;
    return await addBook(title, description, type, rate, image, author, createdDate, read);
  }
);

export const updateBookReadStatus = createAsyncThunk(
  'books/updateReadStatus',
  async ({ id, read }: { id: number; read: number }) => {
    await updateBookFavoritedStatus(id, read);
    return { id, read };
  }
);

export const updateRate = createAsyncThunk(
  'books/updateRate',
  async ({ id, rate }: { id: number; rate: number }) => {
    await updateBookRate(id, rate);
    return { id, rate };
  }
);

export const editBook = createAsyncThunk(
  'books/updateBook',
  async (bookData: {
    id: number;
    title: string;
    description: string;
    type: string;
    rate: any;
    image: any;
    author: string;
    createdDate: string;
    read: number;
  }) => {
    const { id, title, description, type, rate, image, author, createdDate, read } = bookData;
    return await updateBook(id, title, description, type, rate, image, author, createdDate, read);
  }
);

export const removeBook = createAsyncThunk(
  'books/deleteBook',
  async (id: number) => {
    await deleteBook(id);
    return id;
  }
);

export const fetchBooks = createAsyncThunk<Book[]>('books/getBooks', async () => {
  return await getBooks();
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooksTable.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBooksTable.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createBooksTable.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create table';
      })
      .addCase(addNewBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.status = 'succeeded';
        console.log("-----------------------------------------------------");
        console.log(action.payload);
        console.log("-----------------------------------------------------");
        state.books.push(action.payload);
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add book';
      })
      .addCase(updateBookReadStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBookReadStatus.fulfilled, (state, action: PayloadAction<{ id: number; read: number }>) => {
        state.status = 'succeeded';
        const { id, read } = action.payload;
        const bookIndex = state.books.findIndex((book) => book.id === id);
        if (bookIndex !== -1) {
          state.books[bookIndex] = { ...state.books[bookIndex], read };
        }
      })
      .addCase(updateBookReadStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update read status';
      })
      .addCase(updateRate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRate.fulfilled, (state, action: PayloadAction<{ id: number; rate: number }>) => {
        state.status = 'succeeded';
        const { id, rate } = action.payload;
        const bookIndex = state.books.findIndex((book) => book.id === id);
        if (bookIndex !== -1) {
          state.books[bookIndex] = { ...state.books[bookIndex], rate };
        }
      })
      .addCase(updateRate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update read status';
      })
      .addCase(editBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.status = 'succeeded';
        const updatedBook = action.payload;
        const bookIndex = state.books.findIndex((book) => book.id === updatedBook.id);
        if (bookIndex !== -1) {
          state.books[bookIndex] = updatedBook;
        }
      })
      .addCase(editBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update book';
      })
      .addCase(removeBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeBook.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete book';
      })
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      });
  },
});

export default booksSlice.reducer;
