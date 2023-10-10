import React from 'react'
import blackLogo from '../assets/blackLogo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <img src={blackLogo} />
      <nav>
        <Link to='/'>Auth</Link>
        <Link to='/home'>Home</Link>
        <Link to='/forum/:1'>Forum</Link>
      </nav>
    </header>
  )
}

export default Header