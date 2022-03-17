export const getTokenFromStorage = () =>
    sessionStorage.getItem('access') || localStorage.getItem('access');

export const getRefreshFromStorage = () =>
    sessionStorage.getItem('refresh') || localStorage.getItem('refresh');

export const rememberMe = () => !!localStorage.getItem('access');

export const saveTokensToStorage = (
    { access = getTokenFromStorage(), refresh = getRefreshFromStorage() },
    remember = rememberMe()
) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem('access', access);
    storage.setItem('refresh', refresh);
};

export const removeTokensFromStorage = () => {
    [sessionStorage, localStorage].forEach((storage) => {
        storage.removeItem('access');
        storage.removeItem('refresh');
    });
};
