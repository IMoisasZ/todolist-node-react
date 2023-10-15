import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'

export default function Usuario() {
	const handleSubmit = (e) => {
		e.preventDefault()
	}
	return (
		<Container>
			<Form handleOnSubmit={(e) => handleSubmit(e)}>
				<Input />
			</Form>
		</Container>
	)
}
