import bcrypt from 'bcrypt'

export function hashPassword(password) {
	return bcrypt.hashSync(String(password), 10)
}

export function decryptPassword(passwordAuth, passwordDatabase) {
	return bcrypt.compareSync(passwordAuth, passwordDatabase)
}
