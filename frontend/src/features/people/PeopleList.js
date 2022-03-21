import { Button, Dropdown, Table } from 'react-bootstrap';
import { ThreeDots, Eye } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useGetPeopleQuery } from './api';

const PeopleList = ({ className, showDetailFor }) => {
    const { data: people, isLoading, isFetching } = useGetPeopleQuery();
    const navigate = useNavigate();

    if (isLoading || isFetching) return <div>Loading</div>;

    if (!people) return <div>No people</div>;

    return (
        <article className='list-view'>
            <h4>People</h4>
            <Table
                striped
                hover
                borderless
                className='align-middle align-items-center'
            >
                <thead>
                    <tr className='d-md-table-row d-none'>
                        <th>Name</th>
                        <th>Email</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(({ id, first_name, last_name, email }) => (
                        <tr key={id}>
                            <td>
                                {first_name} {last_name}
                            </td>
                            <td className='d-md-table-cell d-none'>
                                <address>
                                    <a
                                        href={'mailto:' + email}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {email}
                                    </a>
                                </address>
                            </td>
                            <td className='d-md-flex flex-row-reverse d-none'>
                                <Dropdown>
                                    <Dropdown.Toggle id={id}>
                                        <ThreeDots />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Remove</Dropdown.Item>
                                        <Dropdown.Item>
                                            Something else
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Button onClick={() => navigate(`${id}`)}>
                                    <Eye /> View
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </article>
    );
};

export default PeopleList;
