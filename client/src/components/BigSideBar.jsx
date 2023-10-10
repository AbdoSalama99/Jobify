import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import NavLinks from './NavLinks'

const BigSideBar = () => {
  const { showSideBar } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSideBar />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar
