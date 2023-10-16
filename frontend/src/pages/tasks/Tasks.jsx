import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Container from '../../components/container/Container'
import Task from '../../components/task/Task'
import Messages from '../../components/messages/Messages'
import { AuthContext } from '../../context/auth'
import styles from './Tasks.module.css'
import api from '../../api/api'

export default function Tasks() {
	const [dataTasks, setDataTasks] = useState([])
	const [message, setMessage] = useState('')
	const [hide, setHide] = useState('none')
	const { userLoged } = useContext(AuthContext)

	const handleOnTask = () => {
		if (hide === 'none') {
			setHide('flex')
		} else {
			setHide('none')
		}
	}

	useEffect(() => {
		loadTasks()
	}, [])

	const loadTasks = async () => {
		try {
			const response = await api.get('tasks', {
				auth: {
					username: userLoged.username,
					password: userLoged.password,
				},
			})
			setDataTasks(response.data)
		} catch (error) {
			setMessage({ type: 'error', message: '' })
			console.log({ error })
		}
	}

	return (
		<Container>
			<h1>TASKS</h1>
			<div className={styles.containerTasks}>
				<Task
					tasks={dataTasks}
					handleClickTask={() => handleOnTask()}
					display={hide}
				/>
				{message && <Messages message={message} />}
			</div>
		</Container>
	)
}
