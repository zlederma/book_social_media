import { createSlice } from '@reduxjs/toolkit'
//initally books is an arrary of objects
const initialMyBooksState = { books: [] }


const myBooksSlice = createSlice({
    name: 'myBooks',
    initialState: initialMyBooksState,
    reducers: {
        add(state, action) {
            state.books.push(action.payload);
            console.log(state.books.length)
        }
    }
})

export const myBooksActions = myBooksSlice.actions;

export default myBooksSlice.reducer;