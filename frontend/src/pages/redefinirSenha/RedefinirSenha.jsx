import React, { useState } from 'react'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import styles from './RedefinirSenha.module.css'
import api from '../../api/api'

export default function RedefinirSenha({ setScreen }) {
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
	}

	return (
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
						placeholder='Digite sua nova senha'
						value={password}
						handleOnChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Input
						width='16em'
						name='confirmPassword'
						nameLabel='Confirmar senha'
						type='email'
						placeholder='Confirme sua senha'
						value={confirmPassword}
						handleOnChange={(e) => setConfirmPassword(e.currentTarget.value)}
					/>
				</div>

				<Button
					nameBtn='Redefinir'
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
