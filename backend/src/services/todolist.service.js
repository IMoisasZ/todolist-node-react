import TasksRepository from '../repositories/todolist.repository.js'
import createId from '../utills/id.utill.js'

async function createTask(task) {
	try {
		task.date = new Date()
		task.task = task.task.toUpperCase()
		task.id = await createId()
		return TasksRepository.createTask(task)
	} catch (error) {
		throw error
	}
}

async function updateTask(task) {
	try {
		task.task = task.task.toUpperCase()
		return TasksRepository.updateTask(task)
	} catch (error) {
		throw error
	}
}

async function getAllTasks() {
	try {
		return TasksRepository.getAllTasks()
	} catch (error) {
		throw error
	}
}

async function getAllTasksByUserId(userId) {
	try {
		return TasksRepository.getAllTasksByUserId(userId)
	} catch (error) {
		throw error
	}
}

async function deleteTask(taskId) {
	try {
		return TasksRepository.deleteTask(taskId)
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
