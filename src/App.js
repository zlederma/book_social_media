import { background } from "./styles/Styles"
import './Fonts.css'
import Book from "./components/BookCards/Book";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/Theme"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={background}>
        <Book></Book>
      </div>
    </ThemeProvider >
  );
}

export default App;
