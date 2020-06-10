interface User {
	first_name: string;
	last_name: string;
	id: string;
}

export interface State {
	user: {
		userName: string;
		password: string;
		token: string;
		error?: string;
	};
	users?: User[];
}
