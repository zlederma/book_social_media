import { getDatabase, ref, child, get, push, remove, setKey, onValue } from "firebase/database";
import { useState } from 'react'
import { map } from "@firebase/util";

// const db = getDatabase();
// const dbRef = ref(dbRef);

//Addbook
//DeleteBook
//GetBooks
//containsBook
//assume we are already in the libary ref

// export function addBook(uid, book) {
//     const libraryRef = ref(getDatabase(), 'users/' + uid + '/library')
//     const newBookRef = push(libraryRef)
//     set(newBookRef, book)
// }

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

export function removeBook(uid) {
    const libraryRef = ref(getDatabase(), 'users/' + uid + '/library/' + '-MrsBh_1jUGL9GT-TLQ_')
    remove(libraryRef)
}

// const currUID = useSelector((state) => state.isLoggedIn.uid)

