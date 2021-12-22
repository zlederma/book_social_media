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
import SignIn2 from "./components/Auth/SignIn2"
import SignUp from "./components/Auth/SignUp"
//Material UI imports
import { ThemeProvider } from "@emotion/react";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useSelector } from "react-redux"

import { getAuth } from "firebase/auth"
const auth = getAuth();

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooksHandler = (books) => {
    setBooks(books)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={background}>
        <NavBar />
        {/* <SearchBar onFetchBooks={fetchBooksHandler} /> */}
        {/* maxes the viewport to 1100px */}
        <div style={{ maxWidth: "1400px", margin: "auto" }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<>
                <SearchBar onFetchBooks={fetchBooksHandler} />
                <BookCards books={books} /> </>} />
              <Route path="/my-library" element={<MyLibrary />} />
              <Route path="/sign-in" element={<SignIn2 />} />

              {/* <Route path="/"/> */}
              {/* <BookCards books={books}></BookCards>
              <MyLibrary /> */}
              {/* <SignIn /> */}
              {/* <SignIn2 />
              <SignUp /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
