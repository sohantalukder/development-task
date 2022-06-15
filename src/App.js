import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthProvider from './CustomHooks/context/AuthProvider';
import PrivateRoute from './CustomHooks/PrivateRoute';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Home/Dashboard';

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<PrivateRoute exact path="/">
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute path="/dashboard">
							<Dashboard />
						</PrivateRoute>
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
