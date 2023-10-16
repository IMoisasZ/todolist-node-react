import { writeFileSync, readFileSync } from 'fs'
import { pathDatabaseTodolist } from '../../app.js'

async function createTask(task) {
	try {
		if (getAllTasks().length === 0) {
			const newTask = writeFileSync(
				pathDatabaseTodolist,
				JSON.stringify([task]),
				'utf8'
			)
		}
		writeFileSync(
			pathDatabaseTodolist,
			JSON.stringify([...getAllTasks(), task]),
			'utf8'
		)

		return task
	} catch (error) {
		throw error
	}
}

async function updateTask(task) {
	try {
		const othersTasks = []
		getAllTasks().forEach((t) => {
			if (t.id !== task.id) {
				othersTasks.push(t)
			}
		})
		writeFileSync(pathDatabaseTodolist, JSON.stringify([...othersTasks, task]))
		return task
	} catch (error) {
		throw error
	}
}

function getAllTasks() {
	try {
		return JSON.parse(readFileSync(pathDatabaseTodolist, 'utf8'))
	} catch (error) {
		throw error
	}
}

function getAllTasksByUserId(userId) {
	try {
		const alltasks = getAllTasks().filter((t) => t.id === userId)
		return alltasks
	} catch (error) {
		throw error
	}
}

function deleteTask(taskId) {
	try {
		const othersTasks = []
		getAllTasks().forEach((t) => {
			if (t.id !== taskId) {
				othersTasks.push(t)
			}
		})
		writeFileSync(pathDatabaseTodolist, JSON.stringify(othersTasks), 'utf8')
		return { message: 'Task deletada com sucesso!' }
	} catch (error) {
		throw error
	}
}

export default {
	createTask,
	updateTask,
	getAllTasks,
	getAllTasksByUserId,
	deleteTask,
}
