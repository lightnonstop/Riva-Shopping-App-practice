import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'
import { Provider } from 'react-redux'
import { store } from '../src/app/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
