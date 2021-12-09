//This is where the customized theme for Material UI goes
// import { createTheme } from '@mui/material/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';


export let theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#974c0f',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#7c8c79',
            // dark: will be calculated from palette.secondary.main,
        },

    },
    typography: {
        h1: {
            fontFamily: "Oswald, sans-serif"
        },
        h2: {
            fontFamily: "Oswald, sans-serif"
        },
        h3: {
            fontFamily: "Oswald, sans-serif"
        },
        h4: {
            fontFamily: "Oswald, sans-serif"
        },
        h5: {
            fontFamily: "Oswald, sans-serif"
        },
        h6: {
            fontFamily: "Oswald, sans-serif"
        },
        button: {
            fontFamily: "Oswald, sans-serif"
        },

        body1: {
            fontFamily: "Oswald, sans-serif"

        },

        body2: {
            fontFamily: "Cormorant Garamond, serif"
        },
    },

    // inputRoot: {
    //     color: "purple",
    //     "& .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "green"
    //     },
    //     "&:hover .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "red"
    //     },
    //     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //         borderColor: "purple"
    //     }
    // }
});

theme = responsiveFontSizes(theme);

// export theme;