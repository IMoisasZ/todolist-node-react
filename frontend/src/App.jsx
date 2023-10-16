import Routes from './routes/Routes'
import AuthProvider from './context/auth'

function App() {
	return (
		<div className='App'>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</div>
	)
}

export default App
