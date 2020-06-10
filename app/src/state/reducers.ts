import { combineReducers } from 'redux';
import login from '../componenets/Login/slice';
import users from '../componenets/Users/slice';
import { State } from '.';

export default combineReducers<State>({ login, users });
