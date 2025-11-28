import React, { createContext, useReducer, useEffect } from 'react'
import type { User } from '../types'
import api, { setAuthToken } from '../api/api'

type State = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

type Action =
  | { type: 'LOGIN'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }

const initialState: State = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const AuthContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null
})

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true
      }
    case 'LOGOUT':
      return { ...initialState }
    default:
      return state
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userJSON = localStorage.getItem('user')
    if (token && userJSON) {
      setAuthToken(token)
      dispatch({ type: 'LOGIN', payload: { token, user: JSON.parse(userJSON) } })
    }
  }, [])

  
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('token', state.token)
      localStorage.setItem('user', JSON.stringify(state.user))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }, [state.token, state.user])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext