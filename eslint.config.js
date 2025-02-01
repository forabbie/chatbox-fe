import vuePlugin from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import vuePrettierConfig from '@vue/eslint-config-prettier'
import vueEslintParser from 'vue-eslint-parser' // Import the parser directly

export default [
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    languageOptions: {
      parser: vueEslintParser, // Use the imported parser
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/script-setup-uses-vars': 'error',
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }]
    }
  },
  prettier,
  vuePrettierConfig
]
