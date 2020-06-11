import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { User } from '../../state';
import { Message } from '../Message/Message';

interface Props {
	handleSubmit: React.DOMAttributes<HTMLButtonElement>['onClick'];
	handleChange: React.DOMAttributes<HTMLInputElement>['onChange'];
	handleDelete: React.DOMAttributes<HTMLButtonElement>['onClick'];
	user: User;
	message: string;
}
export function Content({ user, message, handleChange, handleSubmit, handleDelete }: Props) {
	return (
		<div className="user">
			<div>
				<label>
					<span>Name</span>
					<input name="first_name" type="text" value={user.first_name} onChange={handleChange} />
				</label>
				<label>
					<span>Last name</span>
					<input name="last_name" type="text" value={user.last_name} onChange={handleChange} />
				</label>
				<label>
					<span>Email</span>
					<input name="email" type="text" value={user.email} onChange={handleChange} />
				</label>
				<button onClick={handleSubmit}>Update</button>
				<button onClick={handleDelete}>Delete</button>
			</div>
			<Link to="/users">Back</Link>
			{message && <Message message={message} />}
		</div>
	);
}
