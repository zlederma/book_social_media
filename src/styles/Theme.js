//This is where the customized theme for Material UI goes
import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
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
});