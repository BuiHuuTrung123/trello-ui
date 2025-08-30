import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
    trelloCustom: {
        appBarHeight: '48px',
        boardBarHeight: '58px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#7d52ffff',
                },

            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#000',
                },
            },
        },
    },
    // ...other properties
});

export default theme;