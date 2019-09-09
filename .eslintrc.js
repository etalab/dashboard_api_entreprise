module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: [
    "plugin:vue/recommended",
    "eslint:recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
