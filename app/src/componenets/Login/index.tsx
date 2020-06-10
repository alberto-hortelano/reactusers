import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from './Content';
import { authenticate, updateUser } from './slice';
import { State } from '../../state';

export function Login() {
	const dispatch = useDispatch();
	const user = useSelector<State, State['user']>(({ user }) => user);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(authenticate(user));
	};
	const handleChange = ({ currentTarget }: { currentTarget: { name: string; value: string } }) => {
		switch (currentTarget.name) {
			case 'username':
				dispatch(updateUser({ userName: currentTarget.value }));
				break;
			case 'password':
				dispatch(updateUser({ password: currentTarget.value }));
				break;

			default:
				break;
		}
	};
	return <Content user={user} handleSubmit={handleSubmit} handleChange={handleChange} />;
}
