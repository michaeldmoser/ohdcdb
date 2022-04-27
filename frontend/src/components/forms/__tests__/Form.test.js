import { render, userEvent, screen, act } from 'testing/library';
import { Form } from '../Form';
import * as Yup from 'yup';
import { TextInput, SubmitButton } from '..';

it('should render a form', () => {
    const form = render(
        <Form
            initialValues={{
                title: '',
                description: '',
            }}
            onSubmit={(values) => {}}
        >
            {() => (
                <>
                    <TextInput name='title' />
                    <TextInput name='description' />
                    <SubmitButton>Save</SubmitButton>
                </>
            )}
        </Form>
    );

    expect(form).toMatchSnapshot();
});

it('should complain about field being required.', async () => {
    const form = render(
        <Form
            initialValues={{
                title: '',
                description: '',
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {}}
        >
            {() => (
                <>
                    <TextInput name='title' />
                    <TextInput name='description' />
                    <SubmitButton>Save</SubmitButton>
                </>
            )}
        </Form>
    );

    await act(async () => {
        userEvent.click(screen.getByLabelText(/title/i));
        userEvent.click(screen.getByLabelText(/description/i));
    });

    expect(form).toMatchSnapshot();
});

it('should submit the form', async () => {
    let actualValues = null;
    const expectedValues = {
        title: 'The title',
        description: 'The description',
    };

    render(
        <Form
            initialValues={{
                title: '',
                description: '',
            }}
            onSubmit={(values) => {
                actualValues = values;
            }}
        >
            {() => (
                <>
                    <TextInput name='title' />
                    <TextInput name='description' />
                    <SubmitButton>Save</SubmitButton>
                </>
            )}
        </Form>
    );

    await act(async () => {
        userEvent.type(screen.getByLabelText(/title/i), expectedValues.title);
        userEvent.type(
            screen.getByLabelText(/description/i),
            expectedValues.description
        );
        userEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    expect(actualValues).toEqual(expectedValues);
});

it('should not submit if not filled out correctly', async () => {
    let submitted = false;

    render(
        <Form
            initialValues={{
                title: '',
                description: '',
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
                submitted = true;
            }}
        >
            {() => (
                <>
                    <TextInput name='title' />
                    <TextInput name='description' />
                    <SubmitButton>Save</SubmitButton>
                </>
            )}
        </Form>
    );

    await act(async () => {
        userEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    expect(submitted).toBeFalse();
});
