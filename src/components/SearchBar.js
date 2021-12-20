//this component is used to search for books that can then be added to My Library.

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function SearchBar({ onFetchBooks }) {
    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([]);
    const [inputValue, setInputValue] = useState("")



    useEffect(() => {
        const identifier = setTimeout(() => {
            //TODO
            //it's never getting to this line figure
            console.log("checking")
            setInputValue(inputValue)
        }, 400);

        return () => {
            console.log("clean")
            clearTimeout(identifier)
        }
    }, [inputValue])

    async function onInputChangeHandler(e) {
        if (e.target.value.length >= 4) {
            setInputValue(e.target.value)
            const fetchSearch = `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}&projection=lite&langRestrict=en&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

            //if there is no query
            if (e.target.value === "") {
                return
            }
            setIsLoading(true);
            //query must be at least 4 letters long
            const response = await fetch(fetchSearch);
            const data = await response.json();

            let transformedBooks = data.items.map((bookData) => {
                //error catching for if there is no image
                //TODO update error catching somehow add author
                const badAuthor = () => {
                    if (typeof bookData.volumeInfo.authors == "undefined" || bookData.volumeInfo.authors.length === 0 || bookData.volumeInfo.authors[0] === null) {
                        return true
                    }
                    return false;
                }

                if (typeof bookData.volumeInfo.imageLinks == "undefined" || bookData.volumeInfo.title === null || badAuthor()) {
                    return {
                        title: "no",
                        author: "not known",
                        picture: {}
                    }
                }
                return {
                    title: bookData.volumeInfo.title,
                    author: bookData.volumeInfo.authors[0],
                    picture: bookData.volumeInfo.imageLinks,

                };
            });

            const toKeep = (book) => {
                if (book.title === 'no') {
                    return false
                }
                return true
            }

            console.log(transformedBooks)
            transformedBooks = transformedBooks.filter(toKeep);
            console.log(transformedBooks)

            setBooks(transformedBooks);
            onFetchBooks(transformedBooks)
            setIsLoading(false);
        }
    }


    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <Autocomplete
                // <Autocomplete filterOptions={(x) => x} />
                filterOptions={(x) => x}
                sx={{ marginTop: 4, backgroundColor: "#f7f3f1" }}
                freeSolo
                id="book-search"
                onInputChange={onInputChangeHandler}
                onKeyPress={onInputChangeHandler}
                disableClearable
                //TODO make the title and author text different
                options={books.map((option) => option.title + " by " + option.author)}
                renderInput={(params) => (
                    <TextField
                        color="secondary"
                        {...params}
                        label="Search for book"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
        </div>
    )
}

