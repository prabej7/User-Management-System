import './App.css'

import { Routes,Route } from 'react-router'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Account from './Pages/Account'
import Settings from './Pages/Settings'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
        <Route element={<Account />} path='/account' />
        <Route element={<Settings />} path='/account/settings' />
      </Routes>
    </>
  )
}

export default App
