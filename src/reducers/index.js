import { combineReducers } from 'redux';
import { auth } from './auth/auth';
import { config } from './config/config';

export default combineReducers({ config, auth });
