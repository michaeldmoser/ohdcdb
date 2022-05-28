import { rest } from 'msw';
import { setupServer } from 'msw/node';

/**
 * Mock the backend server API. This pretends to be the Django rest-framework backend.
 *
 * @param {array} database - An array of objects that will be used as a mock database
 * @param {string} urlSuffix - This is appended to the the api url. The application should send queries to /api/<urlSuffix>
 * @param {function} filter - A function that takes a single string parameter. This function is passed to Array.filter() (the `database` argument). It should return a list of items matching the search string.
 * @returns
 */
export default function setupBackend(database, urlSuffix, filter) {
    // FIXME: Need to make a deep copy of the database and reset in a afterEach() hook.

    const handlers = [
        rest.get(`/api/${urlSuffix}/`, (request, response, context) => {
            const search = request.url.searchParams.get('search');

            const results = search ? database.filter(filter(search)) : database;

            return response(
                context.status(200),
                context.json(results),
                context.delay(1)
            );
        }),
        rest.get(
            `/api/${urlSuffix}/:recordId/`,
            (request, response, context) => {
                const { recordId } = request.params;

                const record = database.find(
                    (record) => record.id === parseInt(recordId)
                );

                return response(
                    context.status(record ? 200 : 404),
                    context.json(
                        record || {
                            detail: 'Not found.',
                        }
                    ),
                    context.delay(1)
                );
            }
        ),
    ];

    const server = setupServer(...handlers);

    // Enable API mocking before tests.
    beforeAll(() => {
        server.listen();
    });

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    return server;
}
