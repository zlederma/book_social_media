import { createSlice } from '@reduxjs/toolkit'
//initally books is an arrary of objects
const initialMyBooksState = { books: [] }


const myBooksSlice = createSlice({
    name: 'myBooks',
    initialState: initialMyBooksState,
    reducers: {
        add(state, action) {
            state.books.push(action.payload);
        },

        remove(state, action) {
            state.books.splice(action.payload, 1)
        }
    }
})

export const myBooksActions = myBooksSlice.actions;

export default myBooksSlice.reducer;