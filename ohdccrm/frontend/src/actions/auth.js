import axios from 'axios';
import { returnErrors } from './messages';
import { AUTH_ERROR, USER_LOADED, USER_LOADING } from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADINGA });

    // get token from state
    const token = getState().auth.token;

    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios
        .get('/api/auth/user', config)
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                PAYLOAD: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        });
};
