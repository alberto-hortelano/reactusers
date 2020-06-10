import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State, User } from '.';

export const loadUsers = createAsyncThunk<void, void>(
	'users/loadUsers',
	async (_ignoredValue, { dispatch }) => {
		const response = await fetch('https://reqres.in/api/users');
		const content = await response.json();
		const users: State['users'] = {};
		if (content.data) {
			content.data.reduce((users: State['users'], userData: User & { id: string }) => {
				const { id, ...user } = userData;
				users[id] = user;
				return users;
			}, users);
			dispatch(slice.actions.setUsers(users));
		}
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
		const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		const content = await response.json();
		if (content.data) {
			dispatch(slice.actions.setUser({ user: content.data, userId: content.data.id }));
		}
	},
);

export const deleteUser = createAsyncThunk<void, string>(
	'users/updateUser',
	async (userId, { dispatch }) => {
		const response = await fetch(`https://reqres.in/api/users/${userId}`, {
			method: 'DELETE',
		});
		const content = await response.json();
		if (content.data) {
			dispatch(slice.actions.removeUser(userId));
		}
	},
);

const slice = createSlice<State['users'], SliceCaseReducers<State['users']>>({
	name: 'users',
	initialState: {},
	reducers: {
		setUsers: (users: State['users'], { payload }: PayloadAction<State['users']>) => {
			users = payload;
			return users;
		},
		setUser: (
			users: State['users'],
			{ payload }: PayloadAction<{ user: User; userId: string }>,
		) => {
			const { userId, user } = payload;
			users[userId] = user;
			return users;
		},
		removeUser: (users: State['users'], { payload }: PayloadAction<string>) => {
			const userId = payload;
			delete users[userId];
			return users;
		},
	},
});

export const { setUsers, setUser, removeUser } = slice.actions;

export default slice.reducer;
