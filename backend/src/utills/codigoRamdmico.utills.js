export function gerarCodigoRandomico(tamanho) {
	let codigo = ''
	const caracteres =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (let i = 0; i < Number(tamanho); i++) {
		const indice = Math.floor(Math.random() * caracteres.length)
		codigo += caracteres.charAt(indice)
	}

	return codigo
}
