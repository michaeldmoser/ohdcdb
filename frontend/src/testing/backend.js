import { rest } from 'msw';
import { setupServer } from 'msw/node';
import _ from 'lodash';

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
    let backend = JSON.parse(JSON.stringify(database));

    const handlers = [
        rest.get(`/api/${urlSuffix}/`, (request, response, context) => {
            const search = request.url.searchParams.get('search');

            const results = search ? backend.filter(filter(search)) : backend;

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

                const record = backend.find(
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
        rest.post(`/api/${urlSuffix}/`, (request, response, context) => {
            let record = JSON.parse(JSON.stringify(request.body));
            record.id = _.maxBy(backend, (item) => item.id).id + 1;
            backend.push(record);
            return response(context.json(record));
        }),
        rest.put(
            `/api/${urlSuffix}/:recordId/`,
            (request, response, context) => {
                const { recordId } = request.params;
                let record = backend.find(
                    (item) => item.id === parseInt(recordId)
                );
                Object.assign(record, JSON.parse(JSON.stringify(request.body)));

                return response(context.json(record));
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

    beforeEach(() => {
        backend = JSON.parse(JSON.stringify(database));
    });

    return server;
}
