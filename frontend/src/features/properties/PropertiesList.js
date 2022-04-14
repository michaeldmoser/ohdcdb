import { ListView, ListItem } from 'components/crudapp';

const PropertiesList = () => {
    return (
        <ListView listName='List of properties'>
            {({ address1, address2 }) => (
                <ListItem name={address1} additionalInfo={address2} />
            )}
        </ListView>
    );
};

export default PropertiesList;
