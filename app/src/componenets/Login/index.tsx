import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from './Content';
import { authenticate, setLogin } from '../../state/login';
import { State } from '../../state';

export function Login() {
	const dispatch = useDispatch();
	const login = useSelector<State, State['login']>(({ login }) => login);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(authenticate(login));
	};
	const handleChange = ({ currentTarget }: { currentTarget: { name: string; value: string } }) => {
		if (['userName', 'password'].includes(currentTarget.name)) {
			dispatch(setLogin({ [currentTarget.name]: currentTarget.value }));
		}
	};
	return <Content login={login} handleSubmit={handleSubmit} handleChange={handleChange} />;
}
