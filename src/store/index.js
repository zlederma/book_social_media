import { configureStore } from '@reduxjs/toolkit';

//import my reducers here
import myBooksReducer from './mybooks'

const store = configureStore({
    reducer: { myBooks: myBooksReducer }
})

export default store;