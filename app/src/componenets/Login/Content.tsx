import React from 'react';
import './index.css';
import { State } from '../../state';
import { Message } from '../Message/Message';

interface Props {
	handleSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];
	handleChange: React.DOMAttributes<HTMLInputElement>['onChange'];
	login: State['login'];
}

export function Content({
	login: { userName, password, error },
	handleSubmit,
	handleChange,
}: Props) {
	return (
		<form className="login" name="form" onSubmit={handleSubmit}>
			<label>
				<span>Username</span>
				<input name="userName" type="text" value={userName} onChange={handleChange} />
			</label>
			<label>
				<span>Password</span>
				<input name="password" type="password" value={password} onChange={handleChange} />
			</label>
			<button type="submit">Submit</button>
			{error && <Message message={error} />}
		</form>
	);
}
