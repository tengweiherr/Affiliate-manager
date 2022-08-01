import { combineReducers } from 'redux'

import downlines from './downlines';
import cycles from './cycles';
import auth from './auth';

export default combineReducers({ downlines, cycles, auth });