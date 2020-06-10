import React, { useEffect } from 'react';
import { Content } from './Content';
import { loadUser } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { State, User as UserType } from '../../state';

export function User({ userId }: { userId: string }) {
	const dispatch = useDispatch();
	const user = useSelector<State, UserType>(({ users }) => users[userId]);
	console.log('log: User -> user', user);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// dispatch(authenticate(user));
	};
	const handleChange = ({ currentTarget }: { currentTarget: { name: string; value: string } }) => {
		switch (currentTarget.name) {
			case 'username':
				// dispatch(updateUser({ userName: currentTarget.value }));
				break;
			case 'password':
				// dispatch(updateUser({ password: currentTarget.value }));
				break;

			default:
				break;
		}
	};
	useEffect(() => {
		dispatch(loadUser(userId));
	}, []);
	return <Content user={user} handleSubmit={handleSubmit} handleChange={handleChange} />;
}
