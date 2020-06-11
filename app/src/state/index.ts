export interface User {
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

export interface State {
	login: {
		userName: string;
		password: string;
		token: string;
		error: string;
	};
	users: {
		userList: {
			[key: string]: User;
		};
		error: string;
	};
}

export const isUsersData = (data: any): data is (User & { id: string })[] => {
	return (
		Array.isArray(data) &&
		data.reduce<boolean>((result, user) => {
			return (
				result &&
				typeof user.id === 'number' &&
				typeof user.first_name === 'string' &&
				typeof user.last_name === 'string' &&
				typeof user.email === 'string' &&
				typeof user.avatar === 'string'
			);
		}, true)
	);
};
