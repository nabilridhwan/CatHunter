import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ConfirmUser } from './pages/ConfirmUser';
import { AuthProvider } from './providers/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/confirm',
    element: <ConfirmUser />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
