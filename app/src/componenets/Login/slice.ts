import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../state';

export const authenticate = createAsyncThunk<void, State['user']>(
	'login/authenticate',
	async ({ userName, password }, thunkAPI) => {
		console.log('log: userName, password', userName, password);
		const response = await fetch('https://reqres.in/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: userName, password }),
		});
		console.log('log: response', response);
		const content = await response.json();
		console.log('log: content', content);
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
		token: '',
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
			console.log('log: payload.token', payload);
			user.token = payload;
			return user;
		},
		setError: (user: State['user'], { payload }: PayloadAction<State['user']['error']>) => {
			user.error = payload;
			console.log('log: payload.error', payload);
			return user;
		},
	},
});

export const { updateUser, setToken } = slice.actions;

export default slice.reducer;
