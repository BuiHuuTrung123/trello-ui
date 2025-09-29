
import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
// Create a theme instance.

const theme = extendTheme({
    palette: {
        mode: 'light', // hoặc 'dark'
    },
    trelloCustom: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },

    components: {

        MuiCssBaseline: {
            styleOverrides: {
                "html, body, & *": {
                    overscrollBehavior: 'none',
                    "*::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: '#dcdde1',
                        borderRadius: "8px",
                    },
                    "*::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "white",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fonSize: '2.875rem',
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {

                    // color: theme.palette.primary.main,
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }

                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // Some CSS
                    textTransform: 'none',
                    borderWidth: '0.5px',
                    '&:hover': { borderWidth: '2px', }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fonSize: '0.875rem',

                    '& fieldset': {
                        borderWidth: '0.5px !important'
                    },
                    '&:hover fieldset': {
                        borderWidth: '2px !important'
                    },
                    '&.Mui-focused fieldset': {
                        borderWidth: '2px !important'
                    }

                }
            }
        }
    }
})

export default theme;