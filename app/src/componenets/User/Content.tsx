import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../state';

interface Props {
	handleSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit'];
	handleChange: React.DOMAttributes<HTMLInputElement>['onChange'];
	handleDelete: React.DOMAttributes<HTMLButtonElement>['onClick'];
	user: User;
}
export function Content({ user, handleChange, handleSubmit, handleDelete }: Props) {
	return (
		<div className="user">
			<Link to="/users">users</Link>
			<form action="" onSubmit={handleSubmit}>
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
				<button type="submit">Update</button>
				<button onClick={handleDelete}>Delete</button>
			</form>
		</div>
	);
}
