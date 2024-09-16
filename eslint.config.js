import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    env: {
      browser: true,
      es2021: true,
    },
  },
];
