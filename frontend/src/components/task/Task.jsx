import React, { useState } from 'react'
import styles from './Task.module.css'

export default function Task({ tasks, handleClickTask, display = 'none' }) {
	return (
		<>
			{tasks.map((t) => {
				return (
					<div
						key={t.id}
						className={styles.containerTask}>
						<div
							className={styles.mainTask}
							onClick={handleClickTask}>
							<div>
								<span>Task</span>
								<p>{t.task}</p>
							</div>
							<div>
								<span>Status</span>
								<p>{t.status}</p>
							</div>
						</div>

						<div
							className={styles.dataTask}
							style={{ display }}>
							<div>
								<span>Data</span>
								<p>{t.date}</p>
							</div>
							<div>
								<span>Inicio</span>
								<p>{t.start_day}</p>
							</div>
							<div>
								<span>Término</span>
								<p>{t.finish_day}</p>
							</div>
						</div>
						<div className={styles.containerBtn}>
							<button>Encerrar</button>
							<button>Alterar</button>
							<button>Excluir</button>
						</div>
					</div>
				)
			})}
		</>
	)
}
