import TasksService from '../services/todolist.service.js'

async function createTask(req, res, next) {
	try {
		const task = req.body
		const responseController = await TasksService.createTask(task)
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function updateTask(req, res, next) {
	try {
		const task = req.body
		const responseController = await TasksService.updateTask(task)
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function getAllTasks(req, res, next) {
	try {
		const responseController = await TasksService.getAllTasks()
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function getAllTasksByUserId(req, res, next) {
	try {
		const responseController = await TasksService.getAllTasksByUserId(
			req.params.id
		)
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

async function deleteTask(req, res, next) {
	try {
		const responseController = await TasksService.deleteTask(req.params.id)
		res.send(responseController)
	} catch (error) {
		next(error)
	}
}

export default {
	createTask,
	updateTask,
	getAllTasks,
	getAllTasksByUserId,
	deleteTask,
}
