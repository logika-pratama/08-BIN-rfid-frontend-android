import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import decode from 'jwt-decode'

type AuthData = {
  jwtToken: string
}

type tokenFunction = Promise<void>

type AuthContextData = {
  authData: AuthData,
  loading: boolean,
  saveToken: tokenFunction,
  deleteToken: tokenFunction
}

type decodedToken = {
  name: string,
  id_user: string,
  idaccount: string,
  role: string,
  Device_ID: string,
  modul_name: string,
  iat: number,
  exp: number
}

// * Checking JWT Auth
const checkAuth = async (authData: AuthData) => {
  const token = authData?.jwtToken

  try {
    const { exp }: decodedToken = decode(token)
    if (exp < new Date().getTime() / 1000) {
      return undefined
    }
  } catch (e) {
    return undefined
  }
  return { jwtToken: token }
}

const AuthContex = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadToken()
  }, [])

  async function loadToken(): tokenFunction {
    try {
      const authDataSerialized = await AsyncStorage.getItem('@jwtToken')
      if (authDataSerialized) {
        const authDataParsed: AuthData = JSON.parse(authDataSerialized)
        const authedData = await checkAuth(authDataParsed)
        setAuthData(authedData)
      }
    } catch (err) {
      console.log('Failed get token from async storage', err)
    } finally {
      setLoading(false)
    }
  }

  async function saveToken(authData: AuthData): tokenFunction {
    try {
      const authDataSerialized = JSON.stringify(authData)
      setAuthData(authData)
      await AsyncStorage.setItem('@jwtToken', authDataSerialized)
    } catch (err) {
      console.error('Failed store token to async storage', err)
    } finally {
    }
  }

  async function deleteToken(): tokenFunction {
    try {
      setAuthData(undefined)
    } catch (err) {
      console.error('Failed delete token in async storage', err)
    } finally {
    }
  }

  return (
    <AuthContex.Provider value={{ authData, loading, saveToken, deleteToken }}>
      {children}
    </AuthContex.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContex)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context
}

export { AuthProvider, useAuth }