import React from 'react';
import { Link } from 'react-router-dom';
import { State } from '../../state';

interface Props {
	users: State['users'];
}

export function Content({ users }: Props) {
	return (
		<ul>
			{users &&
				Object.keys(users).map((userId, key) => (
					<li key={key}>
						<Link to={`/user/${userId}`}>
							{users[userId].first_name} - {users[userId].last_name}
						</Link>
					</li>
				))}
		</ul>
	);
}
