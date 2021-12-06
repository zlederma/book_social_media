//This component will display all the bookcards
//6 per row on desktop, 4 per row on tablet, 2 per row on mobile.
import { Box, Paper, Grid } from '@mui/material'
import BookCard from "./BookCard"

import React from 'react'

var items = [];
for (let i = 0; i < 20; i++) {
    items.push(
        <Grid item xs={6} sm={3} md={2} lg={2}>
            <BookCard></BookCard>
        </Grid>
    )
}


export default function BookCards() {
    return (
        <Box sx={{ flexGrow: 1, margin: 3 }}>
            <Grid container spacing={2}>
                {items}
            </Grid>
        </Box>
    )
}
