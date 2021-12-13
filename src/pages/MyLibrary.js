import { Typography } from "@mui/material"
import BookCards from "../components/BookCards/BookCard"
import { useState } from "react"

export default function MyLibrary() {
    const [myBooks, setMyBooks] = useState([{}])
    return (
        <div>
            <Typography variant="h6"> My Library</Typography>
            {myBooks.length > 0 ? <BookCards books={myBooks} /> : <div></div>}
        </div>
    )
}
