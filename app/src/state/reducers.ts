import { combineReducers } from 'redux';
import user from '../componenets/Login/slice';
import { State } from '.';

export default combineReducers<State>({ user });
