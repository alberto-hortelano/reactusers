import React from 'react';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from './App';
import * as Login from './componenets/Login';
import * as Logout from './componenets/Logout';
import * as Users from './componenets/Users';
import * as User from './componenets/User';

let LoginSpy: jest.SpyInstance;
let LogoutSpy: jest.SpyInstance;
let UsersSpy: jest.SpyInstance;
let UserSpy: jest.SpyInstance;
let useSelector: jest.SpyInstance;

describe('App', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		LoginSpy = jest.spyOn(Login, 'Login').mockReturnValue(<></>);
		LogoutSpy = jest.spyOn(Logout, 'Logout').mockReturnValue(<></>);
		UsersSpy = jest.spyOn(Users, 'Users').mockReturnValue(<></>);
		UserSpy = jest.spyOn(User, 'User').mockReturnValue(<></>);
		useSelector = jest.spyOn(reactRedux, 'useSelector');
	});

	it('renders Login if no logged in', () => {
		useSelector.mockReturnValue('');
		render(
			<Router history={createMemoryHistory()}>
				<App />
			</Router>,
		);
		expect(LoginSpy).toHaveBeenCalled();
		expect(LogoutSpy).not.toHaveBeenCalled();
		expect(UsersSpy).not.toHaveBeenCalled();
		expect(UserSpy).not.toHaveBeenCalled();
	});
	it('renders Logout and Users if logged in', () => {
		useSelector.mockReturnValue('token');
		render(
			<Router history={createMemoryHistory()}>
				<App />
			</Router>,
		);
		expect(LoginSpy).not.toHaveBeenCalled();
		expect(LogoutSpy).toHaveBeenCalled();
		expect(UsersSpy).toHaveBeenCalled();
		expect(UserSpy).not.toHaveBeenCalled();
	});
});
