import React from 'react';
import { User } from '../../../state';

interface Props {
	handleSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];
	handleChange: React.DOMAttributes<HTMLInputElement>['onChange'];
	user: User;
}
export function Content({ user, handleChange }: Props) {
	return (
		<ul>
			<form action="">
				<label>
					<span>NameR</span>
					<input type="text" value={user.first_name} onChange={handleChange} />
				</label>
				<label>
					<span>Last name</span>
					<input type="text" value={user.last_name} onChange={handleChange} />
				</label>
				<label>
					<span>Email</span>
					<input type="text" value={user.email} onChange={handleChange} />
				</label>
			</form>
		</ul>
	);
}
