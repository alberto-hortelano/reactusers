import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from './Content';
import { authenticate, updateLogin } from './slice';
import { State } from '../../state';

export function Login() {
	const dispatch = useDispatch();
	const login = useSelector<State, State['login']>(({ login }) => login);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(authenticate(login));
	};
	const handleChange = ({ currentTarget }: { currentTarget: { name: string; value: string } }) => {
		switch (currentTarget.name) {
			case 'username':
				dispatch(updateLogin({ userName: currentTarget.value }));
				break;
			case 'password':
				dispatch(updateLogin({ password: currentTarget.value }));
				break;

			default:
				break;
		}
	};
	return <Content login={login} handleSubmit={handleSubmit} handleChange={handleChange} />;
}
