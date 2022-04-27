import _ from 'lodash';
import * as Yup from 'yup';
import { rest } from 'msw';

import { api } from 'app/api';

import CrudApp, {
    ListView,
    RecordDetail,
    DetailsView,
    ListOfRecords,
    Header,
    RecordForm,
    AddRecord,
    EditRecord,
} from '../index';
import { TextInput } from 'components/forms';

export const initialData = [
    {
        id: 1,
        title: 'Schumm Group',
        description: 'Pre-emptive system-worthy alliance',
    },
    {
        id: 2,
        title: 'Wiza - Crist',
        description: 'Decentralized intangible structure',
    },
    {
        id: 3,
        title: 'Stamm LLC',
        description: 'Multi-channelled 3rd generation attitude',
    },
    {
        id: 4,
        title: "O'Keefe - Funk",
        description: 'Front-line clear-thinking support',
    },
    {
        id: 5,
        title: 'Kling, Koch and Zulauf',
        description: 'Devolved discrete contingency',
    },
];

export let database = initialData;

export function resetDatabase() {
    database = JSON.parse(JSON.stringify(initialData));
}

export function queryResult(data) {
    return {
        data,
        isLoading: false,
        isFetching: false,
        error: false,
        isUninitialized: false,
        isSuccess: true,
        isError: false,
    };
}

export const handlers = [
    rest.get(`/api/records/:recordId/`, (request, response, context) => {
        const { recordId } = request.params;
        const record = database.find(
            (record) => record.id === parseInt(recordId)
        );

        return response(context.json(record));
    }),
    rest.put(`/api/records/:recordId/`, (request, response, context) => {
        const { recordId } = request.params;
        let recordToEdit = database.find(
            (candidate) => candidate.id === parseInt(recordId)
        );
        Object.assign(recordToEdit, request.body);
        return response(context.json(recordToEdit));
    }),
    rest.post(`/api/records/`, (request, response, context) => {
        const newRecord = {
            id: (_.maxBy(database, (record) => record.id)?.id ?? 0) + 1,
            ...request.body,
        };
        database.push(newRecord);

        return response(context.json(newRecord));
    }),
    rest.get('/api/records/', (request, response, context) => {
        const search = request.url.searchParams.get('search');
        const filtered = search
            ? database.filter((record) => record.title.includes(search))
            : database;
        return response(context.json(filtered));
    }),
];

export const SUT = () => {
    const {
        useGetRecordsQuery,
        useGetRecordQuery,
        useAddRecordMutation,
        useEditRecordMutation,
    } = recordApi;

    const to = '/';

    return (
        <CrudApp
            {...{
                to,
                useGetRecordsQuery,
                useGetRecordQuery,
                useAddRecordMutation,
                useEditRecordMutation,
            }}
        >
            <Header />
            <ListOfRecords>
                {(data, isLoading) => {
                    return (
                        <ListView listName='List of records'>
                            {({ title, description }) => (
                                <ListView.Item
                                    name={title}
                                    additionalInfo={description}
                                />
                            )}
                        </ListView>
                    );
                }}
            </ListOfRecords>
            <RecordDetail>
                {({ data, isLoading }) => {
                    return (
                        <DetailsView>
                            <DetailsView.Body>
                                <DetailsView.Field
                                    value={data?.title}
                                    label='Title'
                                />
                                <DetailsView.Field
                                    value={data?.description}
                                    label='Description'
                                />
                            </DetailsView.Body>
                            <DetailsView.Header>
                                {data?.title}
                            </DetailsView.Header>
                        </DetailsView>
                    );
                }}
            </RecordDetail>
            <AddRecord title='Add Record' />
            <EditRecord title={(record) => `Update ${record?.title}`} />
            <RecordForm
                initialValues={{
                    title: '',
                    description: '',
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Required'),
                    description: Yup.string().required('Required'),
                })}
            >
                <TextInput name='title' label='Title' />
                <TextInput name='description' label='Description' />
            </RecordForm>
        </CrudApp>
    );
};

api.enhanceEndpoints({ addTagTypes: ['Records'] });

export const recordApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecords: builder.query({
            query: (search) => {
                return {
                    url: '/records/' + (search && `?search=${search}`),
                    method: 'GET',
                };
            },
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: 'Records', id })),
                          'Records',
                      ]
                    : ['Records'],
        }),
        getRecord: builder.query({
            query: (recordId) => ({
                url: `/records/${recordId}/`,
                method: 'GET',
            }),
            providesTags: ({ id }) => [{ type: 'Records', id }],
        }),
        addRecord: builder.mutation({
            query: (details) => ({
                url: '/records/',
                method: 'POST',
                body: details,
            }),
            invalidatesTags: ({ id }) => ['Records', { type: 'Records', id }],
        }),
        editRecord: builder.mutation({
            query: (record) => ({
                url: `/records/${record.id}/`,
                method: 'PUT',
                body: record,
            }),
            invalidatesTags: ({ id }) => [{ type: 'Records', id }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRecordsQuery,
    useGetRecordQuery,
    useAddRecordMutation,
    useEditRecordMutation,
} = recordApi;
