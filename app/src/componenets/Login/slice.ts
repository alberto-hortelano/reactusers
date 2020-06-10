import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../state';

export const authenticate = createAsyncThunk<void, State['login']>(
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

const slice = createSlice<State['login'], SliceCaseReducers<State['login']>>({
	name: 'login',
	initialState: {
		userName: '',
		password: '',
		token: '1',
		error: '',
	},
	reducers: {
		updateLogin: (
			login: State['login'],
			{
				payload,
			}: PayloadAction<{
				userName: State['login']['userName'];
				password: State['login']['password'];
			}>,
		) => {
			login.userName = payload.userName !== void 0 ? payload.userName : login.userName;
			login.password = payload.password !== void 0 ? payload.password : login.password;
			return login;
		},
		setToken: (login: State['login'], { payload }: PayloadAction<State['login']['token']>) => {
			login.token = payload;
			return login;
		},
		setError: (login: State['login'], { payload }: PayloadAction<State['login']['error']>) => {
			login.error = payload;
			return login;
		},
	},
});

export const { updateLogin, setToken } = slice.actions;

export default slice.reducer;
