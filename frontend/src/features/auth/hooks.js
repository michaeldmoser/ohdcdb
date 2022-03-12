import { useSelector, useDispatch } from 'react-redux';
import { selectToken, setToken, reset, selectRefresh } from './slice';

const getTokenFromStorage = () =>
    sessionStorage.getItem('access') || localStorage.getItem('access');

const getRefreshFromStorage = () =>
    sessionStorage.getItem('refresh') || localStorage.getItem('refresh');

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
    const refresh = useSelector(selectRefresh) || getRefreshFromStorage();

    if (!stateToken && storageToken) {
        dispatch(setToken({ access, refresh }));
    }

    const rememberTokens = (
        { access, refresh } = {},
        inLocalStorage = false
    ) => {
        const storageMedia = inLocalStorage ? localStorage : sessionStorage;
        storageMedia.setItem('access', access);
        storageMedia.setItem('refresh', refresh);
        dispatch(setToken({ access, refresh }));
    };

    const forgetTokens = () => {
        localStorage.removeItem('access');
        sessionStorage.removeItem('access');
        dispatch(reset());
    };

    return [access, rememberTokens, forgetTokens];
};
