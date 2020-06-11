import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State, User, isUsersData } from '.';

export const loadUsers = createAsyncThunk<void, void>(
	'users/loadUsers',
	async (_ignoredValue, { dispatch }) => {
		let response: Response;
		try {
			response = await fetch('https://reqres.in/api/users');
		} catch (error) {
			console.error('error', error);
			dispatch(slice.actions.setError(error.message || error.toString()));
			return;
		}
		if (response.status !== 200) {
			dispatch(slice.actions.setError(response.status));
			return;
		}
		if (!response.ok) {
			dispatch(slice.actions.setError('Bad response'));
			console.error('Bad response:', response);
			return;
		}
		let content: any;
		try {
			content = await response.json();
		} catch (error) {
			console.error('error', error);
			dispatch(slice.actions.setError(error.message || error.toString()));
			return;
		}
		if (!content.data) {
			dispatch(slice.actions.setError('Wrong content format'));
			console.error('Wrong content format:', content);
			return;
		}
		if (!isUsersData(content.data)) {
			dispatch(slice.actions.setError('Wrong data format'));
			console.error('Wrong data format:', content.data);
			return;
		}
		const users: State['users']['userList'] = {};
		const userData: (User & { id: string })[] = content.data;
		userData.reduce((users: State['users']['userList'], userData: User & { id: string }) => {
			const { id, ...user } = userData;
			users[id] = user;
			return users;
		}, users);
		dispatch(slice.actions.setUsers(users));
	},
);

export const loadUser = createAsyncThunk<void, string>(
	'users/loadUser',
	async (userId, { dispatch }) => {
		const response = await fetch(`https://reqres.in/api/users/${userId}`);
		const content = await response.json();
		if (content.data) {
			dispatch(slice.actions.setUser({ user: content.data, userId: content.data.id }));
		}
	},
);

export const updateUser = createAsyncThunk<void, User & { id: string }>(
	'users/updateUser',
	async (user, { dispatch }) => {
		let response: Response;
		try {
			response = await fetch(`https://reqres.in/api/users/${user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
		} catch (error) {
			console.error('error', error);
			dispatch(slice.actions.setError(error.message || error.toString()));
			return;
		}
		let content: any;
		try {
			content = await response.json();
		} catch (error) {
			console.error('error', error);
			dispatch(slice.actions.setError(error.message || error.toString()));
			return;
		}
		if (content.updatedAt) {
			dispatch(slice.actions.setUser({ user: content, userId: content.id }));
			dispatch(slice.actions.setError('User updated'));
			setTimeout(() => {
				dispatch(slice.actions.setError(''));
			}, 2000);
		}
	},
);

export const deleteUser = createAsyncThunk<void, string>(
	'users/updateUser',
	async (userId, { dispatch }) => {
		const response = await fetch(`https://reqres.in/api/users/${userId}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			dispatch(slice.actions.setError(`User deleted: ${userId}`));
			dispatch(slice.actions.removeUser(userId));
			setTimeout(() => {
				dispatch(slice.actions.setError(''));
			}, 2000);
		}
	},
);

const slice = createSlice<State['users'], SliceCaseReducers<State['users']>>({
	name: 'users',
	initialState: {
		userList: {},
		error: '',
	},
	reducers: {
		setUsers: (users: State['users'], { payload }: PayloadAction<State['users']['userList']>) => {
			users.userList = payload;
			return users;
		},
		setUser: (
			users: State['users'],
			{ payload }: PayloadAction<{ user: User; userId: string }>,
		) => {
			const { userId, user } = payload;
			users.userList[userId] = user;
			return users;
		},
		removeUser: (users: State['users'], { payload }: PayloadAction<string>) => {
			const userId = payload;
			delete users.userList[userId];
			return users;
		},
		setError: (users: State['users'], { payload }: PayloadAction<State['users']['error']>) => {
			users.error = payload;
			return users;
		},
	},
});

export const { setUsers, setUser, removeUser } = slice.actions;

export default slice.reducer;
