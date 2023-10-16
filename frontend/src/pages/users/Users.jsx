import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Select from '../../components/select/Select'
import Button from '../../components/button/Button'
import Link from '../../components/link/Link'
import Messages from '../../components/messages/Messages'
import api from '../../api/api'
import styles from './User.module.css'
import { useNavigate } from 'react-router-dom'

export default function Users() {
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			return setMessage({ type: 'error', message: 'As senhas não conferem!' })
		}
		try {
			await api.post('users', {
				name,
				username,
				email,
				password,
				role: 'user',
				status: 'approved',
			})
			setMessage({
				type: 'success',
				message: 'Usuário cadastrado com sucesso!',
			})
			setTimeout(() => {
				handleClear()
				navigate('/')
			}, 2000)
		} catch (error) {
			setMessage({ type: 'error', message: error.response.data.erros })
			console.log({ error })
		}
	}

	const handleClear = () => {
		setName('')
		setUsername('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
		setMessage('')
	}

	return (
		<Container>
			<div className={styles.containerUser}>
				<h1>Users</h1>
				<Form handleOnSubmit={(e) => handleSubmit(e)}>
					<Input
						name='name'
						nameLabel='Nome'
						placeholder='Digite seu nome'
						value={name}
						handleOnChange={(e) => setName(e.currentTarget.value)}
					/>
					<Input
						name='username'
						nameLabel='Username'
						placeholder='Digite seu username'
						value={username}
						handleOnChange={(e) => setUsername(e.currentTarget.value)}
					/>
					<Input
						name='email'
						nameLabel='email'
						placeholder='Digite seu email'
						type='email'
						value={email}
						handleOnChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<div className={styles.containerPassword}>
						<Input
							name='password'
							nameLabel='Senha'
							placeholder='Digite sua senha'
							type='password'
							value={password}
							handleOnChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<Input
							name='confirmPassword'
							nameLabel='Confirmar senha'
							placeholder='Confirme sua senha'
							type='password'
							value={confirmPassword}
							handleOnChange={(e) => setConfirmPassword(e.currentTarget.value)}
						/>
					</div>
					<Select
						name='Tipo de usuario'
						hide={true}
					/>
					<Button
						nameBtn='Cadastrar'
						type='submit'
					/>
					<Link
						to='/'
						description='Voltar ao login'
					/>
					{message && <Messages message={message} />}
				</Form>
			</div>

			{/* name: user.name,
		username: user.username,
		email: user.email,
		password: user.password,
		role: user.role,
		status: user.status,
		id: user.id, */}
		</Container>
	)
}
