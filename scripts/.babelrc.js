module.exports = api => {
  api.cache(true)
  return {
    "presets": [
      "@babel/preset-env",
    ],
    "plugins": [
      ["@babel/plugin-proposal-pipeline-operator", {
        "proposal": "smart"
      }],
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-throw-expressions",
      ["@babel/plugin-transform-runtime", {"regenerator": true}]
    ],
    "sourceMaps": true,
    "retainLines": true,
  }
}