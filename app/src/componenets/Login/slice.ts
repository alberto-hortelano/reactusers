import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../state';

export const authenticate = createAsyncThunk<void, State['user']>(
	'login/authenticate',
	async ({ userName, password }, thunkAPI) => {
		const response = await fetch('https://reqres.in/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: userName, password }),
		});
		const content = await response.json();
		if (content.token) {
			thunkAPI.dispatch(slice.actions.setToken(content.token));
			thunkAPI.dispatch(slice.actions.setError(''));
		}
		if (content.error) {
			thunkAPI.dispatch(slice.actions.setError(content.error));
		}
	},
);

const slice = createSlice<State['user'], SliceCaseReducers<State['user']>>({
	name: 'login',
	initialState: {
		userName: '',
		password: '',
		token: '1',
		error: '',
	},
	reducers: {
		updateUser: (
			user: State['user'],
			{
				payload,
			}: PayloadAction<{
				userName: State['user']['userName'];
				password: State['user']['password'];
			}>,
		) => {
			user.userName = payload.userName !== void 0 ? payload.userName : user.userName;
			user.password = payload.password !== void 0 ? payload.password : user.password;
			return user;
		},
		setToken: (user: State['user'], { payload }: PayloadAction<State['user']['token']>) => {
			user.token = payload;
			return user;
		},
		setError: (user: State['user'], { payload }: PayloadAction<State['user']['error']>) => {
			user.error = payload;
			return user;
		},
	},
});

export const { updateUser, setToken } = slice.actions;

export default slice.reducer;
