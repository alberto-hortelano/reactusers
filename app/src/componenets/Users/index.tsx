import React, { useEffect } from 'react';
import { Content } from './Content';
import { loadUsers } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../state';

export function Users() {
	const dispatch = useDispatch();
	const users = useSelector<State, State['users']>(({ users }) => users);
	useEffect(() => {
		dispatch(loadUsers());
	}, []);
	return <Content users={users} />;
}
