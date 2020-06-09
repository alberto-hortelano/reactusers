import React from 'react';
import { State } from '../../state';

interface Props {
	handleSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];
	handleChange: React.DOMAttributes<HTMLInputElement>['onChange'];
	user: State['user'];
}

export function Content({
	user: { userName, password, error },
	handleSubmit,
	handleChange,
}: Props) {
	return (
		<form name="form" onSubmit={handleSubmit}>
			<label>
				<span>Username</span>
				<input name="username" type="text" value={userName} onChange={handleChange} />
			</label>
			<label>
				<span>Password</span>
				<input name="password" type="password" value={password} onChange={handleChange} />
			</label>
			<button type="submit">Submit</button>
			<p>User: eve.holt@reqres.in</p>
			{error && <p>{error}</p>}
		</form>
	);
}
