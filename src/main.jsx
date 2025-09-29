import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'
import ToastProvider from './ToastProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline
      />
      <App />
    <ToastProvider />
    </CssVarsProvider>
  </React.StrictMode>,
)
