import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { State } from '../../state';
import { Message } from '../Message/Message';

interface Props {
	users: State['users'];
}

export function Content({ users }: Props) {
	return (
		<ul className="users">
			{Object.keys(users.userList).map((userId, key) => {
				return (
					<li key={key}>
						<Link to={`/user/${userId}`}>
							<img className="avatar" src={users.userList[userId].avatar} alt="avatar" />
							{`${users.userList[userId].first_name} - ${users.userList[userId].last_name}`}
						</Link>
					</li>
				);
			})}
			{users.error && <Message message={users.error} />}
		</ul>
	);
}
