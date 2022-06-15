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
			<AuthProvider>
				<Router>
					<Switch>
						<PrivateRoute exact path="/">
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute path="/dashboard">
							<Dashboard />
						</PrivateRoute>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
					</Switch>
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
