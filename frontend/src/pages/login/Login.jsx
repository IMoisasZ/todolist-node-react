import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import EsqueciSenha from '../esqueciSenha/EsqueciSenha'
import styles from './Login.module.css'
import api from '../../api/api'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [dataUser, setDataUser] = useState('')
	const [message, setMessage] = useState('')
	const [screen, setScreen] = useState('login')

	const getDataUser = async (user) => {
		try {
			const { data } = await api.post(`login`, {
				username,
				password,
			})
			setDataUser(data)
			setMessage({ type: 'success', message: `Seja bem vindo ${data.name}` })
			setTimeout(() => {
				handleClear()
			}, 2000)
		} catch (error) {
			setMessage({ type: 'error', message: error.response.data.erros })
			console.log(error.response.data.erros)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		getDataUser()
	}

	const handleClear = () => {
		setUsername('')
		setPassword('')
		setDataUser('')
		setMessage('')
	}

	return (
		<Container>
			{screen === 'login' ? (
				<div className={styles.containerLogin}>
					<h2>Login</h2>

					<p className={styles.information}>
						Coloque os dados abaixo para efetuar o login na aplicação
					</p>

					<Form
						handleOnSubmit={(e) => handleSubmit(e)}
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
							<a
								href='/#'
								onClick={() => setScreen('esqueci_senha')}>
								Escqueci a senha
							</a>
							<p>|</p>
							<a href='/#'>Não tenho cadastro</a>
						</div>
						{message && <p>{message.message}</p>}
					</Form>
				</div>
			) : (
				<EsqueciSenha setScreen={setScreen} />
			)}
		</Container>
	)
}
