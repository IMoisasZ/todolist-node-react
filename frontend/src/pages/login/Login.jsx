import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Link from '../../components/link/Link'
import Messages from '../../components/messages/Messages'
import EsqueciSenha from '../esqueciSenha/EsqueciSenha'
import styles from './Login.module.css'
import { AuthContext } from '../../context/auth'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showMessage, setShowMessage] = useState('')
	const [screen, setScreen] = useState('login')

	const { login, userLoged, message } = useContext(AuthContext)

	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		try {
			login(username, password)
			setShowMessage(message)
			setTimeout(() => {
				navigate('/tasks', { replace: true })
			}, 2000)
		} catch (error) {
			setShowMessage(message)
		}
	}

	const handleClear = () => {
		setUsername('')
		setPassword('')
		setShowMessage('')
	}

	console.log(userLoged)

	return (
		<Container>
			{screen === 'login' ? (
				<div className={styles.containerLogin}>
					<h2>Login</h2>

					<p className={styles.information}>
						Coloque os dados abaixo para efetuar o login na aplicação
					</p>

					<Form
						handleOnSubmit={(e) => handleSubmit(e, username, password)}
						width='28%'>
						<Input
							name='username'
							nameLabel='Username'
							placeholder='Digite seu username'
							value={username}
							handleOnChange={(e) => setUsername(e.currentTarget.value)}
						/>

						<Input
							name='password'
							type='password'
							nameLabel='Senha'
							placeholder='Digite sua senha'
							value={password}
							handleOnChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<Button
							nameBtn='Entrar'
							type='submit'
							titleBtn='Clique aqui para fazer login na aplicação'
							backgroundColor='#F9F871'
						/>
						<div className={styles.adds}>
							<Link
								to='/'
								handleOnClick={() => setScreen('esqueci_senha')}
								description='Escqueci a senha'
							/>
							<span>|</span>
							<Link
								to='/user'
								description='Não tenho cadastro'
							/>
						</div>
						{showMessage && <Messages message={message} />}
					</Form>
				</div>
			) : (
				<EsqueciSenha setScreen={setScreen} />
			)}
		</Container>
	)
}
