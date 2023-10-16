import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Link from '../../components/link/Link'
import Messages from '../../components/messages/Messages'
import styles from './RedefinirSenha.module.css'
import api from '../../api/api'

export default function RedefinirSenha() {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const navigate = useNavigate()
	const { state } = useLocation()
	const { dataUser } = state

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!password) {
			return setMessage({
				type: 'error',
				message: 'A senha deve ser informada',
			})
		}

		if (!confirmPassword) {
			return setMessage({
				type: 'error',
				message: 'A confirmação da senha deve ser informada',
			})
		}

		if (password !== confirmPassword) {
			return setMessage({
				type: 'error',
				message: 'As senhas não conferem',
			})
		}

		try {
			await api.put(
				`users`,
				{
					name: dataUser.name,
					username: dataUser.username,
					email: dataUser.email,
					password: password,
					role: dataUser.role,
					status: dataUser.status,
					id: dataUser.id,
				},
				{
					auth: { username: dataUser.username, password: dataUser.password },
				}
			)
		} catch (error) {
			setMessage({ type: 'error', message: error.response.data.erros })
		}

		setMessage({ type: 'success', message: `Senha alterada com sucesso` })
		setTimeout(() => {
			navigate('/')
		}, 2000)
	}

	return (
		<Container>
			<div className={styles.containerEsqueciSenha}>
				<h2>Redefinir a senha</h2>
				<p className={styles.information}>
					Informe a nova senha e confirme a mesma
				</p>
				<Form
					handleOnSubmit={(e) => handleSubmit(e)}
					width='40%'>
					<div className={styles.containerInputs}>
						<Input
							width='16em'
							name='password'
							nameLabel='Senha'
							type='password'
							placeholder='Digite sua nova senha'
							value={password}
							handleOnChange={(e) => setPassword(e.currentTarget.value)}
						/>
						<Input
							width='16em'
							name='confirmPassword'
							nameLabel='Confirmar senha'
							type='password'
							placeholder='Confirme sua senha'
							value={confirmPassword}
							handleOnChange={(e) => setConfirmPassword(e.currentTarget.value)}
						/>
					</div>

					<Button
						nameBtn='Redefinir'
						type='submit'
					/>
					<Link
						to='/'
						description='Voltar para login'
					/>
					{message && <Messages message={message} />}
				</Form>
			</div>
		</Container>
	)
}
