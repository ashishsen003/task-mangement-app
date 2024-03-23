import React from 'react'
import SignIn from '../pages/SignIn'
import AllRoutes from './AllRoutes'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <AllRoutes />
        <Link to='/auth/signup'>SignUp</Link>
        <Link to='/auth/signin'>SignIn</Link>
    </div>
  )
}

export default Navbar