import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
// import AccountPage from './components/pages/AccountPage';
// import OneMessagePage from './components/pages/OneMessagePage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import axiosInstance, { setAccessToken } from './components/axiosInstance';
import NonActivePage from './components/pages/NonActivePage';
import NewInitiativePage from './components/pages/NewInitiativePage';
import OneInitiativePage from './components/pages/OneInitiativePage';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance('/tokens/refresh').then((res) => {
      const { user: newUser, accessToken } = res.data;
      setUser(newUser);
      setAccessToken(accessToken);
    }).catch(() => {
      setUser(null);
    });
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    const res = await axiosInstance.post('/auth/login', formData);
    const { data } = res;
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const signupHandler = async (formData) => {
    const res = await axiosInstance.post('/auth/signup', formData);
    const { data } = res;
    setUser(data.user);
    setAccessToken(data.accessToken);
  };

  const logoutHandler = async () => {
    await axiosInstance('/auth/logout');
    setUser(null);
    setAccessToken('');
  };

  const routes = [
    {
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} />,
        },
        {
          element: <ProtectedRoute isAllowed={!user} />,
          children: [
            {
              path: '/login',
              element: <LoginPage loginHandler={loginHandler} />,
            },
            {
              path: '/signup',
              element: <SignupPage signupHandler={signupHandler} />,
            },
            {
              path: '/nonactive',
              element: <NonActivePage user={user} />,
            },

          ],
        },
        {
          path: '/:id',
          element: <OneInitiativePage />,

        },
        {
          path: '/new',
          element: <NewInitiativePage />,
        },
        // {
        //   path: '/account',
        //   element: (<ProtectedRoute isAllowed={!!user} redirectPath="/login"><AccountPage user={user} /></ProtectedRoute>),
        // },
        // {
        //   path: '/meetups/:id',
        //   element: <OneMessagePage />,
        // },
      ],
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
