import { Router } from 'express'
import TasksController from '../controllers/todolist.controller.js'
import { authorization } from '../midlewares/basicAuth.midleware.js'
import { script } from '../utills/scripts.utills.js'

const routes = Router()

if (script === 'start') {
	routes.post('/', authorization, TasksController.createTask)
	routes.put('/', authorization, TasksController.updateTask)
	routes.get('/', authorization, TasksController.getAllTasks)
	routes.get('/id', authorization, TasksController.getAllTasksByUserId)
	routes.delete('/:id', authorization, TasksController.deleteTask)
}

routes.post('/', authorization, TasksController.createTask)
routes.put('/', authorization, TasksController.updateTask)
routes.get('/', authorization, TasksController.getAllTasks)
routes.get('/id', authorization, TasksController.getAllTasksByUserId)
routes.delete('/:id', authorization, TasksController.deleteTask)

export default routes
