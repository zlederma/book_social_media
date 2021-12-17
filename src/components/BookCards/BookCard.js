//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import { Card, CardContent } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddBookButton from "./AddBookButton"

import { useDispatch, useSelector } from 'react-redux'
import { myBooksActions } from "../../store/mybooks";
import { useState } from 'react';


export default function BookCard({ title, author, picture }) {

    const dispatch = useDispatch();
    const myBooks = useSelector((state) => state.myBooks.books)
    const [fill, setFill] = useState(false)

    const onBookAddHandler = () => {
        const currBook = {
            title: title,
            author: author,
            picture: { smallThumbnail: picture, thumbnail: picture }
        }
        const isIncluded = myBooks.some(e => e.picture.thumbnail === currBook.picture.thumbnail);
        console.log("isIncluded :" + isIncluded)
        if (!isIncluded) {
            setFill(true)
            dispatch(myBooksActions.add(currBook))
        }

        else {
            dispatch(myBooksActions.remove(myBooks.findIndex(e => e.picture.thumbnail === currBook.picture.thumbnail)))
            setFill(false)
        }
    }

    return (
        <Card sx={{ backgroundColor: "#f7f3f1" }}>
            <AddBookButton onBookAdd={onBookAddHandler} fill={fill} />
            <CardMedia sx={{ borderBottom: "1px solid #974c0f", objectFit: "scale-down" }}
                component="img"
                height="200"
                src={picture}
                alt={`picture of ${title}`}
            />
            <CardContent sx={{ my: -1 }}>
                <Typography noWrap variant="body1" component="div">
                    {title}
                </Typography>
                <Typography noWrap variant="body2" color="text.secondary">
                    {author}
                </Typography>
            </CardContent>
        </Card>

    )
}
