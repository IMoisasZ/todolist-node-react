import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import RedefinirSenha from '../pages/redefinirSenha/RedefinirSenha'

export default function MyRoutes({ children }) {
	return (
		<>
			<Router>
				{children}
				<Routes>
					<Route
						path='/'
						element={<Login />}
					/>
					<Route
						path='/redefinir_senha'
						element={<RedefinirSenha />}
					/>
				</Routes>
				{/* <Footer /> */}
			</Router>
		</>
	)
}
