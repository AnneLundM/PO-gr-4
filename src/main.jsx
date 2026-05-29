import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// eslint-disable-next-line no-unused-vars
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from "./router.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
