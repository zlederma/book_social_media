//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import test_image from "/Users/zoelederman/book_social_media/src/assets/test_image.png"

import { useState } from 'react';
import { Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderBottom } from "@mui/system";
import AddBookButton from "./AddBookButton"

import { useSelector, useDispatch } from 'react-redux'
import { myBooksActions } from "../../store/mybooks";


export default function BookCard({ title, author, picture }) {
    const [userBook, setUserBook] = useState({
        title: "",
        author: "",
        picture: ""
    })

    const dispatch = useDispatch();
    // const onBookAddHandler = (bookAdded) => {
    //     bookAdded ?
    //         setUserBook({
    //             title: title,
    //             author: author,
    //             picture: picture
    //         }) :
    //         setUserBook({
    //             title: "",
    //             author: "",
    //             picture: ""
    //         })
    // }

    const onBookAddHandler = (bookAdded) => {
        console.log(bookAdded)
        dispatch(myBooksActions.add())
        // bookAdded ?
        //     dispatch(myBooksActions.add()) :
        //     dispatch(myBooksActions.add())
    }

    return (
        // maxWidth: 200;
        <Card sx={{ backgroundColor: "#f7f3f1" }}>
            <AddBookButton onBookAdd={onBookAddHandler} />
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
