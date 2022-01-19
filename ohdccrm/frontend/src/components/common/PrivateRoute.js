import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    if (auth.isLoading) {
        return <h2>Loading...</h2>;
    } else if (!auth.isAuthenticated) {
        return <Navigate to='/login' />;
    } else {
        return <Outlet />;
    }
};

export default connect(mapStateToProps)(PrivateRoute);
