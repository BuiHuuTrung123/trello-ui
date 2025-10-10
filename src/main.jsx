import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles';  
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'
import ToastProvider from './ToastProvider'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ConfirmProvider } from 'material-ui-confirm'
const persistor = persistStore(store);

// Ky thuat injectstore : kỹ thuật khi cần dùng biến redux store ở các file ngoài phạm vi component
import {injectStore} from '~/utils/authorizeAxios'
injectStore(store )
// Cau hinh react-router-dom voi browserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CssVarsProvider theme={theme}>
           <ToastProvider />
          <ConfirmProvider defaultOptions={{allowClose: false, buttonOrder: ['confirm','cancel']}}>
            <GlobalStyles styles ={{a:{textDecoration: 'none'}}}/>
             <CssBaseline />
            <App />
          </ConfirmProvider>
        
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
