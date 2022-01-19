import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Route,
    Routes,
    Redirect,
} from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/header';
import Dashboard from './people/dashboard';
import Alerts from './layout/Alerts';

import { Provider } from 'react-redux';
import store from '../store';
import Login from './accounts/login';
import PrivateRoute from './common/PrivateRoute';
import { loadUser } from '../actions/auth';

const alertOptions = {
    timeout: 3000,
    position: 'top center',
};

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <>
                            <Header />
                            <Alerts />
                            <div className='container'>
                                <Routes>
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/' element={<PrivateRoute />}>
                                        <Route index element={<Dashboard />} />
                                    </Route>
                                </Routes>
                            </div>
                        </>
                    </Router>
                </AlertProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
