import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './componenets/Login/';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from './state';
import { Users } from './componenets/Users';
import { User } from './componenets/User';

function App() {
	const token = useSelector<State, State['login']['token']>(({ login }) => login.token);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<BrowserRouter>
					<Link to="/users">users</Link>
					<Route path="/users" render={() => (token ? <Users /> : <Redirect to="/" />)} />
					<Route
						path="/user/:id"
						render={({ match }) =>
							token ? <User userId={match.params.id} /> : <Redirect to="/" />
						}
					/>
					<Route exact path="/" render={() => !token && <Login />} />
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
