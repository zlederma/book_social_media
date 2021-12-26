//This keeps track of whether or not a user is logged in.
import { createSlice } from '@reduxjs/toolkit'
//initally books is an arrary of objects
const initialIsLoggedInState = { isLoggedIn: false, uid: null }


const isLoggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState: initialIsLoggedInState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },

        logout(state) {
            state.isLoggedIn = false;
        },

        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setUid(state, action) {
            state.uid = action.payload;
        }
    }
})

export const isLoggedInActions = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;
