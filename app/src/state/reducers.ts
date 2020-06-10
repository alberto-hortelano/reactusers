import { combineReducers } from 'redux';
import user from '../componenets/Login/slice';
import users from '../componenets/Users/slice';
import { State } from '.';

export default combineReducers<State>({ user, users });
