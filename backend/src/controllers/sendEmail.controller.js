import SendEmailService from '../services/sendEmail.service.js'
import nodemailer from 'nodemailer'

async function sendEmail(req, res, next) {
	try {
		const { EMAIL, SENHA, TAMANHO } = process.env

		const { username, email } = req.query

		const codigo = SendEmailService.codigo(TAMANHO, username, email)

		// Configurar o transporte de e-mails
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: EMAIL,
				pass: SENHA.trim(),
			},
		})

		// Configurar o e-mail a ser enviado
		const mailOptions = {
			from: EMAIL,
			to: codigo.dataUser.email,
			subject: `Código para recuperação de senha ${codigo.codigo}`,
			html: `<h3>Código para redefinição de senha.</h3> <br/><br/><p>O codigo é: ${codigo.codigo}</p>`,
			// text: `O código é ${codigo.codigo}`,
		}

		// Enviar o e-mail
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error)
				res.status(500).send('Erro ao enviar a mensagem')
			} else {
				console.log('E-mail enviado: ' + info.response)
				res.status(200).json({ msg: 'Mensagem enviada com sucesso', codigo })
			}
		})
	} catch (error) {
		next(error)
	}
}

export default {
	sendEmail,
}
