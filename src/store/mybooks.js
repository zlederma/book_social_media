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
            // state.books.pop()
            // state.books = state.books.filter(e => e.picture.author !== action.payload.picture.thumbnail)
            console.log("Action Payload" + action.payload)
            state.books.splice(action.payload, 1)


            console.log(state.books.length)
            // e => e.picture.thumbnail === currBook.picture.thumbnail
            // someArray = someArray.filter(function(e) { return e.Name !== "Kristian"; });
        }
    }
})

export const myBooksActions = myBooksSlice.actions;

export default myBooksSlice.reducer;