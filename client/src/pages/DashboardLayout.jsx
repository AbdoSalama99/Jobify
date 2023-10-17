import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Wrapper from '../assets/wrappers/Dashboard'
import { useState, useContext, createContext } from 'react'
import { BigSideBar, Loading, Navbar, SmallSideBar } from '../components'
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom'
import checkDefaultTheme from '../App'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'

const DashboardContext = createContext()

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/users/current-user')
    return data
  },
}

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery)
  } catch (error) {
    return redirect('/')
  }
}

const DashboardLayout = ({ isDarkThemeEnabled, queryClient }) => {
  const [isAuthError, setIsAuthError] = useState(false)
  const navgiate = useNavigate()
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const {
    data: { user },
  } = useQuery(userQuery)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())
  const [showSideBar, setShowSideBar] = useState(false)

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSideBar(!showSideBar)
  }

  const logoutUser = async () => {
    navgiate('/')
    await customFetch('/auth/logout')
    queryClient.invalidateQueries()
    toast.success('Logging out...')
  }

  customFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true)
      }
      return Promise.reject(error)
    }
  )
  useEffect(() => {
    if (!isAuthError) return
    logoutUser()
  }, [isAuthError])

  return (
    <DashboardContext.Provider
      value={{
        isDarkTheme,
        showSideBar,
        user,
        logoutUser,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
