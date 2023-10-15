import { Router } from 'express'
import SendEmailController from '../controllers/sendEmail.controller.js'

const routes = Router()

routes.get('/?', SendEmailController.sendEmail)

export default routes
