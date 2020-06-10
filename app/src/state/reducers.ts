import { combineReducers } from 'redux';
import login from './login';
import users from './users';
import { State } from '.';

export default combineReducers<State>({ login, users });
