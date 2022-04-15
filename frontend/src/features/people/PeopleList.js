import { ListView } from 'components/crudapp';

const PeopleList = (props) => {
    return (
        <ListView listName='List of people'>
            {({ first_name, last_name, email }) => (
                <ListView.Item
                    name={`${first_name} ${last_name}`}
                    additionalInfo={email}
                />
            )}
        </ListView>
    );
};

export default PeopleList;
