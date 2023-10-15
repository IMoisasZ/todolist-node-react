import UserRepository from '../repositories/user.repository.js'
import createId from '../utills/id.utill.js'
import { hashPassword } from '../utills/hash.utill.js'

async function createUser(user) {
	try {
		user.id = await createId()
		user.password = hashPassword(user.password)
		const responseService = await UserRepository.createUser(user)
		return responseService
	} catch (error) {
		throw error
	}
}

async function updateUser(user) {
	try {
		return UserRepository.updateUser(user)
	} catch (error) {
		throw error
	}
}

async function getAllUsers() {
	try {
		return await UserRepository.getAllUsers()
	} catch (error) {
		throw error
	}
}

async function deleteUser(userId) {
	try {
		return UserRepository.deleteUser(userId)
	} catch (error) {
		throw error
	}
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	deleteUser,
}
