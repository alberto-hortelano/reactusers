import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Content } from './Content';
import { loadUsers } from './slice';
import { State } from '../../state';

export function Users() {
	const dispatch = useDispatch();
	const users = useSelector<State, State['users']>(({ users }) => users);
	useEffect(() => {
		dispatch(loadUsers());
	}, []);
	return <Content users={users} />;
}
