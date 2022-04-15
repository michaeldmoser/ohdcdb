export const database = [
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
    {
        id: 6,
        title: 'Heaney Group',
        description: 'Vision-oriented reciprocal synergy',
    },
    {
        id: 7,
        title: 'Turcotte, Upton and Koch',
        description: 'Grass-roots tertiary website',
    },
    {
        id: 8,
        title: 'Wuckert LLC',
        description: 'Advanced national core',
    },
    {
        id: 9,
        title: 'Emard Group',
        description: 'Polarised fresh-thinking model',
    },
    {
        id: 10,
        title: 'Powlowski, Weber and Mosciski',
        description: 'Enhanced 24 hour knowledge user',
    },
    {
        id: 11,
        title: 'Wolff, Armstrong and Dooley',
        description: 'Re-contextualized incremental functionalities',
    },
    {
        id: 12,
        title: 'Toy and Sons',
        description: 'Self-enabling intermediate support',
    },
    {
        id: 13,
        title: 'Gusikowski - Cummerata',
        description: 'Business-focused disintermediate superstructure',
    },
    {
        id: 14,
        title: 'Bogisich - Greenfelder',
        description: 'Public-key clear-thinking protocol',
    },
    {
        id: 15,
        title: 'Ebert - Mann',
        description: 'Seamless secondary application',
    },
    {
        id: 16,
        title: 'Bartoletti, Baumbach and Smitham',
        description: 'Switchable solution-oriented monitoring',
    },
    {
        id: 17,
        title: 'Ullrich LLC',
        description: 'Reverse-engineered encompassing monitoring',
    },
    {
        id: 18,
        title: 'Hirthe - Fritsch',
        description: 'Expanded empowering adapter',
    },
    {
        id: 19,
        title: 'Roberts, Schmidt and Morar',
        description: 'Object-based stable paradigm',
    },
    {
        id: 20,
        title: 'Brown, Wolf and Terry',
        description: 'Customizable methodical intranet',
    },
];

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

export const useGetListQuery = (search) => {
    const filtered = search
        ? database.filter((record) => record.title.includes(search))
        : database;

    return queryResult(filtered);
};

export const useGetRecordQuery = (recordId, { skip }) =>
    queryResult(skip ? undefined : database[1]);
