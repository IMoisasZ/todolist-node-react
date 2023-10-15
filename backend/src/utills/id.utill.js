import { randomUUID } from 'crypto'

async function createId() {
	const id = randomUUID()
	return id
}

export default createId
