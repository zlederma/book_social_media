import { createSlice } from '@reduxjs/toolkit'

//initally books is an arrary of objects
const initialMyBooksState = { books: [{ title: "", author: "", picture: "" }] }
//  [{title: "", author: "", picture: ""}]

const myBooksSlice = createSlice({
    name: 'myBooks',
    initialState: initialMyBooksState,
    reducers: {
        add(state) {
            state.books.push({ title: "test", author: "test", picture: "" });
            console.log(state.books.length)
        }
    }
})

export const myBooksActions = myBooksSlice.actions;

export default myBooksSlice.reducer;