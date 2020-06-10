import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../state';

export const loadUsers = createAsyncThunk<void, void>('users/loadUsers', async (s, thunkAPI) => {
	console.log('loadUsers');
	const response = await fetch('https://reqres.in/api/users');
	console.log('log: response', response);
	const content = await response.json();
	if (content.data) {
		console.log('log: content.data', content.data);
		thunkAPI.dispatch(slice.actions.setUsers(content.data));
		// return content.data;
	}
	// return content;
});

const slice = createSlice<State['users'], SliceCaseReducers<State['users']>>({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers: (users: State['users'], { payload }: PayloadAction<State['users']>) => {
			users = payload;
			console.log('log: users', users);
			return users;
		},
	},
});

export const { setUsers } = slice.actions;

export default slice.reducer;
