import { Router } from 'express'
import LoginController from '../controllers/login.controller.js'

const routes = Router()

routes.post('/', LoginController.login)

export default routes
