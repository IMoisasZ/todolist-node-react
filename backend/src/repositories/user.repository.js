import { writeFileSync, readFileSync } from 'fs'
import { pathDatabaseUsers } from '../../app.js'

async function createUser(user) {
	const newUser = {
		name: user.name,
		username: user.username,
		email: user.email,
		password: user.password,
		role: user.role,
		status: user.status,
		id: user.id,
	}
	try {
		// Verifiy if exist added user
		if (getUserByUsername(user.username) !== false) {
			throw new Error(`Usuário já cadastrado!`)
		}
		// add user
		if (getAllUsers().length === 0) {
			writeFileSync(pathDatabaseUsers, JSON.stringify([newUser]), 'utf8')
		} else {
			writeFileSync(
				pathDatabaseUsers,
				JSON.stringify([...getAllUsers(), newUser]),
				'utf8'
			)
		}
		return newUser
	} catch (error) {
		throw error
	}
}

async function updateUser(user) {
	try {
		// variable to save allusers
		const users = []

		// variable to save the user will be modify
		const userModify = []

		//iteration in allUsers to separeted the user will be modifify
		getAllUsers().forEach((u) => {
			if (u.id !== user.id) {
				users.push(u)
			} else {
				userModify.push(u)
			}
		})

		// verify if username is beeing modification
		if (userModify[0].username != user.username) {
			throw new Error(`O username não pode ser modificado`)
		}

		// including the user modify in the allusers saved
		users.push(user)

		// doind the adction the users
		writeFileSync(pathDatabaseUsers, JSON.stringify(users), 'utf8')
		return user
	} catch (error) {
		throw error
	}
}

function getAllUsers() {
	try {
		return JSON.parse(readFileSync(pathDatabaseUsers, 'utf8'))
	} catch (error) {
		throw error
	}
}

function deleteUser(userId) {
	const users = []
	const nameUserDeleted = []

	const allUsers = getAllUsers()

	if (allUsers.length === 0) {
		throw new Error(`ID inexistente`)
	}

	allUsers.forEach((u) => {
		if (u.id !== userId) {
			users.push(u)
		} else {
			nameUserDeleted.push({ name: u.name })
		}
	})

	writeFileSync(pathDatabaseUsers, JSON.stringify(users), 'utf8')

	return {
		message: `Usuário ${nameUserDeleted[0].name} foi deletado com sucesso!`,
	}
}

function getUserByUsername(username) {
	return getAllUsers().find((user) => user.username === username) || false
}

function getUserByEmail(email) {
	return getAllUsers().find((user) => user.email === email) || false
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	deleteUser,
	getUserByUsername,
	getUserByEmail,
}
