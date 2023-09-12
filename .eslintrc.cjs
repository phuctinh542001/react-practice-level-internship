module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    overrides: [
      {
        files: ["*-test.js", "*.spec.js"],
        rules: {
          "eslint:recommended": 0,
          "plugin:react/recommended": 0,
          "plugin:react/jsx-runtime": 0,
          "plugin:react-hooks/recommended": 0,
        },
      },
    ],
  },
};
