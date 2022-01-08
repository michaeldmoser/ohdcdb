import { ADD_PERSON, DELETE_PERSON } from '../actions/types.js';
import { GET_PEOPLE } from '../actions/types.js';
import people from '../components/people/people.js';

const initialState = {
    people: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PEOPLE:
            return {
                ...state,
                people: action.payload,
            };

        case DELETE_PERSON:
            return {
                ...state,
                people: state.people.filter(
                    (person) => person.id !== action.payload
                ),
            };

        case ADD_PERSON:
            return {
                ...state,
                people: [...state.people, action.payload],
            };

        default:
            return state;
    }
}
