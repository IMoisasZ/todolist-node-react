import React from 'react'
import { autoId } from '../../utills/uuid.utills'
import styles from './Select.module.css'

export default function Select({
	nameLabel = 'define name label',
	name,
	id = autoId(),
	value = '',
	disabled = false,
	display = 'none',
	handleOnChange = null,
	defaultOption = 'define name of option',
}) {
	return (
		<div
			className={styles.containerSelect}
			style={{ display: display }}>
			<label htmlFor={name}>{nameLabel}</label>
			<select
				className={styles.select}
				name={name}
				id={id}
				value={value}
				disabled={disabled}
				onChange={handleOnChange}>
				<option value=''>{defaultOption}</option>
			</select>
		</div>
	)
}
