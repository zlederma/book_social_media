import { Typography } from "@mui/material"
import BookCards from "../components/BookCards/BookCard"
import { useSelector } from "react-redux"


export default function MyLibrary() {
    const myBooks = useSelector((state) => state.myBooks.books)
    return (
        <div>
            <Typography variant="h6"> My Library</Typography>
            {myBooks.length > 0 ? <BookCards books={myBooks} /> : <div></div>}
        </div>
    )
}
