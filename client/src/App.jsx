import { useState } from 'react'

import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path ="/login" element={<Login/>}></Route>
      <Route path ="/register" element={<Register/>}></Route>

      {/* //protected route */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }  
      >
      </Route>
    </Routes>
  )
}

export default App
