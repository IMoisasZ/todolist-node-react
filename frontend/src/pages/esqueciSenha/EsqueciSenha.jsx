import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Spinner from '../../components/sppiner/Spinner'
import Messages from '../../components/messages/Messages'
import Link from '../../components/link/Link'
import styles from './EsqueciSenha.module.css'
import api from '../../api/api'

export default function EsqueciSenha({ setScreen }) {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [codigo, setCodigo] = useState('')
	const [dadosUsuario, setDadosUsuario] = useState('')
	const [message, setMessage] = useState('')
	const [displayCodigo, setDisplayCodigo] = useState('none')
	const [disabledContainerInputs, setDisabledContainerInputs] = useState('flex')
	const [btnHide, setBtnHide] = useState(false)
	const [required, setRequired] = useState(false)
	const [autoFocus, setAutoFocus] = useState(false)
	const [spinner, setSpinner] = useState(false)

	const navigate = useNavigate()

	const buscaDadosUsuario = async (username, email) => {
		try {
			setSpinner(true)
			const { data } = await api.get(
				`send_email?username=${username}&email=${email}`
			)
			setSpinner(false)
			setDadosUsuario(data)
			setMessage({
				type: 'success',
				message: `${data.msg} para o email ${data.codigo.dataUser.email}`,
			})
		} catch (error) {
			setMessage({ type: 'error', message: 'error.response.data.erros' })
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			if (!dadosUsuario) {
				if (!username && !email) {
					return setMessage({
						type: 'error',
						message: 'Informe ao menos o username ou email',
					})
				}

				await buscaDadosUsuario(username, email)
			} else {
				handleCodigo()
			}
		} catch (error) {
			setMessage(error.response.data.erros)
		}
	}

	const handleCodigo = () => {
		try {
			if (dadosUsuario.codigo.codigo === codigo) {
				navigate('/redefinir_senha', {
					state: {
						dataUser: dadosUsuario.codigo.dataUser,
						screen: setScreen(),
					},
				})
			}
			setMessage({ type: 'error', message: `Código não confere` })
		} catch (error) {
			setMessage({ type: error, message: error })
		}
	}

	useEffect(() => {
		if (dadosUsuario) {
			setDisplayCodigo('flex')
			setDisabledContainerInputs('none')
			setRequired(true)
			setAutoFocus(true)
			setBtnHide(true)
		}
	}, [dadosUsuario])

	return (
		<div className={styles.containerEsqueciSenha}>
			<h2>Esqueci a senha</h2>

			{!dadosUsuario ? (
				<p className={styles.information}>
					Informe ao menos uma das opções abaixo
				</p>
			) : (
				<p className={styles.information}>
					Informe o código recebido no email{' '}
					{dadosUsuario.codigo.dataUser.email}
				</p>
			)}
			<Form
				handleOnSubmit={(e) => handleSubmit(e)}
				width='40%'>
				<div
					className={styles.containerInputs}
					style={{ display: disabledContainerInputs }}>
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
				<div
					className={styles.containerCodigo}
					style={{ display: displayCodigo }}>
					<Input
						width='100%'
						name='codigo'
						nameLabel='Código'
						placeholder='Digite o código que chegou no seu email'
						value={codigo}
						required={required}
						autoFocus={autoFocus}
						handleOnChange={(e) => setCodigo(e.currentTarget.value)}
					/>
					<Button
						nameBtn='Validar código'
						type='submit'
					/>
				</div>
				<Button
					nameBtn='Buscar'
					type='submit'
					disabled={false}
					hide={btnHide}
				/>
				<Link
					to='/'
					handleOnClick={() => setScreen('login')}
					description='Voltar para o login'
				/>
				{spinner && <Spinner />}
				{message && <Messages message={message} />}
			</Form>
		</div>
	)
}
