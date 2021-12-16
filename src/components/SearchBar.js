//this component is used to search for books that can then be added to My Library.

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { theme } from "../styles/Theme"
import { useState, useEffect } from 'react';

export default function SearchBar({ books, onInputValueChange }) {

    const [inputValue, setInputValue] = useState('')
    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         onInputValueChange(e.target.value)
    //     }, 500);

    //     return () => {
    //         clearTimeout(identifier)
    //     }
    // }, [inputValue])

    const inputChangeHandler = (e) => {
        //if the query is less than 4 charactars an error occurs
        if (e.target.value.length >= 4) {
            onInputValueChange(e.target.value)
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <Autocomplete
                // <Autocomplete filterOptions={(x) => x} />
                filterOptions={(x) => x}
                sx={{ marginTop: 4, backgroundColor: "#f7f3f1" }}
                freeSolo
                id="book-search"
                onInputChange={inputChangeHandler}
                onKeyPress={inputChangeHandler}
                disableClearable
                options={books.map((option) => option.title)}
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

