import { CREATE_MESSAGES, GET_ERRORS } from './types';

export const createMessage = (message) => {
    return {
        type: CREATE_MESSAGES,
        payload: message,
    };
};

export const returnErrors = (message, status) => {
    return {
        type: GET_ERRORS,
        payload: { message, status },
    };
};
