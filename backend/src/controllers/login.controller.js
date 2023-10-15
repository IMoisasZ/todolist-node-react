import LoginService from '../services/login.service.js'

async function login(req, res, next) {
	try {
		const user = req.body
		if (!user.username) {
			return res.status(401).json({ error: 'Username não informado!' })
		}
		if (!user.password) {
			return res.staus(401).json({ error: 'Senha não informada!' })
		}

		const responseController = await LoginService.login(user)

		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

export default {
	login,
}
