//this component is used to search for books that can then be added to My Library.

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { theme } from "../styles/Theme"




export default function SearchBar({ books }) {

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <Autocomplete
                // <Autocomplete filterOptions={(x) => x} />
                filterOptions={(x) => x}
                sx={{ marginTop: 4, backgroundColor: "#f7f3f1" }}
                freeSolo
                id="book-search"
                disableClearable
                options={books.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField
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

