import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
    trelloCustom: {
        appBarHeight: '58px',
        boardBarHeight: '60px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#6D214F',
                },

            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#6D214F',
                },
            },
        },
    },

    // ...other properties
    components: {
        MuiCssBaseline: {
      styleOverrides: {
        "html, body, & *": { 
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: '#5286ffff',
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#6413c8ff",
          },
        },
      },
    },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fonSize: '2.875rem',
                    }
                }
                // Some CSS
            }
        },
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textTransform: 'none',
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => {
                    // Some CSS
                    return {
                        color: theme.palette.primary.main,
                        fonSize: '0.875rem',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.light,
                        },
                        '&:hover': {
                            '.MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                            }
                        },
                        '& fieldset': {
                            borderWidth: '1px !important'
                        }
                    }
                }
            }
        }
    }
})

export default theme;