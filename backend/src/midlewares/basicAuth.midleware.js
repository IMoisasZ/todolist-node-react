import BasicAuthService from '../services/basicAuth.service.js'
export async function authorization(req, res, next) {
	const basicAuthData = String(req.headers.authorization).split('Basic ')[1]

	if (!basicAuthData) {
		return res.status(400).json({ error: 'Dados do usuário não informado' })
	}

	const dataUserLogin = decodeURI(atob(basicAuthData)).split(':')

	const dataUser = { username: dataUserLogin[0], password: dataUserLogin[1] }

	let auth = await BasicAuthService.basicAuth(dataUser)

	if (!auth) {
		res.status(401).json({ error: 'Verifique as informações enviadas' })
	} else {
		next()
	}
}
