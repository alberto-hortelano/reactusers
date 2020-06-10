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
		error?: string;
	};
	users: {
		[key: string]: User;
	};
}
