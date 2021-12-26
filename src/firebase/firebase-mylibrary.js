import { getDatabase, ref, set, child, get, push, remove, setKey, onValue } from "firebase/database";
import { useState } from 'react'

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

export function containsBook(uid, currId) {
    console.log("current" + currId)
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library');
    onValue(libraryRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            //   const childKey = childSnapshot.key;
            console.log(childSnapshot.val().id)
            if (childSnapshot.val().id === currId) {
                console.log("it is true")
                return true
            }
            // ...
        });
    });

    return false
}

export function removeBook(uid) {
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library/' + '-MrsBh_1jUGL9GT-TLQ_')
    remove(libraryRef)
}

// const currUID = useSelector((state) => state.isLoggedIn.uid)

