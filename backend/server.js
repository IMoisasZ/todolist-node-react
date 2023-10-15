import app from './app.js'
import { script } from './src/utills/scripts.utills.js'
import dotenv from 'dotenv'
dotenv.config()

const { PORT } = process.env

app.listen(PORT, () =>
	console.log(`SERVER RUNNING AT THE PORT ${PORT} - ${script}`)
)
