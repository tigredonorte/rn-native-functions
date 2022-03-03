module.exports = function(api) {
  api.cache(true);
  return {
    presets: [ 'babel-preset-expo' ],
    plugins: [
      [
        'module-resolver',
        {
          root: [ './' ],
          alias: {
            '^~(.+)': './src/\\1', // All paths starting with ~ will be replaced with ./src/
          }
        }
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
