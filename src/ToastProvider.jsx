// ToastProvider.jsx
import { ToastContainer } from 'react-toastify'
import { useTheme } from '@mui/material/styles'

export default function ToastProvider() {
    const theme = useTheme()
    return (
        <ToastContainer
            position="bottom-left"
            theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
        />
    )
}