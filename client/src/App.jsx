import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
import { ErrorElement } from './components'
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

// query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

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
        action: loginAction(queryClient),
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            element: <AddJob />,
            index: true,
            action: addJobAction(queryClient),
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: AllJobsLoader(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
])
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
