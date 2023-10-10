import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  HomeLayout,
  Login,
  Register,
  Landing,
  DashboardLayout,
  Error,
  AllJobs,
  AddJob,
  Stats,
  Profile,
  Admin,
  EditJob,
} from './pages'

import { action as registerAction } from './pages/Register'
import { action as loginAction } from './pages/Login'
import { action as addJobAction } from './pages/AddJob'
import { action as editJobAction } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { action as profileAction } from './pages/Profile'
import { loader as dashboardLoader } from './pages/DashboardLayout'
import { loader as AllJobsLoader } from './pages/AllJobs'
import { loader as editJobLoader } from './pages/EditJob'
import { loader as adminLoader } from './pages/Admin'
import { loader as statsLoader } from './pages/Stats'

//get the value of darktheme from localStorage
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}
checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            element: <AddJob />,
            index: true,
            action: addJobAction,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: AllJobsLoader,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
])
const App = () => {
  return (
    <RouterProvider router={router}>
      <h1>Jobfiy</h1>
    </RouterProvider>
  )
}

export default App
