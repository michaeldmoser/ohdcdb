import PropTypes from 'prop-types';

function isComponent(componentType) {
    const checkComponent = (
        propValue,
        key,
        componentName,
        location,
        propFullName
    ) => {
        if (!propValue[key].type === componentType) {
            return new Error(
                'Invalid prop `' +
                    propFullName +
                    '` supplied to' +
                    ' `' +
                    componentName +
                    '`. Validation failed. Should be a '
            );
        }
    };

    return checkComponent;
}

export default Object.assign({}, PropTypes, { isComponent });
