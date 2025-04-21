import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from 'react-redux';
import  { persistor, store } from './store.jsx'
import { PersistGate } from "redux-persist/integration/react";
import AppWrapper from './appwrapper.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <AppWrapper>
      <App />
      </AppWrapper>
 
     </PersistGate>
     </Provider>
   
  </StrictMode>
)
