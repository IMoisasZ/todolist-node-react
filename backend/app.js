import express from 'express'
import { existsSync, writeFileSync } from 'fs'
import cors from 'cors'
import winston from 'winston'
import UserRoutes from './src/routes/user.route.js'
import LoginRoutes from './src/routes/login.route.js'
import SendEmailRoutes from './src/routes/sendEmail.route.js'

export const pathDatabaseTodolist = 'src/databse/todolist.json'
export const pathDatabaseUsers = 'src/databse/users.json'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/users', UserRoutes)
app.use('/login', LoginRoutes)
app.use('/send_email', SendEmailRoutes)

// winston(log)
const { combine, timestamp, label, printf } = winston.format
const myformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log/todolist.json' }),
	],
	format: combine(label({ label: 'todolist' }), timestamp(), myformat),
})

// erro padrão
app.use((err, req, res, next) => {
	global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
	res.status(400).send({ erros: err.message })
})

if (!existsSync(pathDatabaseTodolist)) {
	writeFileSync(pathDatabaseTodolist, '[]', 'utf8')
}

if (!existsSync(pathDatabaseUsers)) {
	writeFileSync(pathDatabaseUsers, '[]', 'utf8')
}

export default app
