import { useSelector, useDispatch } from 'react-redux';
import { selectToken, setToken, reset, selectRefresh } from './slice';
import * as storage from './storage';

/*
 * Returns the current access token for authenticated API requests and a function to save token in the appropriate storage mechanism
 *
 * The rememberTokens function takes 2 arguments. The first is an object with access, and refresh tokens { access, refresh }. The second argument indicates if the tokens should be remember in localStorage so they are saved access sessions. In other words did the use click the "Rmember me" checkbox.
 */
export const useAuth = () => {
    const dispatch = useDispatch();
    const access = useSelector(selectToken);
    const refresh = useSelector(selectRefresh);

    const rememberTokens = (
        { access, refresh } = {},
        inLocalStorage = storage.rememberMe()
    ) => {
        storage.saveTokensToStorage({ access, refresh }, inLocalStorage);
        dispatch(setToken({ access, refresh }));
    };

    const forgetTokens = () => {
        storage.removeTokensFromStorage();
        dispatch(reset());
    };

    return [access, rememberTokens, forgetTokens];
};
