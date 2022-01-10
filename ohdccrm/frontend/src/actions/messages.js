import { CREATE_MESSAGES } from './types';

export const createMessage = (message) => {
    return {
        type: CREATE_MESSAGES,
        payload: message,
    };
};
