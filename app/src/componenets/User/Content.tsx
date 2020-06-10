import React from 'react';
import { User } from '../../state';

interface Props {
	handleSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];
	handleChange: React.DOMAttributes<HTMLInputElement>['onChange'];
	user: User;
}
export function Content({ user, handleChange }: Props) {
	return (
		<ul>
			<form action="">
				<input type="text" value={user.email} onChange={handleChange} />
			</form>
		</ul>
	);
}
