// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
    extends: ['plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/typescript/recommended', 'prettier', './.eslintrc-auto-import.json'],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        // not needed for vue 3
        'vue/no-multiple-template-root': 'off',
        'no-undef': 'off',
        'vue/multi-word-component-names': 'off',
    },
}
