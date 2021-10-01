import { combineReducers } from 'redux';
import { auth } from './auth/auth';
import { config } from './config/config';
import { agents } from './agents/agents';
import { users } from './users/users';

export default combineReducers({ users, agents, config, auth });
