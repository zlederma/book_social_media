//This component displays a book with title, author, and picture.
// import test_image from "src/assets/test_image.jpg";
import test_image from "/Users/zoelederman/book_social_media/src/assets/test_image.png"

// import { Image } from "react-bootstrap"
// import { Image } from "react-bootstrap"
import { titleStyle } from "./BookCards_Styles"

import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { borderBottom } from "@mui/system";

const book = {
    title: "All the Light we Cannot See",
    author: "Anthony Doerr",
    picture: test_image
}


export default function BookCard({ title, author, picture }) {
    return (
        // maxWidth: 200;
        <Card sx={{ backgroundColor: "#f7f3f1" }}>
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
