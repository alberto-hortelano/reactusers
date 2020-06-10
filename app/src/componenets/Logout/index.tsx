import React from 'react';
import { useDispatch } from 'react-redux';
import { Content } from './Content';
import { setToken } from '../../state/login';

export function Logout() {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(setToken(''));
	};
	return <Content handleLogout={handleLogout} />;
}
