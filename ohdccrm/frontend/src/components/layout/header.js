import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <nav className='navbar navbar-expand-sm navbar-light bg-light'>
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
                        <a className='navbar-brand me-auto' href='#'>
                            OHDC CRM
                        </a>
                        <ul className='navbar-nav mb-2 mb-lg-0'>
                            <li className='navItem'>
                                <Link to='/login' className='nav-link'>
                                    Login
                                </Link>
                            </li>
                            <li className='navItem'>
                                <Link className='nav-link' to='/logout'>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                        <ul></ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
