import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AdminHome from './AdminHome'
import UserHome from './UserHome'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import AdminNavbar from './AdminNavbar'
import UserNavbar from './UserNavbar'
import GuestNavbar from './GuestNavbar'
import ProductUpload from './ProductUpload'
import Products from './Products'
import UpdateUser from './UpdateUser'
import ModifyUsers from './ModifyUsers'
import Cart from './Cart'


function App() {
  const [user, setUser] = useState(()=>{
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  function logout(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <>
      <BrowserRouter>
        {user ? (user.role === 1 ? <AdminNavbar logoutParam={logout} /> : <UserNavbar logoutParam={logout} />) : <GuestNavbar />}
        <Routes>

          {user
            ? user.role === 1
            ? <>{/* admin */}
              <Route path='/' element={<AdminHome userParam={user} />} />
              <Route path='/products' element={<Products userParam={user} />} />
              <Route path='/productUpload' element={<ProductUpload />} />
              <Route path='/modifyUsers' element={<ModifyUsers />} />
            </>
            : <>{/* user */}
              <Route path='/' element={<UserHome userParam={user} />} />
              <Route path='/products' element={<Products userParam={user} />} />
              <Route path='/cart' element={<Cart userParam={user} />} />
              <Route path='/updateUser' element={<UpdateUser />} />
            </>
            : <>{/* guest */}
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login setUserLogin={setUser} />} />
              <Route path='/register' element={<Register />} />
            </>
          }

          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
