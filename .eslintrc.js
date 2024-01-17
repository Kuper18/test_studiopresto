module.exports = {
  extends: '@mate-academy/eslint-config-react-typescript',
  rules: {
    "import/no-extraneous-dependencies": "off",
    'import/no-named-as-default': 0,
    'max-len': [
      'error',
      {
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
  },
};
