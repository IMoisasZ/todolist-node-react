import UserService from '../services/user.service.js'

async function createUser(req, res, next) {
	try {
		const user = req.body
		const responseController = await UserService.createUser(user)
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function updateUser(req, res, next) {
	try {
		const user = req.body
		const responseController = await UserService.updateUser(user)
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function getAllUsers(req, res, next) {
	try {
		const { username, email } = req.query

		const responseController = await UserService.getAllUsers({
			username,
			email,
		})
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function deleteUser(req, res, next) {
	try {
		const responseController = await UserService.deleteUser(req.params.id)

		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	deleteUser,
}
