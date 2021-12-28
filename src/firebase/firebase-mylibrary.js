import { getDatabase, ref, child, get, push, remove, setKey, onValue, set } from "firebase/database";
import { useState } from 'react'
import { map } from "@firebase/util";

// const db = getDatabase();
// const dbRef = ref(dbRef);

//Addbook
//DeleteBook
//GetBooks
//containsBook
//assume we are already in the libary ref

export function addBook(uid, book) {
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library')
    const newBookRef = push(libraryRef)
    set(newBookRef, book)
}

export function getBooks(uid) {
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library')
    get(libraryRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export async function containsBook(uid, currId) {
    const bookIds = []
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library');
    await get(libraryRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            bookIds.push(childSnapshot.val().id);
        });

    });
    return bookIds.includes(currId)
}

export function removeBook(uid, key) {
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library/' + key)
    remove(libraryRef)
}


export async function getKey(uid, currId) {
    const keys = []
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library');
    await get(libraryRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().id === currId) {
                keys.push(childSnapshot.key)
            }
        });
    });
    const key = keys[0]
    return key
}

export async function getBookIds(uid) {
    const ids = []
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library');
    await get(libraryRef).then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
            ids.push(childSnapshot.val().id)
        });
    });
    return ids
}


// const currUID = useSelector((state) => state.isLoggedIn.uid)

