import UserRepository from '../repositories/user.repository.js'

async function basicAuth(user) {
	try {
		if (!user.username) {
			return `O username não foi informado`
		}

		if (!user.password) {
			return `O password não foi informado`
		}

		const userDatabase = UserRepository.getUserByUsername(user.username)
		if (userDatabase === false) {
			return `Usuário não existe!`
		}

		if (user.password !== userDatabase.password) {
			return `As senhas não conferem`
		}

		return true
	} catch (error) {
		throw error
	}
}

export default {
	basicAuth,
}
