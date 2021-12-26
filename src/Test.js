//This file is for testing reading and writing user data
import { getDatabase, ref, set, child, get } from "firebase/database";
import { useState } from 'react'


const db = getDatabase();
const dbRef = ref(getDatabase());
function writeUserData(userId, email, message) {

    set(ref(db, 'users/' + userId), {
        email: email,
        message: message
    });
}
const bookid2 = "asdfadf"
const book1 = {
    bookid: "asdfadf",
    title: "hunger games",
    author: "collins",
    picture: "url"
}


const bookid1 = "sdfasfdd"
const book2 = {
    bookid: "sdfasfdd",
    title: "2nd hunger games",
    author: "collins",
    picture: "url"
}

const bookarr = [book1, book2]

function writeCorrectUserData(userId, email, bookarr) {
    //get it to go in arrays
    set(ref(db, 'users/' + userId), {
        profile: { email: email },
        library: bookarr
    });
}


export default function Test() {
    const clickHandler = () => {
        writeCorrectUserData("post1", "a@a.com", bookarr)
        // get(child(dbRef, `users/${"33"}`)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         console.log(snapshot.val());
        //     } else {
        //         console.log("No data available");
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });

    }

    const [data, setData] = useState("")

    return (
        <div>
            <button onClick={clickHandler}> click me</button>
            <h1> hi</h1>
        </div>
    )
}
