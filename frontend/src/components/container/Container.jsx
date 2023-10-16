import React from 'react'
import Header from '../header/Header'
import styles from './Container.module.css'

export default function Container({ children }) {
	return (
		<>
			<Header />
			<div className={styles.container}>{children}</div>
		</>
	)
}
