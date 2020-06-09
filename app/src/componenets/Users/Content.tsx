import React from 'react';
import { State } from '../../state';
import { Link } from 'react-router-dom';

interface Props {
	users: State['users'];
}

export function Content({ users }: Props) {
	return (
		<ul>
			{users?.map((user, key) => (
				<li key={key}>
					<Link to={`/user/${user.id}`}>
						{user.first_name} - {user.last_name}{' '}
					</Link>
				</li>
			))}
		</ul>
	);
}
