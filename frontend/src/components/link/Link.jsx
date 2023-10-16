import React from 'react'
import { Link as A } from 'react-router-dom'
import styles from './Link.module.css'

export default function Link({ to, description, handleOnClick = null }) {
	return (
		<div className={styles.containerLink}>
			<A
				to={to}
				className={styles.link}
				onClick={handleOnClick}>
				{description}
			</A>
		</div>
	)
}
