import { ListView } from 'components/crudapp';

const OrganizationsList = () => {
    return (
        <ListView listName='List of organizations'>
            {({ name }) => <ListView.Item name={name} />}
        </ListView>
    );
};

export default OrganizationsList;
