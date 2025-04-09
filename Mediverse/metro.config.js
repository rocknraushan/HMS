const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Your custom configuration goes here (if any)
};

const metroConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Wrap the configuration with Reanimated's wrapper
module.exports = wrapWithReanimatedMetroConfig(metroConfig);
