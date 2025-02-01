import vue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.vue", "**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      vue
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/script-setup-uses-vars": "error",
      "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }]
    }
  },
  prettier
];
