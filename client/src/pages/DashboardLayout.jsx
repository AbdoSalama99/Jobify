import React from 'react'
import Wrapper from '../assets/wrappers/Dashboard'
import { useState, useContext, createContext } from 'react'
import { BigSideBar, Navbar, SmallSideBar } from '../components'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import checkDefaultTheme from '../App'
import customFetch from '../../../utils/customFetch'
import { toast } from 'react-toastify'

const DashboardContext = createContext()

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user')
    return data
  } catch (error) {
    return redirect('/')
  }
}

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const navgiate = useNavigate()

  const { user } = useLoaderData()
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
    toast.success('Logging out...')
  }
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
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
