import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import styles from './EsqueciSenha.module.css'
import api from '../../api/api'

export default function EsqueciSenha({ setScreen }) {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [codigo, setCodigo] = useState('')
	const [dadosUsuario, setDadosUsuario] = useState('')
	const [message, setMessage] = useState('')
	const [disabled, setDisabled] = useState(true)
	const [required, setRequired] = useState(false)
	const [autoFocus, setAutoFocus] = useState(false)

	const navigate = useNavigate()

	const buscaDadosUsuario = async (username, email) => {
		try {
			if (!username && !email) {
				setMessage({
					tyepe: 'error',
					message: 'Informe ao menos o username ou email',
				})
			}
			const { data } = await api.get(
				`send_email?username=${username}&email=${email}`
			)
			setDadosUsuario(data)
			setMessage({ type: 'success', message: data.msg })
		} catch (error) {
			setMessage({ type: 'error', message: error.response.data.erros })
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (!dadosUsuario) {
				await buscaDadosUsuario(username, email)
			}
			handleCodigo()
		} catch (error) {
			setMessage(error.response.data.erros)
		}
	}

	const handleCodigo = () => {
		try {
			if (dadosUsuario.codigo.codigo === codigo) {
				navigate('/redefinir_senha')
			}
			setMessage({ type: 'error', message: `Código não confere` })
		} catch (error) {
			setMessage({ type: error, message: error })
		}
	}

	useEffect(() => {
		if (dadosUsuario) {
			setDisabled(false)
			setRequired(true)
			setAutoFocus(true)
		}
	}, [dadosUsuario])

	return (
		<div className={styles.containerEsqueciSenha}>
			<h2>Esqueci a senha</h2>
			<p className={styles.information}>Informe ao menos das opções abaixo</p>
			<Form
				handleOnSubmit={(e) => handleSubmit(e)}
				width='40%'>
				<div className={styles.containerInputs}>
					<Input
						width='16em'
						name='username'
						nameLabel='Username'
						placeholder='Digite seu username'
						required={false}
						value={username}
						handleOnChange={(e) => setUsername(e.currentTarget.value)}
					/>
					<Input
						width='16em'
						name='email'
						nameLabel='Email'
						type='email'
						placeholder='Digite seu email'
						required={false}
						value={email}
						handleOnChange={(e) => setEmail(e.currentTarget.value)}
					/>
				</div>
				<div className={styles.containerCodigo}>
					<Input
						width='26em'
						name='codigo'
						nameLabel='Código'
						placeholder='Digite o código que chegou no seu email'
						value={codigo}
						disabled={disabled}
						required={required}
						autoFocus={autoFocus}
						handleOnChange={(e) => setCodigo(e.currentTarget.value)}
					/>
					<Button
						nameBtn='Check Código'
						type='submit'
						margin='1em 0 0 0.3em'
					/>
				</div>
				<Button
					nameBtn='Buscar'
					type='submit'
				/>
				<a
					href='#'
					onClick={() => setScreen('login')}>
					Voltar para o login
				</a>
				{message && <p>{message.message}</p>}
			</Form>
		</div>
	)
}
