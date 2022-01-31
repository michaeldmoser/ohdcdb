import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <>
                <span className='navbar-text me-3'>
                    <strong>{user ? `Welcome ${user.username}` : ''}</strong>
                </span>
                <ul className='navbar-nav mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <a
                            onClick={this.props.logout}
                            className='nav-link'
                            href='#'
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </>
        );

        const guestLinks = (
            <ul className='navbar-nav mb-2 mb-lg-0'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <header className='navbar navbar-expand-lg navbar-dark bg-primary sticky-top flex-md-nowrap p-0 shadow'>
                <div className='container-fluid'>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarTogglerDemo01'
                        aria-controls='navbarTogglerDemo01'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div
                        className='collapse navbar-collapse'
                        id='navbarTogglerDemo01'
                    >
                        <a
                            className='navbar-brand col-md-3 col-lg-2 me-0 px-3'
                            href='#'
                        >
                            <img
                                src='/static/imgs/farm-svgrepo-com.svg'
                                height={20}
                                width={20}
                            />
                            OHDC CRM
                        </a>
                        <input
                            className='form-control form-control-dark w-100'
                            type='text'
                            placeholder='Search'
                            aria-label='Search'
                        ></input>
                        <div className='navbar-nav'>
                            <div className='nav-item text-nowrap'>
                                <a
                                    onClick={this.props.logout}
                                    className='nav-link px-3'
                                    href='#'
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
