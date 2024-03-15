import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Login} from './pages/Login';
import {Signup} from './pages/Signup';
import {ConfirmUser} from './pages/ConfirmUser';
import {AuthProvider} from './providers/AuthContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CreatePost from "./pages/post/CreatePost";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
  },
  {
    path: '/confirm',
    element: <ConfirmUser/>,
  },
  {
    path: '/welcome',
    element: <Welcome/>
  },
  {
    path: '/home',
    element: <Home/>
  },

  {
    path: '/create',
    element: <CreatePost/>
  }
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}/>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
