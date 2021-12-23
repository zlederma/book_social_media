import { configureStore } from '@reduxjs/toolkit';

//import my reducers here
import myBooksReducer from './mybooks'
import isLoggedInReducer from './auth';

const store = configureStore({
    reducer: {
        myBooks: myBooksReducer,
        isLoggedIn: isLoggedInReducer
    }
})

export default store;