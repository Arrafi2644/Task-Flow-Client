import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './routes/Routes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Context/AuthProvider.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
