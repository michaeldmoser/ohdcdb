module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true, // Defines things like process.env when generating through node
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
        'plugin:testing-library/react',
    ],
    parser: 'babel-eslint', // Uses babel-eslint transforms.
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    plugins: [
        'import', // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
        'testing-library',
    ],
    root: true, // For configuration cascading.
    rules: {
        'comma-dangle': ['warn', 'never'],
        'eol-last': 'error',
        'import/order': [
            'warn',
            {
                alphabetize: {
                    caseInsensitive: true,
                    order: 'asc',
                },
                groups: [
                    'builtin',
                    'external',
                    'index',
                    'sibling',
                    'parent',
                    'internal',
                ],
            },
        ],
        indent: ['error', 4],
        'jsx-quotes': ['warn', 'prefer-double'],
        'max-len': [
            'warn',
            {
                code: 120,
            },
        ],
        'no-console': 'warn',
        'no-duplicate-imports': 'warn',
        'no-restricted-imports': [],
        'no-unused-vars': 'warn',
        'object-curly-spacing': ['warn', 'always'],
        quotes: ['warn', 'double'],
        'react/jsx-curly-spacing': [
            'warn',
            {
                allowMultiline: true,
                children: {
                    when: 'always',
                },
                spacing: {
                    objectLiterals: 'always',
                },
                when: 'always',
            },
        ],
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        ],
        'react/jsx-indent': [
            'error',
            4,
            {
                checkAttributes: true,
                indentLogicalExpressions: true,
            },
        ],
        'react/jsx-indent-props': ['error', 4],
        'react/prop-types': 'warn',
        semi: 'warn',
        'sort-imports': [
            'warn',
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
            },
        ],
        'sort-keys': [
            'warn',
            'asc',
            {
                caseSensitive: true,
                minKeys: 2,
                natural: false,
            },
        ],
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Detect react version
        },
    },
};
