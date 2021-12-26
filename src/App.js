//Styling
import { background } from "./styles/Styles"
import './GlobalStyles.css'
import { theme } from "./styles/Theme"

//My Components
import BookCards from "./components/BookCards/BookCards"
import NavBar from "./components/NavBar"
import SearchBar from "./components/SearchBar"
import MyLibrary from "./pages/MyLibrary"
import SignIn from "./pages/SignIn"

//Material UI imports
import { ThemeProvider } from "@emotion/react";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { isLoggedInActions } from "./store/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Test from "./Test"
import { useDispatch, useSelector } from 'react-redux'

const auth = getAuth();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dispatch = useDispatch()
  const currUID = useSelector((state) => state.isLoggedIn.uid)
  const [uid, setUid] = useState("")
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      dispatch(isLoggedInActions.setUid(uid))
      setIsLoggedIn(true);
      // ...
    } else {
      setIsLoggedIn(false);
      dispatch(isLoggedInActions.setUid(null))
      // User is signed out
      // ...
    }
  });

  //Renders different elements depending on if the user is logged in or not
  const home = () => {
    if (isLoggedIn) {
      return (
        <>
          <SearchBar onFetchBooks={fetchBooksHandler} />
          <BookCards books={books} />
          <MyLibrary /> </>
      )
    } else {
      return (
        <SignIn />
      )
    }

  }

  const [books, setBooks] = useState([]);

  const fetchBooksHandler = (books) => {
    setBooks(books)
  }

  const loggedIn = "Currently you are logged in: " + isLoggedIn

  return (
    <ThemeProvider theme={theme}>
      <div style={background}>

        {isLoggedIn ? <NavBar /> : <div> </div>}
        <h1> {loggedIn} </h1>
        <Test />
        {/* <SearchBar onFetchBooks={fetchBooksHandler} /> */}
        {/* maxes the viewport to 1100px */}
        <div style={{ maxWidth: "1400px", margin: "auto" }}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={home()} />
              <Route path="/my-library" element={<MyLibrary />} />
              <Route path="/sign-in" element={<SignIn />} />

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
