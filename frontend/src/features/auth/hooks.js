import { useSelector, useDispatch } from 'react-redux';
import { selectToken, setToken } from './slice';

const getTokenFromStorage = () =>
    sessionStorage.getItem('access') || localStorage.getItem('access');

/*
 * Returns the current access token for authenticated API requests and a function to save token in the appropriate storage mechanism
 *
 * The remmberTokens function takes 2 arguments. The first is an object with access, and refresh tokens { access, refresh }. The second argument indicates if the tokens should be remember in localStorage so they are saved access sessions. In other words did the use click the "Rmember me" checkbox.
 */
export const useAuth = () => {
    const dispatch = useDispatch();
    const stateToken = useSelector(selectToken);
    const storageToken = getTokenFromStorage();
    const access = stateToken || storageToken;
    if (!stateToken && storageToken) {
        dispatch(setToken({ access }));
    }

    const rememberTokens = (
        { access, refresh } = {},
        inLocalStorage = false
    ) => {
        const storageMedia = inLocalStorage ? localStorage : sessionStorage;
        storageMedia.setItem('access', access);
        dispatch(setToken({ access }));
    };

    const forgetTokens = () => {
        localStorage.removeItem('access');
        sessionStorage.removeItem('access');
        dispatch(setToken({ access: null }));
    };

    return [access, rememberTokens, forgetTokens];
};
