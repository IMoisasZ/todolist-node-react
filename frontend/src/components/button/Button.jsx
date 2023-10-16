import React from 'react'
import styles from './Button.module.css'
export default function Button({
	nameBtn,
	disabled = false,
	handleOnClick = null,
	type = 'button',
	value = '',
	titleBtn = 'title btn',
	backgroundColor,
	hide = false,
	margin,
}) {
	return (
		<div className={styles.containerBtn}>
			<button
				style={{ backgroundColor, margin }}
				disabled={disabled}
				hidden={hide}
				title={titleBtn}
				onClick={handleOnClick}
				type={type}
				value={value}>
				{nameBtn}
			</button>
		</div>
	)
}
