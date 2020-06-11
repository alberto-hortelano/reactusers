import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content } from './Content';
import { loadUser, setUser, updateUser, deleteUser } from '../../state/users';
import { State, User as UserType } from '../../state';
import { Redirect } from 'react-router';

export function User({ userId }: { userId: string }) {
	const dispatch = useDispatch();
	const user = useSelector<State, UserType>(({ users }) => users.userList[userId]);
	const error = useSelector<State, string>(({ users }) => users.error);
	const handleSubmit = () => {
		dispatch(updateUser({ id: userId, ...user }));
	};
	const handleDelete = () => {
		dispatch(deleteUser(userId));
	};
	const handleChange = ({ currentTarget }: { currentTarget: { name: string; value: string } }) => {
		if (currentTarget.name in user) {
			dispatch(
				setUser({
					userId,
					user: {
						...user,
						[currentTarget.name]: currentTarget.value,
					},
				}),
			);
		}
	};
	useEffect(() => {
		dispatch(loadUser(userId));
	}, [dispatch, userId]);
	return user ? (
		<Content
			user={user}
			message={error}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleDelete={handleDelete}
		/>
	) : (
		<Redirect to="/users" />
	);
}
