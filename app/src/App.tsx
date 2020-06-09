import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './componenets/Login/';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from './state';

function App() {
	const token = useSelector<State, State['user']['token']>(({ user }) => user.token);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<BrowserRouter>
					<Link to="/users">users</Link>
					<Route path="/users" render={() => (token ? <div>Users</div> : <Redirect to="/" />)} />
					<Route
						path="/user/:id"
						render={({ match }) =>
							token ? <div>User: {match.params.id}</div> : <Redirect to="/" />
						}
					/>
					<Route exact path="/" render={() => <Login />} />
				</BrowserRouter>
			</header>
		</div>
	);
}

export default App;
