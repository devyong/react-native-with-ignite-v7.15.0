module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {
      plugins: [
        "react-native-paper/babel",
        "react-native-reanimated/plugin"
      ],
    },
  },
  plugins: [
    [
      "react-native-reanimated/plugin"
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "@babel/plugin-proposal-optional-catch-binding"
    ],
  ],
}
