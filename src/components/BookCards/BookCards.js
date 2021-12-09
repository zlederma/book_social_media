//This component will display all the bookcards
//6 per row on desktop, 4 per row on tablet, 2 per row on mobile.
import { Box, Paper, Grid } from '@mui/material'
import BookCard from "./BookCard"

import React from 'react'


export default function BookCards({ books }) {

    //update later
    if (books.length === 0) {
        return (
            <p> search for a book</p>
        )
    }

    return (
        <Box sx={{ flexGrow: 1, margin: 3 }}>
            <Grid container spacing={2}>
                {books.map((book) =>
                    <Grid item xs={6} sm={3} md={2} lg={2}>
                        <BookCard title={book.title}
                            author={book.author}
                            picture={book.picture.thumbnail} />
                    </Grid>)}

            </Grid>
        </Box>
    )
}
