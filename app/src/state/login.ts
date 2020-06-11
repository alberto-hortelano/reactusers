import { createSlice, SliceCaseReducers, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { State } from '.';

export const authenticate = createAsyncThunk<void, State['login']>(
	'login/authenticate',
	async ({ userName, password }, { dispatch }) => {
		const response = await fetch('https://reqres.in/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: userName, password }),
		});
		const content = await response.json();
		if (content.token) {
			dispatch(slice.actions.setToken(content.token));
			dispatch(slice.actions.setError(''));
		}
		if (content.error) {
			dispatch(slice.actions.setError(content.error));
		}
	},
);

const slice = createSlice<State['login'], SliceCaseReducers<State['login']>>({
	name: 'login',
	initialState: {
		userName: '',
		password: '',
		token: '',
		error: '',
	},
	reducers: {
		setLogin: (
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

export const { setLogin, setToken } = slice.actions;

export default slice.reducer;
