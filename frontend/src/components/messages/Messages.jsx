import React from 'react'
import styles from './Messages.module.css'

export default function Messages({ message }) {
	return (
		<div className={styles.containerMessages}>
			<p
				className={
					message.type === 'error'
						? styles.error
						: message.type === 'success'
						? styles.success
						: message.type === 'alter'
						? styles.alter
						: ''
				}>
				{message.message}
			</p>
		</div>
	)
}
