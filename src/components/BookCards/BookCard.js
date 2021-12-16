//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import { Card, CardContent } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddBookButton from "./AddBookButton"

import { useDispatch } from 'react-redux'
import { myBooksActions } from "../../store/mybooks";


export default function BookCard({ title, author, picture }) {

    const dispatch = useDispatch();

    const onBookAddHandler = (bookAdded) => {
        console.log(bookAdded)

        dispatch(myBooksActions.add({
            title: title,
            author: author,
            picture: { smallThumbnail: picture, thumbnail: picture },
        }))
    }

    return (
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
