//Styling
import { background } from "./styles/Styles"
import './GlobalStyles.css'
import { theme } from "./styles/Theme"

//My Components
import BookCards from "./components/BookCards/BookCards"
import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar"
import MyLibrary from "./pages/MyLibrary"
import SignIn from "./components/Auth/SignIn"
import SignUp from "./components/Auth/SignUp"
//Material UI imports
import { ThemeProvider } from "@emotion/react";

import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useSelector } from "react-redux"


function App() {
  const [books, setBooks] = useState([]);

  const fetchBooksHandler = (books) => {
    setBooks(books)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={background}>
        <NavBar />
        <SearchBar onFetchBooks={fetchBooksHandler} />
        {/* maxes the viewport to 1100px */}
        <div style={{ maxWidth: "1400px", margin: "auto" }}>
          <BookCards books={books}></BookCards>
          <MyLibrary />
          <SignIn />
          <SignUp />

        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
