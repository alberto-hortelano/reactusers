import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State, User } from '../../state';

export const loadUsers = createAsyncThunk<void, void>('users/loadUsers', async (s, thunkAPI) => {
	const response = await fetch('https://reqres.in/api/users');
	const content = await response.json();
	if (content.data) {
		thunkAPI.dispatch(slice.actions.setUsers(content.data));
	}
});
export const loadUser = createAsyncThunk<void, string>(
	'user/loadUser',
	async (userId, thunkAPI) => {
		const response = await fetch(`https://reqres.in/api/users/${userId}`);
		console.log('log: response', response);
		const content = await response.json();
		console.log('log: content', content);
		if (content.data) {
			console.log('log: content.data', content.data);
			thunkAPI.dispatch(slice.actions.setUser({ user: content.data, userId: content.data.id }));
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
			console.log('log: payload', payload);
			users[userId] = user;
			console.log('log: user', user);
			return users;
		},
	},
});

export const { setUsers, setUser } = slice.actions;

export default slice.reducer;
