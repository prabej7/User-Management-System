import './App.css'

import { Routes,Route } from 'react-router'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Register />} path='/register' />
        <Route element={<Login />} path='/login' />
      </Routes>
    </>
  )
}

export default App
