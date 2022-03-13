import { Button, Dropdown, Table } from 'react-bootstrap';
import { ThreeDots, Eyeglasses } from 'react-bootstrap-icons';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useGetPeopleQuery } from './api';

import './people.scss';

function People() {
    const { data: people, isLoading } = useGetPeopleQuery();
    if (isLoading) return <div>Loading</div>;

    if (!people) return <div>No people</div>;

    return (
        <>
            <section aria-labelledby='people-title'>
                <h3 id='#people-title'>People</h3>
                <div className='card card-body shadow border-0 table-wrapper'>
                    <Table striped hover responsive borderless>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(
                                ({ id, first_name, last_name, email }) => (
                                    <tr key={id}>
                                        <td>
                                            {first_name} {last_name}
                                        </td>
                                        <td>{email}</td>
                                        <td className='d-flex flex-row-reverse'>
                                            <Dropdown>
                                                <Dropdown.Toggle id={id}>
                                                    <ThreeDots />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        Remove
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        Something else
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Button>
                                                <Eyeglasses /> View
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    );
}

export default People;
