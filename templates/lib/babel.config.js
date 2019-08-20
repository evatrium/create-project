module.exports = {
  plugins: [
    ["transform-inline-environment-variables"],
    ["@babel/plugin-syntax-dynamic-import"],
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "h",
        "pragmaFrag": "Fragment"
      }
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
  ]
};