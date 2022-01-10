import axios from 'axios';
import { createMessage, returnErrors } from './messages';

import { GET_PEOPLE, DELETE_PERSON, ADD_PERSON, GET_ERRORS } from './types';

export const getPeople = () => (dispatch) => {
    axios
        .get('api/people/')
        .then((result) => {
            dispatch({
                type: GET_PEOPLE,
                payload: result.data,
            });
        })
        .catch((error) =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};

export const deletePerson = (id) => (dispatch) => {
    axios
        .delete(`api/people/${id}/`)
        .then((result) => {
            dispatch(createMessage({ personDeleted: 'Deleted person' }));
            dispatch({
                type: DELETE_PERSON,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

export const addPerson = (person) => (dispatch) => {
    axios
        .post(`api/people/`, person)
        .then((result) => {
            dispatch(createMessage({ personAdded: 'Added person' }));
            dispatch({
                type: ADD_PERSON,
                payload: result.data,
            });
        })
        .catch((error) =>
            dispatch(returnErrors(error.response.data, error.response.status))
        );
};
