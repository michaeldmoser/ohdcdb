import { combineReducers } from 'redux';
import people from './people';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
    people,
    errors,
    messages,
    auth,
});
