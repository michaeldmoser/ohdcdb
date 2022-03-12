import { render } from 'testing/library';

import configureStore from 'app/configureStore';
import { selectRefresh, selectToken } from '../slice';
import { useAuth } from '../hooks';

describe('Test rememberTokens', () => {
    const tokens = {
        access: '1234',
        refresh: '5432',
    };

    function TestComponent() {
        const [, rememberTokens] = useAuth();

        rememberTokens({ access: '1234', refresh: '5432' });

        return <></>;
    }

    let store = configureStore({});

    afterEach(() => {
        sessionStorage.clear();
        localStorage.clear();
    });

    it('should set the access token', () => {
        render(<TestComponent />, { store });
        expect(selectToken(store.getState())).toBe(tokens.access);
    });

    it('should set the refresh token', () => {
        render(<TestComponent />, { store });
        expect(selectRefresh(store.getState())).toBe(tokens.refresh);
    });
});

describe('Test forgetTokens', () => {
    const tokens = {
        access: '1234',
        refresh: '5432',
    };

    function TestComponent() {
        const [, , forgetTokens] = useAuth();

        forgetTokens();

        return <></>;
    }

    let store = configureStore({ auth: tokens });

    afterEach(() => {
        sessionStorage.clear();
        localStorage.clear();
    });

    it('should clear the access token', () => {
        render(<TestComponent />, { store });
        expect(selectToken(store.getState())).toBeNull();
    });

    it('should clear the refresh token', () => {
        render(<TestComponent />, { store });
        expect(selectRefresh(store.getState())).toBeNull();
    });
});
