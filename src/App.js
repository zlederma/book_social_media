//Styling
import { background } from "./styles/Styles"
import './GlobalStyles.css'
import { theme } from "./styles/Theme"

//My Components
import BookCards from "./components/BookCards/BookCards"
import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar"

//Material UI imports
import { ThemeProvider } from "@emotion/react";

import { useState } from "react";

//gets API key stored in an environment variable
const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const fetchSearch = `https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=${API_KEY}`; 

  const fetchSearch = `https://www.googleapis.com/books/v1/volumes?q=flowers&projection=lite&langRestrict=en&key=${API_KEY}`;

  async function fetchBooksHandler() {
    setIsLoading(true);
    const response = await fetch(fetchSearch);
    const data = await response.json();
    console.log(data);

    const transformedBooks = data.items.map((bookData) => {
      return {
        title: bookData.volumeInfo.title,
        author: bookData.volumeInfo.authors[0],
        picture: bookData.volumeInfo.imageLinks,

      };
    });
    setBooks(transformedBooks);
    setIsLoading(false);
  }

  // console.log(books);
  // console.log(books[0].picture.thumbnail)



  return (
    <ThemeProvider theme={theme}>
      <div style={background}>
        <NavBar />
        <button onClick={fetchBooksHandler}> click me </button>
        <SearchBar books={books} />
        {/* maxes the viewport to 1100px */}
        <div style={{ maxWidth: "1400px", margin: "auto" }}>
          <BookCards books={books}></BookCards>
        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
