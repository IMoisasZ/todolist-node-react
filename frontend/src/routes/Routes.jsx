import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import RedefinirSenha from '../pages/redefinirSenha/RedefinirSenha'
import Tasks from '../pages/tasks/Tasks'
import Users from '../pages/users/Users'

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
					<Route
						path='/tasks'
						element={<Tasks />}
					/>
					<Route
						path='/user'
						element={<Users />}
					/>
				</Routes>
				{/* <Footer /> */}
			</Router>
		</>
	)
}
