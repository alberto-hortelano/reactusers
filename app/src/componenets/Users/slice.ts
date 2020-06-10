import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../state';

export const loadUsers = createAsyncThunk<void, void>('users/loadUsers', async (s, thunkAPI) => {
	const response = await fetch('https://reqres.in/api/users');
	const content = await response.json();
	if (content.data) {
		thunkAPI.dispatch(slice.actions.setUsers(content.data));
	}
});

const slice = createSlice<State['users'], SliceCaseReducers<State['users']>>({
	name: 'users',
	initialState: {},
	reducers: {
		setUsers: (users: State['users'], { payload }: PayloadAction<State['users']>) => {
			users = payload;
			return users;
		},
	},
});

export const { setUsers } = slice.actions;

export default slice.reducer;
