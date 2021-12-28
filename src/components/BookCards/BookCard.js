//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import { Card, CardContent } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddBookButton from "./AddBookButton"
import { getDatabase, ref, set, child, get, } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux'
import { myBooksActions } from "../../store/mybooks";
import { useState } from 'react';
import { addBook, getBooks, removeBook, containsBook } from '../../firebase/firebase-mylibrary';
// const db = getDatabase();
// const dbRef = ref(db);

export default function BookCard({ title, author, picture, id }) {

    const [fill, setFill] = useState(false)
    const [myBooks, setMyBooks] = useState([])
    const [isContained, setIsContained] = useState(true)
    // const uid = useSelector((state) => state.logg)

    const onBookAddHandler = () => {

        const currBook = {
            id: id,
            title: title,
            author: author,
            picture: { smallThumbnail: picture, thumbnail: picture }
        }

        // addBook("7", currBook)
        // console.log(getBooks("6"))
        console.log("contains")

        // console.log(containsBook("7", currBook.id))
        //Async function
        containsBook("7", currBook.id).then(result => setFill(result))
        // setIsContained(containsBook("6", currBook.id))

        // removeBook("6")


        // const isIncluded = myBooks.some(e => e.picture.thumbnail === currBook.picture.thumbnail);
        // console.log("isIncluded :" + isIncluded)
        // if (!isIncluded) {
        //     setFill(true)
        //     // dispatch(myBooksActions.add(currBook))
        // }

        // else {
        //     // dispatch(myBooksActions.remove(myBooks.findIndex(e => e.picture.thumbnail === currBook.picture.thumbnail)))
        //     setFill(false)
        // }
        // const userId = "6"
        // // set(ref(db, 'users/' + userId), {
        // //     profile: { email: "p" },
        // //     library: myBooks
        // // });

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
