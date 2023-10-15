import UserRepository from '../repositories/user.repository.js'
import { decryptPassword } from '../utills/hash.utill.js'

async function login(user) {
	try {
		const userDatabase = UserRepository.getUserByUsername(user.username)

		if (!userDatabase) {
			throw new Error(`Usuário e/ou senha não conferem!`)
		}

		if (!decryptPassword(String(user.password), userDatabase.password)) {
			throw new Error(`Usuário e/ou senha não conferem!`)
		}

		return userDatabase
	} catch (error) {
		throw error
	}
}

export default {
	login,
}
