import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import { authorization } from '../midlewares/basicAuth.midleware.js'
import { script } from '../utills/scripts.utills.js'

const routes = Router()

if (script === 'start') {
	routes.post('/', authorization, UserController.createUser)
	routes.put('/', authorization, UserController.updateUser)
	routes.get('/?', authorization, UserController.getAllUsers)
	routes.delete('/:id', authorization, UserController.deleteUser)
}
routes.post('/', UserController.createUser)
routes.put('/', UserController.updateUser)
routes.get('/?', UserController.getAllUsers)
routes.delete('/:id', UserController.deleteUser)

export default routes
