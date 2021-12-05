//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import test_image from "/Users/zoelederman/book_social_media/src/assets/test_image.png"

// import { Image } from "react-bootstrap"
// import { Image } from "react-bootstrap"
import { titleStyle } from "./BookCards_Styles"

const book = {
    title: "All the Light we Cannot See",
    author: "Anthony Doerr",
    picture: test_image
}


export default function Book({ title, author, picture }) {
    return (
        <div>
            <img src={book.picture} ></img>
            <h1 style={titleStyle}> {book.title} </h1>
            <h1> {book.author} </h1>
        </div>
    )
}
