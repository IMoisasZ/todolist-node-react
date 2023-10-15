import { gerarCodigoRandomico } from '../utills/codigoRamdmico.utills.js'
import UserRepository from '../repositories/user.repository.js'

function codigo(tamanho, username, email) {
	try {
		const codigoRamdomico = gerarCodigoRandomico(tamanho)
		if (username) {
			const dataUser = UserRepository.getUserByUsername(username)
			if (!dataUser) {
				throw new Error(`Username inexistente`)
			}
			return {
				codigo: codigoRamdomico,
				dataUser,
			}
		}

		if (email) {
			const dataUser = UserRepository.getUserByEmail(email)
			if (!dataUser) {
				throw new Error(`Email inexistente`)
			}
			return {
				codigo: codigoRamdomico,
				dataUser,
			}
		}
	} catch (error) {
		throw error
	}
}

export default {
	codigo,
}
