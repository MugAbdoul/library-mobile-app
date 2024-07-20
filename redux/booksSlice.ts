import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createTable, addBook, updateBookFavoritedStatus, updateBook, deleteBook, getBooks } from '@/services/database';
import { Book } from '@/constants/Book';


interface BookState {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: BookState = {
  books: [],
  status: 'idle',
  error: null,
};

// Thunks for async operations
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
    return await updateBookFavoritedStatus(id, read);
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
  }) => {
    const { id, title, description, type, rate, image, author, createdDate } = bookData;
    return await updateBook(id, title, description, type, rate, image, author, createdDate);
  }
);

export const removeBook = createAsyncThunk(
  'books/deleteBook',
  async (id: number) => {
    return await deleteBook(id);
  }
);

export const fetchBooks = createAsyncThunk<Book[]>('books/getBooks', async () => {
  return await getBooks();
});
// export const fetchBooks = createAsyncThunk('books/getBooks', async () => {
//     return await getBooks();
//   });

// Create the slice
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
      .addCase(addNewBook.fulfilled, (state, action:any) => {
        state.status = 'succeeded';
        state.books.push(action.payload);
        // Fetch books to update the state with the latest data
        // fetchBooks();
      })
      .addCase(addNewBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add book';
      })
      .addCase(updateBookReadStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBookReadStatus.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateBookReadStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update read status';
      })
      .addCase(editBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editBook.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(editBook.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update book';
      })
      .addCase(removeBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeBook.fulfilled, (state) => {
        state.status = 'succeeded';
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
