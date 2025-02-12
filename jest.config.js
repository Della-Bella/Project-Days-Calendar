module.exports = {
  transform: {
    "^.+\\.(js|jsx|json|mjs)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
};
