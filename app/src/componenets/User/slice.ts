import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, State } from '../../state';

export const loadUser = createAsyncThunk<void, string>('user/loadUser', async (userId) => {
	const response = await fetch(`https://reqres.in/api/users/${userId}`);
	console.log('log: response', response);
	const content = await response.json();
	console.log('log: content', content);
});

const slice = createSlice<State['users'], SliceCaseReducers<State['users']>>({
	name: 'user',
	initialState: {},
	reducers: {
		setUser: (
			users: State['users'],
			{ payload }: PayloadAction<{ user: User; userId: string }>,
		) => {
			const { userId, user } = payload;
			users[userId] = user;
			console.log('log: user', user);
			return users;
		},
	},
});

export const { setUser } = slice.actions;

export default slice.reducer;
