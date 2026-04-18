import API from "../api/axios";
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setUser({}) // simple restore (later improve)
    }
  }, [])

  const register = async (form) => {
    console.log('REGISTER CALLED', form) // debug

    const { data } = await API.post('/auth/register', form)

    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  const login = async (form) => {
    const { data } = await API.post('/auth/login', form)

    localStorage.setItem('token', data.token)
    setUser(data.user)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }
