import _ from 'lodash';
import { Field, useFormikContext } from 'formik';
import {
    Col,
    Form as BootstrapForm,
    FloatingLabel,
    Button,
} from 'react-bootstrap';

import { Form } from './Form';

export function GenericInput({ name, label, type, placeholder }) {
    const { Control } = BootstrapForm;

    const labelText = label ?? _.capitalize(name);

    return (
        <Field name={name}>
            {({ field, form }) => {
                const isValid = !form.errors[field.name];
                const isInvalid = form.touched[field.name] && !isValid;
                return (
                    <FloatingLabel
                        as={Col}
                        className='mb-3'
                        controlId={name}
                        label={labelText}
                    >
                        <Control
                            placeholder={placeholder ?? labelText + '...'}
                            {...field}
                            type={type}
                            isValid={form.touched[field.name] && isValid}
                            isInvalid={isInvalid}
                            feedback={form.errors[field.name]}
                        />
                        <Control.Feedback type='invalid' tooltip>
                            {form.errors[field.name]}
                        </Control.Feedback>
                    </FloatingLabel>
                );
            }}
        </Field>
    );
}

export function TextInput(props) {
    return <GenericInput {...props} type='text' />;
}

export function SubmitButton({ variant = 'primary', children, ...rest }) {
    const { isSubmitting } = useFormikContext();
    return (
        <Button
            {...rest}
            variant={variant}
            type='submit'
            disabled={isSubmitting}
        >
            {children}
        </Button>
    );
}

export { Form };
