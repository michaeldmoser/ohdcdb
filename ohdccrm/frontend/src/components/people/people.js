import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPeople, deletePerson } from '../../actions/people';

export class People extends Component {
    static propTypes = {
        people: PropTypes.array.isRequired,
        getPeople: PropTypes.func.isRequired,
        deletePerson: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getPeople();
    }

    render() {
        return (
            <Fragment>
                <h1>People</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Entered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.people.map((person) => (
                            <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>
                                    {person.first_name} {person.last_name}
                                </td>
                                <td>{person.email}</td>
                                <td>{person.phone}</td>
                                <td>
                                    <button
                                        onClick={this.props.deletePerson.bind(
                                            this,
                                            person.id
                                        )}
                                        className='btn btn-danger btn-sm'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    people: state.people.people,
});

export default connect(mapStateToProps, { getPeople, deletePerson })(People);
