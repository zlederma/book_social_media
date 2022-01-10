//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import { Card, CardContent } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddBookButton from "./AddBookButton"
import { getDatabase, ref, set, child, get, } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import { myBooksActions } from "../../store/mybooks";
import { isLoggedInActions } from '../../store/auth';
import { useState, useEffect } from 'react';
import { addBook, getBooks, removeBook, containsBook, getKey, getBookIds } from '../../firebase/firebase-mylibrary';


export default function BookCard({ title, author, picture, id }) {

    const [fill, setFill] = useState(false)
    const [book, setBook] = useState({})
    const [key, setKey] = useState("")
    const [isContained, setIsContained] = useState(true)
    const uid = useSelector((state) => state.isLoggedIn.uid)
    // const currUID = useSelector((state) => state.isLoggedIn.uid)
    useEffect(() => {
    }, [fill])

    //Sets the correct fill when the search changes.
    getKey(uid, id).then(result => {
        if (typeof result === "undefined") {
            setFill(false)
        } else {
            setFill(true)
        }
    })


    const onBookAddHandler = () => {

        const currBook = {
            id: id,
            title: title,
            author: author,
            picture: { smallThumbnail: picture, thumbnail: picture }
        }
        // setBook(currBook)

        //if no key, the book does not exist and is undefined.
        //do some kind of setloading
        //works except fill does not work for books already in the libary
        getKey(uid, currBook.id).then(result => {
            if (typeof result === "undefined") {
                addBook(uid, currBook)
                setFill(true)
            } else {
                removeBook(uid, result)
                setKey(result)
                setFill(false)
            }
        })

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
