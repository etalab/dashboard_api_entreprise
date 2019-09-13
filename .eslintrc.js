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
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-irregular-whitespace": "off",
    "vue/order-in-components": [
      "warn",
      {
        order: [
          "el",
          "name",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["directives", "filters"],
          "extends",
          "mixins",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "data",
          "computed",
          "watch",
          "LIFECYCLE_HOOKS",
          "methods",
          "components",
          [("template", "render")],
          "renderError"
        ]
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
