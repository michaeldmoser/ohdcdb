import { useGetPeopleQuery } from './api';

function People() {
    const { data: people, isLoading } = useGetPeopleQuery();
    if (isLoading) return <div>Loading</div>;

    if (!people) return <div>No people</div>;

    return (
        <>
            <section aria-labelledby='people-title'>
                {people.map(({ id, first_name }) => (
                    <div key={id}>{first_name}</div>
                ))}
            </section>
        </>
    );
}

export default People;
