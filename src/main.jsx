import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'
import ToastProvider from './ToastProvider'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <CssBaseline
      />
      <App />
    <ToastProvider />
    </CssVarsProvider>
  </Provider>,
)
