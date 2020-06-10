import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content } from './Content';
import { loadUser, setUser, updateUser } from '../../state/users';
import { State, User as UserType } from '../../state';

export function User({ userId }: { userId: string }) {
	const dispatch = useDispatch();
	const user = useSelector<State, UserType>(({ users }) => users[userId]);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUser({ id: userId, ...user }));
	};
	const handleDelete = () => {
		dispatch(updateUser({ id: userId, ...user }));
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
	}, []);
	return user ? (
		<Content
			user={user}
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			handleDelete={handleDelete}
		/>
	) : (
		<p>Loading...</p>
	);
}
