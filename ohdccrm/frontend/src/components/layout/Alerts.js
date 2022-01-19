import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            const nameMap = {
                first_name: 'First Name',
                last_name: 'Last Name',
                email: 'Email',
                phone: 'Phone',
            };

            for (const property in error.message) {
                if (!Object.keys(nameMap).includes(property)) continue;

                alert.error(
                    `${nameMap[property]}: ${error.message[property].join()}`
                );
            }

            if (error.message.non_field_errors)
                alert.error(error.message.non_field_errors.join());
        }

        if (message !== prevProps.message) {
            if (message.personDeleted) alert.success(message.personDeleted);

            if (message.personAdded) alert.success(message.personAdded);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
