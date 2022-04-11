import { useGetPropertiesQuery } from './api';

import { ListView, ListItem } from 'components/crudapp/listview';

const PropertiesList = ({ search = '' }) => {
    const query = useGetPropertiesQuery(search);

    return (
        <ListView listName='List of properties' query={query}>
            {({ address1, address2 }) => (
                <ListItem name={address1} additionalInfo={address2} />
            )}
        </ListView>
    );
};

export default PropertiesList;
