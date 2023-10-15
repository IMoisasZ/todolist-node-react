import React from 'react'
import styles from './Form.module.css'

export default function Form({ children, handleOnSubmit, width = '80%' }) {
	return (
		<form
			className={styles.form}
			style={{ width }}
			onSubmit={handleOnSubmit}>
			{children}
		</form>
	)
}
