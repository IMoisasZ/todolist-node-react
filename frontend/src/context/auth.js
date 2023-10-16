import React, { createContext, useState } from 'react'
import api from '../api/api'

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
	const [userLoged, setUserLoged] = useState('')
	const [message, setMessage] = useState('')

	const login = async (username, password) => {
		try {
			const { data } = await api.post(`login`, {
				username,
				password,
			})
			setUserLoged(data)
			setMessage({ type: 'success', message: `Seja bem vindo ${data.name}` })
			return true
		} catch (error) {
			setMessage({ type: 'error', message: error.response.data.errors })
		}
	}

	return (
		<AuthContext.Provider
			value={{
				login,
				userLoged,
				message,
			}}>
			{children}
		</AuthContext.Provider>
	)
}
