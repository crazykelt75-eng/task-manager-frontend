import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import List from "./pages/List"
import AddTask from "./pages/AddTask"
import Details from "./pages/Details"

function App() {
  // keep track of who is logged in
  // checks localstorage so it remembers between refreshes
  const [user, setUser] = useState(localStorage.getItem("username"))

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<List />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
