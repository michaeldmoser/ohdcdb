import React, { Component } from 'react';

export class Navigation extends Component {
    render() {
        return (
            <nav
                id='sidebarMenu'
                className='col-md-3 col-lg-2 d-md-block bg-light sidebar collapse'
            >
                <div className='position-sticky pt-3'>
                    <ul className='nav flex-column'>
                        <li className='nav-item'>
                            <a className='nav-link' href='#'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-home'
                                >
                                    <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                                    <polyline points='9 22 9 12 15 12 15 22'></polyline>
                                </svg>{' '}
                                Properties
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a href='#' className='nav-link'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                    className='feather feather-users'
                                >
                                    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                                    <circle cx='9' cy='7' r='4'></circle>
                                    <path d='M23 21v-2a4 4 0 0 0-3-3.87'></path>
                                    <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                                </svg>{' '}
                                People
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation;
