import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPerson } from '../../actions/people';

export class Form extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    };

    static propTypes = {
        addPerson: PropTypes.func.isRequired,
    };

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value,
        });

    onSubmit = (e) => {
        e.preventDefault();
        const { first_name, last_name, email, phone } = this.state;
        const person = { first_name, last_name, email, phone };
        this.props.addPerson(person);
    };

    render() {
        const { first_name, last_name, email, phone } = this.state;

        return (
            <div className='card card-body mt-4 mb-4'>
                <h2>Add a person</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label htmlFor=''>First Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='first_name'
                            value={first_name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor=''>Last Name</label>
                        <input
                            type='text'
                            className='form-control'
                            name='last_name'
                            value={last_name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor=''>Email</label>
                        <input
                            type='text'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor=''>Phone</label>
                        <input
                            type='text'
                            className='form-control'
                            name='phone'
                            value={phone}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-primary' type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addPerson })(Form);
