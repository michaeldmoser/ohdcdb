import { useSelector } from 'react-redux';

import { selectToken } from './authSlice';

function saveTokenToStorage(token) {
    sessionStorage.setItem('token', token);
}

function saveRefreshTokenToStorage(token) {
    sessionStorage.setItem('refresh', token);
}

function useToken() {
    const token = useSelector(selectToken);

    return token;
}

function useRefresh() {
    // const [token, setToken] = useState(getRefreshTokenFromStorage());

    return null;
}

export { useToken, useRefresh };
