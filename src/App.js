import { background } from "./styles/Styles"
import './Fonts.css'
import BookCards from "./components/BookCards/BookCards"
import NavBar from "./components/NavBar"
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/Theme"
import { maxWidth } from "@mui/system";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={background}>
        <NavBar />
        {/* maxes the viewport to 1100px */}
        <div style={{ maxWidth: "1100px", margin: "auto" }}>
          <BookCards></BookCards>
        </div>
      </div>
    </ThemeProvider >
  );
}

export default App;
