import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { State } from './state';
import { Login } from './componenets/Login';
import { Logout } from './componenets/Logout';
import { Users } from './componenets/Users';
import { User } from './componenets/User';

function App() {
	const token = useSelector<State, State['login']['token']>(({ login }) => login.token);
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="title">Users App</h1>
				{token && <Logout />}
			</header>
			<div className="App-content">
				<BrowserRouter>
					<Route path="/users" render={() => (token ? <Users /> : <Redirect to="/" />)} />
					<Route
						path="/user/:id"
						render={({ match }) =>
							token ? <User userId={match.params.id} /> : <Redirect to="/" />
						}
					/>
					<Route exact path="/" render={() => (token ? <Redirect to="/users" /> : <Login />)} />
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
