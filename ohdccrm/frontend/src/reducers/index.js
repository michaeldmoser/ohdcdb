import { combineReducers } from 'redux';
import people from './people';
import errors from './errors';
import messages from './messages';

export default combineReducers({
    people,
    errors,
    messages,
});
