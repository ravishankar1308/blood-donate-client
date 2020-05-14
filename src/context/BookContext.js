import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer1';

const bookURL = '/api/books';

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'get_book':
      return action.payload;
    case 'delete_book':
      return state.filter((book) => book.id !== action.payload);
    // case 'edit_book':
    //     return state.map(book => {
    //         return book.id === action.payload.id ? action.payload : book;
    //     });
    default:
      return state;
  }
};

const addBook = (dispatch) => {
  return async (bookName, author, bookNumber, callback) => {
    try {
      await jsonServer.post(bookURL, {bookName, author, bookNumber});
      if (callback) {
        callback();
      }
    } catch (e) {
      await console.log(e.response.data);
    }
  };
};

const getBook = (dispatch) => {
  return async () => {
    const response = await jsonServer.get(bookURL);
    dispatch({type: 'get_book', payload: response.data});
  };
};

const editBook = (dispatch) => {
  return async (bookName, author, bookNumber, id, callback) => {
    await jsonServer.put(`${bookURL}/${id}`, {bookName, author, bookNumber});
    if (callback) {
      callback();
    }
  };
};

const deleteBook = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`${bookURL}/${id}`);
    dispatch({type: 'delete_book', payload: id});
  };
};

export const {Context, Provider} = createDataContext(
  bookReducer,
  {addBook, editBook, deleteBook, getBook},
  [],
);
